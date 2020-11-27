const PORT = 5000;
const JWT_SECRET= "Ivan JavaScript ToDo";
const USER_MONGO = "todo-user"
const PASSWORD_USER_MONGO = "user"
const URL_MONGODB = "localhost";
const PORT_MONGO = 27017;
const NAME_DATABASE = "todo_database"
const MONGO_URI = `mongodb://${USER_MONGO}:${PASSWORD_USER_MONGO}@${URL_MONGODB}:${PORT_MONGO}/${NAME_DATABASE}`;
const BASE_URL = `http://localhost:${PORT}`;

module.exports = {
    PORT, 
    JWT_SECRET, 
    USER_MONGO, 
    PASSWORD_USER_MONGO, 
    URL_MONGODB, 
    PORT_MONGO, 
    NAME_DATABASE, 
    MONGO_URI, 
    BASE_URL,
}

// TODO: move all vars to .env
// process.env
// dotenv npm