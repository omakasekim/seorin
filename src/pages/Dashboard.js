// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import "../index.css";

// Define the dorms that belong to the Red team
const redDorms = ["West House", "Village Girls", "Village Boys", "Dinning"];

function Dashboard() {
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noScore, setNoScore] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "scores"),
      (snapshot) => {
        if (snapshot.empty) {
          setNoScore(true);
          setScoreData(null);
        } else {
          // Assume a single document exists in "scores"
          setScoreData(snapshot.docs[0].data());
          setNoScore(false);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching scores:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="container">Loading dashboard data...</div>;
  }

  if (noScore || !scoreData) {
    return (
      <div className="container">
        <h2>Scoreboard</h2>
        <p>No score data available.</p>
        <button>Add Score Document</button>
      </div>
    );
  }

  // Compute team totals dynamically from houses array
  const houses = scoreData.houses || [];
  let redTotal = 0;
  let whiteTotal = 0;
  houses.forEach((house) => {
    if (redDorms.includes(house.name)) {
      redTotal += Number(house.score);
    } else {
      whiteTotal += Number(house.score);
    }
  });

  // Sort houses in descending order by score
  const sortedHouses = houses.slice().sort((a, b) => b.score - a.score);

  return (
    <div className="container">
      <h2>Check who's winning!</h2>
      <div className="score-boxes">
        <div className="score-box red">
          <h2>RED</h2>
          <div className="score">{redTotal}</div>
        </div>
        <div className="score-box white">
          <h2>WHITE</h2>
          <div className="score">{whiteTotal}</div>
        </div>
      </div>
      <div className="updated-date">
        Updated: {scoreData.updatedDate || "No date available"}
      </div>
      <h3>Current Winning House</h3>
      <div className="houses-container">
        {sortedHouses.length > 0 ? (
          sortedHouses.map((house, idx) => (
            <div key={idx} className="house-item">
              <div className="house-rank">{idx + 1}</div>
              <div className="house-name">{house.name}</div>
              <div className="house-score">{house.score}</div>
            </div>
          ))
        ) : (
          <p>No house data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
