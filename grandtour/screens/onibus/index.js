import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RadioButton, HelperText, ActivityIndicator, Button, TextInput, Card, Text, BottomNavigation, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OnibusService from '../../services/OnibusService';

const Tab = createBottomTabNavigator();

export default function PerfilScreen({route, navigation}) {
    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title="Onibus" />
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
            name="Cadastrados"
            component={CadastradosScreen}
            options={{
            tabBarLabel: 'Cadastrados',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="bus-multiple" size={size} color={color} />;
            },
            }}
        />
        <Tab.Screen
            name="Adicionar"
            component={AdicionarOnibusScreen}
            options={{
            tabBarLabel: 'Adicionar',
            tabBarIcon: ({ color, size }) => {
                return <Icon name="plus" size={size} color={color} />;
            },
            }}
        />
        </Tab.Navigator>
        </>
    );
}

function CadastradosScreen({navigation}) {

    const onibusService = new OnibusService()
    const [loaded, setLoaded] = React.useState(false)

    const [visible, setVisible] = React.useState(false);
    const [onibus, setOnibus] = React.useState([])
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    useEffect(() => {
        onibusService.getAllOnibus((res) =>{
            setOnibus(res)
            setLoaded(true)
        })
    },[])

    return (
        loaded ?
            <ScrollView style={styles.container}>
                {onibus.map((bus) => {
                    return (
                        <Card style={styles.card} key={bus.prefixo}>
                            <Card.Title title={`Veículo Prefixo ${bus.prefixo}`} />
                            <Card.Content>
                                <Text variant="titleLarge">Modelo: {bus.modelo}</Text>
                                <Text variant="bodyMedium">Serviço: {bus.servico}</Text>
                                <Text variant="bodyMedium">Viagens: {bus.viagens}</Text>
                            </Card.Content>
                        </Card>
                    )
                })}
            </ScrollView>
        :
        <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
    );
    }

function AdicionarOnibusScreen() {
    const onibusService = new OnibusService()
    const adicionarOnibus = () => {
        if(prefixo.length < 1){
            setMsgAviso("Digite um prefixo")
            setType("error")
            return false
        }
        if(servico.length < 1){
            setMsgAviso("Digite um serviço")
            setType("error")
            return false
        }
        if(modelo.length < 1){
            setMsgAviso("Digite um modelo")
            setType("error")
            return false
        }
        onibusService.addOnibus(prefixo, servico, modelo, (res) => {
            if(res == true){
                setType("info")
                setMsgAviso("Ônibus adicionado com sucesso! Se não aparecer, volte e acesse a tela de ônibus novamente")
            }
        })
    }

    const [prefixo, setPrefixo] = React.useState("");
    const [servico, setServico] = React.useState("");
    const [modelo, setModelo] = React.useState("");
    const [msgAviso, setMsgAviso] = React.useState("");
    
    const [visible, setVisible] = React.useState(false);
    const [type, setType] = React.useState("error");

    return (
        <>
        <ScrollView style={styles.container}>
            <HelperText type={type} visible={msgAviso.length > 0}>
                {msgAviso}
            </HelperText>
            <TextInput
                style={styles.textInput}
                label="Prefixo"
                value={prefixo}
                onChangeText={prefixo => setPrefixo(prefixo)}
                keyboardType = 'numeric'
            />
            <RadioButton.Group onValueChange={servico => setServico(servico)} value={servico}>
                <RadioButton.Item label="Convencional" value="Convencional" />
                <RadioButton.Item label="Executivo" value="Executivo" />
                <RadioButton.Item label="Semi-leito" value="Semi-leito" />
                <RadioButton.Item label="Executivo/Leito (DD)" value="Executivo/Leito (DD)" />
            </RadioButton.Group>
            <TextInput
                style={styles.textInput}
                label="Modelo"
                value={modelo}
                onChangeText={modelo => setModelo(modelo)}
            />
            <Button onPress={adicionarOnibus}>Adicionar</Button>
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
    height: 150,
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  textInput: {
    margin: 10
  }
});