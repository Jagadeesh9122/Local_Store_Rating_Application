import React, { useState } from 'react';
import api from '../api/api';
import RatingStars from './RatingStars';
import '../styles/StoreCard.css';

export default function StoreCard({ store, onRated }) {
  const [submitting, setSubmitting] = useState(false);

  const submitRating = async (rating) => {
    setSubmitting(true);
    try {
      await api.post(`/stores/${store.id}/rate`, { rating });
      onRated(store.id, rating);
    } catch (err) {
      alert(err?.response?.data?.msg || 'Rating failed');
    } finally {
      setSubmitting(false);
    }
  };

    return (
    <div>
      <div className="store-card">
        <div>
          <h3 className="store-title">{store.name}</h3>
          <div className="store-address">{store.address}</div>
        </div>
        <div className="store-stats">
          <div>Avg: <span className="kv">{store.averageRating ?? '—'}</span></div>
          <div>Your: <span className="kv">{store.userRating ?? '—'}</span></div>
        </div>
         <div>
        <RatingStars value={store.userRating || 0} onChange={submitRating} disabled={submitting} />
      </div>
      </div>

     
    </div>
  );

}
