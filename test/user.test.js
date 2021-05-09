const { strictEqual } = require('assert');
const sandbox = require('sinon').createSandbox();
const { User, encryptPassword, validatePassword } = require('../lib/models');
const { Image, Text, Video, VideoTypes } = require('../lib/models/content');

describe('The user', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('should successfully finish', function () {
        it('when the user can be created', async function () {
            expectedUser = new User('MockedUsername', 'MockedPassword');
            expectedUser.id = 1;
            sandbox.replace(expectedUser, 'insert', () => {
                return Promise.resolve('Mocked function successfully');
            });
            sandbox.replace(expectedUser, 'getUserByUsername', async () => {
                encryptedPassword = await encryptPassword(expectedUser.password);
                user = new User(expectedUser.username, encryptedPassword);
                user.id = 1;
                return Promise.resolve(user);
            });
            actualUser = await expectedUser.create();
            strictEqual(expectedUser.id, actualUser.id);
            strictEqual(expectedUser.username, actualUser.username);
            samePassword = await validatePassword(expectedUser.password, actualUser.password);
            strictEqual(samePassword, true);
        });

        it('when the user can received the messages that were sent to him', async function () {
            user = new User('MockedUsername', 'MockedPassword');
            expectedText = new Text('MockedText');
            expectedImage = new Image('MockedText', 0, 0);
            expectedVideo = new Video('MockedUrl', VideoTypes.YOUTUBE);

            sandbox.replace(user, 'getMessages', () => {
                messages = [expectedText, expectedImage, expectedVideo];
                return messages;
            });
            contentStub = sandbox.stub(user, 'getContentByRow');
            contentStub.onCall(0).returns(expectedText);
            contentStub.onCall(1).returns(expectedImage);
            contentStub.onCall(2).returns(expectedVideo);

            actualMessages = await user.getReceivedMessages(1, 3);
            strictEqual(actualMessages.length !== 0, true);
            strictEqual(actualMessages[0].content === expectedText, true);
            strictEqual(actualMessages[1].content === expectedImage, true);
            strictEqual(actualMessages[2].content === expectedVideo, true);
        });

        it('when the user can received the messages that were sent to him, but the user did not receive any message', async function () {
            user = new User('MockedUsername', 'MockedPassword');
            sandbox.replace(user, 'getMessages', async () => {
                return [];
            });
            actualMessages = await user.getReceivedMessages(1, 2);
            strictEqual(actualMessages.length === 0, true);
        });
    });
});
