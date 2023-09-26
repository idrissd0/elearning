const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000; // Change the port as needed

app.use(cors());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elearning',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define a route to retrieve data from the database
app.get('/questions', (req, res) => {
  const query = 'SELECT * FROM questions'; // Adjust the SQL query as needed

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }

    // Process the results and send them as JSON
    res.json(results);
  });
});

app.get('/fullquestions', (req, res) => {
  const query1 = `
    SELECT
      q.question_id,
      q.questionText,
      q.explanation,
      o.option_id,
      o.text,
      o.correct
    FROM questions q
    LEFT JOIN options o ON q.question_id = o.question_id;
  `;

  const query = `
    SELECT q.question_id, q.questionText, o.option_id, o.text, o.correct FROM questions q LEFT JOIN options o ON q.question_id = o.question_id;
  `
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error getting full question", err);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    res.json(results); // Corrected 'results.json(results)' to 'res.json(results)'
  });
});


// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
