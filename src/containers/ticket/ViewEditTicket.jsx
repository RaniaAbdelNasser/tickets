import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/Provider";
import getTicket from "../../context/actions/tickets/getTicket";
import editTicket from "../../context/actions/tickets/editTicket";
import clearEditTicket from "../../context/actions/tickets/clearEditTicket";
import { TextField, Box, Divider, CircularProgress, Grid, Button, Tooltip, Select, MenuItem, FormControl, Typography, Container, Paper, Breadcrumbs, Link, Snackbar } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';

// new style for MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewEditTicket() {
    let historyNavigate = useNavigate();
    // get id of selected ticket
    let { idTicket } = useParams();
    // vars of create new tickets
    const [subject, setSubject] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    // dispatch
    const {
        ticketsDispatch,
        ticketsState: {
            ticket: { loadingTicket, errorTicket, dataTicket },
            editTicket: { loadingEditTicket, errorEditTicket, dataEditTicket },
        },
    } = useContext(GlobalContext);

     // handel Function section
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };
    const handelChangeSubject = (e) => {
        setSubject(e.target.value);
    }
    const submitCreateTicket = (e) => {
        e.preventDefault();
        if (!subject || !priority || !status) return;
        let requestBody = {
            subject: subject,
            priority: priority,
            status: status,
            description: description
        }
           // api of edit new ticket
        editTicket({ id: idTicket, bodyRequest: requestBody })(ticketsDispatch);
    }
     // all Use effect section
    // when finsh edit  ticket effect  
    useEffect(() => {
        //  route to go home 
        if (dataEditTicket !== null) {
            historyNavigate("/");
        }
          // clear data in reducer when leave screen
        return () => {
            clearEditTicket()(ticketsDispatch);
        };
    }, [dataEditTicket]);

    useEffect(() => {
        if (errorEditTicket !== null) {
            setOpenSnack(true);
        }

    }, [errorEditTicket]);

    // when occure error while edit  ticket effect => open snackBar 
    useEffect(() => {
        getTicket(idTicket)(ticketsDispatch);
    }, []);

    //  add values of ticket object to status to can change it 
    useEffect(() => {
        setSubject(dataTicket?.subject);
        setPriority(dataTicket?.priority);
        setStatus(dataTicket?.status);
        setDescription(dataTicket?.description);
    }, [dataTicket]);

    return (
        <Container style={{ marginTop: "35px" }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Tickets
                </Link>
                <Typography color="text.primary">View Ticket #{idTicket} </Typography>
            </Breadcrumbs>

            <Paper style={{ marginTop: "35px", padding: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="title-info" >Ticket Information</div>
                    <Tooltip title="Click on edit button to enable edit Ticket">
                        <Button disableElevation style={{ float: "right" }} variant="contained" onClick={() => { setEdit(!edit); }} startIcon={<EditIcon />}>
                            Edit Ticket
                        </Button>
                    </Tooltip>
                </div>
                <Divider />
                {/* appear Loading while geting data */}
                {loadingTicket && <Box sx={{ display: 'flex', justifyContent: "center" }}>
                    <CircularProgress />
                </Box>}
                {dataTicket &&
                    <form onSubmit={submitCreateTicket} className="form-style">
                        <Grid container spacing={2}>
                            <Grid className='form-Title' item xs={3}>
                                Subject
                                <span style={{ color: "red" }}>*</span>
                            </Grid>
                            <Grid item xs={9}>
                                {edit ?
                                    <FormControl fullWidth>
                                        <TextField fullWidth
                                            value={subject}
                                            disabled={!edit}
                                            required
                                            onChange={handelChangeSubject}
                                        /></FormControl>
                                    :
                                    <div className="view-dev">{dataTicket.subject}</div>}
                            </Grid>
                            <Grid className='form-Title' item xs={3}>
                                Priority
                                <span style={{ color: "red" }}>*</span>
                            </Grid>
                            <Grid item xs={9}>
                                {edit ?
                                    <FormControl fullWidth>
                                        <Select
                                            disabled={!edit}
                                            fullWidth
                                            id="demo-select-small"
                                            value={priority}
                                            required
                                            onChange={handleChangePriority}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="High">High</MenuItem>
                                            <MenuItem value="Low">Low</MenuItem>
                                            <MenuItem value="Normal">Normal</MenuItem>
                                        </Select>
                                    </FormControl> :
                                    <div className="view-dev">{dataTicket.priority}</div>}
                            </Grid>

                            <Grid className='form-Title' item xs={3}>
                                Status
                                <span style={{ color: "red" }}>*</span>
                            </Grid>
                            <Grid item xs={9}>
                                {edit ?
                                    <FormControl fullWidth>
                                        <Select
                                            fullWidth
                                            disabled={!edit}
                                            id="demo-select-small"
                                            value={status}
                                            required
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Production">Production</MenuItem>
                                            <MenuItem value="Testing">Testing</MenuItem>
                                        </Select>
                                    </FormControl> :
                                    <div className="view-dev">{dataTicket.status}</div>
                                }
                            </Grid>
                            <Grid className='form-Title' item xs={3}>
                                Description
                            </Grid>
                            <Grid item xs={9}>
                                <textarea disabled={!edit} type="text" className='input-style' value={description} onChange={(e) => { setDescription(e.target.value) }} rows={4} placeholder="Enter description"></textarea>
                            </Grid>
                            {edit &&
                                <div className="btn-postion">
                                    <LoadingButton type="submit" className="btn-style" loading={loadingEditTicket} variant="contained" >Save Changes</LoadingButton>
                                </div>}
                                 {/* condition to appear sanckbar  */}
                            {errorEditTicket && <div>
                                <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                        {"Error Message: " + errorEditTicket}
                                    </Alert>
                                </Snackbar>
                            </div>}
                        </Grid>
                    </form>}
            </Paper>
        </Container>
    )
}

export default ViewEditTicket