// src/pages/AdminHistory.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";
import "../index.css";

function AdminHistory() {
  const [records, setRecords] = useState([]);
  const [redWins, setRedWins] = useState(0);
  const [whiteWins, setWhiteWins] = useState(0);

  // State for editing a record
  const [editingId, setEditingId] = useState(null);
  const [editRecord, setEditRecord] = useState({ year: "", team: "", house: "" });

  // Listen to the "history" collection
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "history"),
      (snapshot) => {
        const arr = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        // Sort descending by year
        arr.sort((a, b) => b.year - a.year);
        setRecords(arr);
        setRedWins(arr.filter((r) => r.team === "RED").length);
        setWhiteWins(arr.filter((r) => r.team === "WHITE").length);
      },
      (error) => console.error("Error fetching history:", error)
    );
    return () => unsubscribe();
  }, []);

  // Start editing a record
  const handlePencilClick = (record) => {
    setEditingId(record.id);
    setEditRecord({ year: record.year, team: record.team, house: record.house });
  };

  // Save changes for an edited record
  const handleEditSave = async (id) => {
    try {
      await updateDoc(doc(db, "history", id), editRecord);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditRecord({ year: "", team: "", house: "" });
  };

  // Temporary function to add a sample history record (if needed for testing)
  const handleTempAddHistory = async () => {
    try {
      await addDoc(collection(db, "history"), {
        year: new Date().getFullYear(),
        team: "RED",
        house: "West House",
      });
      alert("Sample history record added!");
    } catch (error) {
      console.error("Error adding sample history record:", error);
    }
  };

  return (
    <div className="container">
      <h2>History of Winners!</h2>
      <div className="history-stats">
        <div className="history-stat-box redish">{redWins} times</div>
        <div className="history-stat-box whiteish">{whiteWins} times</div>
      </div>
      {/* Temporary button to add a sample history record */}
      <div style={{ textAlign: "left", marginBottom: "1rem" }}>
        <button onClick={handleTempAddHistory} style={{ backgroundColor: "orange" }}>
          Temp Add History
        </button>
      </div>
      <table className="history-list">
        <thead>
          <tr>
            <th style={{ width: "40px" }}></th>
            <th>Year</th>
            <th>Team</th>
            <th>Dormitory</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const isEditing = editingId === record.id;
            return (
              <tr key={record.id}>
                <td>
                  {isEditing ? (
                    <>
                      <button onClick={() => handleEditSave(record.id)}>Save</button>
                      <button onClick={handleEditCancel} style={{ marginLeft: "4px" }}>
                        X
                      </button>
                    </>
                  ) : (
                    <button
                      className="edit-button"
                      onClick={() => handlePencilClick(record)}
                      title="Edit record"
                    >
                      ✏️
                    </button>
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editRecord.year}
                      onChange={(e) =>
                        setEditRecord({ ...editRecord, year: e.target.value })
                      }
                      style={{ width: "80px" }}
                    />
                  ) : (
                    record.year
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={editRecord.team}
                      onChange={(e) =>
                        setEditRecord({ ...editRecord, team: e.target.value })
                      }
                    >
                      <option value="">Select Team</option>
                      <option value="RED">RED</option>
                      <option value="WHITE">WHITE</option>
                    </select>
                  ) : (
                    record.team
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={editRecord.house}
                      onChange={(e) =>
                        setEditRecord({ ...editRecord, house: e.target.value })
                      }
                    >
                      <option value="">Select Dormitory</option>
                      <option value="West House">West House</option>
                      <option value="Village Girls">Village Girls</option>
                      <option value="Village Boys">Village Boys</option>
                      <option value="Dinning">Dinning</option>
                      <option value="East House">East House</option>
                      <option value="Steward Top">Steward Top</option>
                      <option value="Steward Middle">Steward Middle</option>
                    </select>
                  ) : (
                    record.house
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminHistory;
