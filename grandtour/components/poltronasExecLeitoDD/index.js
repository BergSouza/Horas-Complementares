import {TouchableOpacity, View, Text} from 'react-native'
import * as React from 'react';
import style from './style';

const Poltronas = (props) => {
    const verPisoInferior = () => {
        setVerPisoSuperior(!verPisoSuperior)
    }
    const poltronas = props.poltronas
    const paradas = props.paradas
    const [verPisoSuperior, setVerPisoSuperior] = React.useState(true)
    const [poltronaSelecionada, setPoltronaSelecionada] = React.useState(0)
    // console.log(poltronas)
    return (
        <View style={style.container}>
            <Text style={style.legendas}>Azul - Ocupada | Cinza - Livre</Text>
            {poltronas[poltronaSelecionada][1].Nome != undefined ? 
            <Text style={{alignSelf: 'center'}}>({poltronaSelecionada+1}) {poltronas[poltronaSelecionada][1].Nome} | {paradas[poltronas[poltronaSelecionada][1].Origem].cidade} -> {paradas[poltronas[poltronaSelecionada][1].Destino].cidade}</Text>
            : <Text style={{alignSelf: 'center'}}>({poltronaSelecionada+1}) Poltrona vazia</Text>}
            <View style={style.blocoGeral}>
                <View style={!verPisoSuperior == true ? style.escondido : style.bloco1}>
                    <View  style={poltronas[0][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(0)}}  style={style.textButton}>1</Text></View>
                    <View  style={poltronas[4][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(4)}} style={style.textButton}>5</Text></View>
                    <View  style={poltronas[8][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(8)}} style={style.textButton}>9</Text></View>
                    <View  style={poltronas[10][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(10)}} style={style.textButton}>11</Text></View>
                    <View  style={poltronas[12][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(12)}} style={style.textButton}>13</Text></View>
                    <View  style={poltronas[16][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(16)}} style={style.textButton}>17</Text></View>
                    <View  style={poltronas[20][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(20)}} style={style.textButton}>21</Text></View>
                    <View  style={poltronas[24][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(24)}} style={style.textButton}>25</Text></View>
                    <View  style={poltronas[28][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(28)}} style={style.textButton}>29</Text></View>
                    <View  style={poltronas[32][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(32)}} style={style.textButton}>33</Text></View>
                    <View  style={poltronas[36][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(36)}} style={style.textButton}>37</Text></View>
                    <View  style={poltronas[40][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(40)}} style={style.textButton}>41</Text></View>
                </View>
                
                <View style={!verPisoSuperior == true ? style.escondido : style.bloco2}>
                    <View  style={poltronas[1][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(1)}} style={style.textButton}>2</Text></View>
                    <View  style={poltronas[5][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(5)}} style={style.textButton}>6</Text></View>
                    <View  style={poltronas[9][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(9)}} style={style.textButton}>10</Text></View>
                    <View  style={poltronas[11][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(11)}} style={style.textButton}>12</Text></View>
                    <View  style={poltronas[13][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(13)}} style={style.textButton}>14</Text></View>
                    <View  style={poltronas[17][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(17)}} style={style.textButton}>18</Text></View>
                    <View  style={poltronas[21][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(21)}} style={style.textButton}>22</Text></View>
                    <View  style={poltronas[25][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(25)}} style={style.textButton}>26</Text></View>
                    <View  style={poltronas[29][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(29)}} style={style.textButton}>30</Text></View>
                    <View  style={poltronas[33][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(33)}} style={style.textButton}>34</Text></View>
                    <View  style={poltronas[37][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(37)}} style={style.textButton}>38</Text></View>
                    <View  style={poltronas[41][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(41)}} style={style.textButton}>42</Text></View>
                </View>

                <View style={!verPisoSuperior == true ? style.escondido : style.bloco3}>
                    <View  style={poltronas[3][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(3)}} style={style.textButton}>4</Text></View>
                    <View  style={poltronas[7][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(7)}} style={style.textButton}>8</Text></View>
                    <View style={style.btnPisoInferior}><Text onPress={verPisoInferior} style={style.txtBtnPisoInferior}>Ver</Text><Text onPress={verPisoInferior} style={style.txtBtnPisoInferior}>Piso Inferior</Text></View>
                    {/* <View  style={style.poltronaDesativada}><Text style={style.textButton}>12</Text></View>
                    <View  style={style.poltronaDesativada}><Text style={style.textButton}>16</Text></View> */}
                    <View  style={poltronas[15][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(15)}} style={style.textButton}>16</Text></View>
                    <View  style={poltronas[19][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(19)}} style={style.textButton}>20</Text></View>
                    <View  style={poltronas[23][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(23)}} style={style.textButton}>24</Text></View>
                    <View  style={poltronas[27][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(27)}} style={style.textButton}>28</Text></View>
                    <View  style={poltronas[31][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(31)}} style={style.textButton}>32</Text></View>
                    <View  style={poltronas[35][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(35)}} style={style.textButton}>36</Text></View>
                    <View  style={poltronas[39][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(39)}} style={style.textButton}>40</Text></View>
                    <View  style={poltronas[43][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(43)}} style={style.textButton}>44</Text></View>
                </View>
                
                <View style={!verPisoSuperior == true ? style.escondido : style.bloco4}>
                    <View  style={poltronas[2][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(2)}} style={style.textButton}>3</Text></View>
                    <View  style={poltronas[6][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(6)}} style={style.textButton}>7</Text></View>
                    <View  style={style.poltronaDesativada}><Text style={style.textButton}>11</Text></View>
                    <View  style={style.poltronaDesativada}><Text style={style.textButton}>15</Text></View>
                    
                    <View  style={poltronas[14][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(14)}} style={style.textButton}>15</Text></View>
                    <View  style={poltronas[18][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(18)}} style={style.textButton}>19</Text></View>
                    <View  style={poltronas[22][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(22)}} style={style.textButton}>23</Text></View>
                    <View  style={poltronas[26][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(26)}} style={style.textButton}>27</Text></View>
                    <View  style={poltronas[30][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(30)}} style={style.textButton}>31</Text></View>
                    <View  style={poltronas[34][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(34)}} style={style.textButton}>35</Text></View>
                    <View  style={poltronas[38][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(38)}} style={style.textButton}>39</Text></View>
                    <View  style={poltronas[42][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(42)}} style={style.textButton}>43</Text></View>
                </View>
    
                <View style={verPisoSuperior == true ? style.escondido : style.bloco5}>
                    <View  style={poltronas[44][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(44)}}  style={style.textButton}>45</Text></View>
                    <View  style={poltronas[48][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(48)}} style={style.textButton}>49</Text></View>
                    <View  style={poltronas[52][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(52)}} style={style.textButton}>53</Text></View>
                </View>
                <View style={verPisoSuperior ? style.escondido : style.bloco6}>
                    <View  style={poltronas[45][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(45)}} style={style.textButton}>46</Text></View>
                    <View  style={poltronas[49][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(49)}} style={style.textButton}>50</Text></View>
                    <View  style={poltronas[53][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(53)}} style={style.textButton}>54</Text></View>
                </View>
                <View style={verPisoSuperior ? style.escondido : style.bloco7}>
                    <View  style={poltronas[47][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(47)}} style={style.textButton}>48</Text></View>
                    <View  style={poltronas[51][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(51)}} style={style.textButton}>52</Text></View>
                    <View  style={poltronas[55][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(55)}} style={style.textButton}>56</Text></View>
                    <View style={style.btnPisoInferior}><Text onPress={verPisoInferior} style={style.txtBtnPisoInferior}>Ver</Text><Text onPress={verPisoInferior} style={style.txtBtnPisoInferior}>Piso Superior</Text></View>
                </View>
                <View style={verPisoSuperior ? style.escondido : style.bloco8}>
                    <View  style={poltronas[46][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(46)}} style={style.textButton}>47</Text></View>
                    <View  style={poltronas[50][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(50)}} style={style.textButton}>51</Text></View>
                    <View  style={poltronas[54][0] == 1 ? [style.poltrona, style.poltronaOcupada] : style.poltrona}><Text onPress={() => {setPoltronaSelecionada(54)}} style={style.textButton}>55</Text></View>
                </View>
            </View>
        </View>
    )
}

export default Poltronas