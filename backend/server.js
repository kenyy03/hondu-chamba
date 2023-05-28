// Get Dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const config = require('./config/index').config;

// Routes
const roleRoutes = require('./routes/role.routes');
const authRoutes = require('./routes/user.auth.routes');

const app = express();
const port = config.PORT || 5000;
const urlPrefix = config.URL_PREFIX || '/api/v1';

// Middlewares
const authToken = require('./middlewares/verify.jwt.middleware');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
require('./config/database.config').connect();

app.use(urlPrefix, authRoutes);

app.use(urlPrefix,
  [authToken.veryfyToken],
  [
    roleRoutes,
  ])

app.listen(port, () => console.log(`Server running on port ${port}`));