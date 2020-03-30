import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    flatListContainer:
    {
        flex: 1,
        marginLeft: 10
    },
    commentContainer:
    {
        marginVertical: 17
    },
    commentExitButton:
    {
        marginLeft: 7,
        marginTop: 7,
        marginBottom: 10,
        color: "#73788B"
    },
    addCommentContainer:
    {
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 64,
        borderColor: 'silver',
    },
    commentBox:
    {
        borderRadius: 25,
        padding: 10,
        height: 40,
        width: 260,
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: "solid",
        color: 'black',
        marginRight: 20,
        marginLeft: 20
    },
    commentButton:
    {
        marginRight: 15
    },
    editButton:
    {
        marginLeft: 10

    },
    deleteButton:
    {
        marginLeft: 18
    },
    popover: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttons:
    {
        flex: 1,
        flexDirection: 'row',
    },
    popoverButtons:
    {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20
    },
    editTitle:
    {
        alignSelf: "center",
        marginBottom: 20,
        fontSize: 15,
        fontWeight: "bold",
        textDecorationLine: "underline"
    }
})

export default styles;