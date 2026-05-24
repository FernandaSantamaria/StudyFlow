# StudyFlow

StudyFlow es una aplicación web académica desarrollada para la materia de Calidad de Software.

La plataforma permite a los estudiantes administrar:

- tareas
- materias
- sesiones de estudio
- flashcards
- metas académicas
- notificaciones
- recursos de apoyo

El proyecto utiliza una arquitectura Full Stack con:

- Frontend en React + TypeScript
- Backend en FastAPI
- PostgreSQL como base de datos relacional
- MongoDB como base de datos no relacional

---

# Arquitectura del proyecto

## Frontend
Tecnologías:

- React
- TypeScript
- TailwindCSS
- React Router DOM
- Vite

Responsabilidades:

- interfaz gráfica
- consumo de APIs REST
- manejo de estado
- navegación

---

## Backend
Tecnologías:

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

Responsabilidades:

- autenticación
- endpoints REST
- conexión a PostgreSQL
- conexión a MongoDB
- lógica de negocio

---

## Base de datos relacional (PostgreSQL)

Tablas implementadas:

1. users
2. tasks
3. subjects
4. task_subjects
5. study_plans
6. schedules
7. enrollments
8. reminders

---

## Base de datos no relacional (MongoDB)

Colecciones implementadas:

1. study_sessions
2. flashcards
3. notifications
4. study_goals
5. resources
6. activity_logs

---

# Instalación del proyecto

## 1. Clonar repositorio

```bash
git clone https://github.com/FernandaSantamaria/StudyFlow.git
```

---

# Frontend

## Entrar a frontend

```bash
cd frontend
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar frontend

```bash
npm run dev
```

Frontend disponible en:

```txt
http://localhost:5173
```

---

# Backend

## Entrar a backend

```bash
cd backend
```

## Crear entorno virtual

### Windows

```bash
python -m venv .venv
```

## Activar entorno virtual

### Windows

```bash
.venv\Scripts\activate
```

## Instalar dependencias

```bash
pip install -r requirements.txt
```

## Ejecutar servidor

```bash
uvicorn app.main:app --reload
```

Backend disponible en:

```txt
http://127.0.0.1:8000
```

---

# Configuración PostgreSQL

Crear una base de datos PostgreSQL llamada:

```txt
studyflow
```

Actualizar las credenciales en:

```txt
app/database/database.py
```

Ejemplo:

```python
DATABASE_URL = "postgresql://postgres:password@localhost/studyflow"
```

---

# Configuración MongoDB

Instalar MongoDB localmente o usar MongoDB Compass.

Actualizar la conexión en:

```txt
app/database/mongodb.py
```

Ejemplo:

```python
MONGO_URL = "mongodb://localhost:27017"
```

---

# Autenticación

La aplicación cuenta con:

- registro de usuarios
- inicio de sesión
- persistencia mediante localStorage

---

# Funcionalidades

## Dashboard
- resumen académico
- métricas rápidas
- tareas recientes

## Tasks
- crear tareas
- eliminar tareas
- marcar completadas

## Subjects
- administrar materias

## Study Sessions
- registrar tiempo de estudio

## Flashcards
- crear tarjetas de estudio

## Notifications
- avisos académicos

## Study Goals
- metas de estudio
- barras de progreso

## Resources
- guardar enlaces y material de apoyo

---

# Pruebas realizadas

- pruebas CRUD
- validación de formularios
- conexión frontend-backend
- conexión PostgreSQL
- conexión MongoDB
- navegación entre vistas
- autenticación

---

# Estructura general

```txt
StudyFlow/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── schemas/
│   ├── models/
│   └── requirements.txt
│
└── README.md
```

---
# Uso de Docker

El proyecto utiliza Docker para facilitar la ejecución y administración de las bases de datos.

Se utilizaron contenedores para:

- PostgreSQL
- MongoDB

Ventajas del uso de Docker:

- entorno reproducible
- instalación simplificada
- aislamiento de servicios
- facilidad de pruebas en diferentes equipos
- configuración rápida para otros desarrolladores

Ejemplo de ejecución:

```bash
docker run --name studyflow-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

```bash
docker run --name studyflow-mongo -p 27017:27017 -d mongo
```
# Justificación de bases de datos

El proyecto utiliza una arquitectura híbrida combinando:

- PostgreSQL (relacional)
- MongoDB (no relacional)

Esto permite aprovechar las ventajas de ambos modelos según el tipo de información almacenada.

---

## PostgreSQL (Base de datos relacional)

Se utilizó PostgreSQL para entidades estructuradas y relaciones consistentes:

- usuarios
- tareas
- materias
- horarios
- relaciones académicas

Ventajas:

- integridad referencial
- relaciones entre tablas
- validación de datos
- transacciones seguras
- consultas estructuradas

Ideal para información crítica y organizada.

---

## MongoDB (Base de datos no relacional)

Se utilizó MongoDB para módulos más dinámicos y flexibles:

- flashcards
- sesiones de estudio
- recursos
- notificaciones
- metas
- logs de actividad

Ventajas:

- flexibilidad de documentos
- facilidad para escalar
- rapidez en prototipos
- almacenamiento semiestructurado

Ideal para información cambiante o con estructuras flexibles.

---

## Beneficio de arquitectura híbrida

El uso conjunto de PostgreSQL y MongoDB permitió:

- separar responsabilidades
- optimizar almacenamiento
- mejorar flexibilidad
- aplicar diferentes estrategias de persistencia
- practicar integración de múltiples tecnologías

Este enfoque es común en arquitecturas modernas de software.

#Tecnologías utilizadas

Frontend:
- React
- TypeScript
- TailwindCSS
- Vite

Backend:
- FastAPI
- SQLAlchemy
- Pydantic

Bases de datos:
- PostgreSQL
- MongoDB

Infraestructura:
- Docker

Herramientas:
- Git
- GitHub
- MongoDB Compass
- pgAdmin


Materia:
Calidad de Software

Universidad La Salle Bajío
