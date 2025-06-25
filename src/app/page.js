'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [speed, setSpeed] = useState({ mbps: '—', status: 'Checking...' });
  
  async function fetchSpeed() {
    try {
      const res = await fetch('/api/speed');
      const { mbps, status } = await res.json();
      setSpeed({ mbps, status });
    } catch {
      setSpeed({ mbps: '—', status: 'Error ❌' });
    }
  }
  
  useEffect(() => {
    fetchSpeed();  
    const id = setInterval(fetchSpeed, 30_000);
    return () => clearInterval(id);
  }, []);
  
  return (
    <main style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>Network Speed Monitor</h1>
      <p style={{ fontSize: '2.5rem' }}>{speed.mbps} Mbps</p>
      <p style={{ fontSize: '1.5rem' }}>Status: {speed.status}</p>
    </main>
  );
}
