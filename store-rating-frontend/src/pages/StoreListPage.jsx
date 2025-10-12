import React, { useEffect, useState } from 'react';
import api from '../api/api';
import StoreCard from '../components/StoreCard';
import { useAuth } from '../contexts/AuthContext';

export default function StoreListPage() {
  const { user, logout } = useAuth();
  const [stores, setStores] = useState([]);
  const [qName, setQName] = useState('');
  const [qAddress, setQAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/stores', { params: { name: qName || undefined, address: qAddress || undefined } });
      setStores(resp.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Session expired');
        logout();
      } else {
        alert('Failed to load stores');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    fetchStores();
  };

  const handleRateUpdated = (storeId, newRating) => {
    setStores((prev) => prev.map(s => (s.id === storeId ? { ...s, userRating: newRating, averageRating: s.averageRating ? ((s.averageRating + newRating)/2) : newRating } : s)));
    // quick local update; you can refetch for accuracy
  };

    return (
    <div className="container">
      <header className="app-header">
        <div className="brand">
          <div className="logo">SR</div>
          <div>
            <h1>Store Ratings</h1>
            <div className="small-muted">Explore stores — rate 1 to 5</div>
          </div>
        </div>

        <div className="header-actions">
          <div className="small-muted">Logged: {user?.email} ({user?.role})</div>
          <button className="btn secondary" onClick={() => window.location.href = '/change-password'}>Change password</button>
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="card">
        <form onSubmit={onSearch} className="form-row">
          <input className="input" placeholder="Search name" value={qName} onChange={(e)=>setQName(e.target.value)} />
          <input className="input" placeholder="Search address" value={qAddress} onChange={(e)=>setQAddress(e.target.value)} />
          <button className="btn" type="submit">Search</button>
        </form>
      </div>

      {loading ? <div className="empty">Loading...</div> : (
        <div className="store-grid">
          {stores.length === 0 && <div className="empty card">No stores found</div>}
          {stores.map(s => (
            <div key={s.id} className="card store-card">
              <StoreCard store={s} onRated={handleRateUpdated} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

}
