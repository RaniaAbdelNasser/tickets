import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./../../context/Provider";
import createTicket from "../../context/actions/tickets/createTicket";
import clearCreateTicket from "../../context/actions/tickets/clearCreateTicket";
import { TextField, Divider, Grid, Select, MenuItem, FormControl, Typography, Container, Paper, Breadcrumbs, Link, Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

// new style for MuiAlert
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateTicket() {
    let historyNavigate = useNavigate();
    // vars of create new tickets
    const [subject, setSubject] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [openSnack, setOpenSnack] = React.useState(false);
    // dispatch
    const {
        ticketsDispatch,
        ticketsState: {
            createTicket: { loadingCreateTicket, errorCreateTicket, dataCreateTicket },
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
        // api of create new ticket
        createTicket(requestBody)(ticketsDispatch);
    }
    // all Use effect section
    // when finsh create new ticket effect  
    useEffect(() => {
        //  route to go home 
        if (dataCreateTicket !== null) {
            historyNavigate("/");
        }
        // clear data in reducer when leave screen
        return () => {
            clearCreateTicket()(ticketsDispatch);
        };
    }, [dataCreateTicket]);

    // when occure error while add new ticket effect => open snackBar 
    useEffect(() => {
        if (errorCreateTicket !== null) {
            setOpenSnack(true);
        }
    }, [errorCreateTicket]);

    return (
        <Container style={{ marginTop: "35px" }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Tickets
                </Link>
                <Typography color="text.primary">Create New Ticket </Typography>
            </Breadcrumbs>

            <Paper style={{ marginTop: "35px", padding: "20px" }}>
                <div className="title-info" >Ticket Information</div>
                <Divider />
                <form onSubmit={submitCreateTicket} className="form-style">
                    <Grid container spacing={2}>
                        <Grid className='form-Title' item xs={3}>
                            Subject
                            <span style={{ color: "red" }}>*</span>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField fullWidth placeholder="subject"
                                value={subject}
                                required
                                onChange={handelChangeSubject}
                                id="fullWidth" />
                        </Grid>
                        <Grid className='form-Title' item xs={3}>
                            Priority
                            <span style={{ color: "red" }}>*</span>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth>
                                <Select
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
                            </FormControl>
                        </Grid>

                        <Grid className='form-Title' item xs={3}>
                            Status
                            <span style={{ color: "red" }}>*</span>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth>
                                <Select
                                    fullWidth

                                    id="demo-select-small"
                                    value={status}
                                    required
                                    onChange={handleChangeStatus}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="n Progress">In Progress</MenuItem>
                                    <MenuItem value="Production">Production</MenuItem>
                                    <MenuItem value="Testing">Testing</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid className='form-Title' item xs={3}>
                            Description
                        </Grid>
                        <Grid item xs={9}>
                            <textarea type="text" className='input-style' value={description} onChange={(e) => { setDescription(e.target.value) }} rows={4} placeholder="Enter description"></textarea>
                        </Grid>
                        <div className="btn-postion">
                            <LoadingButton type="submit" className="btn-style"     loading={loadingCreateTicket} variant="contained" >Submit</LoadingButton>
                        </div>
                        {/* condition to appear sanckbar  */}
                        {errorCreateTicket && <div>
                            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                    {"Error Message: " + errorCreateTicket}
                                </Alert>
                            </Snackbar>
                        </div>}
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default CreateTicket