import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  comment: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  nameAndPicture: {
    flex: 1,
    flexDirection: 'row',
  },
  username: {
    marginLeft: 10,
  },
  commentText: {
    marginVertical: 10,
  },
  avatar: {
    width: 32,
    height: 32,
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
  },
  editButton: {
    width: 80,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'green',
  },
  deleteButton: {
    width: 80,
    padding: 20,
    textAlign: 'center',
    backgroundColor: 'red',
  },
  popover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentBox: {
    height: 40,
    width: 200,
    margin: 10,
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
  },
});

export default styles;
