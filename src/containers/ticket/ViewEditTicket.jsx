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
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ViewEditTicket() {
    let historyNavigate = useNavigate();
    let { idTicket } = useParams();
    const [subject, setSubject] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const {
        ticketsDispatch,
        ticketsState: {
            ticket: { loadingTicket, errorTicket, dataTicket },
            editTicket: { loadingEditTicket, errorEditTicket, dataEditTicket },
        },
    } = useContext(GlobalContext);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
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
        editTicket({id:idTicket,bodyRequest:requestBody})(ticketsDispatch);
    }

    useEffect(() => {
        if (dataEditTicket !== null) {
            historyNavigate("/");
        }
        return () => {
            clearEditTicket()(ticketsDispatch);
        };
    }, [dataEditTicket]);

    useEffect(() => {
        if (errorEditTicket !== null) {
            setOpen(true);
        }

    }, [errorEditTicket]);
    useEffect(() => {
        getTicket(idTicket)(ticketsDispatch);
    }, []);
    useEffect(() => {
        setSubject(dataTicket?.subject);
        setPriority(dataTicket?.priority);
        setStatus(dataTicket?.status);
        setDescription(dataTicket?.description);
    }, [dataTicket !== null]);
    console.log('dataTicket', dataTicket)
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
                            {errorEditTicket && <div>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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