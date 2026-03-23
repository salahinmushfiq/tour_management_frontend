// src/pages/dashboard/admin/AdminBookings.jsx 
import React, { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "../../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUIStore } from "../../../store/useUIStore";
import {DataGridSkeleton} from "../../../components";
import { fetchBookings } from "../../../api/bookingAPI";

export default function AdminBookings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const showSnackbar = useUIStore((state) => state.showSnackbar);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const theme = useUIStore((state) => state.theme);

  // 🔹 Fetch bookings
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", page, pageSize],
    queryFn: () => fetchBookings(page, pageSize),
    enabled: !!user?.id,
    keepPreviousData: true,
    retry: 1,
    refetchOnWindowFocus: false
  });
  
  const bookings = data?.bookings ?? [];
  const totalRows = data?.total ?? 0;

  // 🔹 Mutation for verifying payment
  const verifyMutation = useMutation({
    mutationFn: (bookingId) => verifyPayment(bookingId),
    onSuccess: () => {
      showSnackbar("Payment verified", "success");
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings", user?.id],
      });
    }
  });

  const handleVerifyPayment = (id) => verifyMutation.mutate(id);

  // 🔹 DataGrid columns
  const columns = useMemo(
    () => [
      { field: "participant", headerName: "User", flex: 1,
        valueGetter: (params) =>
          params.row.participant_user?.email },
      { field: "user_email", headerName: "Organizer", flex: 1,valueGetter: (params) => params.row.tour?.organizer_email },
      { field: "tour", headerName: "Event", flex: 1,valueGetter: (params) => params.row.tour?.title },
      { field: "amount", headerName: "Amount", flex: 0.7 },
      { field: "paid",type: "number", headerName: "Paid", flex: 0.7,
        valueGetter: (params) => params.row.amount_paid || 0 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
          const status = params.row.payment_status;
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
      { 
        field: "lastPaidAt", 
        headerName: "Paid At",
        flex: 1, 
        valueGetter: (params) => {
          const time = params.row.latest_payment_time;
          return time ? new Date(time).toLocaleString() : "N/A";
        }, 
      },
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

  if (error) return <div className="text-red-500">Failed to load bookings.</div>;
  
  return (
    <div style={{ width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
      {isLoading ? (
        <DataGridSkeleton 
        rowCount={pageSize}
        columns={columns} 
        theme={theme}
        />
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-gray-600 dark:text-white">No bookings yet.</p>
        </div>
      ) : (
          <DataGrid
            rows={bookings}
            columns={columns}
            getRowId={(row) => row.id ?? row.pk}
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
            sx={sx}
          />
      )}

    </div>
  );
}