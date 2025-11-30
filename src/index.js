require('dotenv').config();
const express = require('express');
const logger = require('./services/logger');
const router = require('./router');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const db = require('./config/db');
require('./models/index');

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: process.env.CLEINT_URL,
    credentials: true
}));
app.use(express.json());

app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => logger.info(`Server started on PORT ${PORT}`));

const connecting = async () => {
    try {
        await db.authenticate();
        await db.sync();
        logger.info(`Connection with DB established`);
    } catch (e) {
        console.log(e);
    }
};

connecting().then();