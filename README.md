# Cibra Calculator - Contact Page

Una página de contacto moderna y responsive para Cibra Calculator.

## 🚀 Inicio Rápido

### Opción 1: Versión Standalone (Sin instalación)
**¿Quieres usarlo YA?** Abre `standalone/contact.html` en tu navegador. ¡Listo! No necesitas instalar nada.

👉 **[Ver instrucciones de la versión standalone](standalone/README.md)**

### Opción 2: Versión React (Desarrollo)
Si quieres personalizar o integrar con React:

```bash
npm install
npm start
```

## Características

- **Diseño moderno y atractivo**: Gradientes modernos, animaciones suaves y diseño responsive
- **Formulario con validación**: Validación en tiempo real de todos los campos
- **Experiencia de usuario mejorada**:
  - Animaciones de entrada suaves
  - Feedback visual inmediato
  - Estados de carga y éxito
  - Accesibilidad mejorada
- **Completamente responsive**: Se adapta a dispositivos móviles, tablets y desktop
- **Información de contacto**: Muestra email, teléfono, ubicación y horario de atención

## Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# Compilar para producción
npm run build
```

## Estructura del Proyecto

```
cibra-calculator-contact/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Contact.js      # Componente principal
│   │   └── Contact.css     # Estilos del componente
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Mejoras sobre la versión anterior

1. **Diseño visual mejorado**: Gradientes modernos, sombras suaves y tipografía profesional
2. **Validación robusta**: Validación de email, teléfono y campos requeridos
3. **Animaciones**: Transiciones suaves y animaciones de entrada
4. **Responsive**: Funciona perfectamente en todos los tamaños de pantalla
5. **Accesibilidad**: Soporte para navegación por teclado y motion reducido
6. **UX mejorada**: Estados de carga, confirmación visual y mensajes de error claros

## Personalización

Para personalizar la página de contacto, edita:

- `src/components/Contact.js`: Lógica del formulario y estructura
- `src/components/Contact.css`: Estilos y animaciones
- Información de contacto en las secciones `.info-item`

## Tecnologías Utilizadas

- React 18.2
- CSS3 con animaciones y gradientes
- HTML5 semántico
- Formularios con validación en tiempo real

## Licencia

MIT
