import react from "react"
import {useState,useEffect} from "react"
import { useNavigate } from "react-router"
import axios from 'axios'
import List from '@mui/material/List';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

/*async function getInitialTodo(){
    let user=JSON.parse(localStorage.getItem('currentuser'))
    if(!user)return [];
    let res=await axios.get(`http://localhost:3000/todos/${user.id}`)
    if(res.data.out){
      let list=res.data.out.todos
      //console.log(list)
      return list
    }
    return [];
}
let initialTodo=await getInitialTodo();*/

function EditTodolist({todo,currentTodo}){
    let navigate=useNavigate()
    //let [todo,setTodo]=useState(initialTodo)
    //console.log(todo)
    function change(todo){
      currentTodo(todo)
    }
    useEffect(()=>{
        //console.log('came to edit')
        let currentuser=JSON.parse(localStorage.getItem('currentuser'))
        if(currentuser){
            axios.get("http://localhost:3000/auth",{
              headers:{
                Authorization:currentuser.token
              }
            }).then(async (res)=>{
              console.log('success')
              //console.log(res)
            })
            .catch(err=>{
              //console.log(err)
              navigate('/login')
            })
          }else{
            //console.log('no currentuser')
            navigate('/register')
          }
       
    },[todo])
    function edit(evt){
      let val=evt.target.value
      let id=evt.target.id
      //console.log(val,id)
      let editTodo=todo.map(t=>{
        if(t._id === id){
          return {...t,['todo']:val}
        }else{
          return t
        }
      })
      //console.log(editTodo)
      //setTodo(editTodo)
      change(editTodo)
    }
    function update(){
      console.log(todo)
      let currentuser=JSON.parse(localStorage.getItem('currentuser'))
      axios.put(`http://localhost:3000/todos/${currentuser.id}`,{todo:todo}).then((res)=>{
        //console.log(res)
        //navigate('/')
        change([...res.data.out.todo])
        navigate('/Todolist')
      })
      .catch(err=>{
        console.log(err)
      })
    }

    return (
      <div style={{marginTop:'60px'}}>
        <h2 className="px-5">Edit your todos</h2>
        <div style={{marginLeft:"575px"}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todo.map((t)=>{
                console.log(t._id)
                return <Input defaultValue={t.todo} key={t._id} onChange={edit} id={t._id} style={{width:"340px"}}/>
               
            })}
        </List>
        <Button variant="outlined" onClick={update} style={{marginLeft:"125px"}}>update</Button>
        </div>
      </div>
    )
}

export default EditTodolist