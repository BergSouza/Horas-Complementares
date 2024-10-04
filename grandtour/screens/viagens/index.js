import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RadioButton, ActivityIndicator, SegmentedButtons, Card, Text, Button, BottomNavigation, Appbar, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RotaService from '../../services/RotaService';
import OnibusService from '../../services/OnibusService';
import ViagemService from '../../services/ViagemService';
import UsuarioService from '../../services/UsuarioService';

const Tab = createBottomTabNavigator();

export default function ViagensScreen({route, navigation}) {
    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title="Viagens" />
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
            name="Viagenss"
            component={ViagemScreen}
            options={{
            tabBarLabel: 'Viagens',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="map-check-outline" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="Adicionar"
            component={AdicionarViagemScreen}
            options={{
            tabBarLabel: 'Iniciar Viagem',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="map-plus" size={size} color={color} />;
            },
            }}
        />
        </Tab.Navigator>
        </>
    );
}

function ViagemScreen({navigation}) {
    const viagemService = new ViagemService()
    const usuarioService = new UsuarioService()
    const rotaService = new RotaService()
    const onibusService = new OnibusService()

    const [loaded, setLoaded] = React.useState()

    useEffect(() => {
        viagemService.getAllViagens((res) => {
            if(res == "Sem resultados!"){
                setSemResultados(true)
                setLoaded(true)
                return true
            }
            setViagens(res)
            let auxMotoristas = []
            let auxParadas = []
            let auxOnibus = []
            res.forEach((viagem,index) => {
                usuarioService.getInformacoesUsuario(viagem.motorista, (resM) => {
                    auxMotoristas.push(resM)
                    rotaService.getRotaById(viagem.rota, (resR) => {
                        auxParadas.push(resR)
                        onibusService.getOnibusByPrefixo(viagem.onibus, (resO) => {
                            auxOnibus.push(resO)
                            if(index+1 == res.length){
                                setMotoristasViagens(auxMotoristas)
                                setRotaViagens(auxParadas)
                                setOnibusViagens(auxOnibus)
                                setLoaded(true)
                            }
                        })
                        
                    })
                })
            })
        })
    },[])

    const [semResultados, setSemResultados] =  React.useState(false)
    const [motoristasViagens, setMotoristasViagens] = React.useState([])
    const [onibusViagens, setOnibusViagens] = React.useState([])
    const [rotaViagens, setRotaViagens] = React.useState([])
    const [viagens, setViagens] = React.useState([])

  return (
    loaded ?
        semResultados ? 
        <Text variant='titleLarge' style={{alignSelf: 'center', marginTop: 30}}> Sem Resultados! </Text>
        :
    <ScrollView style={styles.container}>
        {
            viagens.map((viagem, index) => {
                const dataInicio = viagem.dataInicio.toDate()
                const dataInicioFormatada = (dataInicio.getDate().toString().padStart(2, '0'))+"/"+((dataInicio.getMonth()+1).toString().padStart(2, '0'))+"/"+dataInicio.getFullYear()+" "+(dataInicio.getHours().toString().padStart(2, '0'))+":"+(dataInicio.getMinutes().toString().padStart(2, '0'))
                const dataFim = viagem.situacao == "Viagem Finalizada" ? viagem.dataFim.toDate() : new Date()
                const dataFimFormatada = (dataFim.getDate().toString().padStart(2, '0'))+"/"+((dataFim.getMonth()+1).toString().padStart(2, '0'))+"/"+dataFim.getFullYear()+" "+(dataFim.getHours().toString().padStart(2, '0'))+":"+(dataFim.getMinutes().toString().padStart(2, '0'))
                
                return (
                    <Card style={styles.card} key={index}>
                        <Card.Content>
                        <Text variant="titleLarge">{viagem.situacao == "Viagem Finalizada" ? viagem.situacao : "Em andamento" }</Text>
                        <Text variant="titleLarge">Motorista: {motoristasViagens[index] ? `${motoristasViagens[index].nome} ${motoristasViagens[index].sobrenome}` : '' }</Text>
                        <Text variant="bodyMedium">Data Início: {dataInicioFormatada}</Text>  
                        {viagem.situacao == "Viagem Finalizada" ? <Text variant="bodyMedium">Data Fim: {dataFimFormatada}</Text> :<></>}                        
                        <Text variant="bodyMedium">Ônibus: [{onibusViagens[index].prefixo}] {onibusViagens[index].modelo}</Text>
                        <Text variant="bodyMedium">Serviço: {onibusViagens[index].servico}</Text>
                        <Text variant="bodyMedium">Rota: [{(rotaViagens[index].paradas[0].horarioHora).toString().padStart(2, '0')}:{(rotaViagens[index].paradas[0].horarioMinuto).toString().padStart(2, '0')}] {rotaViagens[index].paradas[0].local} x {rotaViagens[index].paradas[rotaViagens[index].paradas.length-1].local}</Text>
                        <Text variant="bodyMedium">{viagem.situacao == 'Viagem Finalizada' ? `Total de Passageiros ${viagem.totalPassageirosViagem}` : ''}</Text>
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

function AdicionarViagemScreen({navigation}) {

    const rotaService = new RotaService()
    const onibusService = new OnibusService()
    const viagemService = new ViagemService()

    const escolheRota = (val) => {
        setValueRota(val)
        if(val == "aleatoria"){
            const rota = Math.floor(Math.random()*rotas.length)
            setValue(rota)
        }
    }

    useEffect(() => {
        viagemService.getViagemUsuario((res) => {
            if(res){
                setViagemEmAndamento(true)
                setViagemInfo(res)
                rotaService.getRotaById(res.rota, (res2) => {
                    setRotaViagemInfo(res2)
                    setLoaded(true)
                })
            }else{
                rotaService.getAllRotas((res) => {
                    const rotasAux = []
                    const rotasParadasAux = []
                    const rotaIdAux = []
                    res.forEach((rota, index) => {
                        const rotaAux = {label: `[${(rota.paradas[0].horarioHora).toString().padStart(2, '0')}:${(rota.paradas[0].horarioMinuto).toString().padStart(2, '0')}] - ${rota.paradas[0].local} x ${rota.paradas[rota.paradas.length-1].local} - [${(rota.paradas[rota.paradas.length-1].horarioHora).toString().padStart(2, '0')}:${(rota.paradas[rota.paradas.length-1].horarioMinuto).toString().padStart(2, '0')}]`, value: index}
                        rotasAux.push(rotaAux)
                        rotasParadasAux.push(rota.paradas)
                        rotaIdAux.push(rota.idRota)
                    });
                    onibusService.getAllOnibus((res2) => {
                        const onibusAux = []
                        res2.forEach((onibus, index) => {
                            onibusAux.push({label: `${onibus.prefixo} (${onibus.servico}) - ${onibus.modelo}`, value: onibus.prefixo})
                        })
                        setPrefixos(onibusAux)
                        setValuePrefixo(onibusAux[0].value)
                    })
                    setRotasParadas(rotasParadasAux)
                    setRotas(rotasAux)
                    setRotasId(rotaIdAux)
                    setLoaded(true)
                })
            }
        })
    },[])

    const [viagemEmAndamento, setViagemEmAndamento] = React.useState(false)
    const [viagemInfo, setViagemInfo] = React.useState({})
    const [rotaViagemInfo, setRotaViagemInfo] = React.useState()


    const [horas, setHoras] = React.useState([
        {label: '00', value: 0},
        {label: '01', value: 1},
        {label: '02', value: 2},
        {label: '03', value: 3},
        {label: '04', value: 4},
        {label: '05', value: 5},
        {label: '06', value: 6},
        {label: '07', value: 7},
        {label: '08', value: 8},
        {label: '09', value: 9},
        {label: '10', value: 10},
        {label: '11', value: 11},
        {label: '12', value: 12},
        {label: '13', value: 13},
        {label: '14', value: 14},
        {label: '15', value: 15},
        {label: '16', value: 16},
        {label: '17', value: 17},
        {label: '18', value: 18},
        {label: '19', value: 19},
        {label: '20', value: 20},
        {label: '21', value: 21},
        {label: '22', value: 22},
        {label: '23', value: 23},
      ]);

      const [minutos, setMinutos] = React.useState([
        {label: '00', value: 0},
        {label: '01', value: 1},
        {label: '02', value: 2},
        {label: '03', value: 3},
        {label: '04', value: 4},
        {label: '05', value: 5},
        {label: '06', value: 6},
        {label: '07', value: 7},
        {label: '08', value: 8},
        {label: '09', value: 9},
        {label: '10', value: 10},
        {label: '11', value: 11},
        {label: '12', value: 12},
        {label: '13', value: 13},
        {label: '14', value: 14},
        {label: '15', value: 15},
        {label: '16', value: 16},
        {label: '17', value: 17},
        {label: '18', value: 18},
        {label: '19', value: 19},
        {label: '20', value: 20},
        {label: '21', value: 21},
        {label: '22', value: 22},
        {label: '23', value: 23},
        {label: '24', value: 24},
        {label: '25', value: 25},
        {label: '26', value: 26},
        {label: '27', value: 27},
        {label: '28', value: 28},
        {label: '29', value: 29},
        {label: '30', value: 30},
        {label: '31', value: 31},
        {label: '32', value: 32},
        {label: '33', value: 33},
        {label: '34', value: 34},
        {label: '35', value: 35},
        {label: '36', value: 36},
        {label: '37', value: 37},
        {label: '38', value: 38},
        {label: '39', value: 39},
        {label: '40', value: 40},
        {label: '41', value: 41},
        {label: '42', value: 42},
        {label: '43', value: 43},
        {label: '44', value: 44},
        {label: '45', value: 45},
        {label: '46', value: 46},
        {label: '47', value: 47},
        {label: '48', value: 48},
        {label: '49', value: 49},
        {label: '50', value: 50},
        {label: '51', value: 51},
        {label: '52', value: 52},
        {label: '53', value: 53},
        {label: '54', value: 54},
        {label: '55', value: 55},
        {label: '56', value: 56},
        {label: '57', value: 57},
        {label: '58', value: 58},
        {label: '59', value: 59},
      ]);
    
    const [horarioHora, setHorarioHora] = React.useState(0);
    const [horarioMinuto, setHorarioMinuto] = React.useState(0);
    const [openHora, setOpenHora] = React.useState(false);
    const [openMinuto, setOpenMinuto] = React.useState(false);
    const [checked, setChecked] = React.useState('padrao');
    const [valueRota, setValueRota] = React.useState('selecionar');
    const [openRota, setOpenRota] = React.useState(false);
    const [openPrefixos, setOpenPrefixos] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [valuePrefixo, setValuePrefixo] = React.useState('15005');
    const [loaded, setLoaded] = React.useState(false)
    const [rotasId, setRotasId] = React.useState([])
    const [prefixos, setPrefixos] = React.useState([]);
  
const [rotas, setRotas] = React.useState([]);

  const [rotasParadas, setRotasParadas] = React.useState([])

  return (
    loaded ?
    viagemEmAndamento ? 
    <ScrollView style={styles.container}>
        <Card style={styles.card}>
            <Card.Title title="Viagem em andamento encontrada"/>
            <Card.Content>
            <Text variant="bodyLarge">Situação: {viagemInfo.situacaoDesc} {rotaViagemInfo.paradas[viagemInfo.parada].local}</Text>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => navigation.navigate('Viagem em Rota', {rota: rotaViagemInfo.paradas, rotaId: viagemInfo.rota, prefixo: viagemInfo.onibus, emAndamento: true, viagemInfo: viagemInfo, rotaInfo: rotaViagemInfo, horarioPersonalziado: viagemInfo.horarioPersonalizado, horaInicio: viagemInfo.horaInicio, minutoInicio: viagemInfo.minutoInicio})}>Continuar Viagem</Button>
            </Card.Actions>
        </Card>
    </ScrollView>
    :
    <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
        <SegmentedButtons
            value={valueRota}
            onValueChange={escolheRota}
            onPress={escolheRota}
            buttons={[
            {
                value: 'aleatoria',
                label: 'Rota Predefinida',
            },
            {
                value: 'selecionar',
                label: 'Escolher Rota',
            },
            ]}
        />
        </SafeAreaView>
        <>
        { }
            <Text variant="titleLarge">Rota da Viagem</Text>
            <DropDownPicker
                disabled={valueRota == 'selecionar' ? false : true}
                searchable
                searchPlaceholder="Digite a Rota"
                placeholder="Selecione uma Rota"
                open={openRota}
                value={value}
                items={rotas}
                setOpen={setOpenRota}
                setValue={setValue}
                setItems={setRotas}
                style={{backgroundColor: "transparent", marginBottom: 10}}
                placeholderStyle={{
                    color: "#1976d2",
                }}
                labelStyle={{
                    color: "#1976d2"
                }}
                listMode="MODAL"
            />
            <Text variant="titleLarge">Veículo da Viagem</Text>
            <DropDownPicker
                searchable
                searchPlaceholder="Digite o Prefixo"
                placeholder="Selecione um Prefixo"
                open={openPrefixos}
                value={valuePrefixo}
                items={prefixos}
                setOpen={setOpenPrefixos}
                setValue={setValuePrefixo}
                setItems={setPrefixos}
                listMode="MODAL"
                style={{backgroundColor: "transparent", marginBottom: 10}}
                placeholderStyle={{
                    color: "#1976d2",
                }}
                labelStyle={{
                    color: "#1976d2"
                }}
            />
        </>
        <Text variant='bodyLarge' style={{alignSelf: 'center'}}>Horário</Text>
        <View style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            <View style={{width: '50%', paddingRight: '2%'}}>
                <DropDownPicker
                    searchable
                    searchPlaceholder="Digite uma Hora"
                    placeholder="Selecione uma Hora"
                    open={openHora}
                    value={horarioHora}
                    items={horas}
                    setOpen={setOpenHora}
                    setValue={setHorarioHora}
                    setItems={setHoras}
                    listMode="MODAL"
                    style={{backgroundColor: "transparent", marginBottom: 10}}
                    placeholderStyle={{
                        color: "#1976d2",
                    }}
                    labelStyle={{
                        color: "#1976d2"
                    }}
                />
            </View>
            <View style={{width: '50%', paddingLeft: '2%'}}>
                <DropDownPicker
                    searchable
                    searchPlaceholder="Digite um Minuto"
                    placeholder="Selecione um Minuto"
                    open={openMinuto}
                    value={horarioMinuto}
                    items={minutos}
                    setOpen={setOpenMinuto}
                    setValue={setHorarioMinuto}
                    setItems={setMinutos}
                    listMode="MODAL"
                    style={{backgroundColor: "transparent", marginBottom: 10}}
                    placeholderStyle={{
                        color: "#1976d2",
                    }}
                    labelStyle={{
                        color: "#1976d2"
                    }}
                />
            </View>
            </View>
        <RadioButton.Group onValueChange={checked => setChecked(checked)} value={checked}>
            <RadioButton.Item label="Padrão" value="padrao" />
            <RadioButton.Item label="Personalizado" value="personalizado" />
        </RadioButton.Group>
        <Button
            style={styles.button} 
            icon="map-marker-right" 
            mode="contained" 
            onPress={() => navigation.navigate('Viagem em Rota', {rota: rotasParadas[value], rotaId: rotasId[value], prefixo: valuePrefixo, emAndamento: false, horarioPersonalizado: checked == 'personalizado' ? true : false , horaInicio: horarioHora, minutoInicio: horarioMinuto})}>
            Iniciar Viagem
        </Button>
        <Text style={{marginTop: 35, fontWeight: "bold", alignSelf: 'center'}} variant='titleLarge'>Paradas da Rota | Embarque | Horário</Text>
        {rotasParadas[value].map((parada,index) => {
            if(checked == 'personalizado'){
                return (<Text style={{alignSelf: 'center'}} key={index} variant='titleLarge'>[{index+1}] {parada.local} | {parada.tipo == 'embarque' ? 'Sim' : 'Não'} | {((horarioHora-rotasParadas[value][0].horarioHora+parada.horarioHora) >= 24 ? (horarioHora-rotasParadas[value][0].horarioHora+parada.horarioHora)-24 : (horarioHora-rotasParadas[value][0].horarioHora+parada.horarioHora)).toString().padStart(2, '0')}:{((horarioMinuto-rotasParadas[value][0].horarioMinuto+parada.horarioMinuto) >= 60 ? (horarioMinuto-rotasParadas[value][0].horarioMinuto+parada.horarioMinuto)-60 : (horarioMinuto-rotasParadas[value][0].horarioMinuto+parada.horarioMinuto)).toString().padStart(2, '0')}</Text>)
            }else{
                return (<Text style={{alignSelf: 'center'}} key={index} variant='titleLarge'>[{index+1}] {parada.local} | {parada.tipo == 'embarque' ? 'Sim' : 'Não'} | {(parada.horarioHora).toString().padStart(2, '0')}:{(parada.horarioMinuto).toString().padStart(2, '0')}</Text>)
            }
            })}
    </ScrollView>
    :
    <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  card: {
    marginTop: 10,
    padding: 8,
    height: 270,
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  button: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
});