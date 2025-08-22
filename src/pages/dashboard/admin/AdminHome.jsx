// import React, { useEffect, useState ,useMemo} from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
// import { useAuth } from '../../../context/AuthContext';
// import {axiosInstance} from '../../../context/authAPI';
// export default function AdminHome() {
//   const { accessToken } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_BASE = import.meta.env.VITE_API_URL;
//   // Snackbar state
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//  // 🔹 Use local state that listens to global theme change events
//    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
 
//    useEffect(() => {
//      const onThemeChange = (e) => setTheme(e.detail);
//      window.addEventListener('themeChanged', onThemeChange);
//      return () => window.removeEventListener('themeChanged', onThemeChange);
//    }, []);
//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   // Fetch users
//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         const res = await axiosInstance.get(`${API_BASE}/accounts/admin/users/`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         console.log('Fetched users:', res.data);
//         setUsers(res.data);
        

//       } catch (err) {
//         console.error('Failed to load users', err);
//         showSnackbar('Failed to load users', 'error');
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (accessToken) fetchUsers();
//   }, [accessToken]);

//   const handleRoleChange = async (id, newRole) => {
//     try {
//       await axiosInstance.patch(`/accounts/admin/users/${id}/`,
//         { role: newRole },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );
//       setUsers(users.map(u => (u.id === id ? { ...u, role: newRole } : u)));
//       showSnackbar('Role updated successfully!', 'success');
//     } catch (err) {
//       console.error('Failed to update role', err);
//       showSnackbar('Failed to update role', 'error');
//     }
//   };

//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     {
//       field: 'role',
//       headerName: 'Role',
//       width: 150,
//       renderCell: (params) => (
//         <FormControl size="small" fullWidth>
//           <Select
//             value={params.row.role}
//             onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
//           >
//             <MenuItem value="tourist">Tourist</MenuItem>
//             <MenuItem value="organizer">Organizer</MenuItem>
//             <MenuItem value="guide">Guide</MenuItem>
//             <MenuItem value="admin">Admin</MenuItem>
//           </Select>
//         </FormControl>
//       ),
//     },
//     // { field: 'is_active', headerName: 'Active', width: 100 },
//   ];
//     const sx = useMemo(
//       () => ({
//         boxShadow: 4,
//         border: 0,
//         '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaderTitle, & .MuiDataGrid-filler & .MuiDataGrid-root & .MuiDataGrid-filler' : {
//         backgroundColor: theme === 'light' ? '#f8fafc' : '#1f2937',
//         color: theme === 'light' ? '#1f2937' : '#e5e7eb',
//         fontWeight: 600,
//       },
//         '& .MuiDataGrid-row': {
//           backgroundColor: theme === 'light' ? '#ffffff' : '#0f172a',
//           color: theme === 'light' ? '#1f2937' : '#e5e7eb',
//         },
//         '& .MuiDataGrid-cell': {
//           color: theme === 'light' ? '#1f2937' : '#e5e7eb',
//         },
//         '& .MuiDataGrid-row:hover': {
//           backgroundColor: theme === 'light' ? '#f3f4f6' : '#1e293b',
//         },
//         '& .MuiDataGrid-footerContainer': {
//           backgroundColor: theme === 'light' ? '#f8fafc' : '#1e293b',
//           color: theme === 'light' ? '#4b5563' : '#e5e7eb',
//         },
//         '& .MuiTablePagination-root': {
//           color: theme === 'light' ? '#4b5563' : '#e5e7eb',
//         },
//         '& .MuiSvgIcon-root': {
//           color: theme === 'light' ? '#4b5563' : '#e5e7eb',
//         },
//       }),
//       [theme]
//     );
//   return (
//     <div style={{ height: 600, width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
//      <DataGrid
//         key={theme} // 🔹 Forces rerender on theme change
//         rows={users}
//         columns={columns}
//         getRowId={(row) => row.id ?? row.pk ?? row.email}  // use the correct key here
//         pageSize={10}
//         rowsPerPageOptions={[10, 20, 50]}
//         pagination
//         loading={loading}
//         sx={sx}
//       />

//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
// //AdminHome
// import React, { useEffect, useState, useMemo } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { MenuItem, Select, FormControl, Snackbar, Alert } from '@mui/material';
// import { useAuth } from '../../../context/AuthContext';
// import { axiosInstance } from '../../../context/authAPI';

// // 🔹 Skeleton Loader for DataGrid
// function DataGridSkeleton({ columns, rowCount = 10 }) {
//   const skeletonRows = Array.from({ length: rowCount }, (_, i) =>
//     Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`]))
//   );

//   return (
//     <div className="animate-pulse">
//       <DataGrid
//         rows={skeletonRows}
//         columns={columns.map((col) => ({
//           ...col,
//           renderCell: () => (
//             <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
//           ),
//         }))}
//         autoHeight
//         disableColumnMenu
//         disableColumnFilter
//         hideFooter
//       />
//     </div>
//   );
// }
// export default function AdminHome() {
//   const { accessToken } = useAuth();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_BASE = import.meta.env.VITE_API_URL;

