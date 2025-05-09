import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <MuiLink component={Link} to={`/users/${user._id}`} underline="hover">
                    {user.username}
                  </MuiLink>
                </TableCell>
                <TableCell>{user.blogs ? user.blogs.length : 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
