const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const config = require('./config/index').config;
const urlPrefix = config.URL_PREFIX || '/api/v1';

app.use(express.urlencoded({ extended: true, limit: '100bm' }));
app.use(express.json(limit = '100bm'));
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000']}))
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}))

// Routes
const roleRoutes = require('./routes/role.routes');
const authRoutes = require('./routes/user.auth.routes');
const categoryRoutes = require('./routes/category.routes');
const habilityRoutes = require('./routes/hability.routes');
const jobsRoutes = require('./routes/jobs.routes');

app.use(urlPrefix, [
  authRoutes,
  roleRoutes,
  categoryRoutes,
  habilityRoutes,
  jobsRoutes,
]);

module.exports = app;