## Step to start this app ##
In this library-crud, I have followed MVC structure, config folder is for database configurations,
middlewares folder includes authentication.js file, it is for middleware for authentication,


Make sure to turn on the mongodb and update the url in .env file

Step-1 : Clone the repo/ Download the repo
Step-2 : cd to directory and then npm i (to install node modules) and run - node index.js
Step-3 : Open POSTMAN, and hit the route '/api/auth/register' with name,email,password
Step-4 : copy the token generated, now save the token with the key 'token' and value as the token generated in the header section

Step-5 : Now hit the route '/api/books' with post and enter the body in this format:
{
  "title": "title",
  "author": "author",
  "publicationYear": year
}

Step-6 : You can perform basic CRUD operations using this route to find, delete the boot by id copy the _id from the document in mongodb

Submitted by Raghav Khanna,
email: Raghavkhanna0011@gmail.com 
mobile: 7838349441


