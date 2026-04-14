// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBKFqxrgtq5qhIC_SvSbo0uxwusHJIOYms",
    authDomain: "cenaromantica-be399.firebaseapp.com",
    databaseURL: "https://cenaromantica-be399-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cenaromantica-be399",
    storageBucket: "cenaromantica-be399.appspot.com",
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

// Contenido de los platos (solo visible cuando se revelan)
const contenidoPlatos = {
    plato1: `
        <div class="card-header">
            <h3>Aperitivos Especiales</h3>
            <span class="card-price">Para compartir</span>
        </div>
        <p class="card-description">Una selección pensada para abrir el apetito y disfrutar a dos.</p>
        <ul class="card-list">
            <li>Gulas con paprika</li>
            <li>Queso Provolone</li>
            <li>Tartaletas de bacon y huevo de codorniz</li>
            <li>Pincho japonés de huevos de codorniz</li>
        </ul>
        <p>Estos aperitivos serán visibles cuando el chef los revele. Prepárate para compartir un momento delicioso.</p>
    `,
    plato2: `
        <div class="card-header">
            <h3>Entrecot con Salsa a la Pimienta</h3>
            <span class="card-price">Menú principal</span>
        </div>
        <p class="card-description">Jugoso entrecot acompañado de puré de patata casero y salsa cremosa de pimienta.</p>
        <p>El primer plato se mostrará aquí cuando esté listo. Un toque clásico con cariño.</p>
    `,
    plato3: `
        <div class="card-header">
            <h3>Galletas de Chocolate Blanco</h3>
            <span class="card-price">Final suave</span>
        </div>
        <p class="card-description">Galletas crujientes rellenas de chocolate blanco y mermelada, perfectas para compartir.</p>
        <p>Un postre delicado que aparecerá en el momento justo para endulzar la noche.</p>
    `,
    plato4: `
        <div class="card-header">
            <h3>Brindis Romántico</h3>
            <span class="card-price">Toque final</span>
        </div>
        <p class="card-description">Una copa y una promesa para cerrar la noche con una sonrisa.</p>
        <p>La sorpresa final aparecerá cuando llegue el momento más especial de la cena.</p>
    `
};

// Contraseña del admin (cámbiala por lo que quieras)
const ADMIN_PASSWORD = "linuxlinux";

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
        if (!document.getElementById('login-panel').classList.contains('oculto-login')) {
            toggleLoginPanel();
        }
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

    menuRef.once('value', (snapshot) => {
        const datos = snapshot.val() || estadoInicial;
        datos['plato' + numero] = true;
        menuRef.set(datos).then(() => {
            console.log("Plato " + numero + " revelado en Firebase");
        }).catch((error) => {
            console.error("Error al revelar plato:", error);
            alert("Error: Revisa la conexión a Firebase");
        });
    });
}

// Función para ocultar un plato (solo admin)
function ocultarPlato(numero) {
    if (!isAdmin) {
        alert("Solo el admin puede ocultar platos");
        return;
    }

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
}

// Escuchar cambios en tiempo real
menuRef.on('value', (snapshot) => {
    const datos = snapshot.val() || estadoInicial;
    console.log("Actualizando vista con datos:", datos);

    for (let i = 1; i <= 4; i++) {
        const plato = document.getElementById('plato' + i);
        
        if (datos['plato' + i]) {
            // Revelar: agregar contenido y mostrar
            plato.innerHTML = contenidoPlatos['plato' + i];
            plato.classList.remove('oculto');
            plato.classList.add('revelado');
        } else {
            // Ocultar: limpiar contenido y ocultar
            plato.innerHTML = '';
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
