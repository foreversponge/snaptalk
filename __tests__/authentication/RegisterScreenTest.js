import 'react-native';
import AuthenticationController from '../../components/firebase/AuthenticationController'

describe('RegisterScreen Test', () => {

    test('Empty string username', async () => {
        const usernameEmpty = { "name": "" };
        const usernameError = await AuthenticationController.shared.createUser(usernameEmpty).catch(error => { return error.message })
        expect(usernameError).toBe("Username was not entered.");
    })

    test('Invalid string username (more than 20 character)', async () => {
        const usernameLength26 = { "name": "abcdefghijklmnopqrstuvwxyz" };
        const usernameError = await AuthenticationController.shared.createUser(usernameLength26).catch(error => { return error.message })
        expect(usernameError).toBe("Username must only contain 20 letters and/or numbers.");
    })

    test('Invalid string username (invalid characters)', async () => {
        const usernameInvalidChar = { "name": "da.s;'d.d;'a.d'as.d';." };
        const usernameError = await AuthenticationController.shared.createUser(usernameInvalidChar).catch(error => { return error.message })
        expect(usernameError).toBe("Username must only contain 20 letters and/or numbers.");
    })

    /* For the other cases of username (valid usernames) Firebase is in charge of handling them.
    Email and password format is validated by Firebase also.  
    Therefore, there is nothing else left to test.
    */
})