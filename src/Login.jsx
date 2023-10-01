import react,{useState,useEffect} from "react"
import { useNavigate } from "react-router";
import axios from "axios"

function Login({update,currentTodo}){
  const [user,setUser]=useState({username:'',email:'',password:''})
  let navigate=useNavigate()
  function help(){
    update()
  }
  function change(todo){
    currentTodo(todo)
  }
  useEffect(()=>{
    const currentuser=JSON.parse(localStorage.getItem('currentuser'))
    //console.log(currentuser)
    if(currentuser){
      axios.get("http://localhost:3000/auth",{
        headers:{
          Authorization:currentuser.token
        }
      }).then(res=>{
        //console.log(res)
        if(res.data.success){
          help()
          navigate('/Todolist')
        }else{
          navigate('/login')
          //alert("invalid credentials");
        }
        
      })
      .catch(err=>{
        console.log(err)
        navigate('/login')
        //alert("invalid credentials");
        

      })
    }
  },[])


  function updateUser(evt){
    setUser({...user,[evt.target.name]:evt.target.value})
  }
  function submitUser(evt){
    evt.preventDefault()
    //console.log(user)
    axios.post("http://localhost:3000/login",{user:user}).then(user=>{
      //console.log(user)
      if(user.data.success){
        localStorage.setItem('currentuser',JSON.stringify({...user.data.user}))
        help()
        change(user.data.todos)
        //navigate('/')
        navigate('/Todolist')
      }else{
        //navigate('/login')
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
          <h5 className="card-title">Login</h5>
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
              <button className="btn btn-success">login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
export default Login