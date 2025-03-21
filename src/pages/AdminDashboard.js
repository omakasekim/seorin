// // // src/pages/AdminDashboard.js
// // import React, { useEffect, useState } from "react";
// // import { db } from "../firebase/firebase";
// // import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
// // import "../index.css";

// // // Define red team dorms
// // const redDorms = ["West House", "Village Girls", "Village Boys", "Dinning"];

// // function AdminDashboard() {
// //   const [docId, setDocId] = useState(null);
// //   const [data, setData] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   // form state for editing (will mirror the document)
// //   const [form, setForm] = useState({
// //     red: 0,
// //     white: 0,
// //     houses: [],
// //   });

// //   // Fetch the "scores" document from Firestore
// //   useEffect(() => {
// //     const unsubscribe = onSnapshot(
// //       collection(db, "scores"),
// //       (snapshot) => {
// //         if (snapshot.empty) {
// //           setData(null);
// //         } else {
// //           const docData = snapshot.docs[0].data();
// //           setDocId(snapshot.docs[0].id);
// //           setData(docData);
// //         }
// //       },
// //       (error) => console.error("Error fetching scores:", error)
// //     );
// //     return () => unsubscribe();
// //   }, []);

// //   // Compute totals dynamically from houses array
// //   const computeTotals = (houses) => {
// //     let redTotal = 0;
// //     let whiteTotal = 0;
// //     houses.forEach((house) => {
// //       if (redDorms.includes(house.name)) {
// //         redTotal += Number(house.score);
// //       } else {
// //         whiteTotal += Number(house.score);
// //       }
// //     });
// //     return { redTotal, whiteTotal };
// //   };

// //   // Use the data from Firestore if not editing; if editing (modal open), use form state.
// //   const currentHouses = showModal ? form.houses : data?.houses || [];
// //   const { redTotal, whiteTotal } = computeTotals(currentHouses);

// //   // Open modal: copy current document data into form state and sort houses descending
// //   const openModal = () => {
// //     if (!data) return;
// //     const sortedHouses = data.houses
// //       ? data.houses.slice().sort((a, b) => b.score - a.score)
// //       : [];
// //     setForm({
// //       red: data.red,
// //       white: data.white,
// //       houses: sortedHouses,
// //     });
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //   };

// //   // Save the changes to Firestore
// //   const handleSave = async () => {
// //     if (!docId) return;
// //     try {
// //       await updateDoc(doc(db, "scores", docId), {
// //         red: Number(form.red),
// //         white: Number(form.white),
// //         houses: form.houses,
// //       });
// //       setShowModal(false);
// //     } catch (error) {
// //       console.error("Error updating scores:", error);
// //     }
// //   };

// //   const handleHouseChange = (index, value) => {
// //     const updatedHouses = [...form.houses];
// //     updatedHouses[index].score = Number(value);
// //     setForm({ ...form, houses: updatedHouses });
// //   };

// //   // Also allow editing team scores in the modal via form inputs
// //   const handleTeamChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value }));
// //   };

// //   if (!data) {
// //     return (
// //       <div className="container">
// //         <h2>Admin Dashboard</h2>
// //         <p>No score data available. Please add a score document.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container">
// //       <h2>Admin Dashboard</h2>
// //       <div className="score-boxes">
// //         <div className="score-box red">
// //           <h2>RED</h2>
// //           <div className="score">{redTotal}</div>
// //         </div>
// //         <div className="score-box white">
// //           <h2>WHITE</h2>
// //           <div className="score">{whiteTotal}</div>
// //         </div>
// //       </div>
// //       {/* Place the edit button in the position where "Updated:" was */}
// //       <div className="updated-date" style={{ textAlign: "right" }}>
// //         <button className="edit-button" onClick={openModal} title="Edit Scores">
// //           ✏️
// //         </button>
// //       </div>
// //       <h3>Current Winning House</h3>
// //       <div className="houses-container">
// //         {data.houses && data.houses.length > 0 ? (
// //           data.houses
// //             .slice()
// //             .sort((a, b) => b.score - a.score)
// //             .map((house, idx) => (
// //               <div key={idx} className="house-item">
// //                 <div className="house-rank">{idx + 1}</div>
// //                 <div className="house-name">{house.name}</div>
// //                 <div className="house-score">{house.score}</div>
// //               </div>
// //             ))
// //         ) : (
// //           <p>No house data available.</p>
// //         )}
// //       </div>

