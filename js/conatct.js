  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDh1MNL0RYp8Dk-UoDoqf0sSdS84AhRXHk",
    authDomain: "said-mutheke.firebaseapp.com",
    projectId: "said-mutheke",
    storageBucket: "said-mutheke.firebasestorage.app",
    messagingSenderId: "378853548599",
    appId: "1:378853548599:web:701a11d4f8a9cd6b1d95b2",
    measurementId: "G-GDFYW6PTBD"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // empêche l'envoi HTML

    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      await addDoc(collection(db, "messages"), {
        nom,
        email,
        message,
        date: new Date()
      });

      alert("Message envoyé !");
      form.reset();
    } catch (err) {
      alert("Erreur lors de l'envoi !");
      console.error(err);
    }
  });