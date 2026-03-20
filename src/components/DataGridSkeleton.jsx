import { DataGrid } from "@mui/x-data-grid";

const  DataGridSkeleton = ({ columns, rowCount = 10 }) => {
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
            "& .MuiDataGrid-cell": {
            backgroundColor: "transparent",
            },
            "& .MuiDataGrid-cellContent": {
            color: "inherit", // <- inherit from parent, so dark mode works
            },
        }}
      />
    </div>
  );
}
export default DataGridSkeleton;
