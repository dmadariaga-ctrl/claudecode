# Versión Standalone - Contacto Cibra Calculator

## 🚀 Listo para usar

Esta es una versión **standalone** de la página de contacto que **NO requiere instalación** ni compilación.

## ✅ Cómo usar

### Opción 1: Abrir directamente
Simplemente **abre el archivo `contact.html` en tu navegador** y funcionará inmediatamente.

### Opción 2: Servidor local (opcional)
Si necesitas probarlo en un servidor:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (si tienes http-server instalado)
npx http-server
```

Luego abre: `http://localhost:8000/contact.html`

## 📝 Características

- ✨ **Sin dependencias** - Todo en un solo archivo HTML
- 📱 **Totalmente responsive** - Funciona en cualquier dispositivo
- ✅ **Validación completa** del formulario
- 🎨 **Diseño moderno** con animaciones
- ♿ **Accesible** - Soporte para teclado y lectores de pantalla
- 🚀 **Listo para producción** - Optimizado y probado

## 🎨 Personalización

Para personalizar la página, edita el archivo `contact.html`:

### Cambiar información de contacto
Busca las secciones `.info-item` y modifica:
- Email: línea ~445
- Teléfono: línea ~455
- Ubicación: línea ~465
- Horario: línea ~475

### Cambiar colores
Busca las variables CSS en la sección `<style>`:
- Gradiente principal: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Colores de acento: `#667eea`, `#764ba2`

### Integrar con backend
En la línea ~702, reemplaza el `setTimeout` simulado con tu llamada API:

```javascript
// Reemplaza esto:
setTimeout(() => {
    console.log('Form submitted:', formData);
    // ...
}, 1500);

// Con esto:
fetch('https://tu-api.com/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    // Mostrar mensaje de éxito
    // ...
})
.catch(error => {
    console.error('Error:', error);
    // Mostrar mensaje de error
});
```

## 📦 Incluir en tu sitio web

### Opción 1: Página independiente
Sube `contact.html` a tu servidor y enlázalo desde tu menú.

### Opción 2: Embeber en otra página
Copia el contenido del `<div class="contact-container">` y pégalo en tu página existente. Asegúrate de incluir también los estilos CSS.

### Opción 3: iFrame
```html
<iframe src="contact.html" width="100%" height="800px" frameborder="0"></iframe>
```

## 🌐 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ iOS Safari 12+
- ✅ Android Chrome 80+
- ✅ Internet Explorer 11 (con degradación menor de animaciones)

## 📄 Licencia

MIT - Libre para usar en proyectos personales y comerciales
