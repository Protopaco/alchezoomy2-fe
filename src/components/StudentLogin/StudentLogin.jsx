import React, { useState } from "react";
import { Paper, TextField, Snackbar, Button } from "@material-ui/core";
import { useStyles } from "./StudentLoginStyles.js";
import { studentAuth } from "../../utils/student-fetches/auth-fetches";
import { fetchAllStudentMeetings } from "../../utils/student-fetches/meeting-fetches";
import { useStateStore } from "../../utils/StoreProvider";
import { useHistory } from "react-router-dom";


export default function StudentLogin() {
    const history = useHistory();
    const classes = useStyles();
    const store = useStateStore();
    const [studentEmail, setStudentEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidLoginOpen, setInvalidLoginOpen] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const studentInfo = await studentAuth(studentEmail, password);
            store.changeStudentInfo(studentInfo);
            store.changeLoggedIn();

            const newMeetingObj = await fetchAllStudentMeetings();

            await store.changeMeetingsObj(newMeetingObj);
            await store.changeLoggedIn();
            history.push("/student");
        } catch (e) {

            setInvalidLoginOpen(true);
            setPassword("");
        }

    };

    const handleSnackbarClose = () => {
        setInvalidLoginOpen(false);
    };


    return (
        <div>
            <Paper elevation={3}>
                <div>
                    <Paper elevation={2}>
                        <img
                            className={classes.mainLogo}
                            src="/images/AL-logo.JPG"
                            alt="logo" />
                    </Paper>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className={classes.loginForm}
                >
                    <TextField
                        id="studentEmail"
                        label="Email"
                        value={studentEmail}
                        onChange={({ target }) => setStudentEmail(target.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        type="password"
                        required
                    />
                    <Button type="submit">SUBMIT</Button>
                </form>
            </Paper>
            <Snackbar
                open={invalidLoginOpen}
                message="Invalid Username or Password"
                onClose={handleSnackbarClose}
            />
        </div>
    );

}

