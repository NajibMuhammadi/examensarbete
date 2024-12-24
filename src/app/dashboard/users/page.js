'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


import {DataGrid} from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log('Session:', session);

  useEffect(() => {
    
    if(status === "loading") {
      return <p>Loading...</p>;
    }
    if(session?.user?.isAdmin === false) {
      router.push("/dashboard");
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/auth/worker");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, status, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const columns = [
    { field: 'id', headerName: '#', width: 100 },
    {
      field: 'image',
      headerName: '',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', flex: 1 }}>
          {params.row.image ? 
            <img src={params.row.image} alt="User Image" style={{ height: '30px', borderRadius: '50%' }} /> : 
            <AccountCircleIcon style={{ fontSize: '30px' }} />}
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1 }, 
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'googleUser', headerName: 'Google User', flex: 1 },
    { field: 'isWorker', headerName: 'Worker', flex: 1 },
    { field: 'isAdmin', headerName: 'Admin', flex: 1 },
    { 
      field: 'delete', 
      headerName: 'Delete', 
      flex: 1,
      renderCell: (params) => (
          <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => console.log('Delete user:', params.row.id)} />
      ),
    },
  ];



  return (
    <Paper style={{ height: 400, width: '100%' }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        disableRowSelectionOnClick
        disableColumnResize
        sx={{
          width: '100%',
          overflowX: 'auto', // Allow horizontal scrolling if columns overflow
          '& .MuiDataGrid-root': {
            display: 'block',
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none', // Tar bort fokuslinjen från cellerna
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none', // Tar bort fokuslinjen från kolumnrubrikerna
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'transparent', // Gör att markeringen på raden försvinner
          },
        }}
    
      />
    </Paper>
  );
};

export default UserList;
