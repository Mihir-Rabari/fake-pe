const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// Create project
router.post('/', projectController.createProject);

// List projects
router.get('/', projectController.listProjects);

// Get project
router.get('/:projectId', projectController.getProject);

// Update project
router.put('/:projectId', projectController.updateProject);

// Delete project
router.delete('/:projectId', projectController.deleteProject);

// Generate API key
router.post('/:projectId/keys', projectController.generateApiKey);

// List API keys
router.get('/:projectId/keys', projectController.listApiKeys);

// Revoke API key
router.delete('/:projectId/keys/:keyId', projectController.revokeApiKey);

module.exports = router;
