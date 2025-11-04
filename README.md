# Prototipo de Intranet NUAM para Corredores

**ACTUALIZACIÓN:** Sistema **100% funcional** con:
- ✅ **Autenticación completa** con Firebase Auth (registro, login, recuperación de contraseña)
- ✅ **Carga masiva optimizada** con validación, procesamiento CSV/Excel y Firestore
- ✅ **Dashboard con estadísticas en tiempo real** desde Firestore

Este proyecto es un prototipo funcional de la intranet NUAM (holding regional de bolsas de Santiago, Lima y Colombia) que implementa autenticación, gestión de usuarios y carga masiva de calificaciones tributarias con backend completo en Firebase.

## 1. Objetivo del Proyecto

El objetivo de este prototipo es presentar una propuesta de diseño para la intranet del holding regional NUAM (integración de las bolsas de Santiago, Lima y Colombia). La plataforma está diseñada para que los corredores puedan gestionar calificaciones tributarias, cargar información masivamente, generar reportes y configurar sus preferencias de manera centralizada y eficiente.

## 2. Tecnologías Utilizadas

Este prototipo fue desarrollado utilizando tecnologías web modernas para garantizar una experiencia fluida y escalable.

- **[Next.js](https://nextjs.org/)**: Framework de React para construir aplicaciones web renderizadas en el servidor y estáticas.
- **[React](https://react.dev/)**: Biblioteca de JavaScript para construir interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático para un desarrollo más robusto.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS "utility-first" para un diseño rápido y personalizable.
- **[Firebase Authentication](https://firebase.google.com/products/auth)**: Sistema de autenticación completo con email/contraseña.
- **[Firebase Firestore](https://firebase.google.com/products/firestore)**: Base de datos NoSQL en tiempo real para almacenamiento de datos.
- **[PapaParse](https://www.papaparse.com/)**: Procesamiento de archivos CSV.
- **[SheetJS (xlsx)](https://sheetjs.com/)**: Procesamiento de archivos Excel.
- **[Framer Motion](https://www.framer.com/motion/)**: Animaciones y transiciones fluidas.

## 3. Estructura del Proyecto

El proyecto sigue la estructura estándar de una aplicación Next.js con el App Router. Los archivos más relevantes se encuentran en el directorio `src/app`:

```
.
└── src/
    └── app/
        ├── components/               # Componentes globales reutilizables
        │   └── RegisterModal.tsx     # Modal de registro de usuarios
        ├── dashboard/                # Panel principal de la aplicación
        │   ├── components/           # Componentes del dashboard
        │   │   ├── OverviewSection.tsx
        │   │   ├── QualificationsSection.tsx
        │   │   ├── UploadSection.tsx # Módulo de carga masiva (100% funcional)
        │   │   ├── ReportsSection.tsx
        │   │   ├── SettingsSection.tsx
        │   │   └── types.ts          # Definiciones de tipos TypeScript
        │   ├── layout.tsx            # Layout del dashboard
        │   └── page.tsx              # Página principal del dashboard
        ├── firebase/                 # Configuración de Firebase
        │   └── config.ts             # Inicialización de Auth y Firestore
        ├── login/                    # Autenticación (100% funcional)
        │   └── page.tsx              # Login con Firebase Auth
        ├── services/                 # Servicios de backend
        │   ├── firestoreService.ts   # CRUD y carga masiva optimizada
        │   ├── fileProcessingService.ts # Procesamiento CSV/Excel
        │   └── validationService.ts  # Validación de datos tributarios
        ├── utils/                    # Utilidades
        │   └── paths.ts              # Rutas de assets
        ├── globals.css               # Estilos globales
        ├── layout.tsx                # Layout raíz
        └── page.tsx                  # Landing page
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

### Probar el Sistema de Autenticación

1. **Registrar un nuevo usuario:**
   - Ve a [http://localhost:3000/login](http://localhost:3000/login)
   - Haz clic en "Registrarse"
   - Completa el formulario con:
     - Nombre y Apellido
     - RUT chileno válido (ej: `12345678-9` con DV correcto)
     - Email y contraseña (mínimo 6 caracteres)
     - Rol: Corredor o Administrador
   - La cuenta se crea automáticamente en Firebase Auth y Firestore

2. **Iniciar sesión:**
   - Usa las credenciales creadas
   - Accede al dashboard personalizado según tu rol

3. **Recuperar contraseña:**
   - Click en "¿Olvidaste tu contraseña?"
   - Ingresa tu email
   - Recibirás un correo de Firebase para restablecer

## 5. Funcionalidades Implementadas

### 🟢 Funcionalidad Completa (Backend + Frontend)

#### **Sistema de Autenticación** - 100% Funcional ✅

Sistema completo de autenticación y gestión de usuarios con Firebase Auth:

**Características Implementadas:**
- ✅ **Registro de usuarios** con Firebase Auth
- ✅ **Inicio de sesión** con email y contraseña
- ✅ **Recuperación de contraseña** via email
- ✅ **Registro en colección `users`** de Firestore con:
  - Nombre, Apellido, RUT (validado)
  - Email, Rol (Corredor/Administrador)
  - Timestamp de creación
- ✅ **Validación de RUT chileno** con dígito verificador
- ✅ **Manejo de errores** con mensajes amigables

**Flujo de Usuario:**
1. Usuario puede registrarse desde el modal de registro
2. Datos se guardan en Firebase Auth y Firestore
3. Usuario puede iniciar sesión con sus credenciales
4. Acceso al dashboard según su rol
5. Opción de recuperar contraseña olvidada

---

#### **Módulo de Carga Masiva** - 100% Funcional ✅

El módulo de carga masiva implementa todos los requisitos funcionales y no funcionales:

**Características Principales:**
- ✅ **RF-01**: Carga masiva de archivos CSV y Excel con validación
- ✅ **RF-02**: Resumen detallado con registros nuevos, actualizados y errores
- ✅ **RF-03**: Validación automática de factores (suma F8-F19 ≤ 100%)
- ✅ **RF-10**: Segregación de datos por corredor
- ✅ **RNF-04**: Procesa hasta 5,000 registros en menos de 2 minutos

**Funcionalidades:**
- ✅ Procesamiento real de archivos CSV/XLSX
- ✅ Validación de datos con reglas de negocio
- ✅ Detección y actualización de duplicados
- ✅ Guardado en Firestore con operaciones por lotes optimizadas
- ✅ **Barra de progreso en tiempo real** con velocidad y tiempo estimado
- ✅ **Exportar errores a CSV** para corrección fácil
- ✅ **Recarga automática de estadísticas** del dashboard
- ✅ Vista previa completa con scroll (hasta 5,000 filas)
- ✅ Selector de plantillas (Normal, Con Errores, 5,000 registros)
- ✅ Resumen detallado de errores y éxitos

📖 **[Ver documentación completa del módulo](./CARGA_MASIVA.md)**

---

#### **Dashboard con Estadísticas Reales** - 100% Funcional ✅

Dashboard principal con datos en tiempo real desde Firestore:

**Estadísticas Dinámicas:**
- ✅ **Calificaciones Activas**: Total real de registros del corredor
- ✅ **Factores Validados**: Registros con suma de factores ≤ 100%
- ✅ **Reportes Generados**: Calculado automáticamente
- ✅ **Tasa de Éxito**: Porcentaje real de validaciones exitosas
- ✅ **Actualización automática** después de cada carga masiva

---

### 🟡 Funcionalidades de Maqueta (Solo UI)

El resto del prototipo incluye las siguientes vistas a nivel de interfaz:

- **Landing Page**: Página de presentación del sistema.
- **Dashboard**:
    - **Resumen General**: Vista principal con accesos rápidos y actividad reciente.
    - **Calificaciones**: Visualización de datos de ejemplo con búsqueda y paginación.
    - **Reportes**: Selección de tipos de reportes con filtros.
    - **Configuración**: Opciones para personalizar la experiencia del usuario.

---
*CobreTech, cualquier uso sin los debidos créditos a los propietarios del prototipo es ilegal.*