// //       {showModal && (
// //         <div className="popup-overlay">
// //           <div className="popup-content">
// //             <h3>Edit Scores</h3>
// //             <div className="modal-form">
// //               <label>
// //                 Red:
// //                 <input
// //                   type="number"
// //                   name="red"
// //                   value={form.red}
// //                   onChange={handleTeamChange}
// //                 />
// //               </label>
// //               <label>
// //                 White:
// //                 <input
// //                   type="number"
// //                   name="white"
// //                   value={form.white}
// //                   onChange={handleTeamChange}
// //                 />
// //               </label>
// //               <h4>House Scores</h4>
// //               <div className="houses-edit-container">
// //                 <div className="houses-col">
// //                   {form.houses.slice(0, 4).map((house, idx) => (
// //                     <div key={idx} className="house-edit-row">
// //                       <label>{house.name}:</label>
// //                       <input
// //                         type="number"
// //                         value={house.score}
// //                         onChange={(e) => handleHouseChange(idx, e.target.value)}
// //                       />
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="houses-col">
// //                   {form.houses.slice(4).map((house, idx) => {
// //                     const realIndex = idx + 4;
// //                     return (
// //                       <div key={realIndex} className="house-edit-row">
// //                         <label>{house.name}:</label>
// //                         <input
// //                           type="number"
// //                           value={house.score}
// //                           onChange={(e) =>
// //                             handleHouseChange(realIndex, e.target.value)
// //                           }
// //                         />
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             </div>
// //             <div className="modal-buttons">
// //               <button onClick={closeModal} className="cancel-btn">
// //                 Cancel
// //               </button>
// //               <button onClick={handleSave} className="save-btn">
// //                 Save
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default AdminDashboard;
// import React, { useEffect, useState } from "react";
// import { db } from "../firebase/firebase";
// import { ref, onValue, set } from "firebase/database";
// import "../index.css";

// const redDorms = ["West House", "Village Girls", "Village Boys", "Dinning"];

// function AdminDashboard() {
//   const [data, setData] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({
//     red: 0,
//     white: 0,
//     houses: [],
//   });

//   // Fetch data from Realtime Database
//   useEffect(() => {
//     const scoresRef = ref(db, "scores");
//     onValue(scoresRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setData(data);
//       }
//     });
//   }, []);

//   // Compute team totals dynamically from houses array
//   const computeTotals = (houses) => {
//     let redTotal = 0;
//     let whiteTotal = 0;
//     houses.forEach((house) => {
//       if (redDorms.includes(house.name)) {
//         redTotal += Number(house.score);
//       } else {
//         whiteTotal += Number(house.score);
//       }
//     });
//     return { redTotal, whiteTotal };
//   };

//   // Use form state when modal is open, otherwise use database data
//   const currentHouses = showModal ? form.houses : data?.houses || [];
//   const { redTotal, whiteTotal } = computeTotals(currentHouses);

//   // Open modal and copy current data
//   const openModal = () => {
//     if (!data) return;
//     const sortedHouses = data.houses
//       ? data.houses.slice().sort((a, b) => b.score - a.score)
//       : [];
//     setForm({
//       red: redTotal, // Compute from houses
//       white: whiteTotal, // Compute from houses
//       houses: sortedHouses,
//     });
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   // Save the changes to Realtime Database
//   const handleSave = async () => {
//     try {
//       await set(ref(db, "scores"), {
//         red: form.red,
//         white: form.white,
//         houses: form.houses,
//       });
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error updating scores:", error);
//     }
//   };

//   const handleHouseChange = (index, value) => {
//     const updatedHouses = [...form.houses];
//     updatedHouses[index].score = Number(value);
//     setForm({ ...form, houses: updatedHouses });
//   };

//   const handleTeamChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   if (!data) {
//     return (
//       <div className="container">
//         <h2>Admin Dashboard</h2>
//         <p>No score data available. Please add a score document.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <h2>Admin Dashboard</h2>
//       <div className="score-boxes">
//         <div className="score-box red">
//           <h2>RED</h2>
//           <div className="score">{redTotal}</div>
//         </div>
//         <div className="score-box white">
//           <h2>WHITE</h2>
//           <div className="score">{whiteTotal}</div>
//         </div>
//       </div>
//       <div className="updated-date" style={{ textAlign: "right" }}>
//         <button className="edit-button" onClick={openModal} title="Edit Scores">
//           ✏️
//         </button>
//       </div>
//       <h3>Current Winning House</h3>
//       <div className="houses-container">
//         {data.houses &&
//           data.houses.map((house, idx) => (
//             <div key={idx} className="house-item">
//               <div className="house-rank">{idx + 1}</div>
//               <div className="house-name">{house.name}</div>
//               <div className="house-score">{house.score}</div>
//             </div>
//           ))}
//       </div>

