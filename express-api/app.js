const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3000; // Change the port as needed

app.use(cors());

// Create a MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "elearning",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// Define a route to retrieve data from the database
app.get("/questionstest", (req, res) => {
  const query = "SELECT * FROM questions"; // Adjust the SQL query as needed

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }

    // Process the results and send them as JSON
    res.json(results);
  });
});

app.get("/questions", (req, res) => {
  const query0 = `
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

  const query1 = `
    SELECT q.question_id, q.questionText, o.option_id, o.text, o.correct FROM questions q LEFT JOIN options o ON q.question_id = o.question_id;
  `;

  const query = `
    SELECT
    q.question_id,
    q.questionText,
    GROUP_CONCAT(o.option_id) AS option_ids,
    GROUP_CONCAT(o.text) AS option_texts,
    GROUP_CONCAT(o.correct) AS option_correct
    FROM questions q
    LEFT JOIN options o ON q.question_id = o.question_id
    GROUP BY q.question_id, q.questionText;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error getting full question", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching data." });
    }

    res.json(results);
  });
});

// Define a route to fetch and reformat the data
app.get('/ques', (req, res) => {
  // Perform your MySQL query here (assumes you have a MySQL connection 'db' established)
  const query = `
    SELECT
      q.question_id,
      q.questionText,
      q.explanation,
      GROUP_CONCAT(o.option_id) AS option_ids,
      GROUP_CONCAT(o.text) AS option_texts,
      GROUP_CONCAT(o.correct) AS option_correct
    FROM questions q
    LEFT JOIN options o ON q.question_id = o.question_id
    GROUP BY q.question_id, q.questionText;
  `;

  db.query(query, (err, rows) => {
    if (err) {
      // Handle any database errors here
      res.status(500).json({ error: 'Database error' });
      return;
    }

    // Process the rows to reformat into the desired JSON structure
    const reformattedData = rows.map(row => {
      const options = row.option_texts.split(',').map((text, i) => ({
        text,
        correct: parseInt(row.option_correct.split(',')[i]),
      }));

      return {
        questionText: row.questionText,
        options,
        explanation: row.explanation,
      };
    });

    // Create the final JSON response
    const jsonResponse = {
      questions: reformattedData,
    };

    res.json(jsonResponse);
  });
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
