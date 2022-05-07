import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/Provider";
import getTickets from "../../context/actions/tickets/getTickets"
import { Button, Chip, Typography, Container, Paper, Box, CircularProgress, } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ListTickets from './ListTickets';
import { useNavigate } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TicketsTable from './TicketTabl';
import TableViewIcon from '@mui/icons-material/TableView';

function TicketsView() {
    const navigate = useNavigate();
      // var to select view 
    const [view, setView] = React.useState('table');
    // dispatch
    const {
        ticketsDispatch,
        ticketsState: {
            tickets: { loading, error, tickets },
        },
    } = useContext(GlobalContext);
  // handel Function section
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
                    <Button disableElevation style={{ float: "right" }} variant="contained" onClick={(e)=>{navigate("/createTicket")}} startIcon={<AddIcon />}>
                        Add New Ticket
                    </Button>
                </Typography>
            </Paper>
            <Paper m={3} style={{ marginTop: "20px" }}>
                <div style={{ padding: "20px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
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
                    </ToggleButtonGroup>
                </div>
                {loading && <Box sx={{ display: 'flex',justifyContent:"center" }}>
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