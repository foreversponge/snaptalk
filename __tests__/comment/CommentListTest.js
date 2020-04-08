import 'react-native';
import CommentController from '../../components/firebase/CommentController';

describe('CommentList Test', () => {

    test('Empty string username', async () => {
        const commentEmpty = { "comment": "" };
        const usernameError = await CommentController.shared.createUser(usernameEmpty).catch(error => { return error.message })
        expect(usernameError).toBe("Username was not entered.");
    })

    /* For the other cases of username (valid usernames) Firebase is in charge of handling them.
    Email and password format is validated by Firebase also.  
    Therefore, there is nothing else left to test.
    */
})