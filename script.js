// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBKFqxrgtq5qhIC_SvSbo0uxwusHJIOYms",
    authDomain: "cenaromantica-be399.firebaseapp.com",
    databaseURL: "https://cenaromantica-be399-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cenaromantica-be399",
    storageBucket: "cenaromantica-be399.firebasestorage.app",
    messagingSenderId: "836185016239",
    appId: "1:836185016239:web:1bd481bca8fb142015915a"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const menuRef = db.ref('menu');

const estadoInicial = {
    plato1: false,
    plato2: false,
    plato3: false,
    plato4: false
};

// Función para revelar un plato
function revelarPlato(numero) {
    console.log("Revelando plato", numero);
    menuRef.once('value', (snapshot) => {
        const datos = snapshot.val() || estadoInicial;
        datos['plato' + numero] = true;
        menuRef.set(datos).then(() => {
            console.log("Plato " + numero + " revelado en Firebase");
        }).catch((error) => {
            console.error("Error al revelar plato:", error);
            alert("Error: Revisa la conexión a Firebase o las reglas de seguridad");
        });
    });
}

// Escuchar cambios en tiempo real
menuRef.on('value', (snapshot) => {
    const datos = snapshot.val() || estadoInicial;
    console.log("Actualizando vista con datos:", datos);
    
    for (let i = 1; i <= 4; i++) {
        const plato = document.getElementById('plato' + i);
        const boton = plato.querySelector('button');
        
        if (datos['plato' + i]) {
            // Revelar
            plato.classList.remove('oculto');
            plato.classList.add('revelado');
            if (boton) boton.style.display = 'none';
        } else {
            // Ocultar
            plato.classList.add('oculto');
            plato.classList.remove('revelado');
            if (boton) boton.style.display = 'block';
        }
    }
}, (error) => {
    console.error("Error al conectar con Firebase:", error);
});