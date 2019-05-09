Instructions to start the application:

1. Using cmd activate mongo databse: mongod
2. Start the server with the following command (server.js file is in the main directory): node server.js
3. Start server using nodemon: nodemon -e ejs, js

database name: port_connect

modules used:
Hapi.js hapi@13.4.1 --save
EJS    ejs@2.4.2 --save
vision@4.1.0 --save
inert@4.0.0 --save        helps to serve static files like css and js
mongoose@4.5 --save
npm install shortid
hapi-auth-cookie@6.1.1 --save
npm install --save socket.io@1.4.8

useful mongo commands:
remove all documents from the collection userstatuses - db.userstatuses.remove({})
remove all documents from the collection users with the name "telefonas" -  db.users.remove({name: "telefonas"})
remove FIRST document from the users collection whos name is "hello" db.users.remove( { name: "hello" }, 1)

db.users.find({"name": "Lukas"},{"friends_request":1}) = show friend requests of Lukas
db.users.update({name: "Lukas"},{$unset:{friends_request: ""}})  =  delete friend requests from Lukas account