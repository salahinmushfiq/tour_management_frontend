// src/pages/dashboard/admin/ManageUsers.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import axiosInstance from '../../../api/axiosInstance'; // your axios wrapper
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUIStore } from '../../../store/useUIStore';
import DataGridSkeleton from '../../../components/DataGridSkeleton';

export default function ManageUsers() {
  const { accessToken } = useAuth();
  const API_BASE = import.meta.env.VITE_API_URL;
  const queryClient = useQueryClient();

  // 🔹 State
  const [page, setPage] = useState(0);          
  const [pageSize, setPageSize] = useState(10); 
  const theme = useUIStore((state) => state.theme);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // 🔹 Fetch users
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get(`${API_BASE}/accounts/admin/users/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { page: page + 1, page_size: pageSize },
      });
      return res.data; // { results: [], count: 123 }
    },
    enabled: !!accessToken, // only run if token exists
    keepPreviousData: true,
  });

  const users = data?.results || [];
  const totalUsers = data?.count || 0;

  // 🔹 Mutation for role update
  const roleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      return axiosInstance.patch(
        `${API_BASE}/accounts/admin/users/${id}/`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    },
    onSuccess: (_, variables) => {
      // Update cached query data
      queryClient.setQueryData(['users', page, pageSize], (oldData) => {
        if (!oldData) return oldData;
        const updatedResults = oldData.results.map((u) =>
          u.id === variables.id ? { ...u, role: variables.newRole } : u
        );
        return { ...oldData, results: updatedResults };
      });
      showSnackbar('Role updated successfully!', 'success');
    },
    onError: () => showSnackbar('Failed to update role', 'error'),
  });

  const handleRoleChange = (id, newRole) => {
    roleMutation.mutate({ id, newRole });
  };

  // 🔹 DataGrid columns
  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'login_method', headerName: 'Method', width: 200 },
      {
        field: 'role',
        headerName: 'Role',
        width: 150,
        renderCell: (params) => (
          <FormControl size="small" className="m-2 w-full">
            <Select
              className="dark:bg-slate-700 dark:text-white bg-white text-black"
              value={params.row.role || 'tourist'}
              onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
            >
              <MenuItem value="tourist">Tourist</MenuItem>
              <MenuItem value="organizer">Organizer</MenuItem>
              <MenuItem value="guide">Guide</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        ),
      },
    ],
    []
  );

  // 🔹 DataGrid styles
  const sx = useMemo(
    () => ({
      boxShadow: 4,
      border: 0,
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme === 'light' ? '#f8fafc' : '#1f2937',
        color: theme === 'light' ? '#1f2937' : '#e5e7eb',
        fontWeight: 600,
      },
      '& .MuiDataGrid-row': {
        backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
        color: theme === 'light' ? '#1f2937' : '#e5e7eb',
      },
      '& .MuiDataGrid-cell': { color: theme === 'light' ? '#1f2937' : '#e5e7eb' },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: theme === 'light' ? '#f3f4f6' : '#1e293b',
      },
      '& .MuiDataGrid-footerContainer': {
        backgroundColor: theme === 'light' ? '#f8fafc' : '#1e293b',
        color: theme === 'light' ? '#4b5563' : '#e5e7eb',
      },
      '& .MuiTablePagination-root': { color: theme === 'light' ? '#4b5563' : '#e5e7eb' },
      '& .MuiSvgIcon-root': { color: theme === 'light' ? '#4b5563' : '#e5e7eb' },
    }),
    [theme]
  );

  if (error) return <div className="text-red-500">Failed to load users.</div>;

  return (
    <div style={{ width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
      {isLoading ? (
         <DataGridSkeleton
          columns={columns}
          rowCount={pageSize}
        />
      ) : (
        <DataGrid
          key={theme}
          rows={users}
          columns={columns}
          getRowId={(row) => row.id ?? row.pk ?? row.email}
          rowCount={totalUsers}
          autoHeight
          pagination
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            if (model.page !== page) setPage(model.page);
            if (model.pageSize !== pageSize) {
              setPageSize(model.pageSize);
              setPage(0); // reset to first page
            }
          }}
          pageSizeOptions={[10, 20, 50]}
          loading={isLoading || roleMutation.isLoading}
          sx={sx}
        />
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}