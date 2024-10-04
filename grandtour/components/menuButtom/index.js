import {TouchableOpacity, Text} from 'react-native'
import * as React from 'react';
import style from './style';

const menuButtom = (props) => {
    return (
        <TouchableOpacity {...props} style={style.button}>
            <Text style={style.textButton}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default menuButtom