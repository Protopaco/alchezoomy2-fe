import React, { useState, useEffect } from "react";
import { useStateStore } from "../../StoreProvider.js";
import { useObserver } from "mobx-react";
import { TeacherCreator } from "../../TeacherCreator";
import { TeacherDashboard } from "../../TeacherDashboard";
import { fetchAllTeacherMeetings } from "../../utils/teacher-fetches/meeting-fetches.js";
import { createTeacher } from "../../utils/teacher-fetches/auth-fetches";
import { TeacherAppBar } from "../../components/TeacherAppBar/TeacherAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { fetchAllTeacherSubscriptions } from "../../utils/teacher-fetches/subscription-fetches.js";
import { TeacherSubscriptions } from "../../TeacherSubscriptions.jsx";
import adminSnackBar from "../../components/AdminSnackbar/AdminSnackBar";

const useStyles = makeStyles({
    backdrop: {
        zIndex: 5
    }
});

export const Teacher = () => {
    const { openSnackbar, SnackbarComponent } = adminSnackBar();
    const classes = useStyles();
    const [displayModule, setDisplayModule] = useState(null);
    let [open, setOpen] = useState(true);
    const store = useStateStore();

    const handleCreateTeacher = async (selectedColor) => {
        setOpen(true);
        const returnedTeacherInfo = await createTeacher({ ...store.teacherInfo, color: selectedColor });
        store.changeTeacherInfo(returnedTeacherInfo);
        handleLectureDashboard();
    };

    const handleSubscriptionDashboard = async () => {
        setOpen(true);
        const returnedSubscriptionArray = await fetchAllTeacherSubscriptions(store.teacherInfo.id);
        setDisplayModule(<TeacherSubscriptions
            setOpen={setOpen}
            returnedSubscriptionArray={returnedSubscriptionArray}
            openSnackbar={openSnackbar}
        />);
        setOpen(false);
    };

    const handleLectureDashboard = async () => {
        setOpen(true);
        const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
        store.changeMeetingsObj(returnedMeetingArray);
        setDisplayModule(<TeacherDashboard
            setOpen={setOpen}
        />);
        setOpen(false);
    };

    useEffect(async () => {

        if (store.teacherInfo.newUser) {
            setDisplayModule(<TeacherCreator
                handleCreateTeacher={handleCreateTeacher}
            />);
        } else {
            const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
            store.changeMeetingsObj(returnedMeetingArray);
            setDisplayModule(<TeacherDashboard
                setOpen={setOpen}
                openSnackbar={openSnackbar}
            />);
        }

        setOpen(false);
    }, [setOpen]);



    return useObserver(() =>
        <div>
            <Grid>
                <TeacherAppBar
                    handleSubscriptionDashboard={handleSubscriptionDashboard}
                    handleLectureDashboard={handleLectureDashboard}
                />
                {displayModule}
                <Backdrop
                    className={classes.backdrop}
                    open={open}>
                    <CircularProgress />
                </Backdrop>
                <SnackbarComponent />
            </Grid>
        </div>

    );
};

export default Teacher;
