import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import { useStyles } from "./NewAdminDialogStyles.js";

export const NewAdminDialog = ({ handleClose, newUserDialogOpen, userName, handleCancelDialog }) => {
    const classes = useStyles();
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");


    const handleCloseLocal = (e) => {
        e.preventDefault();
        handleClose(newPassword1);
    };


    return (
        <Dialog
            open={newUserDialogOpen}
            keepMounted
            onClose={handleCancelDialog}
        >
            <DialogTitle
                id="password-update-dialog-title">
                You are a new admin, please create a new password.
            </DialogTitle>
            <DialogContent
                className={classes.root}>
                <TextField
                    className={classes.field}
                    type="text"
                    autocomplete="off"
                    value={userName}
                    disabled
                />
                <TextField
                    className={classes.field}
                    label="Password"
                    type="password"
                    onChange={({ target }) => setNewPassword1(target.value)}
                    autocomplete="off"
                    error={newPassword1 !== newPassword2}
                    autoFocus
                    required
                />
                <TextField
                    className={classes.field}
                    label="Password"
                    type="password"
                    onChange={({ target }) => setNewPassword2(target.value)}
                    autocomplete="off"
                    error={newPassword1 !== newPassword2}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancelDialog}
                    color="primary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleCloseLocal}
                >
                    SUBMIT
                </Button>
            </DialogActions>
        </Dialog>

    );
};

NewAdminDialog.propTypes = {
    handleClose: PropTypes.func,
    newUserDialogOpen: PropTypes.func,
    userName: PropTypes.string,
};