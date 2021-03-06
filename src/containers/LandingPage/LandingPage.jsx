import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { useStyles } from "./LandingPageStyles.js";
import LandingPageAppBar from "../../components/Shared/LandingPageAppBar/LandingPageAppBar";

const zoomAPIurl = process.env.REACT_APP_ZOOM_API_URL;

export const LandingPage = () => {
    const classes = useStyles();

    return (
        <>
            <LandingPageAppBar />
            <Paper
                elevation={3}
                className={classes.root}>
                <div
                    className={classes.welcomeFrame}>
                    <img
                        className={classes.mainLogo}
                        src="/images/AL-logo.JPG"
                        alt="logo"
                    />
                    <Typography
                        variant="h5">
                        Welcome to Alchemy Lectures!
                    </Typography>
                    <div
                        className={classes.buttonDiv}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.location.href = zoomAPIurl}                            >
                            TEACHER
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                window.location.href = "/student/login";
                            }}>
                            Student
                </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default LandingPage;
