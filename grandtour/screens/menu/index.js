import React from 'react';
import { View, Appbar, Button } from 'react-native-paper';
import style from './style';
import UsuarioService from '../../services/UsuarioService';

const MenuScreen = ({route, navigation}) => {
    const usuarioService = new UsuarioService()
    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.goBack()}} />
            <Appbar.Content title={route.name} />
        </Appbar.Header>
        <Button
            style={style.button} 
            icon="account" 
            mode="contained" 
            onPress={() => navigation.navigate('Perfis')}>
            Perfis
        </Button>
        <Button
            style={style.button} 
            icon="bus" 
            mode="contained" 
            onPress={() => navigation.navigate('Onibus')}>
            Ônibus
        </Button>
        <Button
            style={style.button} 
            icon="map-marker-path" 
            mode="contained" 
            onPress={() => navigation.navigate('Rotas')}>
            Rotas
        </Button>
        <Button
            style={style.button} 
            icon="map-check-outline" 
            mode="contained" 
            onPress={() => navigation.navigate('Viagens')}>
            Viagens
        </Button>
        <Button
            style={style.button} 
            icon="logout" 
            mode="contained" 
            onPress={() => usuarioService.deslogarUsuario((res) => {
                if(res)
                navigation.navigate('Login')
            })}>
            Sair
        </Button>
        </>
    );
};

export default MenuScreen;