const { Text } = require('../lib/models/content');
const { Message } = require('../lib/models');
const { strictEqual } = require('assert');
const sandbox = require('sinon').createSandbox();

describe('The message', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('should successfully finish', function () {
        it('when the message is populated', async function () {
            text = new Text('');
            expectedMessage = new Message(1, 2, text);
            expectedMillis = new Date('0001-01-01T00:00:00Z').getTime();
            sandbox.replace(expectedMessage, 'insertMessage', () => {
                return Promise.resolve('Mocked function successfully');
            });
            sandbox.replace(expectedMessage, 'getIdBySender', () => {
                expectedMessage.id = 1;
            });
            sandbox.replace(expectedMessage, 'insertContent', () => {
                return Promise.resolve('Mocked function successfully');
            });
            await expectedMessage.send();
            actualMillis = expectedMessage.timestamp.getTime();
            strictEqual(expectedMessage.id, 1);
            strictEqual(expectedMessage.sender, 1);
            strictEqual(expectedMessage.recipient, 2);
            strictEqual(expectedMessage.content, text);
            strictEqual(expectedMillis !== actualMillis, true);
        });
    });

});
