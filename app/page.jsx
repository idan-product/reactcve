'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('payload');
  const [response, setResponse] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'info') {
      fetch('/api/check')
        .then(res => res.json())
        .then(data => setSystemInfo(data))
        .catch(err => console.error(err));
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    
    const formData = new FormData(e.target);
    
    try {
      const res = await fetch('/api/vuln', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Vulnerable Next.js Research Application</h1>
      
      <div style={{ marginTop: '2rem', borderBottom: '1px solid #ccc' }}>
        <button
          onClick={() => setActiveTab('payload')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'payload' ? '#0070f3' : 'transparent',
            color: activeTab === 'payload' ? 'white' : '#666',
            cursor: 'pointer',
            marginRight: '0.5rem'
          }}
        >
          Send Payload
        </button>
        <button
          onClick={() => setActiveTab('info')}
          style={{
            padding: '0.75rem 1.5rem',
            border: 'none',
            background: activeTab === 'info' ? '#0070f3' : 'transparent',
            color: activeTab === 'info' ? 'white' : '#666',
            cursor: 'pointer'
          }}
        >
          System Info
        </button>
      </div>

      {activeTab === 'payload' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Send Payload</h2>
          <form method="POST" action="/api/vuln" onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="input" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Enter payload (no validation):
              </label>
              <textarea
                id="input"
                name="input"
                rows="6"
                style={{ 
                  padding: '0.5rem', 
                  width: '100%',
                  fontFamily: 'monospace',
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
                placeholder="Enter your payload here..."
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                padding: '0.5rem 1rem',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>

          {response && (
            <div style={{ 
              marginTop: '2rem', 
              padding: '1rem', 
              background: '#f5f5f5', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <h3>Server Response:</h3>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                fontFamily: 'monospace',
                fontSize: '0.9rem'
              }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {activeTab === 'info' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>System Info</h2>
          {systemInfo ? (
            <div style={{ 
              padding: '1rem', 
              background: '#f5f5f5', 
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Node.js:</strong> {systemInfo.node}
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Next.js:</strong> {systemInfo.versions.next}
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>React:</strong> {systemInfo.versions.react}
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>React DOM:</strong> {systemInfo.versions.reactDom}
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>React Server DOM Webpack:</strong> {systemInfo.versions.rscWebpack}
                </li>
              </ul>
            </div>
          ) : (
            <p>Loading system info...</p>
          )}
        </div>
      )}
    </main>
  );
}

