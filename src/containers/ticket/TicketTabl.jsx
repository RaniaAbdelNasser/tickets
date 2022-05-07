import React from "react";

import {  TablePagination, Divider, IconButton, Table,  TableRow, TableHead, TableContainer, TableCell, TableBody } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";

function TicketsTable({ tickets, ...props }) {
    let historyNavigate = useNavigate();
    // vars for handel view page ...
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0); 

       // handel Function section
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
  
    return (
        <TableContainer  >
            {tickets?.length > 0 &&
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id</TableCell>
                            <TableCell align="center">Subject</TableCell>
                            <TableCell align="center">Priority</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tickets?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="center">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="center">{row.subject}</TableCell>
                                    <TableCell align="center">{row.priority}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" aria-label="upload picture" onClick={()=>  {historyNavigate(`/viewTicket/${row.id}`);}} >
                                            <RemoveRedEyeIcon />
                                        </IconButton>
                                        {/* <IconButton color="error" aria-label="upload picture" component="span">
                                            <DeleteForeverIcon />
                                        </IconButton> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            }
            <Divider />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tickets?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

    )
}

export default TicketsTable;