import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';

const AddMemberDialog = ({ open, setOpen, allUsers, team, setTeam, pid, setSnackbarMessage }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = () => setOpen(false);
  const handleListItemClick = (e, index) => setSelectedIndex(index);

  const handleAdd = () => {
    const user = filteredUsers[selectedIndex];

    if (team.find(mem => mem.user_id === user.user_id)) {
      setSnackbarMessage(
        `${user.first_name} ${user.last_name} already part of project.`
      )
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/projects/${pid}/team/${user.user_id}`);
    setTeam(team.concat(user).sort(
      (a, b) => a.user_id > b.user_id ? 1 : -1
    ))
    setSnackbarMessage(
      `${user.first_name} ${user.last_name} added to the project.`
    )
  }

  // Filter users by search term
  const re = new RegExp(search, 'i');
  const filteredUsers = allUsers.filter(
    u => u.first_name.match(re) || u.last_name.match(re)
  );

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
      <div className='project-s-team__add-dialog'>
        <span
          className='projmgmt-s-team__close-dialog'
          onClick={handleClose}
        >
          ×
        </span>

        <TextField
          value={search}
          onChange={e => setSearch(e.target.value)}
          label='Filter'
          variant='outlined'
          fullWidth
        />

        <div className='project-s-team__filtered-users'>
          <div>
          <List>
            {filteredUsers.map((u, i) => {
              const this_index = i;
              return (
                <ListItemButton
                  selected={selectedIndex === this_index}
                  onClick={e => handleListItemClick(e, this_index)}
                  key={u.user_id}
                >
                  <ListItemText
                    primary={`${u.first_name} ${u.last_name}`}
                    secondary={`${u.role}`}
                  />
                </ListItemButton>
              )
            })}
          </List>
          </div>
        </div>

        <div className='project-s-team__add-member'>
          <Button variant='contained' onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default AddMemberDialog;
