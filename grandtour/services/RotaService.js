import {db} from '../firebase/firebase_config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";


class RotaService{
    addRota(paradas, callback){
        addDoc(collection(db, `rotas`), {
            viagens: 0,
            paradas: paradas
        }).then((res) => {
            callback(true)
        }).catch((error) => {
            console.log(error)
        });
    }

    async addViagemRota(id, callback){
        const document = doc(db, `rotas`, id)
        let viagensNew = 0
        getDoc(document).then(async (snap) => {
            viagensNew = parseInt(snap.data().viagens)+1
            await updateDoc(document, {
                viagens: viagensNew
            }).
            then((res) => {
                callback(true)
            }).catch((error) => {
                console.log(error)
            });
        })
    }

    async getAllRotas(callback){
        let rotas = []
        // console.log(`user id ${userId}`)
        await getDocs(collection(db, "rotas")).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const rota = {
                    viagens: doc.data().viagens,
                    paradas: doc.data().paradas,
                    idRota: doc.id
                }
                rotas.push(rota)
            })
            callback(rotas)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(rotas.length < 1)
            callback("Sem resultados!")
        });
    }    

    async getRotaById(id, callback){
        let rota = null
        // console.log(`user id ${userId}`)
        await getDoc(doc(db, `rotas`, id)).
        then((doc) => {
            rota = doc.data()
            callback(rota)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(rota == null)
            callback("Sem resultados!")
        });
    }  
}

export default RotaService