const express = require('express');
const Database = require('nedb');
const app = express();
const cors = require('cors');
app.listen(3000, () => console.log("Server listening on port 3000"));
app.use(cors({ origin: '*' }));
app.use(express.json());

const database = new Database('clientdata.db');
database.loadDatabase();
//get request - server/database query
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.json(err);
            console.error(err);
            return;
        }
        response.status(200).json(data);
        console.log("Data given to client from database: \n");
        console.log(data);
    });
});

//post request - request to post data to server
app.post('/api', (request, response) => {
    //retrieving the body of the data that was sent from the client
    const data_body = request.body;
    // console.log("req body:", data_body);

    const timestamp = Date.now();
    const dateString = new Date(timestamp).toLocaleString();
    data_body.timestamp = dateString;
    database.insert(data_body);

    console.log("Data posted to database from client: \n");
    console.log(data_body);

    //responding back to the client (from the server) with the following data
    response.status(200).json(data_body);
});