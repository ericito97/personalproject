## 🍽️ Cena Romántica - Menú Interactivo

Página web para revelar platos de forma automática en tiempo real entre dos dispositivos durante tu cita romántica.

### ✨ Características

- ✅ Revela platos desde tu móvil
- ✅ Tu novia ve los platos aparecer automáticamente sin refrescar
- ✅ Sincronización en tiempo real cada 5 segundos
- ✅ Completamente gratis y local

### 🚀 Cómo usar

#### Opción 1: Local (en tu casa)

1. **Instala Flask** (solo la primera vez):
   ```bash
   pip3 install flask flask-cors
   ```

2. **Corre el servidor** (desde la carpeta del proyecto):
   ```bash
   python3 server.py
   ```
   Verás esto:
   ```
   🍽️  Servidor de Cena Romántica corriendo
   Local: http://localhost:5000
   Red local: http://192.168.x.x:5000
   ```

3. **Abre en DOS dispositivos** dentro de la MISMA red wifi:
   - En tu PC/móvil (tú): `http://192.168.x.x:5000` (reemplaza x.x con lo que diga el servidor)
   - En el dispositivo de tu novia: `http://192.168.x.x:5000`

4. **¡Listo!** Haz clic en los botones de tu lado, y ella verá los platos aparecer automáticamente en 5 segundos.

#### Opción 2: Online (Netlify)

1. Sube una versión sin servidor a Netlify (actual, sin `server.py`)
2. Pero necesitarás un backend online (Firebase, Supabase, etc.)

### 📝 Archivos

- `index.html` - Página web
- `styles.css` - Estilos
- `script.js` - Lógica JavaScript
- `server.py` - Servidor Python (sincroniza datos entre dispositivos)

### 🐛 Problemas

- **"Error: ¿Está corriendo el servidor?"** → Abre otra terminal y corre `python3 server.py`
- **"Cannot GET /192.168.x.x:5000"** → Asegúrate de usar `http://` (no `https://`)
- **El otro dispositivo no ve cambios** → Están en la misma wifi, ¿verdad?

### 💡 Tips

- Prueba primero en DOS pestañas del MISMO navegador
- La sincronización es cada 5 segundos (editable en `script.js`)
- Para volver a empezar, mata el servidor (Ctrl+C) y vuelve a correr

¡Éxito en tu cita! 🎉❤️