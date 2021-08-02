const { createLogger, format, transports, info } = require('winston');

module.exports = createLogger({
    transports:
        new transports.File({
            filename: "logger" + ".log",
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY' }),
                format.printf(info => "Info: " + info.level + " timestamp: " + info.timestamp + " message: " + info.message)
            )
        })
});