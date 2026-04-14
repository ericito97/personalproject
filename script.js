// Función para inicializar la app
function initApp() {
    const database = window.database;
    const ref = window.ref;
    const set = window.set;
    const onValue = window.onValue;

    if (!database) {
        console.error("Firebase no cargado");
        return;
    }

    // Referencia a la base de datos
    const menuRef = database.ref('menu');

    // Estado inicial si no existe
    const initialState = {
        plato1: false,
        plato2: false,
        plato3: false,
        plato4: false
    };

    // Función para revelar plato
    window.revelarPlato = function(numero) {
        console.log("Revelando plato", numero);
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
    };

    // Función para actualizar la vista basada en el estado
    function actualizarVista(state) {
        console.log("Actualizando vista", state);
        for (let i = 1; i <= 4; i++) {
            const plato = document.getElementById('plato' + i);
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

    // Polling cada 5 segundos
    function pollUpdates() {
        menuRef.on('value', (snapshot) => {
            const data = snapshot.val() || initialState;
            actualizarVista(data);
        });
    }

    // Iniciar polling
    pollUpdates();

    // Animación CSS
    const style = document.createElement('style');
    style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
    document.head.appendChild(style);
}

// Llamar initApp cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});