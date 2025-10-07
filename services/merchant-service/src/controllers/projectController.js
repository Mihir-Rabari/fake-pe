const Project = require('../models/Project');
const ApiKey = require('../models/ApiKey');
const { generateProjectId, generateKeyId, generateApiKey } = require('@expe/shared');
const logger = require('../utils/logger');

/**
 * Create project
 */
exports.createProject = async (req, res) => {
  try {
    const merchantId = req.headers['x-merchant-id'];
    const { name, description, webhookUrl, allowedOrigins } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    const projectId = generateProjectId();

    const project = new Project({
      projectId,
      merchantId,
      name,
      description,
      webhookUrl,
      allowedOrigins: allowedOrigins || []
    });

    await project.save();

    logger.info('Project created', { projectId, merchantId, name });

    res.status(201).json({ project });
  } catch (err) {
    logger.error('Create project error', { error: err.message });
    res.status(500).json({ error: 'Failed to create project' });
  }
};

/**
 * List projects
 */
exports.listProjects = async (req, res) => {
  try {
    const merchantId = req.headers['x-merchant-id'];

    const projects = await Project.find({ merchantId, isActive: true })
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (err) {
    logger.error('List projects error', { error: err.message });
    res.status(500).json({ error: 'Failed to list projects' });
  }
};

/**
 * Get project
 */
exports.getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const merchantId = req.headers['x-merchant-id'];

    const project = await Project.findOne({ projectId, merchantId });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ project });
  } catch (err) {
    logger.error('Get project error', { error: err.message });
    res.status(500).json({ error: 'Failed to get project' });
  }
};

/**
 * Update project
 */
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const merchantId = req.headers['x-merchant-id'];
    const { name, description, webhookUrl, allowedOrigins } = req.body;

    const project = await Project.findOneAndUpdate(
      { projectId, merchantId },
      { name, description, webhookUrl, allowedOrigins, updatedAt: new Date() },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    logger.info('Project updated', { projectId, merchantId });

    res.json({ project });
  } catch (err) {
    logger.error('Update project error', { error: err.message });
    res.status(500).json({ error: 'Failed to update project' });
  }
};

/**
 * Delete project
 */
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const merchantId = req.headers['x-merchant-id'];

    const project = await Project.findOneAndUpdate(
      { projectId, merchantId },
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Deactivate all API keys for this project
    await ApiKey.updateMany(
      { projectId },
      { isActive: false }
    );

    logger.info('Project deleted', { projectId, merchantId });

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    logger.error('Delete project error', { error: err.message });
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

/**
 * Generate API key
 */
exports.generateApiKey = async (req, res) => {
  try {
    const { projectId } = req.params;
    const merchantId = req.headers['x-merchant-id'];
    const { name, type = 'test' } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Key name is required' });
    }

    // Verify project exists and belongs to merchant
    const project = await Project.findOne({ projectId, merchantId, isActive: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const keyId = generateKeyId();
    const key = generateApiKey(type === 'live' ? 'sk_live' : 'sk_test');

    const apiKey = new ApiKey({
      keyId,
      merchantId,
      projectId,
      key,
      type,
      name
    });

    await apiKey.save();

    logger.info('API key generated', { keyId, projectId, merchantId, type });

    res.status(201).json({
      apiKey: {
        keyId: apiKey.keyId,
        name: apiKey.name,
        type: apiKey.type,
        key: apiKey.key, // Show full key only on creation
        createdAt: apiKey.createdAt
      }
    });
  } catch (err) {
    logger.error('Generate API key error', { error: err.message });
    res.status(500).json({ error: 'Failed to generate API key' });
  }
};

/**
 * List API keys
 */
exports.listApiKeys = async (req, res) => {
  try {
    const { projectId } = req.params;
    const merchantId = req.headers['x-merchant-id'];

    const apiKeys = await ApiKey.find(
      { projectId, merchantId, isActive: true },
      'keyId name type lastUsedAt createdAt'
    ).sort({ createdAt: -1 });

    // Mask the keys in list view
    const maskedKeys = apiKeys.map(k => ({
      ...k.toObject(),
      keyPreview: k.key ? `${k.key.substring(0, 12)}...${k.key.slice(-4)}` : null
    }));

    res.json({ apiKeys: maskedKeys });
  } catch (err) {
    logger.error('List API keys error', { error: err.message });
    res.status(500).json({ error: 'Failed to list API keys' });
  }
};

/**
 * Revoke API key
 */
exports.revokeApiKey = async (req, res) => {
  try {
    const { projectId, keyId } = req.params;
    const merchantId = req.headers['x-merchant-id'];

    const apiKey = await ApiKey.findOneAndUpdate(
      { keyId, projectId, merchantId },
      { isActive: false },
      { new: true }
    );

    if (!apiKey) {
      return res.status(404).json({ error: 'API key not found' });
    }

    logger.info('API key revoked', { keyId, projectId, merchantId });

    res.json({ message: 'API key revoked successfully' });
  } catch (err) {
    logger.error('Revoke API key error', { error: err.message });
    res.status(500).json({ error: 'Failed to revoke API key' });
  }
};
