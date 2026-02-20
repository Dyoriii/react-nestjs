import { useState, useEffect } from 'react';
import { GuestbookForm } from './components/GuestbookForm';
import { GuestbookEntry } from './components/GuestbookEntry';
import { guestbookAPI } from './services/api';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await guestbookAPI.getEntries();
      setEntries(response.data);
    } catch (err) {
      setError('Failed to load entries: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const response = await guestbookAPI.createEntry(formData);
      setEntries([response.data[0], ...entries]);
    } catch (err) {
      throw new Error('Failed to submit: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;

    try {
      await guestbookAPI.deleteEntry(id);
      setEntries(entries.filter(e => e.id !== id));
    } catch (err) {
      setError('Failed to delete: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>📝 Guestbook</h1>
      
      <GuestbookForm onSubmit={handleSubmit} />

      {error && (
        <div style={{
          color: '#d32f2f',
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <h2>Entries ({entries.length})</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p style={{ color: '#666' }}>No entries yet. Be the first to sign!</p>
      ) : (
        entries.map(entry => (
          <GuestbookEntry
            key={entry.id}
            entry={entry}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default App;