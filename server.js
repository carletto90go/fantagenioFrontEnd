const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
//app.use(express.static('public'));

dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('dist'));
app.listen(port, () => {
	console.log(`Starting server at ${port}`);
});
//app.use('/', serveStatic(path.join(__dirname, 'dist')));
/*
app.get('/', (req,res) => {
    res.send("Bella Heroku");
})*/