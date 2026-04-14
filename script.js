function revelarPlato(numero) {
    const plato = document.getElementById('plato' + numero);
    plato.classList.remove('oculto');
    plato.classList.add('revelado');
    
    // Ocultar el botón después de revelar
    const boton = plato.querySelector('button');
    if (boton) {
        boton.style.display = 'none';
    }
    
    // Animación suave
    plato.style.animation = 'fadeIn 0.5s ease-in-out';
}

// Animación CSS para fadeIn (opcional, pero ya está en CSS)
const style = document.createElement('style');
style.textContent = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(style);