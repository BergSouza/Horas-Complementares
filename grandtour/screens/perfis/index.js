import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Avatar, Button, Card, Text, BottomNavigation, Appbar, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import UsuarioService from '../../services/UsuarioService';
import ViagemService from '../../services/ViagemService';
import RotaService from '../../services/RotaService';
import OnibusService from '../../services/OnibusService';

const Tab = createBottomTabNavigator();

export default function PerfisScreen({route, navigation}) {

    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title="Perfis" />
        </Appbar.Header>
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
        }}
        tabBar={({ navigation, state, descriptors, insets }) => (
            <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
                });

                if (event.defaultPrevented) {
                preventDefault();
                } else {
                navigation.dispatch({
                    ... navigation.navigate(route.name, route.params),
                    target: state.key,
                });
                }
            }}
            renderIcon={({ route, focused, color }) => {
                const { options } = descriptors[route.key];
                if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
                }

                return null;
            }}
            getLabelText={({ route }) => {
                const { options } = descriptors[route.key];
                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.title;

                return label;
            }}
            />
        )}
        >
        <Tab.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="account-box" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="Motoristas"
            component={MotoristasScreen}
            options={{
            tabBarLabel: 'Motoristas',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="account-group" size={size} color={color} />;
            },
            }}
        />
        </Tab.Navigator>
        </>
    );
}

