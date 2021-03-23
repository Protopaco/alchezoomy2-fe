import React, { useState } from "react";
import fuse from "fuse.js";
import { deleteStudent } from "../../utils/admin-fetches/student-fetches";
import useStyles from "./AdminStudentDashboardStyles";
import { Paper, TextField, Typography, List } from "@material-ui/core";
import { PropTypes } from "mobx-react";
import StudentListItem from "../StudentListItem/StudentListItem";


export default function AdminStudentDashboard({ returnedStudentArray, handleSnackbarOpen }) {
    const classes = useStyles();
    const [studentArray, setStudentArray] = useState(returnedStudentArray);
    const [searchField, setSearchField] = useState("");

    let fuseStudentList = new fuse(studentArray, {
        keys: ["email", "userName"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleItemDelete = async (studentId) => {
        const newStudentArray = await deleteStudent(studentId);
        handleSnackbarOpen();
        setStudentArray(newStudentArray);
    };

    return (
        <div className={classes.frame}>
            <Paper
                elevation={3}
                className={classes.root}>
                <Typography
                    variant="h5">
                    Students
               </Typography>
                <TextField
                    id="search"
                    label="search"
                    fullWidth
                    variant="outlined"
                    onChange={handleSearchChange}
                />
                <List className={classes.list}>
                    {searchField === "" ?
                        studentArray.map(item =>
                            StudentListItem(
                                item,
                                handleItemDelete
                            ))
                        :
                        fuseStudentList.search(searchField).map(({ item }) => StudentListItem(
                            item,
                            handleItemDelete
                        ))
                    }
                </List>
            </Paper>
        </div>

    );

}

AdminStudentDashboard.propTypes = {
    returnedStudentArray: PropTypes.array,
    handleSnackbarOpen: PropTypes.func
};