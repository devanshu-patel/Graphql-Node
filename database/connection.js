//Require .env
require('dotenv').config();
//library
const mongoose = require('mongoose');
var connection_string = process.env.CONNECTION_SRTING;
//database connection link
mongoose.connect( connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
//connection
const connection = mongoose.connection;
//event listeners
connection.on('error', () => console.log("error connecting database"));
connection.once('open', async () => {
    console.log("Database connected");
});
//exporting connection
module.exports = connection;
