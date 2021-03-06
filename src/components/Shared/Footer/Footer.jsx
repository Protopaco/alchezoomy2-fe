import React from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import useStyles from "./FooterStyles";


export default function Footer() {
    const classes = useStyles();

    return (
        <AppBar
            variant="static"
            className={classes.root}
            color="primary">
            <Toolbar variant="dense" className={classes.frame}>
                <div className={classes.test} />
                <Typography variant="Button">
                    Designed by Paul Stevens
                    </Typography>
                <IconButton
                    color="inherit"
                    aria-label="email designer"
                    href="mailto:paul.stevens.developer@gmail.com">
                    <MailIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
}