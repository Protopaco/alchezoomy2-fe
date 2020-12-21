import { useObserver } from "mobx-react";
import React from "react";
import { Divider, Paper, List, ListItemText } from '@material-ui/core';
// import ChatLine from './ChatLine.js';

export const ChatBox = (props) => {
    console.log('CHATBOX!')
    console.log(props.chatArray)

    return useObserver(() => {
        <Paper elevation={3}>
            <List>
                {props.chatArray.map(chat =>
                    <div>
                        <ListItemText
                            primary={chat.speaker}
                            secondary={chat.text}></ListItemText>
                        <Divider />
                    </div>
                )}
            </List>
        </Paper>
    })
}

export default ChatBox;