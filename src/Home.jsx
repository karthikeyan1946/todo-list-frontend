function Home(){
    return (
      <div style={{backgroundImage:"url('https://res.cloudinary.com/dvveylzwl/image/upload/v1695234374/todolist_app_tm1s5n.avif')",backgroundSize:"cover",height:"93.5vh",backgroundPosition:"center"}}>
      <div className="d-flex text-center" style={{color:"#000000"}}>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column justify-content-center algin-items-center" style={{marginTop:"180px"}}>
      <main className="px-3 mb-auto">
        <h1>Organize your work <br/>and life, finally.</h1>
        <h6 className='mt-5'>
          Become focused, organized, and calm with Todolist<br/>
          A to-do list app
        </h6>
        <a
          href="/Todolist"
          className="btn"
          style={{backgroundColor:"#f9dfdf" ,    color:"#000000",border:"2px solid ",borderRadius:"0px"}}
          >Make Todos</a
        >
        {/* <img src={img} alt="pic" /> */}
      </main>

      <footer className="text-dark-50">
        <h6>&copy; 2023</h6>
      </footer>
        </div>
        
      </div>
      </div>
    )
}
export default Home