function PerfilScreen({navigation}) {
    const usuarioService = new UsuarioService()
    const viagemService = new ViagemService()
    const rotaService = new RotaService()
    const onibusService = new OnibusService()

    const [usuario, setUsuario] = React.useState()

    const [loaded, setLoaded] = React.useState(false)

    useEffect(() => {
        usuarioService.getIdUsuarioLogado((id) => {
            usuarioService.getInformacoesUsuario(id, (usuario) => {
                setUsuario(usuario)
                console.log(`Usuario Logado: ${usuario.nome}`)
                viagemService.getAllViagensUser(usuario.userId, (res) => {
                    if(res == "Sem resultados!"){
                        setSemResultados(true)
                        setLoaded(true)
                        return true
                    }
                    setViagens(res)
                    let auxParadas = []
                    let auxOnibus = []
                    res.forEach((viagem,index) => {
                        console.log(viagem)
                        rotaService.getRotaById(viagem.rota, (resR) => {
                            auxParadas.push(resR)
                            onibusService.getOnibusByPrefixo(viagem.onibus, (resO) => {
                                auxOnibus.push(resO)
                                if(index+1 == res.length){
                                    setRotaViagens(auxParadas)
                                    setOnibusViagens(auxOnibus)
                                    setLoaded(true)
                                }
                            })
                        })
                    })
                })
            })
        })
    }, [])

    const [semResultados, setSemResultados] = React.useState(false)
    const [rotaViagens, setRotaViagens] = React.useState([])
    const [onibusViagens, setOnibusViagens] = React.useState([])
    const [visible, setVisible] = React.useState(false);
    const [viagens, setViagens] = React.useState([])

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    loaded ? 
        <ScrollView style={styles.container}>
            <Card style={{width: '100%', borderRadius: 0}}>
                <Card.Content>
                <Avatar.Image style={{alignSelf: 'center'}} size={80} source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                        }} />
                <Text style={{alignSelf: 'center'}} variant="titleLarge">{usuario.nome} {usuario.sobrenome}</Text>
                <Text style={{alignSelf: 'center'}} variant="bodyMedium">Total de Viagens: {usuario.viagens}</Text>
                </Card.Content>
                <Card.Actions>
                {/* <Button>Expandir</Button> */}
                <Button onPress={() => {navigation.navigate('Editar Perfil')}}>Editar</Button>
                </Card.Actions>
            </Card>
            <Text style={{alignSelf: 'center', marginTop: 10}} variant="titleLarge">Últimas Viagens</Text>
            {
                semResultados ? 
                <Text variant='titleLarge' style={{alignSelf: 'center', marginTop: 30}}> Sem Resultados! </Text>
                :
                viagens.map((viagem, index) => {
                    const dataInicio = viagem.dataInicio.toDate()
                    const dataInicioFormatada = (dataInicio.getDate().toString().padStart(2, '0'))+"/"+((dataInicio.getMonth()+1).toString().padStart(2, '0'))+"/"+dataInicio.getFullYear()+" "+(dataInicio.getHours().toString().padStart(2, '0'))+":"+(dataInicio.getMinutes().toString().padStart(2, '0'))
                    const dataFim = viagem.situacao == "Viagem Finalizada" ? viagem.dataFim.toDate() : new Date()
                    const dataFimFormatada = (dataFim.getDate().toString().padStart(2, '0'))+"/"+((dataFim.getMonth()+1).toString().padStart(2, '0'))+"/"+dataFim.getFullYear()+" "+(dataFim.getHours().toString().padStart(2, '0'))+":"+(dataFim.getMinutes().toString().padStart(2, '0'))
                    
                    return (
                        <Card style={styles.card} key={index}>
                        <Card.Content>
                        <Text variant="titleLarge">{viagem.situacao == "Viagem Finalizada" ? viagem.situacao : "Em andamento" }</Text>
                        <Text variant="titleLarge">Motorista: { usuario.nome }</Text>
                        <Text variant="bodyMedium">Data Início: {dataInicioFormatada}</Text>  
                        {viagem.situacao == "Viagem Finalizada" ? <Text variant="bodyMedium">Data Fim: {dataFimFormatada}</Text> :<></>}                        
                        <Text variant="bodyMedium">Rota: [{(rotaViagens[index].paradas[0].horarioHora).toString().padStart(2, '0')}:{(rotaViagens[index].paradas[0].horarioMinuto).toString().padStart(2, '0')}] {rotaViagens[index].paradas[0].local} x {rotaViagens[index].paradas[rotaViagens[index].paradas.length-1].local}</Text>
                        <Text variant="bodyMedium">Para: {rotaViagens[index].paradas[rotaViagens[index].paradas.length-1].local}</Text>
                        <Text variant="bodyMedium">{viagem.situacao == 'Viagem Finalizada' ? `Total de Passageiros ${viagem.totalPassageirosViagem}` : ''}</Text>
                        <Text variant="bodyMedium">Ônibus: [{onibusViagens[index].prefixo}] {onibusViagens[index].modelo}</Text>
                        <Text variant="bodyMedium">Serviço: {onibusViagens[index].servico}</Text>
                        <Text variant="bodyMedium">{viagem.situacao == 'Viagem Finalizada' ? `Total de Passageiros Irregulares ${viagem.totalPassageirosIrregulares}` : ''}</Text>
                        </Card.Content>
                    </Card>
                    )
                })
            }
        </ScrollView>
        :
        <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
  );
}

function MotoristasScreen() {
    const usuarioService = new UsuarioService()
    const [loaded, setLoaded] = React.useState(false)
    const [motoristas, setMotoristas] = React.useState([])

    useEffect(() => {
        usuarioService.getUsuarios((usuarios) => {
            setMotoristas(usuarios)
            setLoaded(true)
        })
    }, [])

  return (
    loaded ? 
    <ScrollView style={styles.container}>
        <Text style={{alignSelf: 'center', marginTop: 10}} variant="titleLarge">Motoristas Grandtour</Text>
        {
            motoristas.map((motorista) => {
                return (
                    <Card style={styles.card} key={motorista.userId}>
                        <Card.Title title={`Motorista Doc: ${motorista.userId}`} />
                        <Card.Content>
                        <Text variant="titleLarge">{motorista.nome} {motorista.sobrenome}</Text>
                        <Text variant="bodyMedium">Total de Viagens: {motorista.viagens}</Text>
                        </Card.Content>
                    </Card>
                )
            })
        }
    </ScrollView>
    :
    <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginTop: 10,
    padding: 8,
    height: 260,
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
});