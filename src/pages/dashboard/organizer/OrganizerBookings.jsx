import React, { useMemo, useRef, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import {
  fetchBookings,
  cashCollect,
  verifyPayment,
} from "../../../api/bookingAPI";
import { useUIStore } from "../../../store/useUIStore";
import { DataGrid } from "@mui/x-data-grid";
import {DataGridSkeleton} from "../../../components";



// ==============================
// Main Component
// ==============================
export default function OrganizerBookings() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const showSnackbar = useUIStore((state) => state.showSnackbar);

  const inputRefs = useRef({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const theme = useUIStore((state) => state.theme);

  // ==============================
  // Fetch Bookings (Server Pagination)
  // ==============================
  const { data, isLoading } = useQuery({
    queryKey: ["organizer-bookings", user?.id, page, pageSize],
    queryFn: () => fetchBookings(page, pageSize),
    enabled: !!user?.id,
    keepPreviousData: true,
    retry: 1,
    refetchOnWindowFocus: false
  });

  const bookings = data?.bookings ?? [];
  const totalRows = data?.total ?? 0;

  // ==============================
  // Mutations
  // ==============================
  const cashMutation = useMutation({
    mutationFn: ({ bookingId, amount }) =>
      cashCollect(bookingId, amount),
    onSuccess: () => {
      showSnackbar("Cash collected successfully", "success");
      queryClient.invalidateQueries({
        queryKey: ["organizer-bookings", user?.id],
      });
    }
  });

  const verifyMutation = useMutation({
    mutationFn: (bookingId) => verifyPayment(bookingId),
    onSuccess: () => {
      showSnackbar("Payment verified", "success");
      queryClient.invalidateQueries({
        queryKey: ["organizer-bookings", user?.id],
      });
    }
  });

  // ==============================
  // Columns
  // ==============================
  const columns = useMemo(
    () => [
      {
        field: "participant",
        headerName: "User",
        flex: 1,
        valueGetter: (params) =>
          params.row.participant_user?.email,
      },
      {
        field: "tour",
        headerName: "Tour",
        flex: 1,
        valueGetter: (params) => params.row.tour?.title,
      },
      { field: "amount", 
        headerName: "Amount", 
        type: "number", 
        flex: 0.6 },
      {
        field: "paid",
        headerName: "Paid",
        type: "number",
        flex: 0.6,
        valueGetter: (params) => params.row.amount_paid || 0,
      },
      {
        field: "due",
        headerName: "Due",
        type: "number",
        flex: 0.6,
        valueGetter: (params) =>
          params.row.amount - (params.row.amount_paid || 0),
      },
      {
        field: "status",
        headerName: "Status",
        flex: 0.7,
        renderCell: (params) => {
          const status = params.row.payment_status;
          const colors =
            status === "paid"
              ? "bg-green-100 text-green-700"
              : status === "partial"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium capitalize ${colors}`}
            >
              {status}
            </span>
          );
        },
      },
     {
        field: "lastPaidAt",
        headerName: "Last Paid At",
        flex: 1,
        valueGetter: (params) => {
          const time = params.row.latest_payment_time;
          return time ? new Date(time).toLocaleString() : "N/A";
        },
      },
      {
        field: "lastMethod",
        headerName: "Last Method",
        flex: 1,
        renderCell: (params) => {
          const method = params.row.latest_payment_method;

          if (!method) {
            return <span className="text-gray-400 text-xs">N/A</span>;
          }
          return (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs capitalize">
              {method}
            </span>
          );
        },
      },
      {
        field: "cashEntry",
        headerName: "Cash Entry",
        flex: 1,
        renderCell: (params) => {
          const amountDue =
            params.row.amount -
            (params.row.amount_paid || 0);

          if (amountDue <= 0)
            return <span className="text-gray-400 text-xs">—</span>;

          const handleAddCash = () => {
            const value = parseFloat(
              inputRefs.current[params.row.id]?.value
            );

            if (!value || value <= 0) {
              showSnackbar("Enter valid amount", "warning");
              return;
            }

            cashMutation.mutate({
              bookingId: params.row.id,
              amount: value,
            });
          };

          return (
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="৳"
                ref={(el) =>
                  (inputRefs.current[params.row.id] = el)
                }
                disabled={cashMutation.isPending}
                className="border px-2 py-1 text-xs rounded w-20 dark:text-white dark:bg-slate-700"
              />
              <button
                onClick={handleAddCash}
                disabled={cashMutation.isPending}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {cashMutation.isPending ? "..." : "Add"}
              </button>
            </div>
          );
        },
      },
      {
        field: "verify",
        headerName: "Verify",
        flex: 0.7,
        renderCell: (params) => {
          if (params.row.payment_status !== "partial")
            return (
              <span className="text-gray-400 text-xs">—</span>
            );

          return (
            <button
              onClick={() =>
                verifyMutation.mutate(params.row.id)
              }
              disabled={verifyMutation.isPending}
              className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50"
            >
              {verifyMutation.isPending
                ? "..."
                : "Mark Full Paid"}
            </button>
          );
        },
      },
    ],
    [cashMutation, verifyMutation, showSnackbar]
  );

  // ==============================
  // DataGrid Theme Styling
  // ==============================
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

  // ==============================
  // Render
  // ==============================
  return (
    <div style={{ width: '100%', background: theme === 'dark' ? '#1e293b' : 'white' }}>
      {isLoading ? (
        <DataGridSkeleton
          columns={columns}
          rowCount={pageSize}
          theme={theme}
        />
      ) : bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <p className="text-gray-600 dark:text-white">
            No bookings yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            background:
              theme === "dark" ? "#1e293b" : "white",
          }}
        >
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
        </div>
      )}
    </div>
  );
}