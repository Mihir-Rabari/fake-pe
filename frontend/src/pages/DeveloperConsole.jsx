import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Code, 
  Plus, 
  Key, 
  Trash2, 
  Copy, 
  CheckCircle,
  Settings,
  LogOut,
  FolderOpen,
  Webhook
} from 'lucide-react';
import Logo from '../components/Logo';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function DeveloperConsole() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [apiKeys, setApiKeys] = useState([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', webhookUrl: '' });
  const [newKey, setNewKey] = useState({ name: '', type: 'test' });
  const [copiedKey, setCopiedKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'merchant') {
      navigate('/wallet');
      return;
    }

    setUser(parsedUser);
    fetchProjects(token);
  }, [navigate]);

  const fetchProjects = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data.projects);
      if (response.data.projects.length > 0 && !selectedProject) {
        setSelectedProject(response.data.projects[0]);
        fetchApiKeys(response.data.projects[0].projectId, token);
      }
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  const fetchApiKeys = async (projectId, token) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/projects/${projectId}/keys`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApiKeys(response.data.apiKeys);
    } catch (err) {
      setError('Failed to load API keys');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/projects`,
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('Project created successfully');
      setNewProject({ name: '', description: '', webhookUrl: '' });
      setShowCreateProject(false);
      fetchProjects(token);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create project');
    }
  };

  const handleCreateKey = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/projects/${selectedProject.projectId}/keys`,
        newKey,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('API key created successfully');
      setNewKey({ name: '', type: 'test' });
      setShowCreateKey(false);
      fetchApiKeys(selectedProject.projectId, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create API key');
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleRevokeKey = async (keyId) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${API_URL}/api/v1/projects/${selectedProject.projectId}/keys/${keyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess('API key revoked');
      fetchApiKeys(selectedProject.projectId, token);
    } catch (err) {
      setError('Failed to revoke API key');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Logo size="md" />
        </div>
        <nav className="px-4 space-y-1">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <FolderOpen className="w-5 h-5" />
            Dashboard
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
          >
            <Code className="w-5 h-5" />
            Developer
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Developer Console</h1>
            <p className="text-sm text-gray-600">Manage projects and API keys</p>
          </div>
        </header>

        <div className="p-8">
          {/* Alerts */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Projects Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
              <button
                onClick={() => setShowCreateProject(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.projectId}
                  onClick={() => {
                    setSelectedProject(project);
                    fetchApiKeys(project.projectId, localStorage.getItem('token'));
                  }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedProject?.projectId === project.projectId
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <p className="text-xs text-gray-500 font-mono">{project.projectId}</p>
                </div>
              ))}
            </div>
          </div>

          {/* API Keys Section */}
          {selectedProject && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  API Keys - {selectedProject.name}
                </h2>
                <button
                  onClick={() => setShowCreateKey(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Key className="w-4 h-4" />
                  Generate Key
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Key</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((key) => (
                      <tr key={key.keyId} className="border-b border-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-900">{key.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            key.type === 'live' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {key.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-sm text-gray-600">{key.keyPreview}</code>
                            <button
                              onClick={() => handleCopyKey(key.key || key.keyPreview)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {copiedKey === (key.key || key.keyPreview) ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(key.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleRevokeKey(key.keyId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Create Project Modal */}
          {showCreateProject && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Create New Project</h3>
                <form onSubmit={handleCreateProject}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="My Project"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Project description..."
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={newProject.webhookUrl}
                      onChange={(e) => setNewProject({ ...newProject, webhookUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="https://your-site.com/webhook"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateProject(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Create Key Modal */}
          {showCreateKey && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Generate API Key</h3>
                <form onSubmit={handleCreateKey}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Name
                    </label>
                    <input
                      type="text"
                      value={newKey.name}
                      onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Production Key"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Type
                    </label>
                    <select
                      value={newKey.type}
                      onChange={(e) => setNewKey({ ...newKey, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="test">Test</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCreateKey(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Generate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeveloperConsole;
