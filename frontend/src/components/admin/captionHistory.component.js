import React, { useState, useEffect } from "react";

export default function History() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8000/captionHistory"
        ).then(res => res.json());
        setHistory(response);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) return <h1>loading..</h1>;
  if (error) return <h1>{error}</h1>;
  if (!history) return null;

  return (
    <div>
      <ul>
        {history.map(val => (
          <li key={val.image}>
            <img src={val.image} alt="img" height="300" width="300" />{" "}
            {val.caption}
          </li>
        ))}
      </ul>
    </div>
  );
}
