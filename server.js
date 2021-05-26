//imports express
const express = require('express');

//adding the PORT and app expression
const PORT = process.env.PORT || 3012;
const app = express();

//adding the middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//GET route to handle user requests, Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});