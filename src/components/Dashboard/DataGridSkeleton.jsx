import { DataGrid } from "@mui/x-data-grid";

const  DataGridSkeleton = ({ columns, rowCount = 10,theme }) => {
  const skeletonRows = Array.from({ length: rowCount }, (_, i) => ({
    id: `skeleton-${i}`,
    ...Object.fromEntries(columns.map((c) => [c.field, `loading-${i}-${c.field}`])),
  }));

  return (
    <div className="animate-pulse dark:text-white">
      <DataGrid
        rows={skeletonRows}
        columns={columns.map((col) => ({
            ...col,
            renderCell: () => (
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded dark:text-white" />
            ),
        }))}
        autoHeight
        hideFooter
        sx={{
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
          }
        }}
      />
    </div>
  );
}
export default DataGridSkeleton;
