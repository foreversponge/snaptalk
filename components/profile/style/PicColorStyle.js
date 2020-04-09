import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 100,
    paddingTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  text: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  touchableHighlight: {
    flex: 1,
    paddingVertical: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
  },
  textView: {
    flex: 1,
    alignItems: 'center',
  },
  buttonsView: {
    width: '100%',
    flexDirection: 'row',
  },
  optionView: {
    width: '100%',
  },
  option: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
});

export default styles;
