import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { axiosInstance } from '../../../context/authAPI';

// 🔹 Skeleton Loader for DataGrid
function DataGridSkeleton({ columns, rowCount = 10 }) {
  const skeletonRows = Array.from({ length: rowCount }, (_, i) =>
    Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`]))
  );

  return (
    <div className="animate-pulse">
      <DataGrid
        rows={skeletonRows}
        columns={columns.map((col) => ({
          ...col,
          renderCell: () => (
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
          ),
        }))}
        autoHeight
        disableColumnMenu
        disableColumnFilter
        hideFooter
        
      />
    </div>
  );
}

export default function ManageUsers() {
  const { accessToken } = useAuth();
  const API_BASE = import.meta.env.VITE_API_URL;

  // 🔹 State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);          // DataGrid page index (0-based)
  const [pageSize, setPageSize] = useState(10); // DataGrid page size
  const [totalUsers, setTotalUsers] = useState(0);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Theme
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    const onThemeChange = (e) => setTheme(e.detail);
    window.addEventListener('themeChanged', onThemeChange);
    return () => window.removeEventListener('themeChanged', onThemeChange);
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // 🔹 Fetch users from backend whenever page or pageSize changes
  useEffect(() => {
    if (!accessToken) return;

    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${API_BASE}/accounts/admin/users/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            page: page + 1, // DRF is 1-indexed
            page_size: pageSize,
          },
        });
        // console.log(res.data.results);
        setUsers(res.data.results);
        setTotalUsers(res.data.count);
      } catch (err) {
        console.error('Failed to load users', err);
        showSnackbar('Failed to load users', 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [accessToken, page, pageSize]);

  // 🔹 Update role handler
  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosInstance.patch(
        `${API_BASE}/accounts/admin/users/${id}/`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      showSnackbar('Role updated successfully!', 'success');
    } catch (err) {
      console.error('Failed to update role', err);
      showSnackbar('Failed to update role', 'error');
    }
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
          <FormControl size="small" className="m-4 w-full">
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
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: theme === "light" ? "#f8fafc" : "#1f2937",
        color: theme === "light" ? "#1f2937" : "#e5e7eb",
        fontWeight: 600,
      },
      "& .MuiDataGrid-row": {
        backgroundColor: theme === "light" ? "#ffffff" : "#0f172a",
        color: theme === "light" ? "#1f2937" : "#e5e7eb",
      },
      "& .MuiDataGrid-cell": {
        color: theme === "light" ? "#1f2937" : "#e5e7eb",
      },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: theme === "light" ? "#f3f4f6" : "#1e293b",
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
        color: theme === "light" ? "#4b5563" : "#e5e7eb",
      },
      "& .MuiTablePagination-root": {
        color: theme === "light" ? "#4b5563" : "#e5e7eb",
      },
      "& .MuiSvgIcon-root": {
        color: theme === "light" ? "#4b5563" : "#e5e7eb",
      },
    }),
    [theme]
  );

  return (
    <div style={{ width: "100%", background: theme === "dark" ? "#1e293b" : "white" }}>
      {loading ? (
        <DataGridSkeleton columns={columns} rowCount={pageSize} />
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
              setPage(0); // reset to first page when page size changes
            }
          }}
          pageSizeOptions={[10, 20, 50]} // ✅ Correct prop name
          loading={loading}
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
