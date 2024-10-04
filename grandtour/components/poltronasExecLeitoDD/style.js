import {StyleSheet} from 'react-native';

const styleButton = StyleSheet.create({
    button: {
        height: 50,
        width: 300,
        alignSelf: 'center',
        backgroundColor: '#088',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
    },
    poltrona: {
        width: 60,
        height: 45,
        backgroundColor: '#5E5E5E',
        borderRadius: 5,
        margin: 2,
    },
    poltronaDesativada: {
        width: 60,
        height: 45,
        backgroundColor: '#5E5E5E',
        borderRadius: 5,
        margin: 2,
        opacity: 0
    },
    btnPisoInferior: {
        width: 125,
        height: 95,
        backgroundColor: '#ae1',
        margin: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtBtnPisoInferior: {
        fontWeight: 'bold',
        fontSize: 18
    },
    legendas:{
        alignSelf: 'center',
        top: 50
    },
    poltronaOcupada: {
        backgroundColor: '#0EA4FF'
    },
    container: {
        alignSelf: 'center',
        marginTop: 50,
        position: 'absolute',
        backgroundColor: '#F3F3F3',
        height: '100%',
        width: '100%'
    },
    blocoGeral: {
        alignSelf: 'center',
        width: 310
    },
    bloco1: {
        position: 'absolute',
        left: 0,
        top: 40,
    },
    bloco2: {
        position: 'absolute',
        left: 65,
        top: 40,
    },
    bloco3: {
        position: 'absolute',
        left: 170,
        top: 40,
    },
    bloco4: {
        position: 'absolute',
        left: 235,
        top: 40,
    },
    bloco5: {
        position: 'absolute',
        left: 0,
        top: 40+80,
    },
    bloco6: {
        position: 'absolute',
        left: 65,
        top: 40+80,
    },
    bloco7: {
        position: 'absolute',
        left: 170,
        top: 40+80,
    },
    bloco8: {
        position: 'absolute',
        left: 235,
        top: 40+80,
    },
    escondido: {
        display: 'none'
    },
    blocoFechar: {
        alignSelf: 'center'
    },
    fechar: {
        fontSize: 30,
    },
  });

export default styleButton;