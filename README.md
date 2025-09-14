# Prototipo de Intranet NUAM para Corredores

**IMPORTANTE:** Este proyecto es un prototipo visual y no funcional (maqueta). Su único propósito es demostrar la interfaz de usuario (UI) y la experiencia de usuario (UX) de una posible aplicación real. No contiene lógica de negocio, conexión a bases de datos ni autenticación real.

## 1. Objetivo del Proyecto

El objetivo de este prototipo es presentar una propuesta de diseño para la intranet del holding regional NUAM (integración de las bolsas de Santiago, Lima y Colombia). La plataforma está diseñada para que los corredores puedan gestionar calificaciones tributarias, cargar información masivamente, generar reportes y configurar sus preferencias de manera centralizada y eficiente.

## 2. Tecnologías Utilizadas

Este prototipo fue desarrollado utilizando tecnologías web modernas para garantizar una experiencia fluida y escalable.

- **[Next.js](https://nextjs.org/)**: Framework de React para construir aplicaciones web renderizadas en el servidor y estáticas.
- **[React](https://react.dev/)**: Biblioteca de JavaScript para construir interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático para un desarrollo más robusto.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS "utility-first" para un diseño rápido y personalizable.

## 3. Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación Next.js con el App Router. Los archivos más relevantes se encuentran en el directorio `src/app`:

```
.
└── src/
    └── app/
        ├── dashboard/                # Contiene la lógica y componentes del panel principal
        │   ├── components/           # Componentes reutilizables del dashboard (secciones, etc.)
        │   │   ├── OverviewSection.tsx
        │   │   ├── QualificationsSection.tsx
        │   │   ├── ... (otras secciones)
        │   │   └── types.ts          # Definiciones de tipos de TypeScript para el dashboard
        │   ├── layout.tsx            # Layout específico para el dashboard
        │   └── page.tsx              # Página principal del dashboard
        ├── login/                    # Página de inicio de sesión
        │   └── page.tsx
        ├── globals.css               # Estilos globales
        ├── layout.tsx                # Layout raíz de la aplicación
        └── page.tsx                  # Página de inicio (landing page)
```

## 4. Cómo Iniciar el Prototipo

Para ejecutar el proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Una vez ejecutado, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el prototipo en acción.

## 5. Funcionalidades Implementadas (Maqueta)

El prototipo incluye las siguientes vistas y funcionalidades a nivel de interfaz:

- **Landing Page**: Página de presentación del sistema.
- **Login**: Formulario de inicio de sesión simulado (acepta cualquier credencial).
- **Dashboard**:
    - **Resumen General**: Vista principal con accesos rápidos y actividad reciente.
    - **Calificaciones**: Visualización de datos de ejemplo con búsqueda y paginación.
    - **Carga Masiva**: Interfaz para arrastrar y soltar archivos con previsualización simulada.
    - **Reportes**: Selección de tipos de reportes con filtros.
    - **Configuración**: Opciones para personalizar la experiencia del usuario.

---
*CobreTech, cualquier uso sin los debidos créditos a los propietarios del prototipo es ilegal.*
