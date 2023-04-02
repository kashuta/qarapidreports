require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const { sequelize } = require("./db/models");

const app = express();
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });
//Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app(cookieParser());

//Routes
app.use('/api', require('./routes'));

//Error handling
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

//Server

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

