import {db} from '../firebase/firebase_config';
import { serverTimestamp, collection, addDoc, doc, getDocs, query, where, updateDoc, deleteDoc, orderBy } from "firebase/firestore";
import UsuarioService from './UsuarioService';
import OnibusService from './OnibusService';
import RotaService from './RotaService';

class ViagemService{
    async iniciarViagem(
        rota, 
        horarioPersonalizado,
        horaInicio,
        minutoInicio,
        motorista, 
        onibus, 
        totalPassageirosViagem, 
        totalPassageirosIrregulares, 
        btnOn,
        passageirosEmbarque,
        // passageiroEmbarque,
        situacao,
        situacaoDesc,
        parada,
        p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,
        p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,
        p21,p22,p23,p24,p25,p26,p27,p28,p29,p30,
        p31,p32,p33,p34,p35,p36,p37,p38,p39,p40,
        p41,p42,p43,p44,p45,p46,p47,p48,p49,p50,
        p51,p52,p53,p54,p55,p56,
        callback){
        await addDoc(collection(db, `viagens`), {
            dataInicio: serverTimestamp(),
            rota: rota,
            horarioPersonalizado: horarioPersonalizado,
            horaInicio: horaInicio,
            minutoInicio: minutoInicio,
            motorista: motorista,
            onibus: onibus,
            totalPassageirosViagem: totalPassageirosViagem,
            totalPassageirosIrregulares: totalPassageirosIrregulares,
            btnOn: btnOn,
            passageirosEmbarque: passageirosEmbarque,
            // passageiroEmbarque: passageiroEmbarque,
            situacao: situacao,
            situacaoDesc: situacaoDesc,
            parada: parada,
            p1:p1,p2:p2,p3:p3,p4:p4,p5:p5,p6:p6,p7:p7,p8:p8,p9:p9,p10:p10,
            p11:p11,p12:p12,p13:p13,p14:p14,p15:p15,p16:p16,p17:p17,p18:p18,p19:p19,p20:p20,
            p21:p21,p22:p22,p23:p23,p24:p24,p25:p25,p26:p26,p27:p27,p28:p28,p29:p29,p30:p30,
            p31:p31,p32:p32,p33:p33,p34:p34,p35:p35,p36:p36,p37:p37,p38:p38,p39:p39,p40:p40,
            p41:p41,p42:p42,p43:p43,p44:p44,p45:p45,p46:p46,p47:p47,p48:p48,p49:p49,p50:p50,
            p51:p51,p52:p52,p53:p53,p54:p54,p55:p55,p56:p56,
        }).then((res) => {
            // console.log(res.id)
            callback(res.id)
        }).catch((error) => {
            console.log(error)
        });
    }

    async atualizarViagem(
        id,
        rota, 
        motorista, 
        onibus,
        totalPassageirosViagem, 
        totalPassageirosIrregulares, 
        btnOn,
        passageirosEmbarque,
        // passageiroEmbarque,
        situacao,
        situacaoDesc,
        parada,
        p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,
        p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,
        p21,p22,p23,p24,p25,p26,p27,p28,p29,p30,
        p31,p32,p33,p34,p35,p36,p37,p38,p39,p40,
        p41,p42,p43,p44,p45,p46,p47,p48,p49,p50,
        p51,p52,p53,p54,p55,p56,
        callback){
            await updateDoc(doc(db, `viagens`, id), {
                rota: rota,
                motorista: motorista,
                onibus: onibus,
                totalPassageirosViagem: totalPassageirosViagem,
                totalPassageirosIrregulares: totalPassageirosIrregulares,
                btnOn: btnOn,
                passageirosEmbarque: passageirosEmbarque,
                // passageiroEmbarque: passageiroEmbarque,
                situacao: situacao,
                situacaoDesc: situacaoDesc,
                parada: parada,
                p1:p1,p2:p2,p3:p3,p4:p4,p5:p5,p6:p6,p7:p7,p8:p8,p9:p9,p10:p10,
                p11:p11,p12:p12,p13:p13,p14:p14,p15:p15,p16:p16,p17:p17,p18:p18,p19:p19,p20:p20,
                p21:p21,p22:p22,p23:p23,p24:p24,p25:p25,p26:p26,p27:p27,p28:p28,p29:p29,p30:p30,
                p31:p31,p32:p32,p33:p33,p34:p34,p35:p35,p36:p36,p37:p37,p38:p38,p39:p39,p40:p40,
                p41:p41,p42:p42,p43:p43,p44:p44,p45:p45,p46:p46,p47:p47,p48:p48,p49:p49,p50:p50,
                p51:p51,p52:p52,p53:p53,p54:p54,p55:p55,p56:p56
            }).then((res) => {
                callback(true)
            }).catch((error) => {
                console.log(error)
            });
    }

