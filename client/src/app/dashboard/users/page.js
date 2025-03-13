'use client';
import { useState, useEffect } from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Typography from '@mui/material/Typography';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const {data: session, status} = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(session?.user?.isAdmin !== true) {
      return router.push("/dashboard");
    }
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/adminapi");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, [session, router]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/api/auth/deleteuser/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
        console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };



  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 70, maxWidth: 100, flex: 0.5, type: 'number', align: 'left', headerAlign: 'left'},
    {
      field: 'image',
      headerName: 'Profile Image',
      minWidth: 120,
      maxWidth: 140,
      filterable: false,
      flex: 0.7, 
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          {params.row.image ? 
            <img src={params.row.image} alt="User Image" style={{ height: '30px', borderRadius: '50%' }} /> : 
            <AccountCircleIcon style={{ fontSize: '30px' }} />}
        </div>
      ),
    },
    { field: 'givenName', headerName: 'First Name', minWidth: 130, flex: 1, type: 'string'},
    { field: 'familyName', headerName: 'Last Name', minWidth: 130, flex: 1, type: 'string'},
    { field: 'username', headerName: 'Username', minWidth: 130, flex: 1, type: 'string'},
    { field: 'email', headerName: 'Email', minWidth: 180, flex: 2, type: 'string'},
    { field: 'googleUser', headerName: 'Google User', minWidth: 120, flex: 1, type: 'boolean' }, 
    { field: 'isWorker', headerName: 'Worker', minWidth: 120, flex: 1, type: 'boolean' },
    { field: 'isAdmin', headerName: 'Admin', minWidth: 120, flex: 1, type: 'boolean' }, 
    { 
      field: 'delete', 
      headerName: 'Delete', 
      minWidth: 100,
      maxWidth: 130,
      filterable: false,
      flex: 0.5,
      renderCell: (params) => (
        <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteUser(params.row.id)} />
      ),
    },
  ];

  if (status === "loading") {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>
          <div className="terminal-controls">
            <div className="control close"></div>
            <div className="control minimize"></div>
            <div className="control maximize"></div>
          </div>
        </div>
        <div className="text">Loading...</div>
      </div>
      </Box>
    )
  }

  if(session?.user?.isAdmin !== true) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4" component="div" sx={{ color: 'red' }}>
          You are not authorized to view this page
        </Typography>
      </Box>
    )
  }
  



  return (
      <Box sx={{ height: '100%', width: '100%', overflowY: 'auto' }}>
        <Paper sx={{
            width: '100%', 
            cursor:'pointer',
            height: 'calc(100vh - 112px)'
          }}
        >
        <DataGrid
          rows={users}
          columns={columns}
          slots={{toolbar: GridToolbar}}
          disableColumnMenu
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          pageSizeOptions={[ 15, 25, 50, 100]}
          disableSelectionOnClick 
          disableRowSelectionOnClick  
          sx={{
            width: '100%',
            overflowX: 'auto',
            '& .MuiDataGrid-root': {
              display: 'block',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'transparent',
            },
          }}
      
        />
      </Paper>
      </Box>
  );
};

export default UserList;
