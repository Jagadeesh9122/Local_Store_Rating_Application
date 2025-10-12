import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../contexts/AuthContext';
import '../styles/StoreOwnerDashboard.css';
import Navbar from '../components/Navbar';

export default function StoreOwnerDashboard() {
  const { logout } = useAuth();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwner = async () => {
    setLoading(true);
    try {
      const resp = await api.get('/owner/dashboard');
     
      setStores(resp.data.stores || []);
    } catch (err) {
      alert('Failed to load owner dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOwner(); }, []);

  return (
    <div className="owner-container">
      <Navbar />
  <header className="app-header">
    <div className="brand"><div className="logo">OD</div><h1>Owner Dashboard</h1></div>
    <div className="header-actions"><button className="btn" onClick={logout}>Logout</button></div>
  </header>

  <div className="store-rating-container">
     {loading ? <div>Loading...</div> : stores.length === 0 ? <div>No stores</div> : (
        stores.map(s => (
          <div className="owner-card" key={s.id} >
            <h3 className="rated-name">{s.name}</h3>
            <div className="avg-rating">Average rating: {s.averageRating ?? '—'}</div>
            <h4 className='raters'>Raters</h4>
            {(!s.raters || s.raters.length === 0) ? <div>No raters</div> : (
              <ul>
                {s.raters.map(r => (
                  <li className ="rater-name" key={r.userId}>{r.name} — {r.rating} — {new Date(r.createdAt).toLocaleString()}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
  </div>

     
    </div>
  );
}
