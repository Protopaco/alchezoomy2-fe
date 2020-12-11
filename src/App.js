import React from 'react'
import { StoreProvider } from './StoreProvider.js'
// import { useStateStore } from './StoreProvider.js'


import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import LandingPage from './LandingPage.js';
import AutoRedirect from './Redirect.js'
import Teacher from './Teacher.js';


function App() {
    // const [userType] = React.useState()
    return (
        <StoreProvider>
            <Router>
                {/* Header */}
                <Switch>
                    <Route exact path="/"
                        component={LandingPage}>
                    </Route>
                    <Route path="/redirect" component={AutoRedirect}>
                        {/* <Redirect to="/teacher" /> */}
                    </Route>
                    <Route path="/teacher">
                        <Teacher />
                    </Route>
                    {/* /teacher */}
                    {/* /student */}
                </Switch>
            </Router>
        </StoreProvider>

    );
}

export default App;
