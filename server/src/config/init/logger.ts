import { createLogger, format, transports } from 'winston';

const customFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), customFormat),
    transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({
            filename: './log/yana-forms.log',
            level: 'info',
            // maxsize: 1000000,
            // maxFiles: 5,
            // zippedArchive: true
        }),
    ],
});
