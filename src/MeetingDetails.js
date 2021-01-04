import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useObserver } from 'mobx-react';
import { useStateStore } from './StoreProvider.js'
import fetch from 'superagent';
import { Container, Backdrop, CircularProgress } from '@material-ui/core';
import ChatBox from './ChatBox.js';



export const MeetingDetails = (props) => {
    const store = useStateStore();
    let meetingId = useRef(props.match.params.id)
    let ref = React.createRef();

    useEffect(() => {

        async function fetchMeetingDetails(meetingId) {
            const returnedObject = await fetch
                .get(store.serverUrl + `/student/meetings/${meetingId}`)

            await fetch.get(store.serverUrl + `/student/view/${meetingId}`)
            store.changeMeetingDetails(returnedObject.body.meeting);
            store.changeChatArray(returnedObject.body.chat)
            store.changeLoading(false)
        }

        store.changeLoading(true)

        fetchMeetingDetails(meetingId.current)
    }, [store])

    return useObserver(() =>
        <div>
            <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
                <div>
                    <ReactPlayer
                        ref={ref}
                        url={`${store.s3VideoUrl}videos/${store.meetingDetails.teacher_id}/${store.meetingDetails.id}.mp4`}
                        controls
                    />
                    {store.meetingDetails.chat_url ?
                        <ChatBox />
                        :
                        <p></p>
                    }
                </div>

            </Container >
            <Backdrop open={store.loading} >
                <CircularProgress />
            </Backdrop>
        </div>
    )
}

export default MeetingDetails;