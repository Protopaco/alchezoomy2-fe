import React, { useState, useEffect } from 'react'
import { useStateStore } from './StoreProvider'
import { Container, List, Divider } from '@material-ui/core';
import { TeacherMeetingItem } from './TeacherMeetingItem'


export const TeacherDashboard = ({ setOpen }) => {
    const store = useStateStore()
    const [meetingsToDisplay, setMeetingsToDisplay] = useState(store.meetingsObj);

    useEffect(() => {
        setMeetingsToDisplay(store.meetingsObj)
    }, [store.meetingsObj])

    return (
        <Container maxWidth="xl" style={{ display: 'flex', justifyItems: 'center' }}>
            <List style={{ width: '90%' }}>
                {
                    meetingsToDisplay.map(meeting =>
                        <div>
                            <TeacherMeetingItem meeting={meeting} setOpen={setOpen} />
                            <Divider variant="middle" component="li" />
                        </div>

                    )
                }
            </List>
        </Container >
    )
}
