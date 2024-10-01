const express = require('express');
// const Database = require('nedb');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./connectMongoDB');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
const port = 3000;
const Post = require('./PostModel');
connectDB();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});


//get request - server/database query
app.get('/api', async (request, response) => {
    const posts = await Post.find({});
    response.status(200).json(posts);
});

//post request - request to post data to server
app.post('/api', async (request, response) => {
    const timestamp = Date.now();
    const dateString = new Date(timestamp).toLocaleString();
    //retrieving the body of the data that was sent from the client
    const {caption, image64, coords} = request.body;
    
    const randomString = getRandomFileNameString(6);
    let imgPath = "../frontend/public/images/"+"Post_"+randomString+".jpg";
    saveBase64Image(image64, imgPath);
    
    const coordsArray = [coords.latitude, coords.longitude];
    const postData = {
        caption: caption,
        image: imgPath,
        timestamp: dateString,
        coords: coordsArray
    };
    console.log("Post data:",postData);
    const post = await Post.create(postData);

    console.log("Data posted to database from client: \n");
    console.log(post);
    //responding back to the client (from the server) with the following data
    response.status(200).json(postData);
});

const saveBase64Image = (base64Data, filePath) => {
    // Remove the data URL part (if present)
    const base64Image = base64Data.split(';base64,').pop();

    // Write the binary data to a file
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) {
        if (err) {
            console.error('Error saving image:', err);
        } else {
            console.log('Image successfully saved to:', filePath);
        }
    });
};

function getRandomFileNameString(length) {
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'; // Allowed characters
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validCharacters.length);
        result += validCharacters[randomIndex];
    }
    
    return result;
}