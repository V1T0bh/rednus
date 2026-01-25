'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Title } from '@/components/title';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface PresetEndpoint {
  label: string;
  method: HttpMethod;
  endpoint: string;
  hasBody: boolean;
  bodyTemplate?: string;
}

const topicsPresets: PresetEndpoint[] = [
  { label: 'Get All Topics', method: 'GET', endpoint: '/topics', hasBody: false },
  { label: 'Get Topic by ID', method: 'GET', endpoint: '/topics/{id}', hasBody: false },
  { label: 'Create Topic', method: 'POST', endpoint: '/topics', hasBody: true, bodyTemplate: '{\n  "Label": "New Topic"\n}' },
  { label: 'Update Topic', method: 'PUT', endpoint: '/topics/{id}', hasBody: true, bodyTemplate: '{\n  "Label": "Updated Topic"\n}' },
  { label: 'Delete Topic', method: 'DELETE', endpoint: '/topics/{id}', hasBody: false },
];

const postsPresets: PresetEndpoint[] = [
  { label: 'Get All Posts', method: 'GET', endpoint: '/posts', hasBody: false },
  { label: 'Get Post by ID', method: 'GET', endpoint: '/posts/{id}', hasBody: false },
  { label: 'Get Posts in Topic', method: 'GET', endpoint: '/topics/{topic_id}/posts', hasBody: false },
  { label: 'Create Post in Topic', method: 'POST', endpoint: '/topics/{topic_id}/posts/', hasBody: true, bodyTemplate: '{\n  "Title": "New Post",\n  "Description": "Post content here"\n}' },
  { label: 'Update Post', method: 'PUT', endpoint: '/posts/{id}', hasBody: true, bodyTemplate: '{\n  "Title": "Updated Title",\n  "Description": "Updated content"\n}' },
  { label: 'Delete Post', method: 'DELETE', endpoint: '/posts/{id}', hasBody: false },
];

const commentsPresets: PresetEndpoint[] = [
  { label: 'Get Comments for Post', method: 'GET', endpoint: '/posts/{post_id}/comments', hasBody: false },
  { label: 'Create Comment', method: 'POST', endpoint: '/posts/{post_id}/comments', hasBody: true, bodyTemplate: '{\n  "Content": "New comment"\n}' },
  { label: 'Update Comment', method: 'PUT', endpoint: '/comments/{id}', hasBody: true, bodyTemplate: '{\n  "Content": "Updated comment"\n}' },
  { label: 'Delete Comment', method: 'DELETE', endpoint: '/comments/{id}', hasBody: false },
];

export default function AdminPage() {
  const { isAdmin, isLoading, isAuthenticated, username } = useAuth();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<'topics' | 'posts' | 'comments' | 'custom'>('topics');
  const [selectedPreset, setSelectedPreset] = useState<PresetEndpoint | null>(null);
  
  const [method, setMethod] = useState<HttpMethod>('GET');
  const [endpoint, setEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');
  
  const [response, setResponse] = useState<string>('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  const getPresets = () => {
    switch (selectedCategory) {
      case 'topics': return topicsPresets;
      case 'posts': return postsPresets;
      case 'comments': return commentsPresets;
      default: return [];
    }
  };

  const handlePresetSelect = (preset: PresetEndpoint) => {
    setSelectedPreset(preset);
    setMethod(preset.method);
    setEndpoint(preset.endpoint);
    setRequestBody(preset.bodyTemplate || '');
  };

  const handleCategoryChange = (category: 'topics' | 'posts' | 'comments' | 'custom') => {
    setSelectedCategory(category);
    setSelectedPreset(null);
    if (category === 'custom') {
      setMethod('GET');
      setEndpoint('');
      setRequestBody('');
    }
  };

  const handleSendRequest = async () => {
    if (!endpoint) {
      alert('Please enter an endpoint');
      return;
    }

    setIsRequesting(true);
    setResponse('');
    setStatusCode(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Username': username || '',
        },
      };

      if ((method === 'POST' || method === 'PUT') && requestBody) {
        options.body = requestBody;
      }

      const fullUrl = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
      const res = await fetch(fullUrl, options);
      
      setStatusCode(res.status);
      
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatusCode(0);
    } finally {
      setIsRequesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col mt-10 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
      <Title>Developer Dashboard</Title>
      <p className="text-gray-400 mb-6">Admin API testing tool - Send requests to the backend</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Panel */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">Request</h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(['topics', 'posts', 'comments', 'custom'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-[#262626] text-gray-400 hover:bg-[#333333] hover:text-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Preset Dropdown */}
          {selectedCategory !== 'custom' && (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Preset Endpoints</label>
              <select
                value={selectedPreset?.label || ''}
                onChange={(e) => {
                  const preset = getPresets().find(p => p.label === e.target.value);
                  if (preset) handlePresetSelect(preset);
                }}
                className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg text-gray-200 focus:border-red-500 focus:outline-none"
              >
                <option value="">Select a preset...</option>
                {getPresets().map((preset) => (
                  <option key={preset.label} value={preset.label}>
                    {preset.method} - {preset.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Method Selector */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HttpMethod)}
              className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg text-gray-200 focus:border-red-500 focus:outline-none"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          {/* Endpoint Input */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Endpoint</label>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/topics or /posts/{id}"
              className="w-full px-4 py-2 bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Replace {'{id}'}, {'{topic_id}'}, {'{post_id}'} with actual values</p>
          </div>

          {/* Request Body */}
          {(method === 'POST' || method === 'PUT') && (
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Request Body (JSON)</label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder='{"key": "value"}'
                rows={6}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none font-mono text-sm resize-y"
              />
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSendRequest}
            disabled={isRequesting || !endpoint}
            className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            {isRequesting ? 'Sending...' : 'Send Request'}
          </button>
        </div>

        {/* Response Panel */}
        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-200">Response</h2>
            {statusCode !== null && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusCode >= 200 && statusCode < 300
                    ? 'bg-green-500/20 text-green-400'
                    : statusCode >= 400
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {statusCode === 0 ? 'Error' : statusCode}
              </span>
            )}
          </div>

          <div className="bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg p-4 min-h-[300px] max-h-[500px] overflow-auto">
            {response ? (
              <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap break-words">
                {response}
              </pre>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Response will appear here...
              </p>
            )}
          </div>

          {response && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(response);
              }}
              className="mt-4 text-sm text-gray-400 hover:text-gray-200 transition-colors"
            >
              Copy to clipboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
