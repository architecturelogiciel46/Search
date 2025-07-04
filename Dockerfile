# Étape 1 : base de build
FROM node:20-alpine

# Répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et lock
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du projet
COPY . .

# Expose le port utilisé par Express
EXPOSE 3002

# Démarrage du serveur
CMD ["node", "index.js"]
