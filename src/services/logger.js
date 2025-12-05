class Logger {
    info(message) {
        console.log(`\x1b[34mINFO : ${message}\x1b[0m`);
    }

    error(message) {
        console.log(`\x1b[31mERROR : ${message}\x1b[0m`);
    }
}

module.exports = new Logger();