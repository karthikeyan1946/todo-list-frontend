import react,{useState,useEffect} from "react"
import { useNavigate } from "react-router";
import axios from "axios"



function Register({update,currentTodo}){
  const [user,setUser]=useState({username:'',email:'',password:''})
  let navigate=useNavigate()
  function change(todo){
    currentTodo(todo)
  }
  function help(){
    update()
  }
  useEffect(()=>{
    const currentuser=JSON.parse(localStorage.getItem('currentuser'))
    //console.log(currentuser)
    if(currentuser){
      axios.get("https://todo-list-s634.onrender.com/auth",{
        headers:{
          Authorization:currentuser.token
        }
      }).then(res=>{
        //console.log(res)
        if(res.data.success){
          help()
          //navigate('/')
          navigate('/Todolist')
        }else{
          navigate('/register')
        }
        
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },[])


  function updateUser(evt){
    setUser({...user,[evt.target.name]:evt.target.value})
  }


  function submitUser(evt){
    evt.preventDefault()
    //console.log(user)
    axios.post("https://todo-list-s634.onrender.com/register",{user:user}).then(user=>{
      //console.log(user)
      if(user.data.success){
        localStorage.setItem('currentuser',JSON.stringify({...user.data.user}))
        help()
        change([])
        navigate('/Todolist')
        //navigate('/')
      }else{
        //navigate('/register')
        alert(user.data.message)
      }
      
    })
    .catch(err=>{
      console.log(err)
    })

  }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{marginTop:'60px'}}>
  <div className="row">
    <div className="col-md-6" style={{width:'500px'}}>
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Register</h5>
          <form action="" onSubmit={submitUser}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={updateUser}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={updateUser}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pasword" className="form-label">password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={updateUser}
                required
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-success">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
export default Register
