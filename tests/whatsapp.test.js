const { Client, LegacySessionAuth } = require('whatsapp-web.js');
const config = require('../config');
const logger = require('../logger');

jest.mock('whatsapp-web.js');
jest.mock('../logger');

describe('WhatsApp Client Initialization', () => {
    let client;

    beforeEach(() => {
        client = new Client({
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            },
            authStrategy: new LegacySessionAuth({
                session: config.session
            })
        });
    });

    test('should initialize the client successfully', () => {
        expect(client).toBeDefined();
    });

    test('should handle QR code generation', () => {
        const qrCallback = jest.fn();
        client.on('qr', qrCallback);
        client.emit('qr', 'test-qr-code');
        expect(qrCallback).toHaveBeenCalledWith('test-qr-code');
    });

    test('should handle client ready event', () => {
        const readyCallback = jest.fn();
        client.on('ready', readyCallback);
        client.emit('ready');
        expect(readyCallback).toHaveBeenCalled();
    });

    test('should handle authentication failure', () => {
        const authFailureCallback = jest.fn();
        client.on('auth_failure', authFailureCallback);
        client.emit('auth_failure', 'test-auth-failure');
        expect(authFailureCallback).toHaveBeenCalledWith('test-auth-failure');
    });

    test('should handle client disconnection', () => {
        const disconnectedCallback = jest.fn();
        client.on('disconnected', disconnectedCallback);
        client.emit('disconnected', 'test-disconnection-reason');
        expect(disconnectedCallback).toHaveBeenCalledWith('test-disconnection-reason');
    });
});

describe('Error Handling', () => {
    test('should log error when reading textfile fails', () => {
        const fs = require('fs');
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(new Error('test-error'));
        });

        require('../whatsapp');

        expect(logger.error).toHaveBeenCalledWith('Error reading textfile.txt: test-error');
    });

    test('should log error when initializing client fails', () => {
        Client.prototype.initialize = jest.fn().mockImplementation(() => {
            throw new Error('test-initialize-error');
        });

        require('../whatsapp');

        expect(logger.error).toHaveBeenCalledWith('Error initializing client: test-initialize-error');
    });
});

describe('Logging', () => {
    test('should log QR code generation', () => {
        const client = new Client();
        client.on('qr', () => {
            logger.info('QR code generated');
        });
        client.emit('qr', 'test-qr-code');
        expect(logger.info).toHaveBeenCalledWith('QR code generated');
    });

    test('should log client ready event', () => {
        const client = new Client();
        client.on('ready', () => {
            logger.info('Client is ready!');
        });
        client.emit('ready');
        expect(logger.info).toHaveBeenCalledWith('Client is ready!');
    });

    test('should log authentication failure', () => {
        const client = new Client();
        client.on('auth_failure', (msg) => {
            logger.error(`Authentication failure: ${msg}`);
        });
        client.emit('auth_failure', 'test-auth-failure');
        expect(logger.error).toHaveBeenCalledWith('Authentication failure: test-auth-failure');
    });

    test('should log client disconnection', () => {
        const client = new Client();
        client.on('disconnected', (reason) => {
            logger.warn(`Client was logged out: ${reason}`);
        });
        client.emit('disconnected', 'test-disconnection-reason');
        expect(logger.warn).toHaveBeenCalledWith('Client was logged out: test-disconnection-reason');
    });
});
