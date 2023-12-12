import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth} from '../../firebaseConnection';
import {signInWithEmailAndPassword} from 'firebase/auth'

import './home.css'

function Home() {

  const [email, setEmail] = useState ('')
  const [password, setPassword] = useState ('');
  const navigate = useNavigate();


  async function handleLogin(e){
    e.preventDefault();

    if(email !== '' && password !==''){
     await signInWithEmailAndPassword(auth, email, password)
     .then(()=>{
         navigate('/adimin' , {replace: true})

     })
     .catch((error)=>{
        console.log("erro ao cadastrar " + error)
     })
    }
    else{
      alert('preencha todos os campos')
    }

  }

    return(
      <div className="home-container">
        <h1>Lista de Tarefas</h1>
        <span>Gerencie suas tarefas</span>

        <form className="form" onSubmit={handleLogin}>
          <input type="text"
          placeholder="informe seu email..."
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}/>

         <input type="password"
          placeholder="******"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}/>

          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to='/register'>
         Não possui uma conta? Cadastre-se
        </Link>

        
      </div>
    )
    
  }
  
  export default Home;