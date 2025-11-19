# CRM Ventas - Sistema de Gestión de Relaciones con Clientes

Un CRM completo y moderno para gestionar ventas, contactos, oportunidades y actividades, desarrollado con React, TypeScript y Tailwind CSS.

## Características Principales

### Dashboard Interactivo
- Métricas clave de rendimiento
- Visualización del pipeline de ventas
- Actividades recientes y próximas tareas
- Indicadores de conversión y ingresos

### Gestión de Contactos
- Registro completo de clientes y prospectos
- Información detallada: nombre, empresa, email, teléfono, cargo
- Sistema de etiquetas para categorización
- Historial de último contacto
- Búsqueda y filtrado avanzado

### Pipeline de Ventas
- Seguimiento de oportunidades en múltiples etapas:
  - Lead
  - Calificado
  - Propuesta
  - Negociación
  - Ganada/Perdida
- Valor económico y probabilidad de cierre
- Productos/servicios asociados
- Fechas esperadas de cierre
- Filtrado por etapa

### Actividades y Tareas
- Gestión de llamadas, emails, reuniones y tareas
- Sistema de prioridades (Alta, Media, Baja)
- Fechas de vencimiento con alertas
- Vinculación con contactos y oportunidades
- Estados: Pendiente, Completada, Cancelada
- Notificaciones de tareas vencidas

### Persistencia de Datos
- Almacenamiento local con localStorage
- Los datos se mantienen entre sesiones
- Datos de ejemplo incluidos para comenzar rápidamente

## Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Iconos modernos
- **date-fns** - Manejo de fechas

## Instalación

### Requisitos Previos
- Node.js 16+
- npm o yarn

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd crm-ventas
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir el navegador en `http://localhost:3000`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta el linter

## Estructura del Proyecto

```
crm-ventas/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Activities/      # Módulo de actividades
│   │   ├── Contacts/        # Módulo de contactos
│   │   ├── Dashboard/       # Dashboard y métricas
│   │   ├── Deals/          # Pipeline de ventas
│   │   ├── Layout/         # Layout y navegación
│   │   └── UI/             # Componentes UI reutilizables
│   ├── hooks/              # Custom hooks
│   ├── types/              # Definiciones TypeScript
│   ├── utils/              # Utilidades y helpers
│   ├── App.tsx             # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── public/                 # Archivos estáticos
├── index.html             # HTML principal
├── package.json           # Dependencias
├── tsconfig.json          # Configuración TypeScript
├── tailwind.config.js     # Configuración Tailwind
└── vite.config.ts         # Configuración Vite
```

## Guía de Uso

### Contactos
1. Haz clic en "Nuevo Contacto" para agregar un cliente
2. Completa la información requerida (nombre, email, empresa)
3. Agrega etiquetas para categorizar (separadas por comas)
4. Usa la barra de búsqueda para encontrar contactos

### Oportunidades
1. Crea una nueva oportunidad desde "Nueva Oportunidad"
2. Asocia la oportunidad con un contacto existente
3. Define el valor económico y probabilidad de cierre
4. Mueve la oportunidad por las etapas según avance
5. Filtra por etapa para ver el estado del pipeline

### Actividades
1. Crea tareas, llamadas, reuniones, etc.
2. Asigna prioridades y fechas de vencimiento
3. Vincula actividades con contactos y oportunidades
4. Marca como completadas cuando termines
5. Las tareas vencidas se destacan automáticamente

### Dashboard
- Visualiza métricas clave en tiempo real
- Revisa el pipeline de ventas
- Consulta próximas tareas y actividad reciente
- Monitorea tasas de conversión e ingresos

## Características Técnicas

### Gestión de Estado
- Estado local con React hooks (useState)
- Persistencia automática en localStorage
- Sincronización entre componentes

### Diseño Responsivo
- Adaptado para desktop, tablet y móvil
- Grid system flexible
- Componentes optimizados para todas las pantallas

### Experiencia de Usuario
- Interfaz intuitiva y moderna
- Feedback visual en todas las acciones
- Confirmaciones para acciones destructivas
- Estados vacíos informativos

## Datos de Ejemplo

Al iniciar por primera vez, la aplicación carga datos de ejemplo que incluyen:
- 3 contactos de muestra
- 3 oportunidades en diferentes etapas
- 4 actividades con diferentes prioridades

Estos datos te permiten explorar todas las funcionalidades inmediatamente.

## Próximas Mejoras

- [ ] Exportación de datos a CSV/Excel
- [ ] Gráficos y reportes avanzados
- [ ] Filtros y búsqueda más potentes
- [ ] Autenticación y multi-usuario
- [ ] Backend con API REST
- [ ] Notificaciones push
- [ ] Integración con email
- [ ] App móvil nativa

## Personalización

### Cambiar Colores
Edita `tailwind.config.js` para modificar la paleta de colores:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores aquí
      },
    },
  },
}
```

### Agregar Campos Personalizados
Modifica los tipos en `src/types/index.ts` y actualiza los formularios correspondientes.

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades, abre un issue en el repositorio.

## Licencia

MIT License - Siéntete libre de usar este proyecto para tus necesidades.

---

Desarrollado con ❤️ para ayudarte a gestionar mejor tus ventas
