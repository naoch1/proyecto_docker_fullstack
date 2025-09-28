# 🚀 Proyecto Fullstack con Docker

Aplicación **React + Spring Boot + MySQL** desplegada con **Docker Compose**.  
Este repositorio muestra cómo empaquetar y ejecutar un proyecto real de frontend y backend con un solo comando.  

---

## ✨ Características

- **Frontend** en React servido con **Nginx** ⚡  
- **Backend** en Spring Boot con conexión a **MySQL** 🔗  
- **Orquestación** mediante Docker Compose 🐳  
- Levantamiento rápido → `docker compose up --build`  

---

## 🖥️ Demo Local

- 🌐 **Frontend**: [http://localhost:3000](http://localhost:3000)  
- 📡 **API Backend**: [http://localhost:8080/api](http://localhost:8080/api)  
- 🗄️ **Base de datos**: contenedor `demo-db`  

---

## 📂 Estructura del repositorio

proyecto_docker_fullstack/
├── backend/ # Spring Boot + Maven
├── frontend/ # React + Nginx
├── docker-compose.yml
└── README.md



---

## 📦 Instalación y uso

Clonar el repositorio:
```bash
git clone git@github.com:naoch1/proyecto_docker_fullstack.git
cd proyecto_docker_fullstack


Levantar todo con Docker:

docker compose up --build




Ver contenedores activos:
docker ps


🛠️ Desarrollo
Backend (Spring Boot)
cd backend
mvn clean package


Genera el artefacto en target/*.jar.

Frontend (React)

cd frontend
npm install
npm start


⚠️ Nota: en producción el frontend se sirve desde Nginx dentro del contenedor.



👨‍💻 Autor

Nelson Alejandro Orellana Chávez
Técnico Programador en Aplicaciones Comerciales con +30 años de experiencia en IT.
💼 Especialista en Docker, Spring Boot, React y DevOps.
🌐 LinkedIn
 · GitHub


📄 Licencia
Este proyecto es de uso libre para fines educativos y práctico.

