import { View} from 'react-native';
import * as React from 'react';
import { Appbar, ActivityIndicator, ProgressBar, TextInput, Text, Button, Snackbar, HelperText } from 'react-native-paper';
import style from './style';
import UsuarioService from '../../services/UsuarioService';
import { ScrollView } from 'react-native';

const EditarPerfilScreen = ({navigation}) => {

    const usuarioService = new UsuarioService()

    const atualizaPerfil = () => {
        if(!nomeInvalido() && !sobrenomeInvalido() && desembarqueTempoMin > 1 && desembarqueTempoMax > 1 && embarqueTempoMin > 1 && embarqueTempoMax > 1){
            setBtnDesativado(true)
            usuarioService.getIdUsuarioLogado((id) => {
                usuarioService.atualizarUsuario(id, nome, sobrenome, embarqueTempoMin, embarqueTempoMax, desembarqueTempoMin, desembarqueTempoMax, (resposta) => {
                    // setMsgAviso(resposta)
                    if(resposta == true){
                        navigation.navigate("Menu")
                    }
                    setBtnDesativado(false)
                })
            })
        }
    }

    const redefinirSenha = () => {
        setBtnDesativadoRedefinirSenha(true)
        usuarioService.getEmailUsuarioLogado((email) => {
            usuarioService.enviarEmailEsqueciSenha(email, (res) => {
                setMsgAviso("Link de redefinição enviado para bergson2000@live.com")
            })
        })
    }

    const nomeInvalido = () => {
        return nome.length < 1
    }
    const sobrenomeInvalido = () => {
        return sobrenome.length < 1
    }

    React.useEffect(() => {
        usuarioService.getIdUsuarioLogado((idUser) => {
            usuarioService.getInformacoesUsuario(idUser, (res) => {
                setNome(res.nome)
                setSobrenome(res.sobrenome)
                setDesembarqueTempoMax(res.desembarqueTempoMax.toString())
                setDesembarqueTempoMin(res.desembarqueTempoMin.toString())
                setEmbarqueTempoMax(res.embarqueTempoMax.toString())
                setEmbarqueTempoMin(res.embarqueTempoMin.toString())
                setLoaded(true)
            })
        })
    },[])

    const [email, setEmail] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [sobrenome, setSobrenome] = React.useState("");
    const [desembarqueTempoMin, setDesembarqueTempoMin] = React.useState(0);
    const [desembarqueTempoMax, setDesembarqueTempoMax] = React.useState(0);
    const [embarqueTempoMin, setEmbarqueTempoMin] = React.useState(0);
    const [embarqueTempoMax, setEmbarqueTempoMax] = React.useState(0);
    const [loaded, setLoaded] = React.useState(false)
    //Snackbar
    const [msgAviso, setMsgAviso] = React.useState("")
    const [btnDesativado, setBtnDesativado] = React.useState(false)
    const [btnDesativadoRedefinirSenha, setBtnDesativadoRedefinirSenha] = React.useState(false)
    return (
        loaded ?
        <ScrollView>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            </Appbar.Header>
            <View style={style.container}>
                <Text style={style.title} variant="displayLarge">Editar Perfil</Text>
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
                <Text style={{alignSelf: 'center'}}>Tempo de embarque (em segundos)</Text>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',}}>
                        <View style={{
                            width: '50%',
                            paddingRight: '2%'
                        }}>
                            <TextInput
                                style={style.textInput}
                                label="Tempo mínimo"
                                value={embarqueTempoMin}
                                keyboardType='numeric'
                                onChangeText={embarqueTempoMin => setEmbarqueTempoMin(embarqueTempoMin)}
                            />
                            <HelperText type="error" visible={embarqueTempoMin < 1}>
                                Coloque algum tempo!
                            </HelperText>
                        </View>
                        <View style={{
                            width: '50%',
                            paddingLeft: '2%'
                        }}>
                            <TextInput
                                style={style.textInput}
                                label="Tempo máximo"
                                value={embarqueTempoMax}
                                onChangeText={embarqueTempoMax => setEmbarqueTempoMax(embarqueTempoMax)}
                            />
                            <HelperText type="error" visible={embarqueTempoMax < 1}>
                                Coloque algum tempo!
                            </HelperText>
                        </View>
                </View>
                <Text style={{alignSelf: 'center'}}>Tempo de desembarque (em segundos)</Text>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',}}>
                        <View style={{
                            width: '50%',
                            paddingRight: '2%'
                        }}>
                            <TextInput
                                style={style.textInput}
                                label="Tempo mínimo"
                                value={desembarqueTempoMin}
                                keyboardType='numeric'
                                onChangeText={desembarqueTempoMin => setDesembarqueTempoMin(desembarqueTempoMin)}
                            />
                            <HelperText type="error" visible={desembarqueTempoMin < 1}>
                                Coloque algum tempo!
                            </HelperText>
                        </View>
                        <View style={{
                            width: '50%',
                            paddingLeft: '2%'
                        }}>
                            <TextInput
                                style={style.textInput}
                                label="Tempo máximo"
                                value={desembarqueTempoMax}
                                onChangeText={desembarqueTempoMax => setDesembarqueTempoMax(desembarqueTempoMax)}
                            />
                            <HelperText type="error" visible={desembarqueTempoMax < 1}>
                                Coloque algum tempo!
                            </HelperText>
                        </View>
                </View>
                <ProgressBar visible={btnDesativado} style={{width: '90%', alignSelf: 'center'}} progress={0.0} color="#1976d2" indeterminate/>
                <Button
                    style={style.button} 
                    icon="check" 
                    mode="contained" 
                    disabled={btnDesativado}
                    onPress={atualizaPerfil}>
                    Atualizar
                </Button>
                <Text style={style.title} variant="titleMedium">{msgAviso}</Text>
                <Button
                    disabled={btnDesativadoRedefinirSenha}
                    style={style.button} 
                    icon="lock-reset" 
                    mode="contained" 
                    onPress={redefinirSenha}>
                    Redefinir Senha
                </Button>
            </View>
        </ScrollView>
        :
        <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
    );
}

export default EditarPerfilScreen