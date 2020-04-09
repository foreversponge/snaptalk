import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalProfile: {
    paddingBottom: 2,
  },
  imageBackground: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#52575D',
  },
  imageContainer: {
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  container: {
    flex: 1,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    marginVertical: 8,
  },
  state: {
    alignItems: 'center',
    flex: 1,
  },
  amount: {
    fontSize: 18,
    color: '#52575D',
    fontFamily: 'HelveticaNeue',
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4,
    paddingTop: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#6495ED',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
  },
  separators: {
    borderColor: '#DFD8C8',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default styles;