    async finalizaViagem(
        id,
        rota,
        motorista,
        onibus,
        totalPassageirosViagem,
        totalPassageirosIrregulares,
    ){
        await updateDoc(doc(db, `viagens`, id), {
            dataFim: serverTimestamp(),
            rota: rota,
            motorista: motorista,
            onibus: onibus,
            totalPassageirosViagem: totalPassageirosViagem,
            totalPassageirosIrregulares: totalPassageirosIrregulares,
            // passageiroEmbarque: passageiroEmbarque,
            situacao: 'Viagem Finalizada',
            p1:0,p2:0,p3:0,p4:0,p5:0,p6:0,p7:0,p8:0,p9:0,p10:0,
            p11:1,p12:2,p13:3,p14:4,p15:5,p16:6,p17:7,p18:8,p19:9,p20:0,
            p21:1,p22:2,p23:3,p24:4,p25:5,p26:6,p27:7,p28:8,p29:9,p30:0,
            p31:1,p32:2,p33:3,p34:4,p35:5,p36:6,p37:7,p38:8,p39:9,p40:0,
            p41:1,p42:2,p43:3,p44:4,p45:5,p46:6,p47:7,p48:8,p49:9,p50:0,
            p51:1,p52:2,p53:3,p54:4,p55:5,p56:6,
        }).then((res) => {
            const usuarioService = new UsuarioService();
            const onibusService = new OnibusService();
            const rotaService = new RotaService();
            console.log(res)
                onibusService.addViagemOnibus(onibus, (res) => {
                    usuarioService.addViagemUsuario((motorista), (res) => {
                        rotaService.addViagemRota(rota, (res) => {
                            callback(true)
                        })
                    })
                })
        }).catch((error) => {
            console.log(error)
        });
    }

    async getViagemUsuario(callback){
        const usuarioService = new UsuarioService()
        let viagem = null
        // console.log(`user id ${userId}`)
        usuarioService.getIdUsuarioLogado(async (res) => {
            await getDocs(query(collection(db, "viagens"), where("situacao", "!=", "Viagem Finalizada"))).
            then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().motorista == res){
                        viagem = doc.data()
                        viagem.viagemId = doc.id
                        console.log(viagem)
                    }
                })
                callback(viagem)
            })
            .catch((e => {
                console.log("Erro ao carregar: "+e )
                callback(false)
            }));
        })
    }

    async getAllViagens(callback){
        let viagens = []
        // console.log(`user id ${userId}`)
        await getDocs(query(collection(db, "viagens"),orderBy("dataInicio", "desc"))).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const viagem = doc.data()
                viagens.push(viagem)
            })
            callback(viagens)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(viagens.length < 1)
            callback("Sem resultados!")
        });
    } 
    
    async getAllViagensUser(user, callback){
        const usuarioService = new UsuarioService()
        let viagens = []
        // console.log(`user id ${userId}`)
        await getDocs(query(collection(db, "viagens")), where('motorista', '==', user), orderBy("dataInicio")).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const viagem = doc.data()
                viagens.push(viagem)
            })
            callback(viagens)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(viagens.length < 1)
            callback("Sem resultados!")
        });
    }
}

export default ViagemService