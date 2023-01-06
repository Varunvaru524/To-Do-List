import React, { Component } from 'react';
import {Routes,Route,Navigate} from 'react-router-dom'
import TheTable from './Components/TableComponent/Table';
import ActivitySfc from './Components/Activity/ActivitySfc';
import NotFoundPage from './Components/Not Found Page/NotFoundPage';

class App extends Component {
    render() { 
        return (
            <React.Fragment>
                <Routes>
                    <Route path='/table' element={<TheTable/>}/>
                    <Route path='/table/new' element = {<ActivitySfc/>}/>
                    <Route path='/table/:id' element = {<ActivitySfc/>}/>
                    <Route path='*' element = {<NotFoundPage/>}/>
                    <Route path='/' element={<Navigate to='/table'/>}/>
                </Routes>
            </React.Fragment>
        );
    }
}
 
export default App;