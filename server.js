const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
//app.use(serveStatic(path.join("/", 'public')));
app.use(cors());
const port = process.env.PORT || 80;
app.listen(port, () => {
	console.log(`Starting server at ${port}`);
});