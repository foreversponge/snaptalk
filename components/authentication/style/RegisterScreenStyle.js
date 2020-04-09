import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorMessage: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  form: {
    marginTop: 0,
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 30,
    backgroundColor: 'purple',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    marginTop: 25,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceHolder: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E2E6',
    borderRadius: 50,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    color: '#FFF',
    fontWeight: '500',
  },
  passwordBox: {
    marginTop: 32,
  },
  addPictureIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    width: '100%',
  },
  emailBox: {
    marginTop: 32,
  },
});

export default styles;
