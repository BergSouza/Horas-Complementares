import {db} from '../firebase/firebase_config';
import { collection, addDoc, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";


class OnibusService{
    addOnibus(prefixo, servico, modelo, callback){
        addDoc(collection(db, `onibus`), {
            prefixo: prefixo,
            servico: servico,
            modelo: modelo,
            viagens: 0,
        }).then((res) => {
            callback(true)
        }).catch((error) => {
            console.log(error)
        });
    }

    async addViagemOnibus(prefixo, callback){
        await getDocs(query(collection(db, "onibus"), where("prefixo", "==", prefixo))).
        then((querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                await updateDoc(doc(db, `onibus`, document.id), {
                    viagens: parseInt(document.data().viagens)+1
                }).
                then((res) => {
                    callback(true)
                })
                .catch((e => {
                    console.log("Erro ao carregar: "+e )
                }));
            })
        }).catch((error) => {
            console.log(error)
        });
    }

    async getAllOnibus(callback){
        let buses = []
        // console.log(`user id ${userId}`)
        await getDocs(collection(db, "onibus")).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const bus = doc.data()
                buses.push(bus)
            })
            callback(buses)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(buses.length < 1)
            callback("Sem resultados!")
        });
    }   
    
    async getOnibusByPrefixo(prefixo, callback){
        let bus = null
        // console.log(`user id ${userId}`)
        await getDocs(query(collection(db, "onibus"), where("prefixo", "==", prefixo))).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                bus = doc.data()
            })
            callback(bus)
            return true
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(bus == null)
            callback("Sem resultados!")
        });
    }   
}

export default OnibusService