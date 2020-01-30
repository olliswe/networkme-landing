import Layout from '../../components/Layout'
import React, {useEffect, useState, Fragment} from 'react'
import {API_URL, REACT_APP_URL, GATSBY_SITE} from "../../constants";
import {Typography, Paper, Container, Box, CircularProgress, Grid, Divider, Fab} from '@material-ui/core';
import ShareButton from "../../components/ShareButton";

const JobPage = (props) => {

    const [jobRequest, setJobRequest] = useState({
        data:null,
        loading:true
    })

    const getJobRequest = (slug) => {
        setJobRequest({loading:true})
        let headers = {"Content-Type": "application/json"};
        fetch(API_URL+'view_job/'+slug, {headers, method:"GET"})
            .then(res => res.json())
            .then(data => {
                setJobRequest({data:data, loading:false});
            })
    }


    useEffect(()=>{
        if (props.location.search){
            const searchSlug = props.location.search.slice(1,)
            getJobRequest(searchSlug)

        }
    },[])

    return (
        <Layout>
            <Container maxWidth="lg">
                <Box mt={5} p={5} pt={2}>
                    <Paper style={{minHeight:'50vh'}}>
                        {jobRequest.loading
                            ?
                            <Grid container justify="center">
                                <Box mt={'25vh'}>
                                    <CircularProgress/>
                                </Box>
                            </Grid>
                            :
                            <Box style={{padding:30}}>
                                <Grid container justify='space-between'>
                                    <Typography variant='h4'>{jobRequest.data.title}</Typography>
                                    <ShareButton url={GATSBY_SITE+'job?'+jobRequest.data.slug}/>
                                </Grid>                                <Typography variant='h5'>posted by <strong>{jobRequest.data.employer.organization}</strong> {jobRequest.data.timesince_post} ago </Typography>
                                <Divider variant="left"/>
                                <Typography dangerouslySetInnerHTML={{__html:jobRequest.data.description}} style={{marginTop:20, lineHeight:'1.5em'}}></Typography>
                                <Divider style={{marginTop:30, marginBottom:30}}/>
                                {
                                    jobRequest.data.closed ?
                                        <Grid container xs={12} justify="center">
                                            <Typography>
                                                This job is closed for applications
                                            </Typography>
                                        </Grid>
                                        :
                                        <Fragment>
                                            <Grid container xs={12} justify="center">
                                                <Typography variant="subtitle1"><strong>Deadline in {jobRequest.data.timeuntil_deadline}</strong></Typography>
                                            </Grid>
                                            <Grid container xs={12} justify="center" style={{marginBottom:20}}>
                                                <Typography>({jobRequest.data.deadline})</Typography>
                                            </Grid>
                                        </Fragment>
                                }
                                <Grid container xs={12} justify="center">
                                   <Fab
                                       variant="extended"
                                       style={{backgroundColor:'green', color:'white'}}
                                       disabled={jobRequest.data.closed}
                                       href={REACT_APP_URL+'jobseeker/job/'+props.location.search.slice(1,)}
                                   >
                                       Apply through Job Portal
                                   </Fab>
                                </Grid>
                            </Box>
                        }
                    </Paper>
                </Box>
            </Container>
        </Layout>
    )
}

export default JobPage