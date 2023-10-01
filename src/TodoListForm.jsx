
import { useState } from "react";
import axios from 'axios'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import IconButton from '@mui/material/IconButton';
export default function TodoListForm({update}){
    let [newTodo,setNewTodo]=useState('')
    function change(evt){
        setNewTodo(evt.target.value)
    }
    function remove(){
        setNewTodo('')
    }
    function add(evt){
        evt.preventDefault();
        
        update(newTodo);
        remove();
    }
    return(
        <div>
            <form onSubmit={add}>
                <TextField id="outlined-basic" style={{width:"340px"}}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={add}>
                                        <CreateOutlinedIcon/>
                                    </IconButton>
                                </InputAdornment>,
                  }}
                
                label="Add todo" variant="outlined" value={newTodo} onChange={change}/>
                {/* <input type="text" value={newTodo} onChange={change} name='todo'/> */}
                {/* <button>add</button> */}
            </form>
        </div>
       
    );
}