// Get Dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const config = require('./config/index').config;

// Routes
const roleRoutes = require('./routes/role.routes');

const app = express();
const port = config.PORT || 5000;
const urlPrefix = config.URL_PREFIX || '/api/v1';

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
require('./config/database.config').connect();

app.use(urlPrefix, [
  roleRoutes,
])

app.listen(port, () => console.log(`Server running on port ${port}`));