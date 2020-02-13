import React from 'react';
import { View, Text, Image, Button, StyleSheet, FlatList } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class Profile extends React.Component
{
    state = {
        photo: null,    
    };

    chooseImageGallery = () =>
    {
    
        const options = {
            title: 'Post Picture',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            noData: true
          };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              this.setState({
                photo: response,
              });
            }
          });
    };

    render()
    {
        const { photo } = this.state;
        return (
            
            <View style={styles.button}>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={styles.images}
                        />
                )}
                <Button title="Upload Picture" onPress={this.chooseImageGallery} />
            </View>
           
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    images: {
        width: 300,
        height: 300
    }
})

