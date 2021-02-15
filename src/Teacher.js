import React, { useState, useEffect } from "react";
import { useStateStore } from "./StoreProvider.js";
import { useObserver } from "mobx-react";
import { TeacherCreator } from "./TeacherCreator";
import { TeacherDashboard } from "./TeacherDashboard";
import { fetchAllTeacherMeetings } from "./utils/teacher-fetches/meeting-fetches.js";


import { AppBar, Typography, Grid, Backdrop, CircularProgress } from "@material-ui/core";


export const Teacher = () => {
    const [displayModule, setDisplayModule] = useState(null);
    let [open, setOpen] = useState(true);
    const store = useStateStore();

    useEffect(async () => {
        console.log(store.teacherInfo.new_user);
        if (store.teacherInfo.new_user) {
            setDisplayModule(<TeacherCreator setOpen={setOpen} />);
        } else {
            const returnedMeetingArray = await fetchAllTeacherMeetings(store.teacherInfo);
            store.changeMeetingsObj(returnedMeetingArray);
            console.log(returnedMeetingArray);
            console.log("retrieved!");
            setDisplayModule(<TeacherDashboard setOpen={setOpen} />);
        }

        setOpen(false);
        console.log("FALSE");
    }, []);

    return useObserver(() =>
        <div>
            <Grid>
                <AppBar position="static" style={{ width: "100%" }}>
                    <Typography
                        variant="h6" >
                        Alchezoomy
                </Typography>
                </AppBar>
                {displayModule}
                <Backdrop open={open}>
                    <CircularProgress />
                </Backdrop>
            </Grid>
        </div>

    );
};

export default Teacher;