const { strictEqual } = require('assert');
const sandbox = require('sinon').createSandbox();
const { validateConfigToGetMessages, validateConfigToSendMessages } = require('../lib/models/middlewares');
const { getToken } = require('../lib/models/middlewares/token');

describe('The message middleware', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('should successfully finish', function () {
        it('to get the message of a specific user when the conditions are correct', async function() {
            mockedRequest = {
                body: {
                    recipient: 1
                },
                userId: 1
            };
            await validateConfigToGetMessages(mockedRequest, {}, () => {});
        });

        // TODO: Need to review how to mock the created recipient in the function
        xit('to send the messages to a specific user when the conditions are correct', async function() {
            mockedRequest = {
                body: {
                    sender: 1,
                    recipient: 2
                },
                userId: 1
            };
            await validateConfigToSendMessages(mockedRequest, {}, () => {});
        });
    });
});

describe('The token middleware', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('should successfully finish', function () {
        it('assigning a token to a user', async function() {
            token = getToken(1);
            strictEqual(token !== undefined, true);
            strictEqual(token.length === 137, true);
        });

        // TODO: Need to review how to mock the jwt.verify method
        xit('validating the passed token', async function() {
            token = {
                Authorization: 'MockedToken'
            }
        });
    });
});