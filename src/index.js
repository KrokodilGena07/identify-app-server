require('dotenv').config();
const express = require('express');
const logger = require('./services/logger');
const router = require('./router');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error.middleware');
const db = require('./config/db');
require('./models/index');
const cookieParser = require('cookie-parser');
const {SessionUser} = require('./models');
const mailService = require('./services/mailService');

const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: process.env.CLEINT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => logger.info(`Server started on PORT ${PORT}`));

const minute = 60_000;
const tasks = [];

const addCronTask = (cronStr, callback) => {
    tasks.push({cron: cronStr.split(' '), callback});
};

const isTimeMatch = (cronParts, now) => {
    const [minute, hour, day, month, dayWeek] = cronParts;

    const minFlag = minute === '*' || Number(minute) === now.getMinutes();
    const hourFlag = hour === '*' || Number(hour) === now.getHours();
    const dayFlag = day === '*' || Number(day) === now.getDate();
    const monthFlag = day === '*' || Number(month) === now.getMonth() + 1;
    const dayWeekFlag = dayWeek === '*' || Number(dayWeek) === now.getDay();

    return minFlag && hourFlag && dayFlag && monthFlag && dayWeekFlag;
};

setInterval(() => {
    const now = new Date();

    tasks.forEach(task => {
        if (isTimeMatch(task.cron, now)) {
            logger.info('Cron task started');
            task.callback()
        }
    });

}, minute);

addCronTask('0 * * * *', async () => {
    try {
        const users = await SessionUser.findAll({attributes: ['email']});
        const to = users.map(i => i.dataValues.email);
        await mailService.sendInfoMail(to.toString());
    } catch (e) {
        logger.error('Cron task error');
        console.log(e);
    }
});

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