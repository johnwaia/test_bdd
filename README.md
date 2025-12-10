# 🎮 Games API

API REST pour gérer une collection de jeux vidéo (CRUD) avec **Node.js**, **Express** et **MongoDB**.

---

## 🚀 Fonctionnalités

- ✅ Créer un jeu
- ✅ Lister tous les jeux
- ✅ Récupérer un jeu par ID
- ✅ Modifier un jeu
- ✅ Supprimer un jeu
- ✅ Validation des IDs MongoDB
- ✅ Gestion des erreurs serveur
- ✅ API testable avec Postman

---

## 🛠️ Technologies utilisées

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- cors

---

## 📁 Structure du projet

```
Server/
├── controllers/
│   └── games.js
├── models/
│   └── games.js
├── routes/
│   └── games.js
├── .env
├── .gitignore
├── server.js
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/TON_UTILISATEUR/TON_REPO.git
cd TON_REPO/Server
```

---

### 2️⃣ Installer les dépendances

```bash
npm install
```

---

### 3️⃣ Configurer les variables d’environnement

Créer un fichier `.env` à la racine du dossier `Server` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/games_db
```

---

### 4️⃣ Lancer le serveur

```bash
npm start
```

Serveur disponible sur :
```
http://localhost:5000
```

---

## 🔗 Endpoints API

### ➕ Créer un jeu
```
POST /api/games
```

### 📥 Lister les jeux
```
GET /api/games
```

### 🔍 Détails d’un jeu
```
GET /api/games/:id
```

### ✏️ Modifier un jeu
```
PATCH /api/games/:id
```

### ❌ Supprimer un jeu
```
DELETE /api/games/:id
```

---

## 🧪 Tests avec Postman

- Méthodes : POST, GET, PATCH, DELETE
- Header requis :
```
Content-Type: application/json
```

---

## ❗ Erreurs courantes

| Erreur | Cause |
|------|------|
| Cannot POST /api/games | URL incorrecte |
| CastError ObjectId | ID invalide |
| %0A dans l’URL | Retour ligne invisible |
| Erreur serveur | Problème Mongoose |

---

## 📌 Améliorations possibles

- 🔐 Authentification JWT
- 📄 Pagination
- 🔍 Filtres
- ✅ Validation Joi
- 🎨 Frontend React

---

## 👨‍💻 Auteur

**John W.**
