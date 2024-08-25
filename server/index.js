const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());


// Helper function to extract alphabets and numbers
const processInputData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item) && item > highestLowercaseAlphabet) {
                highestLowercaseAlphabet = item;
            }
        }
    });

    return {
        numbers,
        alphabets,
        highestLowercaseAlphabet: highestLowercaseAlphabet || null,
    };
};

// POST method route for /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // Check if data is present and is an array
    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid input. 'data' should be an array."
        });
    }

    // Process data to get arrays for numbers, alphabets, and highest lowercase alphabet
    const { numbers, alphabets, highestLowercaseAlphabet } = processInputData(data);

    res.json({
        is_success: true,
        user_id: "VinayVamshee", // Static user_id for demonstration
        email: "pechettivinay.vamshee2021@vitstudent.ac.in", // Static email for demonstration
        roll_number: "21BCT0001", // Static roll_number for demonstration
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highestLowercaseAlphabet].filter(Boolean) // Ensure empty arrays are handled
    });
});

// GET method route for /bfhl
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
