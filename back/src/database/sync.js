require("dotenv").config();

const connection = require('../database/connection');

require('../models/UserModel');
require('../models/UiStyleModel');

// ... 30 models

connection.sync({alter: true});