import React from 'react'

import { Button, TextField, Grid, Select, MenuItem, TextareaAutosize, Typography, Container, Paper, Box, CircularProgress, Breadcrumbs, Link, } from '@mui/material';

function CreateTicket() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Container style={{ marginTop: "35px" }}>

            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Tickets
                </Link>
                <Typography color="text.primary">Create New Ticket </Typography>
            </Breadcrumbs>
            <Paper style={{ marginTop: "35px", padding: "20px" }}>
                <Grid container spacing={2}>
                    <Grid className='form-Title' item xs={3}>
                        Subject
                    </Grid>
                    <Grid item xs={9}>
                        <TextField fullWidth label="Subject" id="fullWidth" />
                    </Grid>
                    <Grid className='form-Title' item xs={3}>
                        Priority
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            fullWidth

                            id="demo-select-small"
                            value={age}

                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>High</MenuItem>
                            <MenuItem value={20}>Low</MenuItem>
                            <MenuItem value={30}>Normal</MenuItem>
                        </Select>
                    </Grid>

                    <Grid className='form-Title' item xs={3}>
                        Status
                    </Grid>
                    <Grid item xs={9}>
                        <Select
                            fullWidth

                            id="demo-select-small"
                            value={age}

                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>In Progress</MenuItem>
                            <MenuItem value={20}>Production</MenuItem>
                            <MenuItem value={30}>Testing</MenuItem>
                        </Select>
                    </Grid>
                    <Grid className='form-Title' item xs={3}>
                        Description
                    </Grid>
                    <Grid item xs={9}>
                    <TextField fullWidth label="Description" id="Description" />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default CreateTicket