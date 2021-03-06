import React, { useState } from "react";
import { useStateStore } from "../../../utils/StoreProvider.js";
import PropTypes from "prop-types";
import { Paper, List, Typography, TextField } from "@material-ui/core";
import fuse from "fuse.js";
import { deleteBookmark } from "../../../utils/student-fetches/bookmark-fetches.js";
import useStyles from "./bookmarkStyles";

import BookmarkListItem from "../BookmarkListItem/BookmarkListItem";
import bookmarkListItemStyles from "../BookmarkListItem/BookmarkListItemStyles";
import StudentDeleteDialog from "../StudentDeleteDialog/StudentDeleteDialog";
import deleteDialogStyles from "../StudentDeleteDialog/StudentDeleteDialogStyles";

export const Bookmark = ({ handleMeetingDetailClick }) => {
    const classes = useStyles();
    const deleteDialogClasses = deleteDialogStyles();
    const bookmarkListItemClasses = bookmarkListItemStyles();
    const [searchField, setSearchField] = useState("");
    const [dialogCard, setDialogCard] = useState();
    const [open, setOpen] = useState(false);
    const store = useStateStore();

    let fuseBookmarkList = new fuse(store.bookmarkArray, {
        keys: ["text", "speaker", "comment", "topic"],
        threshold: 0.4,
        ignoreLocation: true
    });


    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    };

    const handleDeleteBookmark = async (bookmarkId) => {
        const newBookmarkArray = await deleteBookmark(bookmarkId);

        store.changeBookmarkArray(newBookmarkArray);
        setOpen(false);
    };

    const handleDeleteClick = async (bookmark) => {
        setDialogCard(bookmark);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenMeeting = async (bookmark) => {
        handleMeetingDetailClick(bookmark.meetingId, bookmark.parsedTimestamp);
    };


    return (
        <div className={classes.root}>
            <Paper
                maxWidth="xl"
                elevation={3}
                className={classes.frame}>
                <div className={classes.component}>
                    <Typography
                        variant='h5'>
                        Bookmarks
                    </Typography>
                    <TextField
                        id="search"
                        label="search"
                        fullWidth
                        variant="outlined"
                        onChange={handleSearchChange}
                        autocomplete="off"
                        className={classes.searchBar}
                    />
                    <List>
                        {searchField === "" ?
                            store.bookmarkArray.map(bookmark => BookmarkListItem(bookmark,
                                handleDeleteClick,
                                handleOpenMeeting,
                                bookmarkListItemClasses))
                            :
                            fuseBookmarkList.search(searchField).map(({ item }) => BookmarkListItem(item,
                                handleDeleteClick,
                                handleOpenMeeting,
                                bookmarkListItemClasses))
                        }
                    </List>
                </div>
            </Paper>
            {
                dialogCard ?
                    <StudentDeleteDialog
                        open={open}
                        dialogCard={dialogCard}
                        handleCloseDialog={handleCloseDialog}
                        handleDelete={handleDeleteBookmark}
                        deleteDialogClasses={deleteDialogClasses}
                    />
                    : null
            }

        </div >

    );
};

export default Bookmark;

Bookmark.propTypes = {
    handleMeetingDetailClick: PropTypes.func
};