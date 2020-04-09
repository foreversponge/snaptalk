import 'react-native';
import CommentController from '../../components/firebase/CommentController';

describe('CommentList Test', () => {

    test('Empty string comment', async () => {
        const commentEmpty = {'text' : ''};
        const commentError = await CommentController.shared.addComment(commentEmpty).catch(error => { return error.message })
        expect(commentError).toBe("Comment is blank.");
    })

    test('Over 200 chars string comment', async () => {
        const longComment = {'text' : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
                            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
                            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
                            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'+
                            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'};
        const commentError = await CommentController.shared.addComment(longComment).catch(error => { return error.message })
        expect(commentError).toBe("Comment should be shorter than 200 characters.");
    })
})