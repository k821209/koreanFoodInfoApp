import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/detail';
import Details_sci from './pages/detail_science';
import Navigation from './routes/Navi';
import HeaderTop from './pages/header';
function App(){
    return(        
        <HashRouter>
            <HeaderTop />
            <Navigation />
            <Route path='/' exact={true} component={Home} />
            <Route path='/details/:foodCd' component={Details}/>
            <Route path='/details_science/:foodCd' component={Details_sci}/>
        </HashRouter>
    )

}

export default App;

