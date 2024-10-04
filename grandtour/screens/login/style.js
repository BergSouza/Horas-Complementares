import {StyleSheet} from 'react-native';
import Constants from 'expo-constants'
const style = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight+100,
        marginHorizontal: 10,
    },
    textInput: {
        marginBottom: 15
    },
    button: {
        paddingVertical: 10
    },
    title: {
        alignSelf: 'center',
    }
});

export default style;