//       {showModal && (
//         <div className="popup-overlay">
//           <div className="popup-content">
//             <h3>Edit Scores</h3>
//             <div className="modal-form">
//               <label>
//                 Red:
//                 <input
//                   type="number"
//                   name="red"
//                   value={form.red}
//                   onChange={handleTeamChange}
//                 />
//               </label>
//               <label>
//                 White:
//                 <input
//                   type="number"
//                   name="white"
//                   value={form.white}
//                   onChange={handleTeamChange}
//                 />
//               </label>
//               <h4>House Scores</h4>
//               {form.houses.map((house, idx) => (
//                 <div key={idx} className="house-edit-row">
//                   <label>{house.name}:</label>
//                   <input
//                     type="number"
//                     value={house.score}
//                     onChange={(e) => handleHouseChange(idx, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="modal-buttons">
//               <button onClick={closeModal} className="cancel-btn">
//                 Cancel
//               </button>
//               <button onClick={handleSave} className="save-btn">
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { ref, onValue, set } from "firebase/database";
import "../index.css";

const redDorms = ["West House", "Village Girls", "Village Boys", "Dinning"];

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    red: 0,
    white: 0,
    houses: [],
  });

  // Fetch data from Realtime Database
  useEffect(() => {
    const scoresRef = ref(db, "scores");
    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setData(data);
      }
    });
  }, []);

  // Compute team totals dynamically from houses array
  const computeTotals = (houses) => {
    let redTotal = 0;
    let whiteTotal = 0;
    houses.forEach((house) => {
      if (redDorms.includes(house.name)) {
        redTotal += Number(house.score);
      } else {
        whiteTotal += Number(house.score);
      }
    });
    return { redTotal, whiteTotal };
  };

  // Use form state when modal is open, otherwise use database data
  const currentHouses = showModal ? form.houses : data?.houses || [];
  const { redTotal, whiteTotal } = computeTotals(currentHouses);

  // Open modal and copy current data
  const openModal = () => {
    if (!data) return;
    const sortedHouses = data.houses
      ? data.houses.slice().sort((a, b) => b.score - a.score)
      : [];
    setForm({
      red: redTotal, // using computed totals
      white: whiteTotal,
      houses: sortedHouses,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Save the changes to Realtime Database
  const handleSave = async () => {
    try {
      await set(ref(db, "scores"), {
        red: form.red,
        white: form.white,
        houses: form.houses,
      });
      setShowModal(false);
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  const handleHouseChange = (index, value) => {
    const updatedHouses = [...form.houses];
    updatedHouses[index].score = Number(value);
    setForm({ ...form, houses: updatedHouses });
  };

  const handleTeamChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!data) {
    return (
      <div className="container">
        <h2>Admin Dashboard</h2>
        <p>No score data available. Please add a score document.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
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
      <div className="updated-date" style={{ textAlign: "right" }}>
        <button className="edit-button" onClick={openModal} title="Edit Scores">
          ✏️
        </button>
      </div>
      <h3>Current Winning House</h3>
      <div className="houses-container">
        {data.houses &&
          data.houses.map((house, idx) => (
            <div key={idx} className="house-item">
              <div className="house-rank">{idx + 1}</div>
              <div className="house-name">{house.name}</div>
              <div className="house-score">{house.score}</div>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Edit Scores</h3>
            <div className="modal-form">
              <label>
                Red:
                <input
                  type="number"
                  name="red"
                  value={form.red}
                  onChange={handleTeamChange}
                />
              </label>
              <label>
                White:
                <input
                  type="number"
                  name="white"
                  value={form.white}
                  onChange={handleTeamChange}
                />
              </label>
              <h4>House Scores</h4>
              {form.houses.map((house, idx) => (
                <div key={idx} className="house-edit-row">
                  <label>{house.name}:</label>
                  <input
                    type="number"
                    value={house.score}
                    onChange={(e) => handleHouseChange(idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
