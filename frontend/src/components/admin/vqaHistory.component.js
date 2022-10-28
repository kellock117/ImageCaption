import React, { useState, useEffect } from "react";
import "./css/vqatable.css"

export default function History() {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/vqaHistory").then(
          res => res.json()
        );
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
    <table id="vqaTable">
      <tr>
        <th colspan="3">VQA History</th>
      </tr>
      <tr>
        <th>Image</th>
        <th>Question</th>
        <th>Answer</th>
      </tr>
        {history.map(val => (
            <tr>
              <td key={val.image}>
                <img id="srcImg" src={val.image} alt="img" height="300" width="300" />
              </td>
              <td>{" "} {val.question}</td>
              <td>{val.answer}</td>
            </tr>
        ))}
    </table>
  );
}
