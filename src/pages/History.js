// // // // src/pages/History.js
// // // import React, { useEffect, useState } from "react";
// // // import { db } from "../firebase/firebase";
// // // import { collection, onSnapshot } from "firebase/firestore";
// // // import "../index.css";

// // // function History() {
// // //   const [records, setRecords] = useState([]);
// // //   const [redWins, setRedWins] = useState(0);
// // //   const [whiteWins, setWhiteWins] = useState(0);

// // //   useEffect(() => {
// // //     const unsubscribe = onSnapshot(
// // //       collection(db, "history"),
// // //       (snapshot) => {
// // //         const arr = [];
// // //         snapshot.forEach((docSnap) => {
// // //           arr.push(docSnap.data());
// // //         });
// // //         // Sort descending by year
// // //         arr.sort((a, b) => b.year - a.year);
// // //         setRecords(arr);

// // //         // Count how many times RED vs. WHITE
// // //         setRedWins(arr.filter((r) => r.team === "RED").length);
// // //         setWhiteWins(arr.filter((r) => r.team === "WHITE").length);
// // //       },
// // //       (error) => {
// // //         console.error("Error fetching history:", error);
// // //       }
// // //     );
// // //     return () => unsubscribe();
// // //   }, []);

// // //   return (
// // //     <div className="container">
// // //       <h2>History of Winners!</h2>

// // //       {/* Display Red/White totals in the same style as Admin History */}
// // //       <div className="history-stats">
// // //         <div className="history-stat-box redish">{redWins} times</div>
// // //         <div className="history-stat-box whiteish">{whiteWins} times</div>
// // //       </div>

// // //       <table className="history-list">
// // //         <thead>
// // //           <tr>
// // //             <th style={{ width: "40px" }}></th>
// // //             <th>Year</th>
// // //             <th>Team</th>
// // //             <th>Dormitory</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {records.map((record, idx) => (
// // //             <tr key={idx}>
// // //               <td></td>
// // //               <td>{record.year}</td>
// // //               <td>{record.team}</td>
// // //               <td>{record.house}</td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>
// // //     </div>
// // //   );
// // // }

// // // export default History;
// // import React, { useEffect, useState } from "react";
// // import { db } from "../firebase/firebase";
// // import { ref, onValue } from "firebase/database";
// // import "../index.css";

// // function History() {
// //   const [records, setRecords] = useState([]);
// //   const [redWins, setRedWins] = useState(0);
// //   const [whiteWins, setWhiteWins] = useState(0);

// //   useEffect(() => {
// //     const historyRef = ref(db, "history");

// //     onValue(historyRef, (snapshot) => {
// //       const data = snapshot.val();
// //       if (data) {
// //         const historyArray = Object.entries(data).map(([id, item]) => ({
// //           id,
// //           ...item,
// //         }));
// //         historyArray.sort((a, b) => b.year - a.year);
// //         setRecords(historyArray);
// //         setRedWins(historyArray.filter((r) => r.team === "RED").length);
// //         setWhiteWins(historyArray.filter((r) => r.team === "WHITE").length);
// //       }
// //     });
// //   }, []);

// //   return (
// //     <div className="container">
// //       <h2>History of Winners!</h2>

// //       <div className="history-stats">
// //         <div className="history-stat-box redish">{redWins} times</div>
// //         <div className="history-stat-box whiteish">{whiteWins} times</div>
// //       </div>

// //       <table className="history-list">
// //         <thead>
// //           <tr>
// //             <th style={{ width: "40px" }}></th>
// //             <th>Year</th>
// //             <th>Team</th>
// //             <th>Dormitory</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {records.map((record, idx) => (
// //             <tr key={idx}>
// //               <td></td>
// //               <td>{record.year}</td>
// //               <td>{record.team}</td>
// //               <td>{record.house}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default History;
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { ref, onValue, push } from "firebase/database";
// import "../index.css";

// function History() {
//   const [records, setRecords] = useState([]);
//   const [redWins, setRedWins] = useState(0);
//   const [whiteWins, setWhiteWins] = useState(0);

//   useEffect(() => {
//     const historyRef = ref(db, "history");

//     onValue(historyRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const historyArray = Object.entries(data).map(([id, item]) => ({
//           id,
//           ...item,
//         }));
//         historyArray.sort((a, b) => b.year - a.year);
//         setRecords(historyArray);
//         setRedWins(historyArray.filter((r) => r.team === "RED").length);
//         setWhiteWins(historyArray.filter((r) => r.team === "WHITE").length);
//       }
//     });
//   }, []);

//   // Temporary function to add a sample history record
//   const handleAddSampleHistory = async () => {
//     const sampleRecord = {
//       year: new Date().getFullYear(),
//       team: Math.random() > 0.5 ? "RED" : "WHITE", // Randomly assign RED or WHITE
//       house: ["West House", "Village Girls", "Village Boys", "Dinning", "East House", "Steward Top", "Steward Middle"][
//         Math.floor(Math.random() * 7)
//       ], // Randomly select a house
//     };

//     try {
//       await push(ref(db, "history"), sampleRecord);
//       alert("Sample history record added!");
//     } catch (error) {
//       console.error("Error adding sample history record:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>History of Winners!</h2>

//       <div className="history-stats">
//         <div className="history-stat-box redish">{redWins} times</div>
//         <div className="history-stat-box whiteish">{whiteWins} times</div>
//       </div>

//       {/* Temporary Button to Add Sample Data */}
//       <div style={{ textAlign: "left", marginBottom: "1rem" }}>
//         <button onClick={handleAddSampleHistory} style={{ backgroundColor: "orange" }}>
//           Add Sample History
//         </button>
//       </div>

//       <table className="history-list">
//         <thead>
//           <tr>
//             <th style={{ width: "40px" }}></th>
//             <th>Year</th>
//             <th>Team</th>
//             <th>Dormitory</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.map((record, idx) => (
//             <tr key={idx}>
//               <td></td>
//               <td>{record.year}</td>
//               <td>{record.team}</td>
//               <td>{record.house}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default History;
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue, push } from "firebase/database";
import "../index.css";

function History() {
  const [records, setRecords] = useState([]);
  const [redWins, setRedWins] = useState(0);
  const [whiteWins, setWhiteWins] = useState(0);

  useEffect(() => {
    const historyRef = ref(db, "history");
    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const historyArray = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
        historyArray.sort((a, b) => b.year - a.year);
        setRecords(historyArray);
        setRedWins(historyArray.filter((r) => r.team === "RED").length);
        setWhiteWins(historyArray.filter((r) => r.team === "WHITE").length);
      }
    });
  }, []);

  // Temporary function to add a sample history record
  const handleAddSampleHistory = async () => {
    const sampleRecord = {
      year: new Date().getFullYear(),
      team: Math.random() > 0.5 ? "RED" : "WHITE", // Randomly assign team
      house: ["West House", "Village Girls", "Village Boys", "Dinning", "East House", "Steward Top", "Steward Middle"][
        Math.floor(Math.random() * 7)
      ], // Random house
    };

    try {
      await push(ref(db, "history"), sampleRecord);
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
      <div style={{ textAlign: "left", marginBottom: "1rem" }}>
        <button onClick={handleAddSampleHistory} style={{ backgroundColor: "orange" }}>
          Add Sample History
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
          {records.map((record, idx) => (
            <tr key={idx}>
              <td></td>
              <td>{record.year}</td>
              <td>{record.team}</td>
              <td>{record.house}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
