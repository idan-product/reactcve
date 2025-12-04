export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Vulnerable Next.js Research Application</h1>
      <p>This is a Server Component with an intentionally vulnerable form.</p>
      
      <form action="/api/submit" method="POST" style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="input" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Enter data (no validation):
          </label>
          <input
            type="text"
            id="input"
            name="data"
            style={{ padding: '0.5rem', width: '300px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Submit
        </button>
      </form>
    </main>
  )
}

