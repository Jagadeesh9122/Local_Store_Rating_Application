import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Table from '../components/Table';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [totals, setTotals] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [d1, d2, d3] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/users'),
        api.get('/admin/stores'),
      ]);
      setTotals(d1.data);
      setUsers(d2.data);
      setStores(d3.data);
    } catch (err) {
      alert('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return (
  <div className="admin-container">
    <Navbar />

  <header className="app-header">
    <div className="brand"><div className="logo">AD</div><h1>Admin Dashboard</h1></div>
    <div className="header-actions"><button className="btn" onClick={logout}>Logout</button></div>
  </header>


      {loading ? <div>Loading...</div> : (
        <>
           <div className="stat-card" style={{ display:'flex', gap:12 }}>
    <div><div className="stat-name">Total users</div><div className="stat-value">{totals?.totalUsers ?? '—'}</div></div>
    <div><div className="stat-name">Total stores</div><div className="stat-value">{totals?.totalStores ?? '—'}</div></div>
    <div><div className="stat-name">Total ratings</div><div className="stat-value">{totals?.totalRatings ?? '—'}</div></div>
  </div>

          <h3 className="list-name">Users</h3>
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'address', label: 'Address' },
              { key: 'role', label: 'Role' },
            ]}
            data={users}
          />

          <h3 className='list-name'>Stores</h3>
          <Table
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'address', label: 'Address' },
              { key: 'averageRating', label: 'Rating' },
            ]}
            data={stores}
          />
        </>
      )}
    </div>
  );
}
