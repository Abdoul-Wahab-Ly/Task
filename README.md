//Cloner le projet
git clone https://github.com/Abdoul-Wahab-Ly/Task.git
cd task

//Installer les dépendances
npm install

//Configurer les variables d'environnement Créez un fichier .env à la racine
PORT=votre_port
DATABASE_URL="mysql://root@localhost:3306/votre_bdd"
SECRET_KEY="votre_cle_super_secrete"

//Initialiser la base de données (Prisma)
npx prisma generate
npx prisma db push

//Lancer le serveur
npm run dev

//Points de terminaison (Endpoints)

//Tasks (Routes Protégées)
