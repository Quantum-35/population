const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

export default {
    userCredentials: {
        "firstName": "test",
        "lastName": "mrTest",
        "email": "testmail5@gmail.com",
        "password": "HelloWorldKenya1",
        "confirmPassword": "HelloWorldKenya1",
        "username": "testUser5"
    },
    generateToken: function() {
        return jwt.sign(userCredentials.username, process.env.SECRET_KEY)
    },
    fakeToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1pY2hhZWxqIiwiaWQiOjUsImVtYWlsIjoiZ2lsYmVydC5uZ2V5d28rMTJAYW5kZWxhLmNvbSIsImlhdCI6MTU2Njc2Nzc0MiwiZXhwIjoxNTY2Nzk2NTQyfQ.xTHacCp2womf255-FI_PvYI24XJiCLKY4bLH1yTLPYg",
    locationCredentials: {
        "locationName": "Lagos",
        "femalePopulation": 13333,
        "malePopulation": 1202,
        "under18Population": 200,
        "over18Population": 400
    }
}