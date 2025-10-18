import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';

export default function DocsManager() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    category: 'getting-started',
    order: 0,
    published: false,
    metadata: {
      description: '',
      keywords: []
    }
  });

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/v1/documentation/admin/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocs(response.data);
    } catch (error) {
      console.error('Error fetching docs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      
      if (editing) {
        // Update existing
        await axios.put(`/api/v1/documentation/${editing}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new
        await axios.post('/api/v1/documentation', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Reset form
      setFormData({
        slug: '',
        title: '',
        content: '',
        category: 'getting-started',
        order: 0,
        published: false,
        metadata: { description: '', keywords: [] }
      });
      setEditing(null);
      
      // Refresh list
      fetchDocs();
    } catch (error) {
      console.error('Error saving doc:', error);
      alert(error.response?.data?.error || 'Failed to save documentation');
    }
  };

  const handleEdit = (doc) => {
    setEditing(doc._id);
    setFormData({
      slug: doc.slug,
      title: doc.title,
      content: doc.content,
      category: doc.category,
      order: doc.order,
      published: doc.published,
      metadata: doc.metadata || { description: '', keywords: [] }
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this documentation?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/v1/documentation/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDocs();
    } catch (error) {
      console.error('Error deleting doc:', error);
    }
  };

  const togglePublish = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/v1/documentation/${id}/publish`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchDocs();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const categories = [
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'guides', label: 'Guides' },
    { value: 'api-reference', label: 'API Reference' },
    { value: 'sdk', label: 'SDK' },
    { value: 'resources', label: 'Resources' }
  ];

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Documentation Manager</h1>
          <button
            onClick={() => {
              setEditing(null);
              setFormData({
                slug: '',
                title: '',
                content: '',
                category: 'getting-started',
                order: 0,
                published: false,
                metadata: { description: '', keywords: [] }
              });
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            New Documentation
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editing ? 'Edit Documentation' : 'Create New Documentation'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Getting Started with FakePE"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="getting-started"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Will be available at: /docs/{formData.slug}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.metadata.description}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    metadata: { ...formData.metadata, description: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Brief description for SEO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content (Markdown/JSX)
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="Write your documentation content here..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Save className="w-4 h-4" />
                  {editing ? 'Update' : 'Create'}
                </button>
                
                {editing && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(null);
                      setFormData({
                        slug: '',
                        title: '',
                        content: '',
                        category: 'getting-started',
                        order: 0,
                        published: false,
                        metadata: { description: '', keywords: [] }
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">All Documentation</h2>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {docs.map((doc) => (
                <div key={doc._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        /{doc.slug}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {doc.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          Order: {doc.order}
                        </span>
                        {doc.published ? (
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <Eye className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <EyeOff className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublish(doc._id)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                        title={doc.published ? 'Unpublish' : 'Publish'}
                      >
                        {doc.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {docs.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No documentation yet. Create your first one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
