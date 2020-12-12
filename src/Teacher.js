import React, { useEffect } from 'react'
import { useStateStore } from './StoreProvider.js'
import { Paper, Button } from '@material-ui/core';
import fetch from 'superagent';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";


export const Teacher = () => {
    const store = useStateStore();


    async function retrieveTeacherInfo() {
        const returnedObject = await fetch
            .post(store.serverUrl + '/teacher/oauth')
            .send({ code: store.code });

        store.changeTeacherInfo(returnedObject.body);
        console.log(store.teacherInfo.new_user)
        console.log('first')
    }

    async function newTeacher() {
        return await fetch
            .post(store.serverUrl + '/teacher/new')
            .send({ teacher_info: store.teacherInfo });


    }


    useEffect(() => {


        retrieveTeacherInfo()
            .then(console.log)
            .then(newTeacher());

        console.log('second')
    });

    // useEffect(() => {
    //     console.log(store.teacherInfo.new_user)
    //     console.log('second')
    //     async function newTeacher() {
    //         return await fetch
    //             .post(store.serverUrl + '/teacher/new')
    //             .send({ teacher_info: store.teacherInfo });
    //     }

    //     async function exisitingTeacher() {
    //         return await fetch
    //             .post(store.serverUrl + '/teacher/meetings')
    //             .send({ teacher_info: store.teacherInfo });
    //     }

    //     if (store.teacherInfo.new_user) {
    //         store.changeMeetingsObj(newTeacher());
    //     } else {
    //         store.changeMeetingsObj(exisitingTeacher())
    //     }
    //     console.log(store.meetingsObj);
    //     console.log('third')
    // })



    return useObserver(() =>
        <Paper elevation={3} >
            <Link to='/'><Button >HOME</Button></Link>
        </Paper>

    )
}

export default Teacher;