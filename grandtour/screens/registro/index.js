import {View} from 'react-native';
import * as React from 'react';
import { ProgressBar, TextInput, Text, Button, Snackbar, HelperText } from 'react-native-paper';
import style from './style';
import UsuarioService from '../../services/UsuarioService';
import { ScrollView } from 'react-native';

const RegistroScreen = ({navigation}) => {

    const usuarioService = new UsuarioService()

    const realizaCadastro = () => {
        if(!emailInvalido() && !senhaInvalida() && !senha2Invalida() && !nomeInvalido() && !sobrenomeInvalido()){
            setBtnDesativado(true)
            usuarioService.criarUsuarioComEmailESenha(nome, sobrenome, email, senha, (resposta) => {
                setMsgAviso(resposta)
                if(resposta == true){
                    navigation.navigate("Menu")
                }
                setBtnDesativado(false)
            })
        }
    }

    const emailInvalido = () => {
        return !email.includes('@');
    };
    const senhaInvalida = () => {
        return senha.length < 6
    };
    const senha2Invalida = () => {
        return senhaC != senha
    }
    const nomeInvalido = () => {
        return nome.length < 1
    }
    const sobrenomeInvalido = () => {
        return sobrenome.length < 1
    }

    const [email, setEmail] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [sobrenome, setSobrenome] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [senhaC, setSenhaC] = React.useState("");

    //Snackbar
    const [msgAviso, setMsgAviso] = React.useState("")
    const [btnDesativado, setBtnDesativado] = React.useState(false)
    return (
        <ScrollView>
            <View style={style.container}>
                <Text style={style.title} variant="displayLarge">Registrar</Text>
                <HelperText type="error" visible={msgAviso.length > 0}>
                    {msgAviso}
                </HelperText>
                <TextInput
                    style={style.textInput}
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <HelperText type="error" visible={emailInvalido()}>
                    Endereço de email inválido!
                </HelperText>
                <TextInput
                    style={style.textInput}
                    label="Nome"
                    value={nome}
                    onChangeText={nome => setNome(nome)}
                />
                <HelperText type="error" visible={nomeInvalido()}>
                    Nome inválido!
                </HelperText>
                <TextInput
                    style={style.textInput}
                    label="Sobrenome"
                    value={sobrenome}
                    onChangeText={sobrenome => setSobrenome(sobrenome)}
                />
                <HelperText type="error" visible={sobrenomeInvalido()}>
                    Sobrenome inválido!
                </HelperText>
                <TextInput
                    style={style.textInput}
                    label="Senha"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    secureTextEntry
                />
                <HelperText type="error" visible={senhaInvalida()}>
                    Senha mínima de 6 dígitos!
                </HelperText>
                <TextInput
                    style={style.textInput}
                    label="Confirmar Senha"
                    value={senhaC}
                    onChangeText={senhaC => setSenhaC(senhaC)}
                    secureTextEntry
                />
                <HelperText type="error" visible={senha2Invalida()}>
                    Senhas não correspondem!
                </HelperText>
                <ProgressBar visible={btnDesativado} style={{width: '90%', alignSelf: 'center'}} progress={0.0} color="#1976d2" indeterminate/>
                <Button
                    style={style.button} 
                    icon="account-arrow-up" 
                    mode="contained" 
                    disabled={btnDesativado}
                    onPress={realizaCadastro}>
                    Registrar
                </Button>
                <Text style={style.title} variant="titleMedium">Já possui conta?</Text>
                <Button
                    style={style.button} 
                    icon="login" 
                    mode="contained" 
                    onPress={() => navigation.goBack()}>
                    Ir para Login
                </Button>
            </View>
        </ScrollView>
    );
}

export default RegistroScreen