import React, { useMemo, useState } from 'react';

export default function Table({ columns = [], data = [] }) {
  const [sortKey, setSortKey] = useState(null);
  const [order, setOrder] = useState('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const arr = [...data].sort((a, b) => {
      const A = (a[sortKey] ?? '').toString().toLowerCase();
      const B = (b[sortKey] ?? '').toString().toLowerCase();
      if (A < B) return order === 'asc' ? -1 : 1;
      if (A > B) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return arr;
  }, [data, sortKey, order]);

  const handleHeaderClick = (key) => {
    if (sortKey === key) setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setOrder('asc');
    }
  };

  return (
    <div className="card">
         <table className="table">
      <thead>
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              style={{ textAlign:'left', borderBottom:'1px solid #ccc', cursor: 'pointer', padding:'8px' }}
              onClick={() => handleHeaderClick(col.key)}
            >
              {col.label} {sortKey === col.key ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row) => (
          <tr key={row.id || JSON.stringify(row)} style={{ borderBottom:'1px solid #eee' }}>
            {columns.map(col => (
              <td key={col.key} style={{ padding:'8px' }}>
                {col.render ? col.render(row) : (row[col.key] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
   
  );
}
