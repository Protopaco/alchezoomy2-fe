import React from "react";
import { Chip, ListItem, ListItemText, FormControlLabel, Switch } from "@material-ui/core";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ChatIcon from "@material-ui/icons/Chat";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import PropTypes from "prop-types";

export const TeacherMeetingItem = ({ meeting, handlePublish }) => {
    return (
        <ListItem alignItems="flex-start" >
            <ListItemText
                primary={meeting.topic}
                secondary={meeting.displayTime}
            />
            <div>
                <Chip size="small" color={meeting.videoUrl ? "primary" : ""} icon={<VideoLabelIcon />} label="video" />
                <Chip size="small" color={meeting.audioUrl ? "primary" : ""} icon={<VolumeUpIcon />} label="audio" />
                <Chip size="small" color={meeting.chatUrl ? "primary" : ""} icon={<ChatIcon />} label="chat" />
                <Chip size="small" color={meeting.transcriptUrl ? "primary" : ""} icon={<RecordVoiceOverIcon />} label="transcript" />
            </div>
            <FormControlLabel
                control={<Switch checked={meeting.published}
                    onChange={() => handlePublish(meeting)}
                    name='publish'
                    color="primary"
                />}
                label="publish" />
            <div>
                <Chip size="small" color="secondary" label={"views: " + meeting.meetingViews} />
                <Chip size="small" color="secondary" label={"favorites " + meeting.meetingFavs} />
            </div>
        </ListItem >
    );
};

TeacherMeetingItem.propTypes = {
    meeting: PropTypes.object(PropTypes.shape({
        id: PropTypes.number.isRequired,
        topic: PropTypes.string.isRequired,
        displayTime: PropTypes.string.isRequired,
        videoUrl: PropTypes.string.isRequired,
        chatUrl: PropTypes.string.isRequired,
        transcriptUrl: PropTypes.string.isRequired,
        published: PropTypes.bool.isRequired,
        meetingViews: PropTypes.number.isRequired,
        meetingFavs: PropTypes.number.isRequired
    })
    ),
    handlePublish: PropTypes.func
};
