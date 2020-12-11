import { useObserver } from 'mobx-react';
import React from 'react';
import { useStateStore } from "./StoreProvider"



export const AutoRedirect = () => {
    const store = useStateStore();

    let code = new URLSearchParams(this.props.location.search);
    store.changeCode(code.get('code'));
    console.log(store.userType);
    console.log(code.get('code'))

    if (store.userType === 'teacher') {
        console.log('TO TEACHER!')
        this.props.history.push = '/teacher';
    } else {
        this.props.history.push = '/student';
    }


    return useObserver(() =>
        <p>REDIRECTING!</p>
    )

}

export default AutoRedirect