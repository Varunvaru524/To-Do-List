import React,{Component} from 'react';
import {useParams,useNavigate} from 'react-router-dom'
import ActivityClass from './ActivityClass';

const ActivitySfc = (props) => {
    return ( 
        <ActivityClass params={useParams()} navigate={useNavigate()}/>
     );
}
 
export default ActivitySfc;
