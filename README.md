# testClubNest

# pour installer les dépendences 

yarn


les paramètres de la db sont dans le .env

# pour démarrer 

yarn start

dans data-source.ts le synchronize est à true, il faut le mettre à false après la première initialisation du projet et de la db.

il y'a un fichier json InsomniaExport à importer dans Insomnia ou Postman pour avoir les requettes.


# sujet

Duration: 3 hours

## OBJECTIVE
Develop a REST API using Node.js and TypeScript that allows users to manage profiles and
media, follow other users, and view a personalized feed.
A crucial requirement for this project is rapid iteration. We may need to completely modify or
remove features at a moment’s notice. Therefore, the code must prioritize speed and adaptability,
even if it means making some trade-offs in other areas.
## FEATURES TO IMPLEMENT
• Profile Management:
Create a user profile with a username, email, description, and profile picture URL.,
Read, update, and delete their own profile.,
• Media Management:
Create media with a title, description, and media URL.,
Read, update, and delete media.,
• User Relationships:
Allow one user to follow another user.,
• Feed:
Retrieve a paginated feed containing the most recent media from followed users that have,
not yet been viewed.
## TECHNICAL REQUIREMENTS
• Framework and Language: Node.js + TypeScript. The choice of framework is open
(Express, Koa, NestJS, etc.).
• Database: Use a SQL database. The choice of database management system is open
(MySQL, PostgreSQL, SQLite, etc.).
• Authentication: Simple email and password authentication (optional to simplify the test).
• Testing Tools: To facilitate easy testing of your API, please provide a file that simplifies API
calls (Postman collection, .http/.rest file + REST client extension on VSCode, etc.).
• Mandatory Documentation: A readme explaining how to install dependencies (including
the database) and start your project.