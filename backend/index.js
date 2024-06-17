require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database'); // Import the database setup

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.post('/rest/submit-form', (req, res) => {
    const { firstName, lastName, email, city, state } = req.body;

    // Insert form data into the SQLite database
    const sql = `INSERT INTO signups (firstName, lastName, email, city, state ) VALUES (?, ?, ?, ?, ?)`;
    const params = [firstName, lastName, email, city.toLowerCase(), state.toLowerCase()];
    db.run(sql, params, function(err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        
            const responseMessage = `Thank you for your interest in our app. We will contact you at the provided email to get you started when we officially launch around Q3 2024!`;
            res.send({ message: responseMessage });
    });
});

app.get('/rest/signups', (req, res) => {
    let results = {'firstName' :[], 'lastName': [], 'email':[], 'city':[],'state':[],'index':[]};
    let i = 1;
    if(req.headers['authorization'] == process.env.AUTH_KEY) {
    // SQL query to count sign-ups by city and state
    const query = `
        SELECT firstName, lastName, email, city, state from signups;
    `;
    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error running the query', err.message);
            return;
        }
        // Print each row to the console
        rows.forEach((row) => {
            results['firstName'].push(row.firstName);
            results['lastName'].push(row.lastName);
            results['email'].push(row.email);
            results['city'].push(row.city);
            results['state'].push(row.state);
            results['index'].push(i);
	    i+=1;
        });
	res.send({results:results});
    });
    }
    else res.send({message:"Unauthorized"});
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
