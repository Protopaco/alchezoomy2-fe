import React, { useState, useEffect } from "react";
import fuse from "fuse.js";
import useStyles from "./ChatboxStyles";
import useListItemStyles from "../ChatListItem/ChatListItemStyles";
import useBookmarkDialogStyles from "../BookmarkDialog/BookmarkDialogStyles";

import { Paper, List, Typography, TextField } from "@material-ui/core";
import { useStateStore } from "../../../utils/StoreProvider.js";
import { fetchAllStudentBookmarks, deleteBookmark, createBookmark } from "../../../utils/student-fetches/bookmark-fetches.js";
import ChatListItem from "../ChatListItem/ChatListItem";
import BookmarkDialog from "../BookmarkDialog/BookmarkDialog";



export const ChatBox = ({ handleChatSeek }) => {
    const store = useStateStore();
    const classes = useStyles();
    const listItemClasses = useListItemStyles();
    const dialogClasses = useBookmarkDialogStyles();
    const [open, setOpen] = useState(false);
    const [bookmarkCard, setBookmarkCard] = useState();
    const [bookmarkArray, setBookmarkArray] = useState([]);
    const [commentField, setCommentField] = useState("");
    // const [chatSync, setChatSync] = useState(true);
    const [searchField, setSearchField] = useState("");
    // const selectedChatIndex = useRef(0)
    const FuseChatList = new fuse(store.chatArray, {
        keys: ["text", "speaker"],
        threshold: 0.4,
        ignoreLocation: true
    });


    // const handleChatSync = async () => {
    //     await chatSync ? setChatSync(false) : setChatSync(true);
    // }

    const handleBookmark = async (chatItem) => {
        setCommentField("");
        setBookmarkCard({
            ...chatItem,
            title: "BOOKMARK",
            current: false
        });
        setOpen(true);
    };

    const handleUnbookmark = async (bookmarkItem, chatItem) => {
        setBookmarkCard({
            ...chatItem,
            comment: bookmarkItem.comment,
            title: "UNBOOKMARK",
            current: true
        });
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const handleBookmarkChange = async () => {
        let newBookmarkArray = [];
        if (bookmarkCard.current) {
            const bookmarkId = bookmarkArray.find(bookmark => bookmark["chat_id"] === bookmarkCard.id);
            newBookmarkArray = await deleteBookmark(bookmarkId.id);
        } else {
            newBookmarkArray = await createBookmark({
                chatId: bookmarkCard.id,
                studentId: store.studentInfo.id,
                comment: commentField
            });
        }
        setBookmarkArray(newBookmarkArray);
        setOpen(false);
        setCommentField("");
    };

    const handleCommentChange = async (e) => {
        setCommentField(e.target.value);
    };

    const handleSearchChange = async (e) => {
        setSearchField(e.target.value);
    };

    useEffect(() => {
        async function retrieveBookmarks() {
            const fetchedBookmarkArray = await fetchAllStudentBookmarks();
            setBookmarkArray(fetchedBookmarkArray);
        }

        // function selectedChat() {
        //     setInterval(() => {

        //         if (selectedChatIndex.current < store.chatArray.length && store.chatArray[selectedChatIndex.current + 1].parsed_timestamp < props.returnVideoTimestamp()) {
        //             selectedChatIndex.current = selectedChatIndex.current + 1;
        //         }
        //     }, 500
        //     )
        // }
        retrieveBookmarks();
        // selectedChat();
    }, []);



    return (
        <Paper
            elevation={3}
            className={classes.root}>
            <div className={classes.header}>
                <Typography
                    variant='h6'
                    className={classes.label}
                >
                    CHAT
                </Typography>
            </div>
            {/* <FormControlLabel
                    control={
                        <Switch
                            checked={chatSync}
                            onChange={handleChatSync}
                            name="chatTrack"
                            color="primary"
                        />
                    }
                    label="sync chat"
                /> */}
            <TextField
                id="search"
                label="search"
                fullWidth
                variant="outlined"
                onChange={handleSearchChange}
                autocomplete="off"
            />
            <List className={classes.list}>
                {searchField === "" ?
                    store.chatArray.map(chat =>
                        ChatListItem(
                            listItemClasses,
                            chat,
                            handleBookmark,
                            handleUnbookmark,
                            bookmarkArray,
                            handleChatSeek))
                    :
                    FuseChatList.search(searchField).map(({ item }) => ChatListItem(
                        listItemClasses,
                        item,
                        handleBookmark,
                        handleUnbookmark,
                        bookmarkArray,
                        handleChatSeek))
                }
            </List>
            {bookmarkCard ?
                <BookmarkDialog
                    open={open}
                    dialogClasses={dialogClasses}
                    bookmarkCard={bookmarkCard}
                    handleBookmarkChange={handleBookmarkChange}
                    handleDialogClose={handleDialogClose}
                    handleCommentChange={handleCommentChange}
                    commentField={commentField}
                />
                :
                null
            }
        </Paper>
    );
};


export default ChatBox;