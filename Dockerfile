#node version 22 dans la distribution du alpine
FROM node:22-alpine AS build

#définir un dossier du travail(où on pose les fichiers du l'app, et où va s'executer tous les commandes après run, copy, cmd, ...)
WORKDIR /Front-end 

#copier les fichiers du dossier en locale vers le dossier du travail dans le conteneur
COPY . .

#installer les dependances
RUN npm install

#lancer le build 
RUN npm run build

##Ceci va donner une image de build contient beaucoup de fichier inutiles, on va construire une nouvelle image legère  contient juste le nessecaire(on est besoin maintenant just de serveur web pour l'ecoute pas la peine de node environnement d'execution avec serveur vite, car on du js statique maintenant pas du jsx )

#image de base avec serveur web pour lancer l'app
FROM nginx:alpine

#supprimer des fichiers par defaut de nginx
RUN rm -rf /usr/share/nginx/html/*

#copier le dossier dist du production d'apres la premiere image vers la deuximeme image dans le dossier du serveur
COPY --from=build /Front-end/dist /usr/share/nginx/html

## Remplace la config par la tienne(renvoyer index.html (React s’occupe de la route), si le fichier n'existe pas dans nginx)
COPY nginx.conf /etc/nginx/conf.d/default.conf

#juste documentation que l'app utlise le port interieur 80 (dans le conteneur)
EXPOSE 80

#cmd à lancer lors de lancement du conteneur avec processus reste au premier plan (foreground) (normallement nginx la lance en arrière-plan), car Docker veut un processus principal actif, pour ne pas s'eteindre
CMD ["nginx", "-g", "daemon off;"]

##> docker run -d -p portDeMappage:portInterieur nomImageGénérée