import {View} from 'react-native';
import * as React from 'react';
import { ProgressBar, TextInput, Text, Button, HelperText } from 'react-native-paper';
import style from './style';
import UsuarioService from '../../services/UsuarioService';

const LoginScreen = ({navigation}) => {
    const redefinirSenha = () => {
        usuarioService.enviarEmailEsqueciSenha(email, (res) => {
            if(res == true){
                setMsgAviso("Email de redefinição enviado para bergson2000@live.com")
            }else{
                setMsgAviso(res)
            }
        })
    }
    const realizaLogin = () => {
        setBtnDesativado(true)
        usuarioService.logarComEmailESenha(email, senha, (res) => {
        if(res == true){
            setEmail("")
            setSenha("")
            setMsgAviso("")
            navigation.navigate('Menu')
        }else{
            setMsgAviso(res)
            setBtnDesativado(false)
        }
        setBtnDesativado(false)
        })
    }

    const usuarioService = new UsuarioService()
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [msgAviso, setMsgAviso] = React.useState("")
    const [btnDesativado, setBtnDesativado] = React.useState(false)

    return (
        <View style={style.container}>
            <Text style={style.title} variant="displayLarge">Grandtour</Text>
            <Text style={{alignSelf: 'center'}} variant="titleMedium" onPress={redefinirSenha}>Beta 0.1.0</Text>
            <HelperText type="error" visible={msgAviso.length > 0}>
                {msgAviso}
            </HelperText>
            <TextInput
                style={style.textInput}
                label="Email"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                style={style.textInput}
                label="Senha"
                secureTextEntry
                value={senha}
                onChangeText={senha => setSenha(senha)}
            />
            <ProgressBar visible={btnDesativado} style={{width: '90%', alignSelf: 'center'}} progress={0.0} color="#1976d2" indeterminate/>
            <Button
                style={style.button} 
                icon="login" 
                mode="contained" 
                disabled={btnDesativado}
                onPress={realizaLogin}>
                Entrar
            </Button>
            <Text style={style.title} variant="titleMedium">Não possui conta?</Text>
            <Button
                style={style.button} 
                icon="account-arrow-up" 
                mode="contained" 
                onPress={() => navigation.navigate('Registro')}>
                Registrar
            </Button>
            <Text style={style.title} variant="titleMedium" onPress={redefinirSenha}>Esqueci minha senha (redefinir)</Text>
        </View>
    );
}

export default LoginScreen