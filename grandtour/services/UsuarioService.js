import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase/firebase_config'

class UsuarioService{
    getIdUsuarioLogado(callback){
        callback(auth.currentUser.uid)
    }

    getEmailUsuarioLogado(callback){
        callback(auth.currentUser.email)
    }

    async criarUsuarioComEmailESenha(nome, sobrenome, email, senha, callback){
        if(!nome){
            callback("Por favor, digite um nome!");
            return false
        }
        if(!sobrenome){
            callback("Por favor, digite um sobrenome!");
            return false
        }
        
        createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("CADASTRADO COM SUCESSO!")
            addDoc(collection(db, "users"), {
                userId: user.uid,
                nome: nome,
                sobrenome: sobrenome,
                viagens: 0,
                embarqueTempoMin: 40,
                embarqueTempoMax: 60,
                desembarqueTempoMin: 60,
                desembarqueTempoMax: 120
            }).then((docRef) => {
                console.log("informações do usuário cadastrado: ", docRef.id);
                console.log(docRef)
                callback(true)
            }).catch((e) => {
                console.error("Error ao adicionar: ", e);
                callback("Erro!");
            })
            callback(true)
            })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log("ERRO AO CADASTRAR: "+errorMessage)
            
            if(errorMessage == "Firebase: Error (auth/invalid-email)."){
                callback("Email Inválido");
            }
            if(errorMessage == "Firebase: Error (auth/email-already-in-use)."){
                callback("Email já está em uso");
            }
        });
    }

    logarComEmailESenha(email, senha, callback){
        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("LOGADO COM SUCESSO!")
            callback(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("ERRO AO LOGAR: "+errorMessage)
            if(errorMessage == "Firebase: Error (auth/invalid-email)."){
                callback("Email Inválido");
            }
            if(errorMessage == "Firebase: Error (auth/invalid-credential)."){
                callback("Credenciais Inválidas");
            }
            if(errorMessage == "Firebase: Error (auth/missing-password)." || errorMessage == "Firebase: Error (auth/invalid-login-credentials)."){
                callback("Senha Inválida");
            }
        });
    }

    async getInformacoesUsuario(userId, callback){
        let usuario = {}
        // console.log(`user id ${userId}`)
        await getDocs(query(collection(db, "users"), where("userId", "==", userId))).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                usuario = doc.data()
                // usuario = {
                //     nome: doc.data().nome,
                //     sobrenome: doc.data().sobrenome,
                //     userId: doc.data().userId,
                //     viagens: doc.data().viagens,
                // }
            })
            console.log(usuario)
            callback(usuario)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        }));
        
    }

    deslogarUsuario(callback){
        signOut(auth)
        .then(function() {
            // Sign-out successful.
            console.log("Deslogado com sucesso!");
            callback(true);
        })
        .catch(function(error) {
            // An error happened
            console.log("Erro ao desloga!");
        });
    }

    enviarEmailEsqueciSenha(email, callback){
        sendPasswordResetEmail(auth, email)
        .then(() => {
            callback(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            // console.log(errorMessage)
            if(errorMessage == "Firebase: Error (auth/missing-email)."){
                callback("Digite um Email!")
            }
            if(errorMessage == "Firebase: Error (auth/invalid-email)."){
                callback("Email Inválido!")
            }
        });
    }

    async getUsuarios(callback){
        let usuarios = []
        // console.log(`user id ${userId}`)
        await getDocs(collection(db, "users")).
        then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const usuario = {
                    nome: doc.data().nome,
                    sobrenome: doc.data().sobrenome,
                    userId: doc.data().userId,
                    viagens: doc.data().viagens,
                    embarqueTempoMin: 40,
                    embarqueTempoMax: 60,
                    desembarqueTempoMin: 60,
                    desembarqueTempoMax: 120
                }
                usuarios.push(usuario)
            })
            callback(usuarios)
        })
        .catch((e => {
            console.log("Erro ao carregar: "+e )
        })).finally(() => {
            if(usuarios.length < 1)
            callback("Sem resultados!")
        });
    }

    async atualizarUsuario(id, nome, sobrenome, temin, temax, tdmin, tdmax, callback){
        await getDocs(query(collection(db, "users"), where("userId", "==", id))).
        then((querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                await updateDoc(doc(db, `users`, document.id), {
                    nome: nome,
                    sobrenome: sobrenome,
                    embarqueTempoMin: temin,
                    embarqueTempoMax: temax,
                    desembarqueTempoMin: tdmin,
                    desembarqueTempoMax: tdmax
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

    async addViagemUsuario(id, callback){
        await getDocs(query(collection(db, "users"), where("userId", "==", id))).
        then((querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                await updateDoc(doc(db, `users`, document.id), {
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
}

export default UsuarioService