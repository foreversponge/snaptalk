import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:
    {
        width: '100%',
        height: '100%'
    },
    imageContainer:
    {
        marginHorizontal: 32,
        marginTop: 32,
        height: 150
    },
    textArea:
    {
        flex: 1
    },
    postButton:
    {
        fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#7E3DE8',
    },
    captionContainer: {
        margin: 32,
        flexDirection: 'row',
    },
    profilePic: {
        width: 60,
        height: 60,
        borderRadius: 24,
        marginRight: 12,
    },
    cameraIcon: {
        alignItems: 'flex-end',
        marginHorizontal: 40,
    },
});

export default styles;