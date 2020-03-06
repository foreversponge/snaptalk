import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (

    <Button
        title={'Go to ${screenName}'}
        onPress={() => navigation.navigate(screenName)}>

            <Text>See comments</Text>

    </Button>

  );
}


export default GoToButton;