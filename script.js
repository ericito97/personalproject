// Configuración del servidor
// Usa URLs relativas para que funcione en localhost, 192.168.x.x, etc.
const API_URL = '/api';

const initialState = {
    plato1: false,
    plato2: false,
    plato3: false,
    plato4: false
};

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log("Conectando al servidor...");
    // Iniciar polling
    pollUpdates();
    // Polling cada 5 segundos
    setInterval(pollUpdates, 5000);
});

function revelarPlato(numero) {
    console.log("Revelando plato", numero);
    
    // Enviar petición al servidor
    fetch(`${API_URL}/revelar/${numero}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Actualizado en servidor:", data);
        actualizarVista(data);
    })
    .catch(error => {
        console.error("Error al revelar plato:", error);
        alert("Error: ¿Está corriendo el servidor? python3 server.py");
    });
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
    fetch(`${API_URL}/estado`)
    .then(response => response.json())
    .then(data => {
        actualizarVista(data);
    })
    .catch(error => {
        console.error("Error al conectar con servidor:", error);
    });
}