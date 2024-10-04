import {StyleSheet} from 'react-native';
import Constants from 'expo-constants'
const style = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 10,
    },
    button: {
        paddingVertical: 10
    },
    title: {
        alignSelf: 'center',
    }
});

export default style;