import './App.css'
import TodoList from './TodoList';
import { Route,Routes} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import EditTodolist from './EditTodolist';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'

async function getInitialTodo(){
  let user=JSON.parse(localStorage.getItem('currentuser'))
  //console.log(user.username)
  if(!user)return [];
  let res=await axios.get(`https://todo-list-s634.onrender.com/todos/${user.id}`)
  if(res.data.out){
    let list=res.data.out.todos
    return list
  }
  return [];
}


let initialTodo=await getInitialTodo();



function App() {
  let currentuser=JSON.parse(localStorage.getItem('currentuser'))
  //console.log(currentuser)
  let navigate=useNavigate()
  let c=false;
  if(currentuser && currentuser.token){
    c=true
  }
  let [islogged,setIslogged]=useState(c)
  let [todo,setTodo]=useState(initialTodo)
  useEffect(()=>{
    currentuser=JSON.parse(localStorage.getItem('currentuser'))
    //console.log(currentuser)
    if(currentuser && currentuser.token){
      setIslogged(true)
    }
  },[])
  function updatecurrentuser(){
    currentuser=JSON.parse(localStorage.getItem('currentuser'))
    currentuser.token=null
    //console.log(currentuser)
    localStorage.setItem('currentuser',JSON.stringify({...currentuser}))
    setIslogged(false)
    navigate('/')

  }
  function update(){
    setIslogged(true)
  }
  function currentTodo(todo){
    setTodo([...todo])
  }
  return (
    <>
  <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid px-5">
          <a className="navbar-brand" href="">Todolist</a>
          <div className="navbar-nav">
            <a className="nav-link" href="/">Home</a>
            <a className="nav-link" href="/Todolist">todos</a>
            </div>
            <div className="navbar-nav ms-auto">
              {islogged ? <button className="nav-link" onClick={updatecurrentuser}>logout</button> : <> <a href="/login" className="nav-link">login</a>
              <a href="/register" className="nav-link">Register</a></> }
            </div>
          </div>
      </nav>
    </div>
    <div className="mt-5">
      <Routes>
        <Route path="/index.html" element={<Home/>}/>
        <Route path="/Todolist/index.html" element={<TodoList todo={todo} currentTodo={currentTodo}/>}/>
        <Route path="/login/index.html" element={<Login update={update} currentTodo={currentTodo}/>}/>
        <Route path="/register/index.html" element={<Register update={update} currentTodo={currentTodo}/>}/>
        <Route path="/EditTodolist/index.html" element={<EditTodolist todo={todo} currentTodo={currentTodo}/>} />
      </Routes>
    </div>
    </>
   










    /*<>
    <CssBaseline/>
    <h1>Todos</h1>
    <TodoList/>
    </>*/
  )
}

export default App
