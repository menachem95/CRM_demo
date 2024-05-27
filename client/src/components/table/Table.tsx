import * as React from "react";
import { FC, Suspense, useState } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Popover } from "@mui/material";
// import CustomPopover from "./CustomPopover";
const CustomPopover = React.lazy(() => import("./CustomPopover"));

interface Props {
  rows: {}[];
  columns: GridColDef[];
  cellType: string;
}
const Table: FC<Props> = ({ rows, columns, cellType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleRowlClick = (
    params: GridRowParams,
    event: React.MouseEvent<HTMLElement>,
    cellType: string
  ) => {
    console.log("params: ", params);
    if (cellType === "user_name") {
      setSelectedRow(params.row);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        onRowClick={(p, e) => handleRowlClick(p, e, cellType)}
      />

      {cellType === "user_name" && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{
            ".MuiPopover-paper": {
              p: 2,
              maxWidth: "100%",
            },
          }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <CustomPopover user={selectedRow} />
          </Suspense>
        </Popover>
      )}
    </div>
  );
};

export default Table;