//   // Snackbar state
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // 🔹 Listen to global theme change events
//   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
//   useEffect(() => {
//     const onThemeChange = (e) => setTheme(e.detail);
//     window.addEventListener('themeChanged', onThemeChange);
//     return () => window.removeEventListener('themeChanged', onThemeChange);
//   }, []);

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   // 🔹 Fetch users
//   useEffect(() => {
//     async function fetchUsers() {
//       if (!accessToken) return;
//       setLoading(true);
//       try {
//         const res = await axiosInstance.get(`${API_BASE}/accounts/admin/users/`, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         setUsers(res.data);
//       } catch (err) {
//         console.error('Failed to load users', err);
//         showSnackbar('Failed to load users', 'error');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   // 🔹 Update role handler
//   const handleRoleChange = async (id, newRole) => {
//     try {
//       await axiosInstance.patch(
//         `${API_BASE}/accounts/admin/users/${id}/`,
//         { role: newRole },
//         { headers: { Authorization: `Bearer ${accessToken}` } }
//       );

//       // Optimistic UI update
//       setUsers((prevUsers) =>
//         prevUsers.map((u) => (u.id === id ? { ...u, role: newRole } : u))
//       );
//       showSnackbar('Role updated successfully!', 'success');
//     } catch (err) {
//       console.error('Failed to update role', err);
//       showSnackbar('Failed to update role', 'error');
//     }
//   };

//   // 🔹 DataGrid Columns
//   const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     {
//       field: 'role',
//       headerName: 'Role',
//       width: 150,
//       renderCell: (params) => (
//         <FormControl size="small" className='m-4 w-full'>
//           <Select
//             className='dark:bg-slate-700 dark:text-white bg-white text-black'
//             value={params.row.role || 'tourist'} // fallback to tourist
//             onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
//           >
//             <MenuItem value="tourist">Tourist</MenuItem>
//             <MenuItem value="organizer">Organizer</MenuItem>
//             <MenuItem value="guide">Guide</MenuItem>
//             <MenuItem value="admin">Admin</MenuItem>
//           </Select>
//         </FormControl>
//       ),
//     },
//   ];

//   const sx = useMemo(
//     () => ({
//       boxShadow: 4,
//       border: 0,
//       "& .MuiDataGrid-columnHeaders": {
//         backgroundColor: theme === "light" ? "#f8fafc" : "#1f2937",
//         color: theme === "light" ? "#1f2937" : "#e5e7eb",
//         fontWeight: 600,
//       },
//       "& .MuiDataGrid-row": {
//         backgroundColor: theme === "light" ? "#ffffff" : "#0f172a",
//         color: theme === "light" ? "#1f2937" : "#e5e7eb",
//       },
//       "& .MuiDataGrid-cell": {
//         color: theme === "light" ? "#1f2937" : "#e5e7eb",
//       },
//       "& .MuiDataGrid-row:hover": {
//         backgroundColor: theme === "light" ? "#f3f4f6" : "#1e293b",
//       },
//       "& .MuiDataGrid-footerContainer": {
//         backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
//         color: theme === "light" ? "#4b5563" : "#e5e7eb",
//       },
//       "& .MuiTablePagination-root": {
//         color: theme === "light" ? "#4b5563" : "#e5e7eb",
//       },
//       "& .MuiSvgIcon-root": {
//         color: theme === "light" ? "#4b5563" : "#e5e7eb",
//       },
//     }),
//     [theme]
//   );

//   return (
//     <div
//       style={{
//         width: "100%",
//         background: theme === "dark" ? "#1e293b" : "white",
//       }}
//     >
//       {loading ? (
//         <DataGridSkeleton columns={columns} rowCount={10} />
//       ) : (
//       <DataGrid
//         key={theme} // Rerender on theme change
//         rows={users}
//         columns={columns}
//         getRowId={(row) => row.id ?? row.pk ?? row.email}
//         pageSize={10}
//         rowsPerPageOptions={[10, 20, 50]}
//         pagination
//         loading={loading}
//         sx={sx}
//       />
//       )}
//       <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";

export default function AdminHome() {
  const [data, setData] = useState({ stats: {}, recentUsers: [], recentTours: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/admin/dashboard-stats/");
        setData({
          stats: res.data.stats,
          recentUsers: res.data.recent_users,
          recentTours: res.data.recent_tours
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  const { stats, recentUsers, recentTours } = data;

  const cards = [
    { title: "Total Users", value: stats.total_users },
    { title: "Active Users (30d)", value: stats.active_users },
    { title: "Currently Logged In", value: stats.currently_logged_in },
    { title: "Total Tours", value: stats.total_tours },
    { title: "Total Bookings", value: stats.total_bookings },
    { title: "Guides", value: stats.total_guides },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {cards.map(card => (
          <div key={card.title} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-500 text-sm">{card.title}</h2>
            <p className="text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <ul className="divide-y divide-gray-200">
            {recentUsers.map(u => (
              <li key={u.id} className="py-2 flex justify-between">
                <span>{u.username}</span>
                <span className="text-gray-400 text-sm">{new Date(u.date_joined).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Tours</h2>
          <ul className="divide-y divide-gray-200">
            {recentTours.map(t => (
              <li key={t.id} className="py-2 flex justify-between">
                <span>{t.title}</span>
                <span className="text-gray-400 text-sm">{new Date(t.created_at).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
