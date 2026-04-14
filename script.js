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

// Contraseña del admin (cámbiala por lo que quieras)
const ADMIN_PASSWORD = "amor2026";

let isAdmin = localStorage.getItem('adminSesion') === 'true';

// Función para toggle del panel de login
function toggleLoginPanel() {
    const loginPanel = document.getElementById('login-panel');
    loginPanel.classList.toggle('oculto-login');
    if (!loginPanel.classList.contains('oculto-login')) {
        document.getElementById('password-input').focus();
    }
}

// Función para abrir sesión de admin
function abrirAdmin() {
    const password = document.getElementById('password-input').value;
    if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('adminSesion', 'true');
        actualizarUI();
        document.getElementById('password-input').value = '';
        toggleLoginPanel(); // Cerrar el panel automáticamente
        console.log("✅ Admin activo");
    } else {
        alert("❌ Contraseña incorrecta");
    }
}

// Función para cerrar sesión de admin
function cerrarAdmin() {
    isAdmin = false;
    localStorage.removeItem('adminSesion');
    actualizarUI();
    console.log("❌ Admin cerrado");
}

// Actualizar UI según el rol
function actualizarUI() {
    const loginPanel = document.getElementById('login-panel');
    const adminPanel = document.getElementById('admin-panel');
    const botonesAdmin = document.querySelectorAll('.admin-only');
    
    if (isAdmin) {
        adminPanel.classList.remove('oculto-panel');
        botonesAdmin.forEach(btn => btn.classList.remove('oculto-boton'));
    } else {
        adminPanel.classList.add('oculto-panel');
        botonesAdmin.forEach(btn => btn.classList.add('oculto-boton'));
    }
}

// Función para revelar un plato (solo admin)
function revelarPlato(numero) {
    if (!isAdmin) {
        alert("Solo el admin puede revelar platos");
        return;
    }
    
    console.log("Revelando plato", numero);
    menuRef.once('value', (snapshot) => {
        const datos = snapshot.val() || estadoInicial;
 

// Función para ocultar un plato (solo admin)
function ocultarPlato(numero) {
    if (!isAdmin) {
        alert("Solo el admin puede ocultar platos");
        return;
    }
    
    console.log("Ocultando plato", numero);
    menuRef.once('value', (snapshot) => {
        const datos = snapshot.val() || estadoInicial;
        datos['plato' + numero] = false;
        menuRef.set(datos).then(() => {
            console.log("Plato " + numero + " ocultado en Firebase");
        }).catch((error) => {
            console.error("Error al ocultar plato:", error);
            alert("Error: Revisa la conexión a Firebase");
        });
    });
}       datos['plato' + numero] = true;
        menuRef.set(datos).then(() => {
            console.log("Plato " + numero + " revelado en Firebase");
        }).catch((error) => {
            console.error("Error al revelar plato:", error);
            alert("Error: Revisa la conexión a Firebase");
        });
    });
}

// Escuchar cambios en tiempo real
menuRef.on('value', (snapshot) => {
    const datos = snapshot.val() || estadoInicial;
    console.log("Actualizando vista con datos:", datos);
    
    for (let i = 1; i <= 4; i++) {
        const plato = document.getElementById('plato' + i);
        
        if (datos['plato' + i]) {
            // Revelar
            plato.classList.remove('oculto');
            plato.classList.add('revelado');
        } else {
            // Ocultar
            plato.classList.add('oculto');
            plato.classList.remove('revelado');
        }
    }
}, (error) => {
    console.error("Error al conectar con Firebase:", error);
});

// Inicializar UI cuando la página carga
window.addEventListener('DOMContentLoaded', function() {
    actualizarUI();
});