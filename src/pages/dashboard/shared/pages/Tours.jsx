// import React, { useEffect, useState, useMemo } from "react";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
// } from "@mui/x-data-grid";
// import { useAuth } from "../../../../context/AuthContext";
// import  axiosInstance  from "../../../../api/axiosInstance";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { useNavigate } from "react-router-dom"; // ✅ for navigation

// // 🔹 Custom Toolbar with Search + CSV/JSON/Excel Export
// function CustomToolbar({ rows, searchText, setSearchText }) {
//   const handleJsonExport = () => {
//     const json = JSON.stringify(rows, null, 2);
//     const blob = new Blob([json], { type: "application/json" });
//     saveAs(blob, "tours.json");
//   };

//   const handleExcelExport = () => {
//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Tours");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "tours.xlsx");
//   };

//   return (
//     <GridToolbarContainer className="flex flex-wrap gap-4 p-4 bg-gray-100 dark:bg-gray-700 items-center justify-between">
      
//       {/* 🔹 Search Input */}
//       <input
//         type="search"
//         placeholder="Search tours..."
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         className="px-4 py-2 border rounded w-64 bg-gray-100 dark:bg-gray-800 dark:text-white"
//       />
      
//       <div className="flex gap-4">
//         <GridToolbarExport csvOptions={{ fileName: "tours", utf8WithBom: true }} />
//         <button
//           onClick={handleJsonExport}
//           className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Export JSON
//         </button>
//         <button
//           onClick={handleExcelExport}
//           className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Export Excel
//         </button>
//       </div>

      
//     </GridToolbarContainer>
//   );
// }

// // 🔹 Skeleton Loader for DataGrid
// function DataGridSkeleton({ columns, rowCount = 10 }) {
//   const skeletonRows = Array.from({ length: rowCount }, (_, i) =>
//     Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`]))
//   );

//   return (
//     <div className="animate-pulse" style={{ overflowX: 'auto' }}>
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

// export default function Tours() {
//   const { user } = useAuth();
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const API_BASE = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate(); // ✅ for navigation to details page

//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const onThemeChange = (e) => setTheme(e.detail);
//     window.addEventListener("themeChanged", onThemeChange);
//     return () => window.removeEventListener("themeChanged", onThemeChange);
//   }, []);

//   useEffect(() => {
//     async function fetchTours() {
//       try {
//         const res = await axiosInstance.get(`${API_BASE}/tours/`);
//         setTours(res.data?.results || res.data || []);
//         console.log("tours");
//         console.log(res.data);
//       } catch (err) {
//         console.error("Failed to load Tours", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTours();
//   }, []);
  
//   const handleDetails = (id) => {
//     // 🔹 Navigate to details page (can be modal or page)
//     if (user?.role === "admin") {
//     navigate(`/dashboard/admin/tours/${id}`);}
//     else if  (user?.role === "guide") {
//     navigate(`/dashboard/guide/tours/${id}`);
//     }
//     else {
//     navigate(`/dashboard/organizer/tours/${id}`);
//     }
//   };
  

//     const columns = useMemo(() => {
//     const baseCols = [
//       { field: "id", headerName: "ID", width: 70 },
//       { field: "title", headerName: "Title", width: 250 },
//       { field: "category", headerName: "Category", width: 120 },
//       { field: "start_date", headerName: "Start Date", width: 130 },
//       { field: "end_date", headerName: "End Date", width: 130 },
//       { field: "start_location", headerName: "Start Location", width: 160 },
//       {
//         field: "details",
//         headerName: "Details",
//         width: 120,
//         sortable: false,
//         renderCell: (params) => (
//           <button
//             onClick={() => handleDetails(params.row.id)}
//             className="px-3 py-1 bg-brand text-white rounded hover:bg-brand-dark"
//           >
//             View
//           </button>
//         ),
//       },
//     ];

//     if (!isSmallScreen) {
//       baseCols.splice(3, 0, { field: "organizer", headerName: "Organizer Mail", width: 180 });
//       baseCols.splice(6, 0, { field: "end_location", headerName: "End Location", width: 160 });
//     }

//     return baseCols;
//   }, [isSmallScreen]);

//   // 🔹 Client-side search
//   const filteredTours = useMemo(() => {
//     if (!searchText) return tours;
//     const lower = searchText.toLowerCase();
//     return tours.filter(
//       (tour) =>
//         tour.title?.toLowerCase().includes(lower) ||
//         tour.category?.toLowerCase().includes(lower) ||
//         tour.organizer?.toLowerCase().includes(lower) ||
//         tour.start_location?.toLowerCase().includes(lower) ||
//         tour.end_location?.toLowerCase().includes(lower)
//     );
//   }, [tours, searchText]);

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
//   <div
//     className="inset-0 max-w-full px-4">
//     {loading ? (
//       <DataGridSkeleton columns={columns} rowCount={10} />
//     ) : (
//       <div className="overflow-x-auto w-full  max-w-full">
//         <DataGrid
//           rows={filteredTours}
//           columns={columns}
//           getRowId={(row) => row.id ?? row.pk}
//           autoHeight
//           pagination
//           paginationModel={paginationModel}
//           onPaginationModelChange={setPaginationModel}
//           pageSizeOptions={[10, 15, 25]}
//           disableColumnFilter
//           disableColumnSelector
//           disableDensitySelector
//           slots={{
//             toolbar: () => (
//               <CustomToolbar
//                 rows={filteredTours}
//                 searchText={searchText}
//                 setSearchText={setSearchText}
//               />
//             ),
//           }}
//           sx={sx}
//         />
//       </div>
//     )}
//   </div>
// );
// }
import React, { useEffect, useState, useMemo } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useAuth } from "../../../../context/AuthContext";
import axiosInstance from "../../../../api/axiosInstance";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

// 🔹 Custom Toolbar with Search + CSV/JSON/Excel Export
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

// 🔹 Skeleton Loader for DataGrid
function DataGridSkeleton({ columns, rowCount = 10 }) {
  const skeletonRows = Array.from({ length: rowCount }, (_, i) =>
    Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`]))
  );

  return (
    <div className="animate-pulse" style={{ overflowX: 'auto' }}>
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

export default function Tours() {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const onThemeChange = (e) => setTheme(e.detail);
    window.addEventListener("themeChanged", onThemeChange);
    return () => window.removeEventListener("themeChanged", onThemeChange);
  }, []);

  // 🔹 Server-side fetch
  useEffect(() => {
    async function fetchTours() {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${API_BASE}/tours/`, {
          params: {
            page: paginationModel.page + 1, // DRF pages are 1-indexed
            page_size: paginationModel.pageSize,
          },
        });
        setTours(res.data.results || res.data);
        setRowCount(res.data.count || (res.data.results?.length ?? 0));
      } catch (err) {
        console.error("Failed to load Tours", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, [paginationModel, API_BASE]);

  const handleDetails = (id) => {
    if (user?.role === "admin") navigate(`/dashboard/admin/tours/${id}`);
    else if (user?.role === "guide") navigate(`/dashboard/guide/tours/${id}`);
    else navigate(`/dashboard/organizer/tours/${id}`);
  };

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
    <div className="inset-0 max-w-full px-4">
      {loading ? (
        <DataGridSkeleton columns={columns} rowCount={paginationModel.pageSize} />
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 15, 25]}
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
