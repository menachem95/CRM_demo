import * as React from 'react';
import { FC, useState } from 'react';
import { DataGrid, GridCellParams, GridColDef, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import {Box, Typography, Paper} from '@mui/material'
import {TableContainer} from '@mui/material';
import {Button} from '@mui/material';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Popover } from '@mui/material';


// // const columns: GridColDef[] = [
  
// //     { field: 'firstName', headerName: 'First name', width: 150 },
// //     { field: 'lastName', headerName: 'Last name', width: 150 },
// //     {
// //       field: 'age',
// //       headerName: 'Age',
// //       type: 'number',
// //       width: 20
// //     },
// //     {
// //       field: 'fullName',
// //       headerName: 'Full name',
// //       description: 'This column has a value getter and is not sortable.',
// //       sortable: false,
// //       width: 150,
// //       valueGetter: (params: GridValueGetterParams) =>
// //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
// //     },{field: "agent", headerName: "Agent", width: 150}
// //   ];
  
// //   const rows = [
// //     { id: 1, lastName: 'Snow', firstName: 'Jon', agent: "moshe" ,age: 35 },
// //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', agent: "ido" ,age: 42 },
// //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', agent: "moshe" ,age: 45 },
// //     { id: 4, lastName: 'Stark', firstName: 'Arya', agent: "menachem" ,age: 16 },
// //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', agent: "moshe" ,age: null },
// //     { id: 6, lastName: 'Melisandre', firstName: null, agent: "moshe" ,age: 150 },
// //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', agent: "menachem" ,age: 44 },
// //     { id: 8, lastName: 'Frances', firstName: 'Rossini', agent: "moshe" ,age: 36 },
// //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', agent: "moshe" ,age: 65 },
// //     { id: 10, lastName: 'Stark', firstName: 'Arya', agent: "natan" ,age: 16 },
// //     { id: 11, lastName: 'Targaryen', firstName: 'Daenerys', agent: "moshe" ,age: null },
// //     { id: 12, lastName: 'Melisandre', firstName: null, agent: "moshe" ,age: 150 },
// //     { id: 13, lastName: 'Clifford', firstName: 'Ferrara', agent: "ido" ,age: 44 },
// //     { id: 14, lastName: 'Frances', firstName: 'Rossini', agent: "moshe" ,age: 36 },
// //     { id: 15, lastName: 'Stark', firstName: 'Arya', agent: "moshe" ,age: 16 },
// //     { id: 16, lastName: 'Targaryen', firstName: 'Daenerys', agent: "moshe" ,age: null },
// //     { id: 17, lastName: 'Melisandre', firstName: null, agent: "menachem" ,age: 150 },
// //     { id: 18, lastName: 'Clifford', firstName: 'Ferrara', agent: "moshe" ,age: 44 },
// //     { id: 19, lastName: 'Frances', firstName: 'Rossini', agent: "levi" ,age: 36 },
// //     { id: 20, lastName: 'Stark', firstName: 'Arya', agent: "moshe" ,age: 16 },
// //     { id: 21, lastName: 'Targaryen', firstName: 'Daenerys', agent: "moshe" ,age: null },
// //     { id: 22, lastName: 'Melisandre', firstName: null, agent: "moshe" ,age: 150 },
// //     { id: 23, lastName: 'Clifford', firstName: 'Ferrara', agent: "moshe" ,age: 44 },
// //     { id: 24, lastName: 'Frances', firstName: 'Rossini', agent: "moshe" ,age: 36 },
// //   ];
  
//   // export default 

  interface Props {
    rows: {}[],
    columns: GridColDef[]
  }
 const Table: FC<Props> = ({rows, columns}) => {
  // const [open, setOpen] = React.useState(false);
  // const [selectedRow, setSelectedRow] = React.useState<any>();

  // const handleRowClick = (params: GridRowParams) => {
  //   setSelectedRow(params.row);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleCellClick = (params: GridCellParams, event: React.MouseEvent<HTMLElement>) => {
    console.log("params: ", params);
    if(params.field !== "user_name") return;
    setSelectedRow(params.row);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    return (
      <div style={{ width: '100%' }}>
        <DataGrid
       
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            }, 
          }}
          pageSizeOptions={[5, 10]}
          // rowSelection={false}
          // onRowClick={handleRowClick}
          onCellClick={handleCellClick}
          // checkboxSelection
          
        />
         {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Additional Information</DialogTitle>
        <DialogContent>
         
          {selectedRow && <div>More details about {selectedRow.someField}</div>}
        </DialogContent>
      </Dialog> */}
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper>
           <Typography component="div" sx={{ p: 2 }}>
          {/* Render the details here using selectedRow data */}
          {selectedRow && <div>Details about {selectedRow.user_id}</div>}
        </Typography>
        <Typography>
        {/* {selectedRow.user_name} */}
        </Typography>
        </Paper>
       
      </Popover>
         </div>
    );
  }

  export default Table
