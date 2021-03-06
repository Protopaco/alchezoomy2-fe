import React from "react";
import { Divider, Typography, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";

import Transition from "../../Shared/DialogTransition/DialogTransition";

export default function BookmarkDialog({ open, dialogClasses, bookmarkCard, handleBookmarkChange, handleDialogClose, handleCommentChange, commentField }) {

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth={true}
        >

            <DialogTitle
                className={dialogClasses.dialogTitle}>
                {bookmarkCard.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="speaker"
                    className={dialogClasses.dialogSpeaker}>
                    {bookmarkCard.speaker}
                </DialogContentText>
                {bookmarkCard.topic ?
                    <DialogContentText
                        id="dialog-topic"
                        className={dialogClasses.dialogTopic}>
                        {bookmarkCard.topic}
                    </DialogContentText>
                    : null
                }
                <DialogContentText
                    id="timestamp"
                    className={dialogClasses.dialogTimestamp}>
                    {bookmarkCard.timestamp}
                </DialogContentText>
                <DialogContentText
                    id="text"
                    className={dialogClasses.dialogText}>
                    {bookmarkCard.text}
                </DialogContentText>
                <Divider />
                {!bookmarkCard.current ?
                    <TextField
                        id="comment"
                        label="comment"
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        onChange={handleCommentChange}
                        value={commentField}
                    />
                    :
                    <Typography>
                        <CommentIcon fontSize="small" />
                        {`  ${bookmarkCard.comment}`}
                    </Typography>
                }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDialogClose}
                    color="primary">
                    Cancel
            </Button>
                <Button
                    onClick={handleBookmarkChange}
                    color="primary">
                    {bookmarkCard.title}
                </Button>
            </DialogActions>
        </Dialog>

    );
}