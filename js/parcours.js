  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDh1MNL0RYp8Dk-UoDoqf0sSdS84AhRXHk",
    authDomain: "said-mutheke.firebaseapp.com",
    projectId: "said-mutheke",
    storageBucket: "said-mutheke.appspot.com",
    messagingSenderId: "378853548599",
    appId: "1:378853548599:web:701a11d4f8a9cd6b1d95b2"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const listeProjets = document.getElementById('liste-projets');

async function chargerProjets() {
  try {
    const colRef = collection(db, "projects");
  //  const snapshot = await getDocs(colRef);  
    const q = query(colRef, orderBy("date", "desc"));
const snapshot = await getDocs(q);
    if (snapshot.empty) {
      listeProjets.innerHTML = "<p>Aucun projet trouvé.</p>";
      return;
    }

    listeProjets.innerHTML = "";
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <h3>${data.titre || "Titre manquant"}</h3>
        <p>${data.synopsis || "N/A"}</p>
        <p><strong>Note : </strong> ${data.note || "N/A"}</p>
        <p><em>Date : ${data.date ? (data.date.toDate ? data.date.toDate().toLocaleDateString() : new Date(data.date).toLocaleDateString()) : "Date non définie"}</em></p>
      `;
      listeProjets.appendChild(div);
    });
  } catch (err) {
    alert("Erreur chargerProjets:", err.message);
    listeProjets.innerHTML = `<p>Erreur : ${err.message}</p>`;
  }
}

chargerProjets();
