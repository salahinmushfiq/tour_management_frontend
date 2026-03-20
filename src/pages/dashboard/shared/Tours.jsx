//src/pages/dashboard/shared/pages/Tours.jsx
import React, { useMemo, useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useAuth } from "../../../context/AuthContext";
import axiosInstance from "../../../api/axiosInstance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUIStore } from "../../../store/useUIStore";
import DataGridSkeleton from "../../../components/DataGridSkeleton";

// ─── Custom Toolbar ─────────────────────────────────────────────
function CustomToolbar({ rows, searchText, setSearchText }) {
  const handleJsonExport = () => {
    const json = JSON.stringify(rows, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    saveAs(blob, "tours.json");
  };

  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tours");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tours.xlsx");
  };

  return (
    <GridToolbarContainer className="flex flex-wrap gap-4 p-4 bg-gray-100 dark:bg-gray-700 items-center justify-between">
      <input
        type="search"
        placeholder="Search tours..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="px-4 py-2 border rounded w-64 bg-gray-100 dark:bg-gray-800 dark:text-white"
      />
      <div className="flex gap-4">
        <GridToolbarExport csvOptions={{ fileName: "tours", utf8WithBom: true }} />
        <button
          onClick={handleJsonExport}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Export JSON
        </button>
        <button
          onClick={handleExcelExport}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export Excel
        </button>
      </div>
    </GridToolbarContainer>
  );
}



// ─── Main Component ─────────────────────────────────────────────
export default function Tours() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_URL;

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const theme = useUIStore((state) => state.theme);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // ─── Responsive columns & theme listener ─────────────────────────────
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // ─── Fetch Tours ─────────────────────────────────────────────
  const { data, isLoading, error } = useQuery({
    queryKey: ["tours", page, pageSize],
    queryFn: async () => {
      const res = await axiosInstance.get(`${API_BASE}/tours/`, {
        params: { page: page + 1, page_size: pageSize },
      });
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const tours = data?.results || data || [];
  const rowCount = data?.count || tours.length;

  const handleDetails = (id) => {
    if (user?.role === "admin") navigate(`/dashboard/admin/tours/${id}`);
    else if (user?.role === "guide") navigate(`/dashboard/guide/tours/${id}`);
    else navigate(`/dashboard/organizer/tours/${id}`);
  };

  // ─── Columns ─────────────────────────────────────────────
  const columns = useMemo(() => {
    const baseCols = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "title", headerName: "Title", width: 250 },
      { field: "category", headerName: "Category", width: 120 },
      { field: "start_date", headerName: "Start Date", width: 130 },
      { field: "end_date", headerName: "End Date", width: 130 },
      { field: "start_location", headerName: "Start Location", width: 160 },
      {
        field: "details",
        headerName: "Details",
        width: 120,
        sortable: false,
        renderCell: (params) => (
          <button
            onClick={() => handleDetails(params.row.id)}
            className="px-3 py-1 bg-brand text-white rounded hover:bg-brand-dark"
          >
            View
          </button>
        ),
      },
    ];

    if (!isSmallScreen) {
      baseCols.splice(3, 0, { field: "organizer", headerName: "Organizer Mail", width: 180 });
      baseCols.splice(6, 0, { field: "end_location", headerName: "End Location", width: 160 });
    }

    return baseCols;
  }, [isSmallScreen]);

  // ─── Client-side search ─────────────────────────────────────────────
  const filteredTours = useMemo(() => {
    if (!searchText) return tours;
    const lower = searchText.toLowerCase();
    return tours.filter(
      (tour) =>
        tour.title?.toLowerCase().includes(lower) ||
        tour.category?.toLowerCase().includes(lower) ||
        tour.organizer?.toLowerCase().includes(lower) ||
        tour.start_location?.toLowerCase().includes(lower) ||
        tour.end_location?.toLowerCase().includes(lower)
    );
  }, [tours, searchText]);

  // ─── Theme styling ─────────────────────────────────────────────
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
      "& .MuiDataGrid-cell": { color: theme === "light" ? "#1f2937" : "#e5e7eb" },
      "& .MuiDataGrid-row:hover": {
        backgroundColor: theme === "light" ? "#f3f4f6" : "#1e293b",
      },
      "& .MuiDataGrid-footerContainer": {
        backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
        color: theme === "light" ? "#4b5563" : "#e5e7eb",
      },
      "& .MuiTablePagination-root": { color: theme === "light" ? "#4b5563" : "#e5e7eb" },
      "& .MuiSvgIcon-root": { color: theme === "light" ? "#4b5563" : "#e5e7eb" },
    }),
    [theme]
  );

  if (error) return <div className="text-red-500">Failed to load tours.</div>;

  return (
    <div className="inset-0 max-w-full px-4">
      {isLoading ? (
        <DataGridSkeleton columns={columns} rowCount={pageSize} />
      ) : (
        <div className="overflow-x-auto w-full max-w-full">
          <DataGrid
            rows={filteredTours}
            columns={columns}
            getRowId={(row) => row.id ?? row.pk}
            autoHeight
            pagination
            paginationMode="server"
            rowCount={rowCount}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            pageSizeOptions={[12, 25, 50]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{
              toolbar: () => (
                <CustomToolbar
                  rows={filteredTours}
                  searchText={searchText}
                  setSearchText={setSearchText}
                />
              ),
            }}
            sx={sx}
          />
        </div>
      )}
    </div>
  );
}