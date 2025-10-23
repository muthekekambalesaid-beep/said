  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDh1MNL0RYp8Dk-UoDoqf0sSdS84AhRXHk",
    authDomain: "said-mutheke.firebaseapp.com",
    projectId: "said-mutheke",
    storageBucket: "said-mutheke.appspot.com",
    messagingSenderId: "378853548599",
    appId: "1:378853548599:web:701a11d4f8a9cd6b1d95b2",
    measurementId: "G-GDFYW6PTBD"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const container = document.querySelector('.portfolio');

  async function loadProjects() {
    try {
      const q = query(collection(db, "portfolio"), orderBy("date", "desc")); // ← Assure-toi que le champ "date" existe
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        const data = doc.data();
        container.innerHTML += `
          <section class="bloc-projet">
            <h2>${data.titre}</h2>
            <p>
              <img src="${data.img}" alt="${data.titre}" class="img-projet">
              <strong>Pitch :</strong>${data.pitch}<br><br>
              <strong>Synopsis :</strong> ${data.synopsis}<br><br>
              <strong>Objectif :</strong>${data.objectif}<br><br>
              <strong>Résultats :</strong> ${data.resultats}<br><br>
              <a href="${data.url}" target="_blank">Lien externe</a>
            </p>
          </section>
        `;
      });
    } catch (e) {
      alert("Erreur de chargement : " + e.message);
    }
  }

  loadProjects();