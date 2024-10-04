import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { ProgressBar, ActivityIndicator, Appbar, Button, Text, Card, Icon, Divider } from 'react-native-paper';
import style from './style';
import Poltronas from '../../components/poltronas';
import PoltronasExec from '../../components/poltronasExec';
import PoltronasSemiLeito from '../../components/poltronasSemiLeito';
import PoltronasExecLeitoDD from '../../components/poltronasExecLeitoDD';
import OnibusService from '../../services/OnibusService';
import ViagemService from '../../services/ViagemService';
import UsuarioService from '../../services/UsuarioService';
import RotaService from '../../services/RotaService';

const ViagemEmRotaScreen = ({route, navigation}) => {

    const onibusService = new OnibusService()
    const viagemService = new ViagemService()
    const usuarioService = new UsuarioService()
    const rotaService = new RotaService()

    const iniciaViagem = () => {
        usuarioService.getIdUsuarioLogado((resUser) => {
            viagemService.iniciarViagem(
                rotaId,
                horarioPersonalizado,
                horaInicio,
                minutoInicio,
                resUser,
                prefixo,
                totalPassageirosViagem,
                totalPassageirosIrregulares,
                btnOn,
                passageirosEmbarque,
                // passageiroEmbarque,
                situacao,
                situacaoDesc,
                parada,
                poltronas[0],poltronas[1],poltronas[2],poltronas[3],poltronas[4],poltronas[5],poltronas[6],poltronas[7],poltronas[8],poltronas[9],
                poltronas[10],poltronas[11],poltronas[12],poltronas[13],poltronas[14],poltronas[15],poltronas[16],poltronas[17],poltronas[18],poltronas[19],
                poltronas[20],poltronas[21],poltronas[22],poltronas[23],poltronas[24],poltronas[25],poltronas[26],poltronas[27],poltronas[28],poltronas[29],
                poltronas[30],poltronas[31],poltronas[32],poltronas[33],poltronas[34],poltronas[35],poltronas[36],poltronas[37],poltronas[38],poltronas[39],
                poltronas[40],poltronas[41],poltronas[42],poltronas[43],poltronas[44],poltronas[45] ? poltronas[45] : {},poltronas[46] ? poltronas[46] : {},poltronas[47] ? poltronas[47] : {},poltronas[48]  ? poltronas[48] : {},poltronas[49] ? poltronas[49] : {},
                poltronas[50] ? poltronas[50] : {},poltronas[51] ? poltronas[51] : {},poltronas[52] ? poltronas[52] : {},poltronas[53] ? poltronas[53] : {},poltronas[54] ? poltronas[54] : {},poltronas[55] ? poltronas[55] : {},
                (res) => {
                    setViagemId(res)
                }
            )
        })
    }

    const atualizaViagem = () => {
        usuarioService.getIdUsuarioLogado((resUser) => {
            viagemService.atualizarViagem(
                viagemId,
                rotaId,
                resUser,
                prefixo,
                totalPassageirosViagem,
                totalPassageirosIrregulares,
                btnOn,
                passageirosEmbarque,
                // passageiroEmbarque,
                situacao,
                situacaoDesc,
                parada,
                poltronas[0],poltronas[1],poltronas[2],poltronas[3],poltronas[4],poltronas[5],poltronas[6],poltronas[7],poltronas[8],poltronas[9],
                poltronas[10],poltronas[11],poltronas[12],poltronas[13],poltronas[14],poltronas[15],poltronas[16],poltronas[17],poltronas[18],poltronas[19],
                poltronas[20],poltronas[21],poltronas[22],poltronas[23],poltronas[24],poltronas[25],poltronas[26],poltronas[27],poltronas[28],poltronas[29],
                poltronas[30],poltronas[31],poltronas[32],poltronas[33],poltronas[34],poltronas[35],poltronas[36],poltronas[37],poltronas[38],poltronas[39],
                poltronas[40],poltronas[41],poltronas[42],poltronas[43],poltronas[44] ? poltronas[44] : {}, poltronas[45] ? poltronas[45] : {},poltronas[46] ? poltronas[46] : {},poltronas[47] ? poltronas[47] : {},poltronas[48]  ? poltronas[48] : {},poltronas[49] ? poltronas[49] : {},
                poltronas[50] ? poltronas[50] : {},poltronas[51] ? poltronas[51] : {},poltronas[52] ? poltronas[52] : {},poltronas[53] ? poltronas[53] : {},poltronas[54] ? poltronas[54] : {},poltronas[55] ? poltronas[55] : {},
                (res) => {
                    console.log(res)
                }
            )
        })
    }

    const finalizaViagem = () => {
        usuarioService.getIdUsuarioLogado((resUser) => {
            viagemService.finalizaViagem(viagemId, rotaId, resUser, prefixo, totalPassageirosViagem, totalPassageirosIrregulares, (res) => {
                    console.log(res)
                }
            )
        })
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const geraDataPassagem = (hoje) => {
        var data = new Date();
            const aux = Math.floor(Math.random()*100);
            if(aux > 84 && !hoje){
                data.setDate(data.getDate()+aux-92)
            }
            dia = parseInt(data.getDate().toString())
            diaF = (dia.length == 1) ? '0'+dia : dia
            mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes
            anoF = data.getFullYear();
            
            
        return diaF+"/"+mesF+"/"+anoF;
    }

    const geraDataNascimento = () => {
        const ano = Math.floor(Math.random()*60)+1940
        let mes = Math.floor(Math.random()*12)+1
        if(mes < 10){
            mes = "0"+mes
        }
        let dia = Math.floor(Math.random()*28)+1
        if(dia < 10){
            dia = "0"+dia
        }
        return `${dia}/${mes}/${ano}`
    }

    const geraNomeDoc = () => {
        const sobrenomes = [
            'Abasto', 'Abelho', 'Abranches', 'Abrantes', 'Abreu', 'Adão', 'Adarga', 'Afonso', 'Águeda', 'Aguiar', 'Aires', 'Albernaz',
            'Albuquerque', 'Alcaide', 'Alcântara', 'Alcoforado', 'Aldeia', 'Aleixo', 'Alencar', 'Almada', 'Almeida', 'Alpuim', 'Alvarenga',
            'Álvares', 'Álvaro', 'Alvelos', 'Alves', 'Alvim', 'Amado', 'Amaral', 'Amarante', 'Amaro', 'Amoedo', 'Amorim', 'Andrade', 'Anes',
            'Angelim', 'Anhaia', 'Anjos', 'Anlicoara', 'Antas', 'Antunes', 'Aquino', 'Aragão', 'Aranha', 'Arantes', 'Araújo', 'Areosa',
            'Argolo', 'Arouca', 'Arruda', 'Assis', 'Assunção', 'Ataíde', 'Atilano', 'Aveiro', 'Avelar', 'Ávila', 'Azambuja', 'Azenha',
            'Azeredo', 'Azevedo', 'Bacelar', 'Baía', 'Baião', 'Bairros', 'Baldaia', 'Balsemão', 'Bandeira', 'Banha', 'Baptista', 'Barata',
            'Barateiro', 'Barbalho', 'Barbosa', 'Barcelos', 'Barra', 'Barreira', 'Barreiros', 'Barrico', 'Barrela', 'Barreno', 'Barreto',
            'Barroca', 'Barrocas', 'Barroqueiro', 'Barros', 'Barroso', 'Basílio', 'Bastos', 'Batata', 'Beiriz', 'Belchior', 'Belchiorinho',
            'Belém', 'Belmonte', 'Belo', 'Beltrão', 'Bencatel', 'Benevides', 'Bensaúde', 'Bentes', 'Bettencourt', 'Bento', 'Berenguer',
            'Bernardes', 'Bessa', 'Bezerra', 'Bezerril', 'Bicalho', 'Bicudo', 'Bilhalva', 'Bingre', 'Bivar', 'Boaventura', 'Boeira', 'Boga',
            'Bogado', 'Bonilha', 'Bonito', 'Borba', 'Borges', 'Borja', 'Botelho', 'Botica', 'Boto', 'Bouça', 'Bouças', 'Brandão', 'Braga',
            'Bragança', 'Branco', 'Brás', 'Brásio', 'Brasil', 'Breia', 'Brião', 'Brites', 'Brito', 'Brochado', 'Brum', 'Bugalho', 'Bulhões',
            'Bulhosa', 'Cabeça', 'Cabeça de Vaca', 'Cabral', 'Cabreira', 'Cachão', 'Cachoeira', 'Caçoilo', 'Cadaval', 'Cadavez', 'Caeira',
            'Caeiro', 'Caetano', 'Café', 'Caiado', 'Caires', 'Calado', 'Calçada', 'Caldas', 'Caldeira', 'Calheiros', 'Camacho', 'Câmara',
            'Camargo', 'Camarinho', 'Cambezes', 'Camelo', 'Camilo', 'Caminha', 'Campelo', 'Campos', 'Canadas', 'Canário', 'Cancela', 'Candal',
            'Candeias', 'Canedo', 'Caneira', 'Canejo', 'Canela', 'Cangueiro', 'Canhão', 'Caniça', 'Cantanhede', 'Canto', 'Caparica', 'Capistrano',
            'Capucho', 'Cardim', 'Cardoso', 'Carlos', 'Carmo', 'Carmona', 'Carneiro', 'Coronel', 'Carqueijeiro', 'Carrasco', 'Carrasqueira',
            'Carreira', 'Carregueiro', 'Carreiro', 'Carrilho', 'Carromeu', 'Cartaxo', 'Carvalhais', 'Carvalhal', 'Carvalheira', 'Carvalheiro',
            'Carvalho', 'Carvalhosa', 'Carvalhoso', 'Casado', 'Casalinho', 'Cascais', 'Casqueira', 'Castanheira', 'Castanho', 'Castanheda',
            'Castelhano', 'Castelo', 'Castelo Branco', 'Castilho', 'Castilhos', 'Castro', 'Catela', 'Cavadas', 'Cavaco', 'Cavalheiro', 'Cedraz',
            'Cedro', 'Cerqueira', 'Cerveira', 'César', 'Cesário', 'Chagas', 'Chainho', 'Chamusca', 'Charneca', 'Chaves', 'Chousa', 'Cidreira',
            'Cipriano', 'Cirne', 'Cisneiros', 'Clementino', 'Cobra', 'Coelho', 'Coimbra', 'Colaço', 'Colares', 'Conceição', 'Conde', 'Condorcet',
            'Cordeiro', 'Correia', 'Corte-Real', 'Cortês', 'Cortesão', 'Costa', 'da Costa', 'Cotrim', 'Couceiro', 'Coutinho', 'Couto', 'Covilhã',
            'Covinha', 'Craveiro', 'Cruz', 'Cunha', 'Curvelo', 'Custódio', 'Curado', 'Damasceno', 'Damásio', 'Dâmaso', 'Dantas', 'Delgado', 'Dias',
            'Diegues', 'Dinis', 'Dourado', 'Doutel', 'Doutis', 'Domingos', 'Domingues', 'Dorneles', 'Duarte', 'Durão', 'Durães', 'Dutra', 'Eanes',
            'Eiró', 'Escobar', 'Espargosa', 'Esparteiro', 'Espinosa', 'Espírito Santo', 'Esteves', 'Estrada', 'Estrela', 'Faia', 'Fagundes', 'Falcão',
            'Faleiro', 'Faria', 'Farias', 'Farinha', 'Faro', 'Fartaria', 'Faustino', 'Fazendeiro', 'Feijó', 'Feira', 'Feitosa', 'Félix', 'Fernandes', 'Ferraço', 'Ferrão',
            'Ferraz', 'Ferreira', 'Ferro', 'Festas', 'Fiães', 'Fialho', 'Fidalgo', 'Figueira', 'Figueiredo', 'Figueiró', 'Figueiroa', 'Filgueiras',
            'Filipe', 'Fitas', 'Fiúza', 'Flávio', 'Flores', 'Fogaça', 'Fonseca', 'Fontes', 'Fontinha', 'Fontoura', 'Foquiço', 'Fortes', 'Fortunato',
            'Frade', 'Fraga', 'Fragoso', 'Frajuca', 'Franca', 'França', 'Franco', 'Franca', 'Franqueira', 'Frazão', 'Freire', 'Freiria', 'Freitas',
            'Freixo', 'Frias', 'Frois', 'Frota', 'Furquim', 'Furtado', 'Gabeira', 'Gadelha', 'Gago', 'Galante', 'Galindo', 'Galvão', 'Gama', 'Gameiro',
            'Garcez', 'Garcia', 'Garrau', 'Garrido', 'Gaspar', 'Gentil', 'Gil', 'Ginjeira', 'Girão', 'Godinho', 'Godoi', 'Gois', 'Gomes', 'Gomide', 'Gonçalves',
            'Gorjão', 'Goulart', 'Gouveia', 'Goulão', 'Graça', 'Grande', 'Grangeia', 'Granja', 'Granjeiro', 'Gravato', 'Grilo', 'Guedelha', 'Guedes', 'Guerra',
            'Guerreiro', 'Guilheiro', 'Guimarães', 'Gusmão', 'Guterres', 'Henriques', 'Hernandes', 'Hilário', 'Hipólito', 'Holanda', 'Homem', 'Horta', 'Igrejas',
            'Ilha', 'Imperial', 'Inácio', 'Inês', 'Infante', 'Jamandas', 'Janes', 'Jardim', 'Jesus', 'Jobim', 'Jordão', 'Jorge', 'Júdice', 'Junqueira', 'Keil',
            'Lacerda', 'Lage', 'Lages', 'Lago', 'Lagoa', 'Lagos', 'Lalanda', 'Lamego', 'Lameira', 'Lameirinhas', 'Lameiras', 'Lamenha', 'Lampreia', 'Lancastre',
            'Landim', 'Lara', 'Laranjeira', 'Lários', 'Laureano', 'Leal', 'Leão', 'Leiria', 'Leitão', 'Leite', 'Leme', 'Lemes', 'Lemos', 'Lessa', 'Letras', 'Liberato',
            'Lima', 'Linhares', 'Lindim', 'Lins', 'Lira', 'Lisboa', 'Lobato', 'Lobo', 'Loio', 'Lopes', 'Lourenço', 'Loureiro', 'Lousã', 'Lousada', 'Lousado', 'Lucas',
            'Lucena', 'Lustosa', 'Luz', 'Macedo', 'Macena', 'Machado', 'Macieira', 'Maciel', 'Madeira', 'Madruga', 'Madureira', 'Mafra', 'Magalhães', 'Maia', 'Mainha',
            'Maior', 'Malafaia', 'Malheiro', 'Malho', 'Malta', 'Mamouros', 'Mangueira', 'Mansilha', 'Manso', 'Mantas', 'Maranhão', 'Marçal', 'Marcondes', 'Marinho',
            'Marins', 'Mariz', 'Marmou', 'Marques', 'Marreiro', 'Marroquim', 'Martinho', 'Martins', 'Mascarenhas', 'Mata', 'Mateus', 'Matias', 'Matos', 'Matosinhos',
            'Matoso', 'Medeiros', 'Medina', 'Meira', 'Meireles', 'Melancia', 'Melgaço', 'Mena', 'Melo', 'Mendes', 'Mendonça', 'Meneses', 'Mesquita', 'Mexia', 'Miguel',
            'Miguéis', 'Mieiro', 'Milhães', 'Milheirão', 'Milheiriço', 'Milheiro', 'Minho', 'Miranda', 'Mirandela', 'Modesto', 'Moita', 'Mondragão', 'Monforte', 'Monjardim',
            'Monsanto', 'MontAlverne', 'Monte', 'Montenegro', 'Monteiro', 'Morais', 'Morão', 'Moreira', 'Moreno', 'Morgado', 'Mortágua', 'Mota', 'Moura', 'Mourão',
            'Mourato', 'Mourinho', 'Moutinho', 'Muniz', 'Murteira', 'Murtinho', 'Muxagata', 'Narvais', 'Nascimento', 'Natal', 'Naves', 'Nazário', 'Negrão', 'Negreiros',
            'Negromonte', 'Neiva', 'Neres', 'Neto', 'Neves', 'Ninharelhos', 'Nobre', 'Nóbrega', 'Nogueira', 'Noite', 'Nolasco', 'Noleto', 'Norões', 'Noronha', 'Novais',
            'Nunes', 'Olaio', 'Oleiro', 'Olivares', 'Oliveira', 'Onofre', 'Ornelas', 'Orriça', 'Osório', 'Ourique', 'Ouro', 'Outeiro', 'Pacheco', 'Padilha', 'Pádua', 'Paião',
            'Pais', 'Paiva', 'Paixão', 'Palha', 'Palhares', 'Palma', 'Palmeira', 'Palos', 'Parafita', 'Paranhos', 'Pardo', 'Paredes', 'Parente', 'Parracho', 'Parreir', 'Passarinho',
            'Passos', 'Pastana', 'Patrício', 'Paula', 'Paulos', 'Paz', 'Peçanha', 'Pêcego', 'Pederneiras', 'Pedro', 'Pedroso', 'Pegado', 'Peixoto', 'Penha', 'Penteado', 'Pequeno', 'Peralta', 'Perdigão', 'Pereira', 'Pescada', 'Peseiro', 'Pessoa', 'Pestana',
            'Picanço', 'Picão', 'Pimenta', 'Pimentel', 'Pinhal', 'Pinheiro', 'Pinho', 'Pinto', 'Piteira', 'Pires', 'Poças', 'Ponte', 'Pontes', 'Porciúncula', 'Portela', 'Porto',
            'Portugal', 'Póvoas', 'Prada', 'Prado', 'Prates', 'Prestes', 'Proença', 'Protásio', 'Prudente', 'Pureza', 'Quadros', 'Quaresma', 'Queiroga', 'Queirós', 'Quental', 'Quesado',
            'Quina', 'Quinaz', 'Quinta', 'Quintal', 'Quintana', 'Quintanilha', 'Quintas', 'Quintais', 'Quintão', 'Quinteiro', 'Quintela', 'Quinterno', 'Quinzeiro', 'Quirino', 'Rabelo',
            'Ramalho', 'Raminhos', 'Ramires', 'Ramos', 'Rangel', 'Raposo', 'Rebelo', 'Rebimbas', 'Rebocho', 'Rebotim', 'Rebouças', 'Redondo', 'Regalado', 'Rego', 'Regodeiro', 'Regueira',
            'Rei', 'Reino', 'Reis', 'Remígio', 'Resende', 'Ribas', 'Ribeiro', 'Rico', 'Rijo', 'Rios', 'Robalinho', 'Robalo', 'Roçadas', 'Rocha', 'Rodovalho', 'Rodrigues', 'Rolim', 'Roriz',
            'Rosa', 'Rosado', 'Rosário', 'Rosmaninho', 'Rua', 'Ruas', 'Ruela', 'Rufino', 'Sá', 'Sabala', 'Sabrosa', 'Sacadura', 'Sacramento', 'Salazar', 'Saldanha', 'Sales', 'Salgado',
            'Salgueiro', 'Salvado', 'Saloio', 'Salomão', 'Saltão', 'Sampaio', 'Sanches', 'Sandinha', 'Santana', 'Santarém', 'Santiago', 'Santos', 'Saraiva', 'Sardinha', 'Sardo', 'Sarmento',
            'Seabra', 'Seixas', 'Semedo', 'Serpa', 'Serralheiro', 'Serro', 'Sesimbra', 'Setúbal', 'Severiano', 'Severo', 'Silva', 'Silveira', 'Silvestre', 'Simas', 'Simões', 'Simão', 'Sintra',
            'Sítima', 'Sequeira', 'Soares', 'Sobral', 'Sobreira', 'Sodré', 'Soeiro', 'Sousa', 'Souto', 'Souto Maior', 'Soveral', 'Soverosa', 'Tabanez', 'Taborda', 'Tabosa', 'Talhão', 'Tavares',
            'Taveira', 'Taveiros', 'Távora', 'Teixeira', 'Tedim', 'Teles', 'Telinhos', 'Temes', 'Teodoro', 'Terra', 'Teves', 'Tigre', 'Tinoco', 'Toledo', 'Tomé', 'Torquato', 'Torrado', 'Torreiro',
            'Torres', 'Toscano', 'Travassos', 'Toste', 'Trigueiro', 'Trindade', 'Tristão', 'Tuna', 'Uchoa', 'Ulhoa', 'Úria', 'Urias', 'Valadão', 'Valadares', 'Valadim', 'Valcácer', 'Valcanaia',
            'Vale', 'Valente', 'Valentim', 'Valério', 'Valgueiro', 'Valido', 'Valim', 'Valverde', 'Varanda', 'Varão', 'Varejão', 'Varela', 'Vargas', 'Vasconcelos', 'Vasques', 'Vaz', 'Veiga',
            'Velasco', 'Velasques', 'Veleda', 'Veloso', 'Ventura', 'Vergueiro', 'Veríssimo', 'Viana', 'Vidal', 'Vides', 'Vidigal', 'Viegas', 'Vieira', 'Vigário', 'Vila-Chã', 'Vilaça', 'Vilalobos',
            'Vilanova', 'Vilante', 'Vilar', 'Vilariça', 'Vilas Boas', 'Vilaverde', 'Vilela', 'Vilhena', 'Vinhas', 'Vital', 'Viveiros', 'Xavier', 'Ximenes', 'Xisto', 'Zagalo', 'Zambujal', 'Zarco'];
        const nomes = [
            "Maria", "Matilde", "Leonor", "Carolina", "Beatriz", "Mariana", "Ana", "Sofia", "Inês", "Margarida",
            "Francisca", "Lara", "Laura", "Alice", "Joana", "Clara", "Diana", "Madalena", "Mara", "Luana",
            "Benedita", "Constança", "Mafalda", "Bianca", "Íris", "Sara", "Camila", "Gabriela", "Rita", "Eva",
            "Carlota", "Letícia", "Vitória", "Ema", "Luísa", "Catarina", "Ariana", "Yasmin", "Yara", "Carminho",
            "Miriam", "Marta", "Alícia", "Rafaela", "Luena", "Victória", "Núria", "Kyara", "Helena", "Valentina",
            "Júlia", "Bárbara", "Isabel", "Nicole", "Daniela", "Lia", "Bruna", "Melissa", "Noa", "Jéssica", "Teresa",
            "Iara", "Raquel", "Filipa", "Mia", "Érica", "Luna", "Isis", "Caetana", "Alexandra", "Mélanie", "Pilar",
            "Juliana", "Kelly", "Isabela", "Adriana", "Aurora", "Débora", "Soraia", "Eduarda", "Lorena", "Áurea",
            "Olívia", "Amélia", "Emília", "Naiara", "Frederica", "Irina", "Renata", "Anita", "Larissa", "Petra", "Emma",
            "Sarah", "Vera", "Tatiana", "Julieta", "Nádia", "Mayara", "Salomé", "Samira", "Rebeca", "Fabiana", "Patrícia",
            "Simone", "Paloma", "Aline", "Liliana", "Nair", "Luz", "Luciana", "Andreia", "Isabella", "Dalila", "Chloe",
            "Ester", "Flor", "Safira", "Erika", "Elisa", "Anna", "Rosa", "Mónica", "Cláudia", "Lúcia", "Abigail", "Ângela",
            "Rosarinho", "Sophia", "Carla", "Alana", "Micaela", "Bia", "Fátima", "Maiara", "Emily", "Eliana", "Carmo", "Dânia",
            "Marisa", "Erica", "Cíntia", "Amália", "Raissa", "Viviane", "Serena", "Vanessa", "Clarisse", "Denise", "Carina",
            "Violeta", "Eliane", "Rute", "Flávia", "Kiara", "Iris", "Liara", "Susana", "Cristina", "Cecília", "Giovana", "Nayara",
            "Márcia", "Oriana", "Milena", "Victoria", "Lídia", "Dara", "Manuela", "Cristiana", "Estrela", "Elena", "Lea", "Liana",
            "Angélica", "Solange", "Telma", "Dayane", "Sónia", "Antónia", "Verónica", "Marina", "Aléxia", "Ariane", "Isa", "India",
            "Paula", "Simara", "Liane", "Ellen", "Lívia", "Daria", "Neuza", "Lais", "Tânia", "Leila", "Sandra", "Priscila", "Martina",
            "Riana", "Melanie", "Tamara", "Samanta", "Valéria", "Jénifer", "Ariele", "Maísa", "Deise", "Maia", "Taís", "Carmen",
            "Briana", "Glória", "Amanda", "Ciara", "Doriana", "Esther", "Thaís", "Clarinha", "Jacinta", "Guiomar", "Esmeralda",
            "Brenda", "Aisha", "Anaísa", "Esperança", "Viviana", "Elsa", "Lua", "Natacha", "Olivia", "Oceana", "Luzia", "Ashley",
            "Tamára", "Concha", "Nina", "Noemi", "Cloe", "Maya", "Rafaella", "Rayanne", "Ísis", "Alicia", "Zoé", "Sabrina", "Estela",
            "Maira", "Lya", "Naísa", "Dora", "Cloé", "Charlotte", "Angelina", "Taísa", "Samara", "Penélope", "Lília", "Luisa", "Chloé",
            "Jennifer", "Suri", "Stella", "Maura", "Eunice", "Martinha", "Aysha", "Aura", "Maryam", "Karina", "Mayra", "Alma", "Josiane",
            "Eleonor", "Anaís", "Vânia", "Laís", "Graça", "Rayssa", "Mercedes", "Alissa", "Ária", "Lisandra", "Alexa", "Adelaide", "Miranda",
            "Naíma", "Yohanna", "Lígia", "Stephanie", "Adelina", "Irís", "Melina", "Lina", "Alexia", "Cátia", "Liz", "Jussara", "Mila", "Carol",
            "Dulce", "Fatumata", "Cândida", "Pérola", "Isaura", "Taíssa", "Jade", "Joyce", "Lavínia", "Suéli", "Irene", "Kayla", "Nídia", "Aurea",
            "Anabela", "Michele", "Emilly", "Mirian", "Hellen", "Tiffany", "Mercês", "Milana", "Nancy", "Naomi", "Rebecca", "Jacira", "Katie", "Nara",
            "Anastasia", "Leticia", "Leandra", "Giovanna", "Morgana", "Anamar", "Jessica", "Tiara", "Anaya", "Matilda", "Zoe", "Alessia", "Andrea",
            "Flora", "Magda", "Ayla", "Adriela", "Rania", "Evelyn", "Luiza", "Elisabete", "Joelma", "Marlene", "Tiana", "Melany", "Keyla", "Fernanda",
            "Malika", "Dádiva", "Allana", "Nayra", "Natália", "Natalia", "Cinara", "Michelle", "Diva", "Hannah", "Marisol", "Lucília", "Stela", "Luara",
            "Janice", "Sol", "Kataleya", "Sheila", "Cataleya", "Cassandra", "Bella", "Florbela", "Celina", "Aida", "Milene", "Alina", "Melyssa", "Kaylane",
            "Branca", "Iriana", "Dafne", "Amora", "Liliane", "Janaína", "Suria", "Lana", "Ariel", "Sílvia", "Kimberly", "Siena", "Silvana", "Weza", "Evelina",
            "Haniela", "Veronica", "Guadalupe", "Rayane", "Alyssa", "Mariam", "Sophie", "Joice", "Camilla", "Alba", "Kieza", "Jasmina", "Veronika", "Khadija",
            "Hadassa", "Polina", "Yasmine", "Cármen", "Nadine", "Sienna", "Ariela", "Zara", "Elisabeth", "Seerat", "Maimuna", "Ânia", "Klara", "Ália", "Melinda",
            "Brianna", "Ava", "Nour", "Ândria", "Aicha", "Zita", "Tabita", "Nalini", "Rossana", "Isadora", "Sharon", "Laryssa", "Taynara", "Barbara", "Lucy",
            "Andreea", "Dina", "Maitê", "Lola", "Lena", "Teresinha", "Ellie", "Elvira", "Sahara", "Aylla", "Catalina", "Nicolly", "Marília", "Stephany", "Rúbia",
            "Noémi", "Filomena", "Eliza", "Agatha", "Denisa", "Daisi", "Fábia", "Olga", "Aaliyah", "Emilia", "Nayla", "Liany", "Sasha", "Nikol", "Muriel", "Pietra",
            "Latifa", "Aliça", "Lira", "Ticiana", "Leah", "Lucía", "Edna", "Stefany", "Nuna", "Daiana", "Quélia", "Leia", "Radija", "Emanuela", "Fatima", "Thayla",
            "Ivana", "Kira", "Anabel", "Amy", "Cássia", "Sarai", "Arina", "Geovana", "Pandora", "Francesca", "Letízia", "Alda", "Estefânia", "Amira", "Mirela", "Lunna",
            "Hoorain", "Dália", "Zaira", "Cora", "Kailany", "Zoey", "Suely", "Sehajpreet", "Ionara", "Jandira", "Indira", "Mathilde", "Hawa", "Linda", "Debora", "Aleksandra",
            "Dominique", "Anair", "Heloísa", "Gisela", "Jana", "Delia", "Rosário", "Mágui", "Stefania", "Inara", "Lidiana", "Cristal", "Cheila", "Jasmeen", "Letizia", "Laureana",
            "Anaelle", "Vilma", "Manha", "Andra", "Amelia", "Ayumi", "Melody", "Yasmina", "Assunção", "Genésia", "Nayma", "Nadia", "Nélia", "Antonia", "Crystal", "Yana", "Kamila",
            "Thayra", "Élia", "Ayesha", "Lurdes", "Emanuelle", "Aryana", "Anastácia", "Jael", "Aliana", "Zélia", "Eveline", "Otília", "Perla", "Chelsea", "Yi", "Kendra", "Hayla",
            "Viktoria", "Jil", "Fedra", "Ivy", "Samaritana", "Marwa", "Miguela", "Aliyha", "Josefa", "Poliana", "Karen", "Laysla", "Ranya", "Lilian", "Josefina", "Maribel", "Piedade",
            "Amina", "Lyah", "Djelissa", "Suzi", "Viktoriya", "Jasmeet", "Adélia", "Isís", "Rahyssa", "Stéphanie", "Orquídea", "Shaira", "Adama", "Graciana", "Ludmila", "Yangchen", "Emilie",
            "Rose", "Céline", "Dayra", "Anaisa", "Alisa", "Aya", "íris", "Anastacia", "Lavinia", "Jacyara", "Alisha", "Hossana", "Ananda", "Soraya", "Malak", "Arianna", "Karolina", "Marie",
            "Florinda", "Samantha", "Karine", "Kaya", "Ayani", "Bela", "Ohana", "Angela", "Jia", "Mikaela", "Isabelly", "Rahela", "Dilnura", "Elzira", "Mariama", "Elizabeth", "Anais", "Oumou",
            "Louisa", "Estefany", "Layra", "Thaíssa", "Cidália", "Selma", "Olinda", "Katia", "Grace", "Mankirat", "Girisha", "Lueji", "Heloisa", "Zlata", "Roberta", "Louise", "Ticiane", "Prapti",
            "Melânia", "Lyara", "Séfora", "Tamar", "Mellyssa", "Katerina", "Dominika", "Izabel", "Suzana", "Yaqi", "Elizabet", "Ágata", "Valentine", "Amélie", "Vivian", "Neusa", "Gaia", "Deva", "Raina", "Dária", "Lícia", "Stacy", "Elisete", "Elisama", "Hareem", "Eshal", "Inaaya",
            "Andressa", "KellY", "Hélia", "Giulia", "Yiyi", "Quessia", "Lyana", "Yassna", "Iasmin", "Zilda", "Myriam", "Adriele", "Cleide", "Sujana", "Andreína",
            "Gabrielly", "Mel", "Janira", "Geovanna", "Adele", "Celeste", "Nayr", "Aliya", "Raíssa", "Alycia", "Berenice", "Cadija", "Hafsa", "Virgínia", "Bebiana",
            "Anny", "Luenna", "Nelsa", "Izabella", "Julia", "Neide", "Evelin", "Simona", "Jessie", "Surya", "Gina", "Ayra", "Rosalina", "Jane", "Lisa", "Tainara",
            "Jasmine", "Miria", "Mellanie", "Ndeye", "Santiago", "João", "Francisco", "Rodrigo", "Martim", "Afonso", "Tomás", "Miguel", "Duarte", "Gabriel", "Lourenço",
            "Gonçalo", "Pedro", "Guilherme", "Tiago", "Dinis", "Rafael", "Diogo", "Lucas", "Salvador", "Gustavo", "David", "Vicente", "Simão", "José", "Mateus", "Diego",
            "Manuel", "Henrique", "António", "Daniel", "Vasco", "Leonardo", "Bernardo", "André", "Luís", "Enzo", "Eduardo", "Alexandre", "Isaac", "Kevin", "Rúben",
            "Filipe", "Matias", "Leandro", "Xavier", "Ricardo", "Samuel", "Artur", "Nuno", "Bruno", "Carlos", "Davi", "Sebastião", "Hugo", "Valentim", "Rui", "Frederico",
            "Renato", "Bryan", "Jorge", "Lorenzo", "Benjamim", "Joaquim", "Paulo", "Marco", "Noah", "Mário", "Fábio", "Jaime", "Manel", "Tomé",
            "William", "Cristiano", "Ângelo", "Micael", "Gil", "Ivo", "Edgar", "Raúl", "Fernando", "Brian",
            "Ivan", "César", "Emanuel", "Gaspar", "Luca", "Vítor", "Romeu", "Sandro", "Dilan", "Sérgio",
            "Alex", "Igor", "Eric", "Marcelo", "Elias", "Denis", "Caio", "Isac", "Ismael", "Liam", "Lisandro",
            "Jonathan", "Moisés", "Yuri", "Muhammad", "Josué", "Cláudio", "Mauro", "Adrien", "Danilo", "Joel",
            "Erik", "Álvaro", "Nelson", "Dário", "Márcio", "Martinho", "Wesley", "Matheus", "Levi", "Telmo",
            "Marcos", "Júlio", "Wilson", "Martin", "Victor", "Leonel", "Arthur", "Leo", "Oliver", "Abel",
            "Thiago", "Cristian", "Benjamin", "Dylan", "Misael", "Edson", "Ian", "Fausto", "Christian",
            "Ezequiel", "Jonas", "Andrei", "Raul", "Gerson", "Giovani", "Caetano", "Matteo", "Luan", "Ryan",
            "Adam", "Hélder", "Nicolau", "Sebastian", "Cauã", "Patrick", "Estêvão", "Flávio", "Adriano",
            "James", "Óscar", "Nicolas", "Alexandru", "Kelvin", "Joshua", "Roberto", "Kendrick", "Augusto",
            "Cristóvão", "Alberto", "Jesus", "Natanael", "Domingos", "Vitor", "Adriel", "Erick", "Mark", "Jason",
            "Davide", "Ruben", "Félix", "Marcus", "Luciano", "Denzel", "Heitor", "Jonatã", "Gael", "Iúri",
            "Aléxis", "Kévim", "Mikael", "Aron", "Luis", "Israel", "Lucca", "Ulisses", "Alonso", "Thomas",
            "Célio", "Helder", "Dennis", "Mohammad", "Rúdi", "Rayan", "Damien", "Edmundo", "Mohamed", "Adrian",
            "Ary", "Noé", "Agostinho", "Nataniel", "Valentino", "Maurício", "Fabrício", "Denilson", "Felipe",
            "Theo", "Éder", "Orlando", "Pietro", "Joabe", "Ravi", "Isaque", "Rogério", "Américo", "Enrique",
            "Raphael", "Aaron", "Alexandro", "Juliano", "Breno", "Jónatas", "Jair", "Ianis", "Isael", "Robert",
            "Salomão", "Ícaro", "Tobias", "Amadeu", "Júnior", "Kenzo", "Nathan", "Kauã", "Ibrahim", "Alexander",
            "Omar", "Anselmo", "Fred", "Élson", "Zion", "Théo", "Jayden", "Eduard", "Válter", "Henry", "Mickael",
            "Diniz", "Mateo", "Samir", "Lúcio", "Kennedy", "Tierri", "Messias", "Hélio", "Abdul", "Humberto",
            "Antonio", "Celso", "Marlon", "Jerónimo", "Kauan", "Timóteo", "Haniel", "Iago", "Stefan", "Eliel",
            "Armando", "Giovanni", "Dominic", "Derick", "Jayson", "Liedson", "Daniil", "Adonai", "Hernâni",
            "Absalão", "Jessé", "Ethan", "Hazael", "Yu", "Damian", "Maksym", "Mamadou", "Angelo", "Amir",
            "Giani", "Yannick", "Evan", "Azael", "Zaqueu", "Kelton", "Maksim", "Milan", "Maxim", "Ruan", "Jaden",
            "Anderson", "Yanni", "Matviy", "Chris", "Marcelino", "Apolo", "Silvestre", "Aires", "Brayan", "Jairo",
            "Ayaan", "Timur", "Alessandro", "Alfredo", "Martín", "Keven", "Kiamy", "Lázaro", "Max", "Alan", "Bento",
            "Saúl", "Isaías", "Lukas", "Kian", "Djeyson", "Darius", "Mohammed", "Matei", "Eliézer", "Aryan", "Pablo",
            "Youssef", "Anthony", "Luiz", "Armaan", "Kleyton", "Evandro", "Angélico", "Artyom", "Josias", "Nilson",
            "Marvin", "Máximo", "Marley", "Kévin", "Délcio", "Benício", "Yohan", "Deivid", "Uriel", "Raphaël", "Vladimir", "Lopo", "Nicollas", "Oziel", "Steven", "Nikita", "Aleksandr", "Inácio", "Vladislav",
            "Prince", "Abdullah", "George", "Dante", "Derek", "Axel", "Eurico", "Zayn", "Johnny", "Elijah",
            "Baltasar", "Gastão", "Felix", "Nicholas", "Ioan", "Fabiano", "Rubim", "Delmar", "Michael", "Sancho",
            "Arsénio", "Francesco", "Armindo", "Jack", "Valentin", "Rubi", "Christopher", "Eder", "Abdoulaye",
            "Maximus", "Neymar", "Jan", "Richard", "Reinaldo", "Ion", "Delfim", "Nazar", "Jacinto", "Juan",
            "Ezio", "Emídio", "Virgílio", "Kelson", "Davy", "Bogdan", "Sílvio", "Alexandr", "Diamantino",
            "Louis", "Emmanuel", "Iulian", "Oscar", "Tito", "Nilton", "Nélson", "Gusttavo", "Estevão", "Aarnav",
            "Jeferson", "Joseph", "Agrim", "Lamarana", "Helton", "Édi", "Wallace", "Danilson", "Keyson",
            "Belchior", "Dérick", "Walter", "Albert", "Fernão", "Shayan", "Mario", "Kael", "Mustafa", "Georgi",
            "Anael", "Francis", "Esteban", "Enoque", "Hermano", "Kiari", "Mílton", "Ibrahima", "Calebe", "Simon",
            "Ezra", "Yannis", "Mauri", "Emílio", "Tom", "Willian", "Hamilton", "Kayden", "Tyron", "Abraão",
            "Elielson", "Laércio", "Hao", "Guransh", "Eli", "Atanas", "Eddy", "Ming", "Ivanilson", "Jefferson",
            "Fabian", "Marcel", "Vasile", "Kimi", "Bartolomeu", "Jia", "Cédric", "Arnaldo", "Valter", "Eliseu",
            "Kyami", "Edir", "Jóni", "Léon", "Mariano", "Kyle", "Cael", "Kirill", "Nikolai", "Henzo", "Rodney",
            "Michel", "Lev", "Lui", "Yi", "Rodolfo", "Ben", "Nathaniel", "Camilo", "Giovany", "Kushal", "Samoa",
            "Alcino", "Jun", "Filip", "Túlio", "Kaio", "Élton", "Elói", "Abrão", "Atílio", "Asael", "Nélio",
            "Arman", "Cristovão", "Jadir", "Viriato", "Oleksandr", "Eden", "Ionut", "Abílio", "Ahmad", "Ayrton",
            "Jimmy", "Gelson", "Eusébio", "Éric", "Teófilo", "Ilídio", "Luka", "Antoine", "Harry", "Luke", "Finn",
            "Hilário", "Jordan", "Antônio", "Aayush", "Maximiano", "Brahim", "Zhen", "Andriy", "Gilberto", "Tyler",
            "Avelino", "Kevyn", "Arian", "Lian", "Antero", "Nicolae", "Milton", "Pavel", "Jonata", "Adrián", "Romão",
            "Janilson", "Dario", "Damião", "Stephen", "Raj", "Zé", "Alvin", "Mathias", "Osvaldo", "Gianluca", "Edwin",
            "Jamie", "Russell", "Ravidson", "Destiny", "Érico", "Kyan", "Mizael", "Gilson", "Ari", "Dinarte", "Patrício",
            "Giorgi", "Yaroslav", "Teotónio", "Adalberto", "Santhiago", "Amaro", "Laurindo", "Zihao", "Nikolas", "Kylian",
            "Catalin", "Djayson", "Mouhamed", "Claúdio", "Bilal", "Kristian", "Oséias", "Aarav", "Jeremias", "Ishan",
            "Valdemar", "Imran", "Nilo", "Kenny", "Riyan", "Aman", "Januário", "Rian", "Nicola", "Matthias"]
        const conectivos = ["", " de",]
        const nome = nomes[Math.floor(Math.random()*nomes.length)]
        const sobrenome1 = sobrenomes[Math.floor(Math.random()*sobrenomes.length)]
        const sobrenome2 = conectivos[Math.floor(Math.random()*conectivos.length)]
        const sobrenome3 = sobrenomes[Math.floor(Math.random()*sobrenomes.length)]

        return nome+" "+sobrenome1+""+sobrenome2+" "+sobrenome3
    }

    const geraNumDoc = () => {
        let primeiroDigito = Math.floor(Math.random()*10000000)
        while(primeiroDigito.length < 8){
            primeiroDigito = "0"+primeiroDigito
        }
        const segundoDigito = Math.floor((Math.random()*10))
        return `${primeiroDigito}-${segundoDigito}`
    }

    const geraDestino = () => {
        let localDestino = 0
        do {
            localDestino = Math.floor(Math.random()*(paradas.length-1-parada))+parada+1
        } while (paradas[localDestino].tipo == 'parada');
        return localDestino
    }

    const verPoltronas = () => {
        poltronas.map((poltrona, index) => {
            if(poltrona[0] == 1){
                console.log(`${index+1} - ${poltrona[0]} [${poltrona[1].Nome}]`)
            }
        })
        setPoltronasVisible(!poltronasVisible)
    }

    const iniciarEmbarque = () => {
        setSituacao('Aguardando embarque')
        setBtnOn(false)
    }

    const iniciarDesembarque = () => {
        setPoltronas(poltronas.map((poltrona, index) => {
            if(poltrona[0] == 1){
                if(poltrona[1].Destino == parada){

                    console.log(`${poltrona[1].Nome} desembarcou`)
                    return [0, {}]
                }else{
                    return poltrona
                }
            }
            return poltrona
        }))
    }

    const totalPoltronasVazias = () => {
        let total = 0
        poltronas.map((poltrona) => {
            if(poltrona[0] == 0){
                total++
            }
        })
        return total
    }

    const geraPassageiros = () => {
        let passageiros = []
        poltronas.map((poltrona, index) => {
            if(poltrona[0] == 0 && Math.random()*100 > 30){
                let numDoc = geraNumDoc()
                let nomeDoc = geraNomeDoc()
                let nome = Math.random()*100 > 95 ? geraNomeDoc() : nomeDoc
                let numDoc2 = Math.random()*100 > 95 ? geraNumDoc() : numDoc
                let dataPassagem = geraDataPassagem(false)
                let regular = true
                if(numDoc != numDoc2 || nome != nomeDoc || dataPassagem != geraDataPassagem(true)){
                    regular = false
                }
                passageiros.push({
                    'NomeDoc': nomeDoc,
                    'NumDocDoc': numDoc,
                    'DataNasc': geraDataNascimento(),
                    'Nome': nome,
                    'NumDoc': numDoc2,
                    'Origem': parada,
                    'Destino': geraDestino(),
                    'Data': dataPassagem,
                    'Poltrona': index+1,
                    'Regular': regular
                })
            }
        })
        console.log('passageiros Gerados')
        console.log(passageiros)
        setPassageiroEmbarque(passageiros[0])
        setPassageirosEmbarque(passageiros)
    }
    const seguirViagem = () => {
        setSituacao('Confirmar Chegada')
        setSituacaoDesc("Em rota para ")
        setParada(parada+1)
        if(paradas[parada].tipo == 'embarque'){
            setPassageirosEmbarque([])
            setPassageiroEmbarque()
        }
        
    }
    const functionButton = async () => {
        if(viagemId){
            
        }
        if(situacao == 'Iniciar Embarque'){
            setSituacaoDesc("Embarcando em ")
            geraPassageiros()
            iniciarEmbarque()
        }
        if(situacao == 'Finalizar Embarque'){
            setSituacao("Finalizando embarque")
            setBtnOn(false)
            await sleep((embarqueTempoMin*1000)+Math.random()*(1000*(embarqueTempoMax-embarqueTempoMin)))
            setBtnOn(true)
            setSituacaoDesc("Embarque finalizado em ")
            seguirViagem()
            if(parada == 0 && !route.params.emAndamento){
                iniciaViagem()
            }else{
                atualizaViagem()
            }
        }
        if(situacao == "Continuar Viagem"){
            seguirViagem()
            atualizaViagem()
        }
        if(situacao == 'Confirmar Chegada'){
            if(paradas[parada].tipo == 'embarque'){
                setSituacaoDesc("Desembarcando em ")
                setBtnOn(false)
                setSituacao("Aguardando desembarque")
                await sleep((desembarqueTempoMin*1000)+Math.random()*(1000*(desembarqueTempoMax-desembarqueTempoMin)))
                iniciarDesembarque()
                setBtnOn(true)
                if(parada == paradas.length-1){
                    setSituacao('Viagem Finalizada')
                    setViagemFinalizada(true)
                    setBtnOn(false)
                    finalizaViagem()
                    // setDataFim(new Date())
                }else{
                    setSituacao('Iniciar Embarque')
                    atualizaViagem()
                }
            }else{                
                setSituacaoDesc(`Aguardando parada [${paradas[parada].tempoP}s] em `)
                setBtnOn(false)
                setSituacao("Aguardando parada")
                await sleep(parseInt(paradas[parada].tempoP)*1000)
                setBtnOn(true)
                setSituacao("Continuar Viagem")
                atualizaViagem()
            }
        }
    }

    const impedirEmbarque = () => {
        passageirosEmbarque.splice(0,1)
        setPassageiroEmbarque(passageirosEmbarque[0])
    }

    const embarcarPassageiro = () => {
        const passageiro = passageiroEmbarque
        if(passageiro.Regular == false){
            console.log("passageiro irregular subiu!")
            setTotalPassageirosIrregulares(totalPassageirosIrregulares+1)
        }
        passageirosEmbarque.splice(0,1)
        setTotalPassageirosViagem(totalPassageirosViagem+1)
        if(passageirosEmbarque.length == 0){
            setSituacao('Finalizar Embarque')
            setBtnOn(true)
            console.log(poltronas)
        }else{
            setPassageiroEmbarque(passageirosEmbarque[0])
            setPoltronas(poltronas.map((poltrona,index) => {
                if(passageiro.Poltrona == index+1){
                    return [1, passageiro]
                }else{
                    return poltrona
                }
            }))
        }
    }

    useEffect(() => {
        const emAndamento = route.params.emAndamento
        setHorarioPersonalizado(route.params.horarioPersonalizado)
        if(route.params.horarioPersonalizado){
            setHoraInicio(route.params.horaInicio)
            setMinutoInicio(route.params.minutoInicio)
        }else{
            setHoraInicio(route.params.rota[0].horarioHora)
            setMinutoInicio(route.params.rota[0].horarioMinuto)
        }
        usuarioService.getIdUsuarioLogado((resUser) => {
            usuarioService.getInformacoesUsuario(resUser, (res)=>{
                setDesembarqueTempoMax(res.desembarqueTempoMax)
                setEmbarqueTempoMax(res.embarqueTempoMax)
                setDesembarqueTempoMin(res.desembarqueTempoMin)
                setEmbarqueTempoMin(res.embarqueTempoMin)
                if(emAndamento){
                    const viagemInfo = route.params.viagemInfo
                    const rotaInfo = route.params.rotaInfo
                    console.log(viagemInfo)
                    console.log(rotaInfo)
                    setViagemId(viagemInfo.viagemId)
                    setBtnOn(viagemInfo.btnOn)
                    setParada(viagemInfo.parada)
                    setPassageirosEmbarque(viagemInfo.passageirosEmbarque)
                    setSituacao(viagemInfo.situacao)
                    setSituacaoDesc(viagemInfo.situacaoDesc)
                    setTotalPassageirosIrregulares(viagemInfo.totalPassageirosIrregulares)
                    setTotalPassageirosViagem(viagemInfo.totalPassageirosViagem)
                    onibusService.getOnibusByPrefixo(viagemInfo.onibus, (res) => {
                        setOnibus(res)
                        if(res.servico == 'Convencional'){
                            setPoltronas([viagemInfo.p1,viagemInfo.p2,viagemInfo.p3,viagemInfo.p4,viagemInfo.p5,viagemInfo.p6,viagemInfo.p7,viagemInfo.p8,
                                viagemInfo.p9,viagemInfo.p10,viagemInfo.p11,viagemInfo.p12,viagemInfo.p13,viagemInfo.p14,viagemInfo.p15,viagemInfo.p16,
                                viagemInfo.p17,viagemInfo.p18,viagemInfo.p19,viagemInfo.p20,viagemInfo.p21,viagemInfo.p22,viagemInfo.p23,viagemInfo.p24,
                                viagemInfo.p25,viagemInfo.p26,viagemInfo.p27,viagemInfo.p28,viagemInfo.p29,viagemInfo.p30,viagemInfo.p31,viagemInfo.p32,
                                viagemInfo.p33,viagemInfo.p34,viagemInfo.p35,viagemInfo.p36,viagemInfo.p37,viagemInfo.p38,viagemInfo.p39,viagemInfo.p40,
                                viagemInfo.p41,viagemInfo.p42,viagemInfo.p43,viagemInfo.p44,viagemInfo.p45,viagemInfo.p46,viagemInfo.p47,viagemInfo.p48])
                        }
                        if(res.servico == 'Executivo'){
                            setPoltronas([viagemInfo.p1,viagemInfo.p2,viagemInfo.p3,viagemInfo.p4,viagemInfo.p5,viagemInfo.p6,viagemInfo.p7,viagemInfo.p8,
                                viagemInfo.p9,viagemInfo.p10,viagemInfo.p11,viagemInfo.p12,viagemInfo.p13,viagemInfo.p14,viagemInfo.p15,viagemInfo.p16,
                                viagemInfo.p17,viagemInfo.p18,viagemInfo.p19,viagemInfo.p20,viagemInfo.p21,viagemInfo.p22,viagemInfo.p23,viagemInfo.p24,
                                viagemInfo.p25,viagemInfo.p26,viagemInfo.p27,viagemInfo.p28,viagemInfo.p29,viagemInfo.p30,viagemInfo.p31,viagemInfo.p32,
                                viagemInfo.p33,viagemInfo.p34,viagemInfo.p35,viagemInfo.p36,viagemInfo.p37,viagemInfo.p38,viagemInfo.p39,viagemInfo.p40,
                                viagemInfo.p41,viagemInfo.p42,viagemInfo.p43,viagemInfo.p44,viagemInfo.p45,viagemInfo.p46])
                        }
                        if(res.servico == 'Semi-leito'){
                            setPoltronas([viagemInfo.p1,viagemInfo.p2,viagemInfo.p3,viagemInfo.p4,viagemInfo.p5,viagemInfo.p6,viagemInfo.p7,viagemInfo.p8,
                                viagemInfo.p9,viagemInfo.p10,viagemInfo.p11,viagemInfo.p12,viagemInfo.p13,viagemInfo.p14,viagemInfo.p15,viagemInfo.p16,
                                viagemInfo.p17,viagemInfo.p18,viagemInfo.p19,viagemInfo.p20,viagemInfo.p21,viagemInfo.p22,viagemInfo.p23,viagemInfo.p24,
                                viagemInfo.p25,viagemInfo.p26,viagemInfo.p27,viagemInfo.p28,viagemInfo.p29,viagemInfo.p30,viagemInfo.p31,viagemInfo.p32,
                                viagemInfo.p33,viagemInfo.p34,viagemInfo.p35,viagemInfo.p36,viagemInfo.p37,viagemInfo.p38,viagemInfo.p39,viagemInfo.p40,
                                viagemInfo.p41,viagemInfo.p42,viagemInfo.p43,viagemInfo.p44])
                        }
                        if(res.servico == 'Executivo/Leito (DD)'){
                            setPoltronas([viagemInfo.p1,viagemInfo.p2,viagemInfo.p3,viagemInfo.p4,viagemInfo.p5,viagemInfo.p6,viagemInfo.p7,viagemInfo.p8,
                                viagemInfo.p9,viagemInfo.p10,viagemInfo.p11,viagemInfo.p12,viagemInfo.p13,viagemInfo.p14,viagemInfo.p15,viagemInfo.p16,
                                viagemInfo.p17,viagemInfo.p18,viagemInfo.p19,viagemInfo.p20,viagemInfo.p21,viagemInfo.p22,viagemInfo.p23,viagemInfo.p24,
                                viagemInfo.p25,viagemInfo.p26,viagemInfo.p27,viagemInfo.p28,viagemInfo.p29,viagemInfo.p30,viagemInfo.p31,viagemInfo.p32,
                                viagemInfo.p33,viagemInfo.p34,viagemInfo.p35,viagemInfo.p36,viagemInfo.p37,viagemInfo.p38,viagemInfo.p39,viagemInfo.p40,
                                viagemInfo.p41,viagemInfo.p42,viagemInfo.p43,viagemInfo.p44,viagemInfo.p45,viagemInfo.p46,viagemInfo.p47,viagemInfo.p48,
                                viagemInfo.p49,viagemInfo.p50,viagemInfo.p51,viagemInfo.p52,viagemInfo.p53,viagemInfo.p54,viagemInfo.p55,viagemInfo.p56])
                        }
                        setLoaded(true)
                    })
                }else{
                    onibusService.getOnibusByPrefixo(prefixo, (res) => {
                        // console.log(res)
                        setOnibus(res)
                        if(res.servico == 'Convencional'){
                            setPoltronas([[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}]])
                        }
                        if(res.servico == 'Executivo'){
                            setPoltronas([[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}]])
                        }
                        if(res.servico == 'Semi-leito'){
                            setPoltronas([[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}]])
                        }
                        if(res.servico == 'Executivo/Leito (DD)'){
                            setPoltronas([[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],
                                [0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}],[0, {}]])
                        }
                        setLoaded(true)
                    })
                }        
            })
        })
    }, [])

    const [viagemId, setViagemId] = React.useState()

    const [embarqueTempoMin, setEmbarqueTempoMin] = React.useState(60)
    const [embarqueTempoMax, setEmbarqueTempoMax] = React.useState(120)
    const [desembarqueTempoMin, setDesembarqueTempoMin] = React.useState(40)
    const [desembarqueTempoMax, setDesembarqueTempoMax] = React.useState(60)

    const { prefixo } = route.params
    const [onibus, setOnibus] = React.useState()
    const [loaded, setLoaded] = React.useState(false)
    const [dataInicio, setDataInicio] = React.useState(null)
    const [dataFim, setDataFim] = React.useState(null)
    const [horarioPersonalizado, setHorarioPersonalizado] = React.useState()
    const [horaInicio, setHoraInicio] = React.useState()
    const [minutoInicio, setMinutoInicio] = React.useState()
    const [totalPassageirosViagem, setTotalPassageirosViagem] = React.useState(0)
    const [totalPassageirosIrregulares, setTotalPassageirosIrregulares] = React.useState(0)
    const [poltronasVisible, setPoltronasVisible] = React.useState(false)
    const [viagemFinalizada, setViagemFinalizada] = React.useState(false)
    const [btnOn, setBtnOn] = React.useState(true)
    const [passageirosEmbarque, setPassageirosEmbarque] = React.useState([])
    const [passageiroEmbarque, setPassageiroEmbarque] = React.useState({})
    const [situacao, setSituacao] = React.useState('Iniciar Embarque')
    const [situacaoDesc, setSituacaoDesc] = React.useState('Em rota para ')
    const [parada, setParada] = React.useState(0)
    const [poltronas, setPoltronas] = React.useState([])
    const paradas = route.params.rota
    const rotaId = route.params.rotaId

    return (
        loaded ?
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {navigation.navigate("Menu")}} />
            <Appbar.Content title={route.name} />
        </Appbar.Header>
        <Card style={{marginHorizontal: 0, marginTop: 0, borderRadius: 0}}>
            <Card.Title title={`${situacaoDesc}${paradas[parada].local} [${((horaInicio-paradas[0].horarioHora+paradas[parada].horarioHora) >= 24 ? (horaInicio-paradas[0].horarioHora+paradas[parada].horarioHora)-24 : (horaInicio-paradas[0].horarioHora+paradas[parada].horarioHora)).toString().padStart(2, '0')}:${((minutoInicio-paradas[0].horarioMinuto+paradas[parada].horarioMinuto) >= 60 ? (minutoInicio-paradas[0].horarioMinuto+paradas[parada].horarioMinuto)-60 : (minutoInicio-paradas[0].horarioMinuto+paradas[parada].horarioMinuto)).toString().padStart(2, '0')}]`}/>
            <Card.Actions>
            <Button onPress={verPoltronas} disabled={situacao == 'Aguardando embarque' ? true : false }>Ver poltronas</Button>
            </Card.Actions>
        </Card>
        <ProgressBar visible={!btnOn} style={{width: '100%', alignSelf: 'center'}} progress={0.0} color="#1976d2" indeterminate/>
        <Button
            disabled={!btnOn}
            style={style.button} 
            icon="account-group" 
            mode="contained" 
            onPress={functionButton}>
            {situacao}
        </Button>
        {poltronasVisible ? <>
            <View style={{backgroundColor: 'black', height: 50, width: '100%', position: 'absolute'}}>
                <Text style={{position: 'relative', padding: 10, fontSize: 20, alignSelf: 'flex-end', marginRight: 40}} onPress={verPoltronas}>Fechar poltronas</Text>
            </View>
            {onibus.servico == 'Convencional' ? 
            <Poltronas poltronas={poltronas} paradas={paradas}></Poltronas> :
            <></>
            }
            {onibus.servico == 'Executivo' ? 
            <PoltronasExec poltronas={poltronas} paradas={paradas}></PoltronasExec> :
            <></>
            }
            {onibus.servico == 'Semi-leito' ? 
            <PoltronasSemiLeito poltronas={poltronas} paradas={paradas}></PoltronasSemiLeito> :
            <></>
            }
            {onibus.servico == 'Executivo/Leito (DD)' ? 
            <PoltronasExecLeitoDD poltronas={poltronas} paradas={paradas}></PoltronasExecLeitoDD> :
            <></>
            }            
        </> : <></>}
        {viagemFinalizada ? <>
            <Text variant="titleLarge" style={{fontWeight: 'bold', alignSelf: 'center', marginTop: 20}}>Total de Passageiros Embarcados: {totalPassageirosViagem}</Text>
            <Text variant="titleLarge" style={{fontWeight: 'bold', alignSelf: 'center'}}>Passageiros Irregulares: {totalPassageirosIrregulares}</Text>
        </> : <></>}
        {situacao == 'Aguardando embarque' ? 
            <ScrollView>
            <Card style={{marginHorizontal: 10, marginTop: 10}}>
                <Card.Title title="Documento Passageiro"/>
                <Card.Content>   
                    <Text variant="titleLarge">Nome: {passageiroEmbarque.NomeDoc}</Text>
                    <Text variant="titleLarge">Documento: {passageiroEmbarque.NumDocDoc}</Text>
                    <Text variant="titleLarge">Data Nascimento: {passageiroEmbarque.DataNasc}</Text>
                </Card.Content>
            </Card>
            <Card style={{marginHorizontal: 10, marginTop: 10}}>
                <Card.Title title="Bilhete de Passagem"/>
                <Card.Content>   
                <Text variant="titleMedium">Passageiro</Text>
                <Text variant="titleLarge">{passageiroEmbarque.Nome}</Text>
                <Text variant="titleLarge">{passageiroEmbarque.NumDoc}</Text>
                <Divider style={{marginVertical: 15}} />
                <Text variant="titleLarge">
                    <Icon
                        source="map-marker"
                        size={30}
                    />
                    Origem: {paradas[passageiroEmbarque.Origem].local} | {((horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Origem].horarioHora) >= 24 ? (horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Origem].horarioHora)-24 : (horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Origem].horarioHora)).toString().padStart(2, '0')}:{((minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Origem].horarioMinuto) >= 60 ? (minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Origem].horarioMinuto)-60 : (minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Origem].horarioMinuto)).toString().padStart(2, '0')}
                </Text>
                <Text variant="titleLarge">
                    <Icon
                        source="marker-check"
                        size={30}
                    />
                    Destino: {paradas[passageiroEmbarque.Destino].local} | {((horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Destino].horarioHora) >= 24 ? (horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Destino].horarioHora)-24 : (horaInicio-paradas[0].horarioHora+paradas[passageiroEmbarque.Destino].horarioHora)).toString().padStart(2, '0')}:{((minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Destino].horarioMinuto) >= 60 ? (minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Destino].horarioMinuto)-60 : (minutoInicio-paradas[0].horarioMinuto+paradas[passageiroEmbarque.Destino].horarioMinuto)).toString().padStart(2, '0')}
                </Text>
                <Text variant="titleLarge">
                    <Icon
                        source="calendar-range"
                        size={30}
                    />
                    Data: {passageiroEmbarque.Data}
                </Text>
                <Divider style={{marginVertical: 15}} />
                <Text variant="titleMedium">
                    Poltrona 
                </Text>
                <Text variant="titleLarge">
                    <Icon
                        source="seat"
                        size={30}
                    /> {passageiroEmbarque.Poltrona} - {onibus.servico == 'Executivo/Leito (DD)' ? parseInt(passageiroEmbarque.Poltrona) > 44 ? "Leito" : "Executivo" : onibus.servico}
                </Text>
                </Card.Content>
                <Card.Actions>
                <Button onPress={impedirEmbarque}>Impedir Embarque</Button>
                <Button onPress={embarcarPassageiro}>Embarcar</Button>
                </Card.Actions>
            </Card>
            </ScrollView>
            : <Text></Text>
        } 
        </> :
        <ActivityIndicator size={200} style={{alignSelf: 'center', marginTop: '45%'}} animating={true} color="#1976d2" />
    );
};

export default ViagemEmRotaScreen;