// Get Dependencies
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const config = require('./config/index').config;
const fileUpload = require('express-fileupload');

// Routes
const roleRoutes = require('./routes/role.routes');
const authRoutes = require('./routes/user.auth.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();
const port = config.PORT || 5000;
const urlPrefix = config.URL_PREFIX || '/api/v1';

// Middlewares
const authToken = require('./middlewares/verify.jwt.middleware');

app.use(express.urlencoded({ extended: true, limit: '100bm' }));
app.use(express.json(limit = '100bm'));
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000']}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))
require('./config/database.config').connect();

app.use(urlPrefix, [authRoutes, roleRoutes, categoryRoutes]);

app.listen(port, () => console.log(`Server running on port ${port}`));