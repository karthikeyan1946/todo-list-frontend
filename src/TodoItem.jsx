import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete'

export default function TodoItem({todo,remove,toggle}){
    const labelId = `checkbox-list-label-${todo._id}`;
    function removeItem(){
        remove(todo._id);
    }
    function toggleItem(){
        toggle(todo._id)
    }
    return (
      <ListItem
        secondaryAction={
          <IconButton aria-label="delete" onClick={removeItem}>
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
              onChange={toggleItem}
            />
          </ListItemIcon>
          <ListItemText id={todo._id} primary={todo.todo} />
        </ListItemButton>
      </ListItem>
    );
}