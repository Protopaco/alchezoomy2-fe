import React from "react";
import { Divider, ListItemText, ListItem, ListItemAvatar, Avatar, Tooltip, Button, } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";

export const BookmarkListItem = (bookmark, handleDeleteClick, handleOpenMeeting, bookmarkListItemClasses) => {

    return (

        <div
            style={{ borderLeft: `15px solid ${bookmark.color}`, margin: "3px" }}
        >
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt={bookmark.userName} src={bookmark.picUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={bookmark.topic}
                    secondary={bookmark.displayTime}
                />
                <ListItemText
                    primary={`${bookmark.speaker}:  ${bookmark.text}`}
                    secondary={bookmark.comment}
                />
                <div
                    className={bookmarkListItemClasses.buttons}>
                    <Tooltip title="Delete">
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            endIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(bookmark)}>
                            Delete
                        </Button>
                    </Tooltip>
                    <Tooltip title="Play">
                        <Button
                            variant="contained" color="primary"
                            className={bookmarkListItemClasses.playButton}
                            size="small"
                            endIcon={<PlayArrowIcon />}
                            onClick={() => handleOpenMeeting(bookmark)}>
                            Play
                        </Button>
                    </Tooltip>
                </div>
            </ListItem>
            <Divider variant="middle" component="li" />
        </div>
    );
};

export default BookmarkListItem;

BookmarkListItem.propTypes = {
    bookmark: PropTypes.object,
    handleDeleteClick: PropTypes.func,
    handleOpenMeeting: PropTypes.func, bookmarkListItemClasses: PropTypes.object
};
