export function GuestbookEntry({ entry, onDelete }) {
  const date = new Date(entry.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '16px',
      marginBottom: '12px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start'
      }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0' }}>{entry.name}</h3>
          <p style={{
            margin: '0 0 8px 0',
            color: '#666',
            fontSize: '14px'
          }}>
            {entry.email}
          </p>
          <p style={{ margin: '8px 0', lineHeight: '1.5' }}>
            {entry.message}
          </p>
          <p style={{
            margin: '8px 0 0 0',
            color: '#999',
            fontSize: '12px'
          }}>
            {date}
          </p>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}