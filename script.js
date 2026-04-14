// Esperar a que Firebase se cargue
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.firebaseApp !== 'undefined') {
        initApp();
    } else {
        setTimeout(() => initApp(), 1000); // Esperar 1s por si acaso
    }
});

function initApp() {
    const database = window.database;
    const ref = window.ref;
    const set = window.set;
    const onValue = window.onValue;

    // Referencia a la base de datos
    const menuRef = ref(database, 'menu');

    // Estado inicial si no existe
    const initialState = {
        plato1: false,
        plato2: false,
        plato3: false,
        plato4: false
    };

    // Función para revelar plato
    window.revelarPlato = function(numero) {
        // Actualizar en Firebase
        onValue(menuRef, (snapshot) => {
            const data = snapshot.val() || initialState;
            data['plato' + numero] = true;
            set(menuRef, data);
        }, { onlyOnce: true });

        // Actualizar localmente inmediatamente
        actualizarVista({ ...initialState, ['plato' + numero]: true });
    };

    // Función para actualizar la vista basada en el estado
    function actualizarVista(state) {
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
        onValue(menuRef, (snapshot) => {
            const data = snapshot.val() || initialState;
            actualizarVista(data);
        });
    }

    // Iniciar polling
    pollUpdates();
    setInterval(pollUpdates, 5000); // Cada 5 segundos

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