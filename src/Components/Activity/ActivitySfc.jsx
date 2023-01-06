import React,{Component} from 'react';
import {useParams} from 'react-router-dom'
import ActivityClass from './ActivityClass';

const ActivitySfc = (props) => {
    return ( 
        <ActivityClass params={useParams()}/>
     );
}
 
export default ActivitySfc;
