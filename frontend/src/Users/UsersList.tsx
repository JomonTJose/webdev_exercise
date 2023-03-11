import { IUser } from '../models/types'
import { 
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    TableHead,
    Paper,
    Button,
    Stack,
    Chip
  } from "@mui/material";
  
type UsersProps ={
    users: IUser[],
    onAddSkill: (user: IUser)=> void
    onSkillClick: (skill:string[])=> void
}

const UsersList = ({users,onAddSkill, onSkillClick }: UsersProps) => {
  return (
    <TableContainer component={Paper}>
    <Table aria-label="users" >
      <TableHead>
        <TableRow>
          <TableCell>User Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Skills</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user: IUser)=>(
           <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Stack 
                direction="row" spacing={1}>
                {user.skills.map((skill)=>(
                  <Chip 
                    variant="outlined" 
                    label={skill} 
                    key={skill}
                    onClick={()=>{onSkillClick([skill])}}
                  />
                ))}
                <Button 
                data-testid="add-skll-button"
                onClick={()=>onAddSkill(user)}>
                  
                  Add New Skill</Button>

              </Stack>
            </TableCell>
           </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default UsersList