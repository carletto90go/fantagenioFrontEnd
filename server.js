const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const cors = require('cors');
const app = express();
//app.use(express.static('public'));

dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Starting server at ${port}`);
});
app.use(cors());
//app.use('/', serveStatic(path.join(__dirname, 'dist')));

app.get('/', (req,res) => {
    response.send("Bella Heroku");
})