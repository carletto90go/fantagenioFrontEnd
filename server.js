const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const cors = require('cors');
app = express();
app.use(serveStatic(path.join("src", 'dist')));
app.use(cors());
const port = process.env.PORT || 80;
app.listen(port);