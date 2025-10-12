import React, { useState } from 'react';
import '../styles/RatingStars.css';

export default function RatingStars({ value = 0, onChange, disabled = false }) {
  const [hover, setHover] = useState(0);
  const current = value;

    return (
    <div className="stars">
      {[1,2,3,4,5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => !disabled && onChange(i)}
          className="star-btn"
          aria-label={`Rate ${i}`}
        >
          <span className={(hover || current) >= i ? 'star-on' : 'star-off'}>
            {(hover || current) >= i ? '★' : '☆'}
          </span>
        </button>
      ))}
    </div>
  );



}
