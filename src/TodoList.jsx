import { useState,useEffect} from "react"
import axios from 'axios'
import List from '@mui/material/List';
import TodoItem from "./TodoItem";
import TodoListForm from "./TodoListForm";
import rand from "./util";
import { useNavigate } from "react-router";
import Button from '@mui/material/Button';


/*async function getInitialTodo(){
  let user=JSON.parse(localStorage.getItem('currentuser'))
  //console.log(user.username)
  if(!user)return [];
  let res=await axios.get(`http://localhost:3000/todos/${user.id}`)
  if(res.data.out){
    let list=res.data.out.todos
    return list
  }
  return [];
}


let initialTodo=await getInitialTodo();*/


export default function TodoList({todo,currentTodo}){
    //let [todo,setTodo]=useState(initialTodo)
    let navigate=useNavigate()
    let [currentuser,setCurrentuser]=useState({})
    //console.log(todo)
    function change(todo){
      currentTodo(todo)
    }
    useEffect(()=>{
      const currentuser=JSON.parse(localStorage.getItem('currentuser'))
      setCurrentuser(currentuser)
      //console.log(currentuser,"hello")
      if(currentuser){
        axios.get("http://localhost:3000/auth",{
          headers:{
            Authorization:currentuser.token
          }
        }).then(async (res)=>{
          //console.log('success')
        })
        .catch(err=>{
          console.log(err)
          navigate('/login')
        })
      }else{
        //console.log('no currentuser')
        navigate('/register')
      }
    },[todo])


    async function removeTodo(id){
      try{
        let res=await axios.delete(`http://localhost:3000/todos/${currentuser.id}/${id}`)
        //console.log(res)
        //setTodo([...res.data.out.todos])
        change([...res.data.out.todos])

      }catch(err){
        console.log(err)
      }
      // normal method :-let newTodo=todo.filter((t)=> {
      //   return t.id !== id
      // })
      // setTodo(newTodo)
    }
    async function toggleTodo(id){
      try{
        let res=await axios.patch(`http://localhost:3000/todos/${currentuser.id}/${id}`)
        //console.log(res)
        //setTodo([...res.data.out.todos])
        change([...res.data.out.todos])
      }catch(err){
        console.log(err)
      }
    }
    async function updateTodo(newTodo){
      try{
        let res=await axios.post(`http://localhost:3000/todos/${currentuser.id}`,{todo:{ completed:false,todo:newTodo}})
        //console.log(res.data.out.todos)
        //setTodo([...res.data.out.todos])
        change([...res.data.out.todos])
      }catch(err){
        console.log(err)
      }
      
    }
    async function newForm(){
      try{
        let res=await axios.delete(`http://localhost:3000/todos/${currentuser.id}`)
        if(res.data.success){
          change([])
        }else{
          //console.log('error')
        }
      }catch(err){
        console.log(err)
      }
    }
    return(
      
      <div style={{marginTop:'60px'}}>
        <h2 className="px-5">Welcome to Todos,{currentuser.username}</h2>
        <div className="d-flex flex-column" style={{marginLeft:"575px"}}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todo.map((t)=>{
                //console.log(t.todo)
                 return <TodoItem todo={t} key={t._id} remove={removeTodo} toggle={toggleTodo}/>
               
            })}
        </List>
        <TodoListForm update={updateTodo}/>
        <div className="d-flex flex-row mt-2">
        <Button variant="outlined" onClick={newForm}>new Todo List</Button>
        {todo.length >0 && <Button variant="outlined" href="/EditTodolist" style={{marginLeft:"127px"}}>Edit</Button>}
        </div>
        </div>
        
        {/* <button >new Todo List</button> */}
        </div>
    );
}