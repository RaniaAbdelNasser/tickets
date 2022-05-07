import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/Provider";
import getTickets from "../../context/actions/tickets/getTickets"
import { Button, TablePagination, Chip, IconButton, Table, Typography, Container, Paper, Box, CircularProgress, TableRow, TableHead, TableContainer, TableCell, TableBody } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ListTickets from './ListTickets';

import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TicketsTable from './TicketTabl';
import TableViewIcon from '@mui/icons-material/TableView';
function TicketsView() {

    const {
        ticketsDispatch,
        ticketsState: {
            tickets: { loading, error, tickets },
        },
    } = useContext(GlobalContext);

    const [view, setView] = React.useState('list');
    const handleChange = (event, nextView) => {
        setView(nextView);
    };

    useEffect(() => {
        getTickets()(ticketsDispatch);
    }, []);

    return (
        <Container style={{ marginTop: "35px" }}>
            <Paper m={3}>
                <Typography variant="h5" component="h5" p={4}>
                    <AutoAwesomeMotionIcon color="primary" />
                    <span className="title">Tickets List</span>
                    <Button disableElevation style={{ float: "right" }} variant="contained" href="/createTicket" startIcon={<AddIcon />}>
                        Add New Ticket
                    </Button>
                </Typography>
            </Paper>
            <Paper m={3} style={{ marginTop: "20px" }}>
                <div style={{ padding: "20px 60p", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <Chip label={`Records: ${tickets.length}`} />
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="list" aria-label="list">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="module">
                            <TableViewIcon />
                        </ToggleButton>
                        {/* <ToggleButton value="quilt" aria-label="quilt">
                            <ViewQuiltIcon />
                        </ToggleButton> */}
                    </ToggleButtonGroup>
                </div>
                {loading && <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>}
                {(tickets?.length > 0 && view === 'list') &&
                    <ListTickets rows={tickets} rowHeight={50} itemHeight={500} windowHeight={10} />
                }

                {(tickets?.length > 0 && view === 'table') &&
                    <TicketsTable tickets={tickets} />
                }


            </Paper>
        </Container>
    )
}

export default TicketsView;