import 'react-native';
import PostController from '../../components/firebase/PostController';

describe('PostScreen Test', () => {
  test('Empty caption', async () => {
    const emptyCaption = {text: ''};
    const captionError = await PostController.shared
      .addPost(emptyCaption, null)
      .catch(error => {
        return error.message;
      });
    expect(captionError).toBe('Caption cannot be empty.');
  });

  test('Caption is too long', async () => {
    const captionLength115 = {
      text:
        'adsoksakodoopfkasdofaposfpkoasdkpofdsapkofpkofapkosapkofaspkoafspkofafaadsfiofdasjoifdsajoidsfaoijafsdjoifadsjoiafs',
    };
    const captionError = await PostController.shared
      .addPost(captionLength115, null)
      .catch(error => {
        return error.message;
      });
    expect(captionError).toBe('Caption must be less than 100 characters.');
  });

  test('No image chosen', async () => {
    const correctCaption = {text: 'Test'};
    const imageError = await PostController.shared
      .addPost(correctCaption, null)
      .catch(error => {
        return error.message;
      });
    expect(imageError).toBe('You must choose an image.');
  });
});
