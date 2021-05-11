const { Login, User } = require('../lib/models');
const { strictEqual } = require('assert');
const sandbox = require('sinon').createSandbox();

describe('The login', function () {
    afterEach(function () {
        sandbox.restore();
    });

    describe('should successfully finish', function () {
        it('when the user exists', async function () {
            expectedUsername = 'MockedUser';
            login = new Login();
            sandbox.replace(login, 'getUser', () => {
                return new User(expectedUsername, '');
            });
            actualUser = await login.login(expectedUsername);
            strictEqual(expectedUsername, actualUser.username);
        });
    });

    describe('should unsuccessfully finish', function () {
        it('when the user does not exist', async function () {
            login = new Login();
            sandbox.replace(login, 'getUser', async () => {
                throw new Error();
            });
            actualUser = await login.login('MockedUser');
            strictEqual(undefined, actualUser);
        });
    });
});