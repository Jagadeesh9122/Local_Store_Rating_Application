import React, { useEffect, useState } from 'react';
import api from '../api/api';
import StoreCard from '../components/StoreCard';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/StoreListPage.css';

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
        setStores((prev) => prev.map(s => (s.id === storeId ? { ...s, userRating: newRating, averageRating: s.averageRating ? ((s.averageRating + newRating) / 2) : newRating } : s)));
        
    };

    return (
        <div className="store-container">
            <Navbar />
            <header className="app-header">
                <div className="brand">
                    <div className="logo">SR</div>
                    <div>
                        <div>
                            <h1>Store Ratings</h1>
                            <div className="small-muted">Explore stores — rate 1 to 5</div>
                        </div>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="small-muted">Logged: {user?.email} ({user?.role})</div>
                    <div className="password-btns">
                        <button className="btn-secondary" onClick={() => window.location.href = '/change-password'}>Change password</button>
                        <button className="btn" onClick={logout}>Logout</button>
                    </div>
                </div>
            </header>

            <div className="search-bar">
                <form onSubmit={onSearch} className="search-form">
                    <input className="store-search-name" placeholder="Search name" value={qName} onChange={(e) => setQName(e.target.value)} />
                    <input className="store-search-address" placeholder="Search address" value={qAddress} onChange={(e) => setQAddress(e.target.value)} />
                    <div><button type="submit">Search</button></div>
                   
                </form>
            </div>

            {loading ? <div className="no-stores">Loading...</div> : (
                <div className="store-list">
                    {stores.length === 0 && <div className="no-stores">No stores found</div>}
                    {stores.map(s => (
                        <div key={s.id} className="store-rating">
                            <StoreCard store={s} onRated={handleRateUpdated} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}
