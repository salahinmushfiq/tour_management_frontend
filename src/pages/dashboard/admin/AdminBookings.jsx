// // export default AdminBookings;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";

// const AdminBookings = () => {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       // ✅ Admin should ALWAYS get ALL bookings
//       const res = await axiosInstance.get("/bookings/");
//       console.log(res.data);
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPayment = async (bookingId) => {
//     try {
//       await axiosInstance.patch(`/bookings/${bookingId}/verify/`);
//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to verify payment", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-gray-500">Loading bookings...</p>
//       </div>
//     );
//   }

//   if (!bookings.length) {
//     return (
//       <div className="p-6 bg-white dark:bg-dark min-h-screen">
//         <h1 className="text-2xl font-bold mb-6">Bookings</h1>
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//           <p className="text-gray-600 dark:text-white">No bookings yet.</p>
//         </div>
//       </div>
//     );
//   }

//   const showPayColumn = bookings.some((b) => b.payment_status !== "paid");

//   return (
//     <div className="p-6 bg-white dark:bg-dark min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

//       <div className="overflow-x-auto bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//         <table className="min-w-full table-auto border rounded-lg">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-left">User</th>
//               <th className="px-4 py-2 text-left">Organizer</th>
//               <th className="px-4 py-2 text-left">Event</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Paid</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Paid At</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b.id} className="border-t">
//                 <td className="px-4 py-2">{b.participant_user.email}</td>
//                 <td className="px-4 py-2">{b.tour.organizer_email}</td>
//                 <td className="px-4 py-2">{b.tour.title}</td>
//                 <td className="px-4 py-2">{b.amount}</td>
//                 <td className="px-4 py-2">{b.amount_paid || 0}</td>

//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                       b.payment_status === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : b.payment_status === "partial"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {b.payment_status}
//                   </span>
//                 </td>

//                 <td className="px-4 py-2">
//                   {b.paid_at ? new Date(b.paid_at).toLocaleString() : "N/A"}
//                 </td>

//                 <td className="px-4 py-2">
//                   <div className="flex gap-2 items-center">

//                     {/* ✅ Admin cash verification */}
//                     {b.payment_status !== "paid" && (
//                       <button
//                         onClick={() => verifyPayment(b.id)}
//                         className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                       >
//                         Verify Cash
//                       </button>
//                     )}

                    
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminBookings;

// // export default AdminBookings;
// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../../../context/authAPI";
// import { useAuth } from "../../../context/AuthContext";

// const AdminBookings = () => {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       // ✅ Admin should ALWAYS get ALL bookings
//       const res = await axiosInstance.get("/bookings/");
//       console.log(res.data);
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPayment = async (bookingId) => {
//     try {
//       await axiosInstance.patch(`/bookings/${bookingId}/verify/`);
//       fetchBookings();
//     } catch (err) {
//       console.error("Failed to verify payment", err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <p className="text-gray-500">Loading bookings...</p>
//       </div>
//     );
//   }

//   if (!bookings.length) {
//     return (
//       <div className="p-6 bg-white dark:bg-dark min-h-screen">
//         <h1 className="text-2xl font-bold mb-6">Bookings</h1>
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//           <p className="text-gray-600 dark:text-white">No bookings yet.</p>
//         </div>
//       </div>
//     );
//   }

//   const showPayColumn = bookings.some((b) => b.payment_status !== "paid");

//   return (
//     <div className="p-6 bg-white dark:bg-dark min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

//       <div className="overflow-x-auto bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//         <table className="min-w-full table-auto border rounded-lg">
//           <thead className="bg-gray-100 dark:bg-gray-800">
//             <tr>
//               <th className="px-4 py-2 text-left">User</th>
//               <th className="px-4 py-2 text-left">Organizer</th>
//               <th className="px-4 py-2 text-left">Event</th>
//               <th className="px-4 py-2 text-left">Amount</th>
//               <th className="px-4 py-2 text-left">Paid</th>
//               <th className="px-4 py-2 text-left">Status</th>
//               <th className="px-4 py-2 text-left">Paid At</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b.id} className="border-t">
//                 <td className="px-4 py-2">{b.participant_user.email}</td>
//                 <td className="px-4 py-2">{b.tour.organizer_email}</td>
//                 <td className="px-4 py-2">{b.tour.title}</td>
//                 <td className="px-4 py-2">{b.amount}</td>
//                 <td className="px-4 py-2">{b.amount_paid || 0}</td>

//                 <td className="px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium capitalize ${
//                       b.payment_status === "paid"
//                         ? "bg-green-100 text-green-700"
//                         : b.payment_status === "partial"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {b.payment_status}
//                   </span>
//                 </td>

//                 <td className="px-4 py-2">
//                   {b.paid_at ? new Date(b.paid_at).toLocaleString() : "N/A"}
//                 </td>

//                 <td className="px-4 py-2">
//                   <div className="flex gap-2 items-center">

//                     {/* ✅ Admin cash verification */}
//                     {b.payment_status !== "paid" && (
//                       <button
//                         onClick={() => verifyPayment(b.id)}
//                         className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                       >
//                         Verify Cash
//                       </button>
//                     )}

                    
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminBookings;


// src/pages/dashboard/admin/AdminBookings.jsx 
// import React, { useEffect, useMemo, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { MenuItem, Select, FormControl, Snackbar, Alert } from "@mui/material";
// import { useAuth } from "../../../context/AuthContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../../api/axiosInstance";
// import { fetchBookings } from "../../../context/authAPI";

// // Skeleton loader component
// const DataGridSkeleton = ({ columns, rowCount = 10 }) => {
//   const skeletonRows = Array.from({ length: rowCount }, (_, i) => ({
//     id: `loading-${i}`,
//     ...Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`])),
//   }));

//   return (
//     <div className="animate-pulse h-[400px] w-full">
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
// };

// export default function AdminBookings() {
//   const { accessToken } = useAuth();
//   const queryClient = useQueryClient();
//   const API_BASE = import.meta.env.VITE_API_URL;

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   useEffect(() => {
//     const onThemeChange = (e) => setTheme(e.detail);
//     window.addEventListener("themeChanged", onThemeChange);
//     return () => window.removeEventListener("themeChanged", onThemeChange);
//   }, []);

//   const showSnackbar = (message, severity = "success") => {
//     setSnackbarMessage(message);
//     setSnackbarSeverity(severity);
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = () => setSnackbarOpen(false);

//   // 🔹 Fetch bookings
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["bookings", page, pageSize],
//     queryFn: () => fetchBookings(page, pageSize),
//     enabled: !!accessToken,
//     keepPreviousData: true,
//   });

//   const totalRows = data?.total ?? 0;

//   // 🔹 Mutation for verifying payment
//   const verifyMutation = useMutation({
//     mutationFn: async (bookingId) => api.patch(`/bookings/${bookingId}/verify/`),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["bookings"] });
//       showSnackbar("Payment verified!", "success");
//     },
//     onError: () => showSnackbar("Failed to verify payment", "error"),
//   });

//   const handleVerifyPayment = (id) => verifyMutation.mutate(id);

//   // 🔹 DataGrid columns
//   const columns = useMemo(
//     () => [
//       { field: "user", headerName: "User", flex: 1 },
//       { field: "organizer", headerName: "Organizer", flex: 1 },
//       { field: "event", headerName: "Event", flex: 1 },
//       { field: "amount", headerName: "Amount", flex: 0.7 },
//       { field: "paid", headerName: "Paid", flex: 0.7 },
//       {
//         field: "status",
//         headerName: "Status",
//         flex: 1,
//         renderCell: (params) => {
//           const status = params.value;
//           const colors =
//             status === "paid"
//               ? "bg-green-100 text-green-700"
//               : status === "partial"
//               ? "bg-yellow-100 text-yellow-700"
//               : "bg-red-100 text-red-700";

//           return (
//             <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors}`}>
//               {status}
//             </span>
//           );
//         },
//       },
//       { field: "paid_at", headerName: "Paid At", flex: 1 },
//       {
//         field: "actions",
//         headerName: "Actions",
//         flex: 1,
//         renderCell: (params) =>
//           params.row.status !== "paid" ? (
//             <button
//               onClick={() => handleVerifyPayment(params.row.id)}
//               className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//             >
//               Verify Cash
//             </button>
//           ) : null,
//       },
//     ],
//     []
//   );

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
//         color: theme === "light" ? "#1f2937" : "#e5e7eb" 
//       },
//       "& .MuiDataGrid-row:hover": {
//         backgroundColor: theme === "light" ? "#f3f4f6" : "#1e293b",
//       },
//       "& .MuiDataGrid-footerContainer": {
//         backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
//         color: theme === "light" ? "#4b5563" : "#e5e7eb",
//       },
//       "& .MuiTablePagination-root": { 
//         color: theme === "light" ? "#4b5563" : "#e5e7eb" 
//       },
//       "& .MuiSvgIcon-root": { 
//         color: theme === "light" ? "#4b5563" : "#e5e7eb" 
//       },
//     }),
//     [theme]
//   );

//   const rows = useMemo(() => 
//     data?.bookings?.map((b) => ({
//       id: b.id,
//       user: b.participant_user.email,
//       organizer: b.tour.organizer_email,
//       event: b.tour.title,
//       amount: b.amount,
//       paid: b.amount_paid || 0,
//       status: b.payment_status,
//       paid_at: b.paid_at ? new Date(b.paid_at).toLocaleString() : "N/A",
//     })) || [], 
//     [data]
//   );

//   if (error) return <div className="text-red-500">Failed to load bookings.</div>;

//   return (
//     <div style={{ width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
//       {isLoading ? (
//         <DataGridSkeleton columns={columns} />
//       ) : rows.length === 0 ? (
//         <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
//           <p className="text-gray-600 dark:text-white">No bookings yet.</p>
//         </div>
//       ) : (
//         <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row) => row.id}
//             rowCount={totalRows}
//             autoHeight
//             pagination
//             paginationMode="server"
//             paginationModel={{ page, pageSize }}
//             onPaginationModelChange={(model) => {
//               setPage(model.page);
//               setPageSize(model.pageSize);
//             }}
//             pageSizeOptions={[10, 20, 50]}
//             loading={isLoading || verifyMutation.isLoading}
//             sx={sx}
//           />
//         </div>
//       )}

//       <Snackbar 
//         open={snackbarOpen} 
//         autoHideDuration={3000} 
//         onClose={handleCloseSnackbar}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbarSeverity} 
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// src/pages/dashboard/admin/AdminBookings.jsx 
import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Snackbar, Alert, Box } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/axiosInstance";
import { useUIStore } from "../../../store/useUIStore";
import {DataGridSkeleton} from "../../../components";
import { fetchBookings } from "../../../api/bookingAPI";

// Skeleton loader component


export default function AdminBookings() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const theme = useUIStore((state) => state.theme);
 
  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // 🔹 Fetch bookings
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", page, pageSize],
    queryFn: () => fetchBookings(page, pageSize),
    enabled: !!accessToken,
    keepPreviousData: true,
  });

  const totalRows = data?.total ?? 0;

  // 🔹 Mutation for verifying payment
  const verifyMutation = useMutation({
    mutationFn: async (bookingId) => api.patch(`/bookings/${bookingId}/verify/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      showSnackbar("Payment verified!", "success");
    },
    onError: () => showSnackbar("Failed to verify payment", "error"),
  });

  const handleVerifyPayment = (id) => verifyMutation.mutate(id);

  // 🔹 DataGrid columns
  const columns = useMemo(
    () => [
      { field: "user", headerName: "User", flex: 1 },
      { field: "organizer", headerName: "Organizer", flex: 1 },
      { field: "event", headerName: "Event", flex: 1 },
      { field: "amount", headerName: "Amount", flex: 0.7 },
      { field: "paid", headerName: "Paid", flex: 0.7 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          const status = params.value;
          const colors =
            status === "paid"
              ? "bg-green-100 text-green-700"
              : status === "partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";

          return (
            <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors}`}>
              {status}
            </span>
          );
        },
      },
      { field: "paid_at", headerName: "Paid At", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1,
        renderCell: (params) =>
          params.row.status !== "paid" ? (
            <button
              onClick={() => handleVerifyPayment(params.row.id)}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
            >
              Verify Cash
            </button>
          ) : null,
      },
    ],
    [theme]
  );

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
      backgroundColor: theme === "dark" ? "#0f172a " : "#ffffff",
    },

    "& .MuiDataGrid-cell": {
      color: theme === "dark" ? "#e2e8f0" : "#0f172a",
      borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
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


  const rows = useMemo(() => 
    data?.bookings?.map((b) => ({
      id: b.id,
      user: b.participant_user.email,
      organizer: b.tour.organizer_email,
      event: b.tour.title,
      amount: b.amount,
      paid: b.amount_paid || 0,
      status: b.payment_status,
      paid_at: b.paid_at ? new Date(b.paid_at).toLocaleString() : "N/A",
    })) || [], 
    [data]
  );

  if (error) return <div className="text-red-500">Failed to load bookings.</div>;
  
  return (
    <div style={{ width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
      
      {isLoading ? (
        <DataGridSkeleton columns={columns} />
      ) : rows.length === 0 ? (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-gray-600 dark:text-white">No bookings yet.</p>
        </div>
      ) : (
       <Box sx={{ width: "100%", borderRadius:"5px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            rowCount={totalRows}
            autoHeight
            pagination
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            pageSizeOptions={[10, 20, 50]}
            loading={isLoading}
            sx={sx}
          />
        </Box>
      )}

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}