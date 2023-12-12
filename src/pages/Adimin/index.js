
import { useEffect, useState } from 'react'
import {auth, db} from '../../firebaseConnection'
import {signOut} from 'firebase/auth'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import './adimin.css'

function Adimin(){

  const [taskInput, setTaskInput] = useState('')
  const [user, setUser] = useState({})
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState({})

  useEffect(()=>{
    async function loadTasks(){
      const userdetail = localStorage.getItem('@detailUser')
      setUser(JSON.parse(userdetail))

      if(userdetail){
         const data = JSON.parse(userdetail);

         const taskRef = collection(db, 'tasks')
         const q = query(taskRef, orderBy('created', "desc"), where('userUid', "==", data?.uid));

         const unsub = onSnapshot(q, (snapshot)=>{
            let list = [];

            snapshot.forEach((doc)=>{
              list.push({
                id: doc.id,
                task: doc.data().task,
                userUid: doc.data().userUid
              })
            })

            setTasks(list)
         })
      }
    }

    loadTasks()
  },[])

  async function handleRegister(e){
    e.preventDefault();

    if(taskInput === ''){
      alert('digite sua tarefa...')
      return
    }

    if(edit?.id){
      handleUpdate();
      return
    }

   await addDoc(collection(db, "tasks" ), {
    task: taskInput,
    created : new Date(),
    userUid : user?.uid,

   })
   .then(()=>{
     console.log("tarefa registrada")
     setTaskInput('')
   })
   .catch((error)=>{
    console.log("erro ao registrar " + error)
   })
  }

  async function handleLogout(){
     await signOut(auth);
  }

  async function deleteTask(id){
    const docRef = doc(db, 'tasks',id)
    await deleteDoc(docRef);
  }

  function editTask(item){
    setTaskInput(item.task)
    setEdit(item)
  }

  async function handleUpdate(){
     const docRef = doc(db, 'tasks', edit?.id)
     await updateDoc(docRef, {
      task : taskInput
     }).then(()=>{
      console.log("tarefa atualizada")
      setEdit({})
      setTaskInput('')
     })
     .catch((erro)=>{
       console.log('erro ao atualizar' + erro)
       setEdit({})
       setTaskInput('')
     })
  }
  return(
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form className='form' onSubmit={handleRegister}>
        <textarea
        placeholder="Digite sua tarefa"
        value={taskInput}
        onChange={(e)=> setTaskInput(e.target.value)}/>

       {Object.keys(edit).length > 0 ? (
         <button className='btn-register' type='submit'>Atualizar tarefa</button> 
       ) : (
        <button className='btn-register' type='submit'>Registrar tarefa</button> 
       ) }
      </form>
      
     {tasks.map( (item) => (
          <article key={item.id} className='list'>
          <p>{item.task}</p>
          <div>
            <button onClick={()=> editTask(item)}>Editar</button>
            <button onClick={ () => {deleteTask(item.id)}} className='btn-delete'>Concluir</button>
          </div>
        </article>
     ))}

      <button className='btn-logout' onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Adimin