import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, RadioButton, HelperText, Button, TextInput, Card, Text, BottomNavigation, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';


import RotaService from '../../services/RotaService';

const Tab = createBottomTabNavigator();


export default function PerfilScreen({route, navigation}) {
    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title="Rotas" />
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
            name="Rota"
            component={RotaScreen}
            options={{
            tabBarLabel: 'Rotas',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="map-marker-multiple" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="Adicionar"
            component={AdicionarRotaScreen}
            options={{
            tabBarLabel: 'Adicionar',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="map-marker-plus" size={size} color={color} />;
            },
            }}
        />
        </Tab.Navigator>
        </>
    );
}

function RotaScreen({navigation}) {
    const rotaService = new RotaService()

    const [visible, setVisible] = React.useState(false);
    const [rotas, setRotas] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [semResultados, setSemResultados] = React.useState(false)

    useEffect(() => {
        rotaService.getAllRotas((res) => {
            if(res == "Sem resultados!"){
                setSemResultados(true)
                setLoaded(true)
            }
            setRotas(res)
            setLoaded(true)
        })
    },[])

const openMenu = () => setVisible(true);

const closeMenu = () => setVisible(false);
    return (
        loaded ?
        semResultados ? 
        <Text variant='titleLarge' style={{alignSelf: 'center', marginTop: 30}}> Sem Resultados! </Text>
        :
        <ScrollView style={styles.container}>
            {rotas.map((rota, index) => {
                return (
                    <Card style={styles.card} key={index+1}>
                        <Card.Content>
                        <Text variant="bodyMedium">Horário de Saída: {(rota.paradas[0].horarioHora).toString().padStart(2, '0')}:{(rota.paradas[0].horarioMinuto).toString().padStart(2, '0')}</Text>
                        <Text variant="bodyMedium">De: {rota.paradas[0].local}</Text>
                        <Text variant="bodyMedium">Para: {rota.paradas[rota.paradas.length-1].local}</Text>
                        <Text variant="bodyMedium">Horário de Chegada: {(rota.paradas[rota.paradas.length-1].horarioHora).toString().padStart(2, '0')}:{(rota.paradas[rota.paradas.length-1].horarioMinuto).toString().padStart(2, '0')}</Text>
                        <Text variant="bodyMedium">Total de Paradas: {rota.paradas.length}</Text>
                        <Text variant="bodyMedium">Total de Viagens: {rota.viagens}</Text>
                        </Card.Content>
                    </Card>
                )
            })}
        </ScrollView>
        :
        <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
    );
}

function AdicionarRotaScreen({navigation}) {
    const rotaService = new RotaService()
    const addRota = () => {
        rotaService.addRota(locals, (res) => {
            console.log("CADASTRADO COM SUCESSO!")
            navigation.navigate("Menu")
        })
    }
    const inserelocal = () => {
        if(checked == "parada" ? local && tempoP > 0 : local ){
            const arr = [... locals]
            if(onEdit){
                const arrAux = []
                arr.map((city) => {
                    if(city.id == localEdit){
                        arrAux.push({'id': localEdit, 'local': local, 'horarioHora': horarioHora, 'horarioMinuto': horarioMinuto, 'tipo': checked, 'tempoP': checked == 'embarque' ? 0 : tempoP})
                    }else{
                        arrAux.push(city)
                    }
                })
                setlocals(arrAux)
                setOnEdit(false)
            }else{
                arr.push({'id': idController, 'local': local, 'horarioHora': horarioHora, 'horarioMinuto': horarioMinuto, 'tipo': checked, 'tempoP': checked == 'embarque' ? 0 : tempoP})
                setId(idController+1);
                setlocals(arr)
            }
            setlocal('')
            setHorarioHora(0)
            setHorarioMinuto(0)
        }else{
            setVisible(true)
        }
        console.log(locals)
    }

    const removerlocal = (id) => {
        const arr = [... locals]
        arr.map((local) => {
            if(local.id == id){
                arr.pop(local)
            }
        })
        setlocals(arr)
    }

    const editarlocal = (id) => {
        setOnEdit(true)
        const arr = [... locals]
        arr.map((local) => {
            if(local.id == id){
                setlocal(local.local)
                setHorarioHora(local.horarioHora)
                setHorarioMinuto(local.horarioMinuto)
                setChecked(local.tipo)
                setTempoP(local.tempoP.toString())
                setlocalEdit(id)
                return true
            }
        })
    }

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

    const [locals, setlocals] = React.useState([]);
    const [local, setlocal] = React.useState("");
    const [horarioHora, setHorarioHora] = React.useState(0);
    const [horarioMinuto, setHorarioMinuto] = React.useState(0);
    const [openHora, setOpenHora] = React.useState(false);
    const [openMinuto, setOpenMinuto] = React.useState(false);
    const [idController, setId] = React.useState(1);
    const [onEdit, setOnEdit] = React.useState(false);
    const [localEdit, setlocalEdit] = React.useState(0);
    const [checked, setChecked] = React.useState('embarque');
    const [tempoP , setTempoP] = React.useState(0);

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <>
        <ScrollView style={styles.container}>
            <Button onPress={addRota}>Concluir Rota ( Finalizar )</Button>
            
            <TextInput
                style={styles.textInput}
                label="Local"
                value={local}
                onChangeText={local => setlocal(local)}
            />
            <HelperText type="error" visible={local.length < 1}>
                Digie um local!
            </HelperText>
            <Text variant='bodyLarge' style={{alignSelf: 'center'}}>Horário</Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            <View style={{width: '50%', padding: '3%'}}>
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
            <View style={{width: '50%', padding: '3%'}}>
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
                <RadioButton.Item label="Embarque e desembarque" value="embarque" />
                <RadioButton.Item label="Parada" value="parada" />
            </RadioButton.Group>
            <TextInput
                style={styles.textInput}
                label="Tempo da parada em segundos"
                value={tempoP}
                keyboardType='decimal-pad'
                disabled={checked == 'embarque'}
                onChangeText={tempoP => setTempoP(tempoP)}
            />
            <HelperText type="error" visible={tempoP < 1 && checked == 'parada'}>
                Coloque o tempo de pelo menos 1 segundo!
            </HelperText>
            <Button onPress={() => inserelocal()}>{onEdit ? 'Atualizar Parada' : 'Adicionar Parada'}</Button>
            
            {
                locals.map((local) => {
                    return (
                        <Card style={styles.card} key={local.id}>
                            <Card.Content>
                            <Text variant="bodyMedium">Local: {local.local}</Text>
                            {local.tipo == 'embarque' ? 
                            <>
                            <Text variant="bodyMedium">Horário de Embarque/Desembarque: {(local.horarioHora).toString().padStart(2, '0')}:{(local.horarioMinuto).toString().padStart(2, '0')}</Text>
                            <Text variant="bodyMedium">Embarque e desembarque</Text>
                            </>
                            : 
                            <>
                            <Text variant="bodyMedium">Parada {(local.horarioHora).toString().padStart(2, '0')}:{(local.horarioMinuto).toString().padStart(2, '0')}</Text>
                            <Text variant="bodyMedium">Tempo parada: {local.tempoP} segundos</Text>
                            </>
                            }
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => removerlocal(local.id)}>Remover</Button>
                                <Button onPress={() => editarlocal(local.id)}>Editar</Button>
                            </Card.Actions>
                        </Card>
                    )
                })
            }
        </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginTop: 10,
        padding: 8,
        height: 160,
        width: '96%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    textInput: {
        margin: 10
    }
});