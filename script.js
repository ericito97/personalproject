// Inicializar cuando Firebase esté listo
let database = null;
let menuRef = null;

const initialState = {
    plato1: false,
    plato2: false,
    plato3: false,
    plato4: false
};

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Firebase debería estar cargado
    if (window.database) {
        database = window.database;
        menuRef = database.ref('menu');
        console.log("Firebase inicializado correctamente");
        
        // Iniciar polling
        pollUpdates();
    } else {
        console.error("Firebase no está disponible");
    }
});

function revelarPlato(numero) {
    console.log("Revelando plato", numero);
    
    if (!menuRef) {
        console.error("menuRef no está inicializado");
        return;
    }
    
    // Actualizar en Firebase
    menuRef.once('value').then((snapshot) => {
        const data = snapshot.val() || initialState;
        data['plato' + numero] = true;
        return menuRef.set(data);
    }).then(() => {
        console.log("Actualizado en Firebase");
    }).catch((error) => {
        console.error("Error al actualizar Firebase:", error);
    });

    // Actualizar localmente inmediatamente
    actualizarVista({ ...initialState, ['plato' + numero]: true });
}

function actualizarVista(state) {
    console.log("Actualizando vista", state);
    for (let i = 1; i <= 4; i++) {
        const plato = document.getElementById('plato' + i);
        if (!plato) continue;
        
        const boton = plato.querySelector('button');
        if (state['plato' + i]) {
            plato.classList.remove('oculto');
            plato.classList.add('revelado');
            if (boton) boton.style.display = 'none';
        } else {
            plato.classList.add('oculto');
            plato.classList.remove('revelado');
            if (boton) boton.style.display = 'block';
        }
    }
}

function pollUpdates() {
    if (!menuRef) return;
    
    menuRef.on('value', (snapshot) => {
        const data = snapshot.val() || initialState;
        actualizarVista(data);
    });
}