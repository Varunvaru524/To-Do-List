import React, { Component } from 'react';
import {Button} from 'antd'
import { getActivity,saveActivity,deleteActivity } from '../../Assets/BackendService';
import './ActivityClass.css'

class ActivityClass extends Component {
    state = {
        userInput:{time:'',title:'',description:'',dueDate:'',tag:'',status:'open',_id:''},
        errors:{title:null, description:null}
    }

    componentDidMount(){
        if (this.props.params.id == "new") {
            let newUserInput = this.state.userInput

            let date = new Date()
            newUserInput.time = date.toLocaleDateString()+' '+date.toLocaleTimeString()
            
            this.setState({userInput:newUserInput})
        }
        else {
            // calling backend get api
            let data = getActivity(this.props.params.id)
            let updatedUserInput = {
                time: data.timeStamp,
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                tag: data.tags,
                status: data.status,
                _id: data._id
            }
            this.setState({userInput:updatedUserInput})
        }
    }

    handleChange({currentTarget}){
        let inputData = currentTarget.value
        let name = currentTarget.name

        let updatedUserInput = this.state.userInput
        updatedUserInput[name] = inputData
        
        this.setState({userInput:updatedUserInput})
    }
    
    disablePreviousDate(){
        let today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        let year = today.getFullYear();
        if(month < 10) month = '0' + month.toString();
        if(day < 10) day = '0' + day.toString();
    
        return year + '-' + month + '-' + day;
    }

    handleDetele(){
        //calling backend delete api
        deleteActivity(this.props.params.id)
        this.props.navigate(-1)
    }

    handleValidation(){
        let {title,description} = this.state.userInput

        if (title.length<=0) {
            let updatedErrors = {}
            updatedErrors.title = 'Title cannot be empty'
            this.setState({errors:updatedErrors})
        }
        else if (title.length>=100) {
            let updatedErrors = {}
            updatedErrors.title = 'Title should not be more then 100 charectors'
            this.setState({errors:updatedErrors})
        }
        else if (description.length<=0) {
            let updatedErrors = {}
            updatedErrors.description = 'Description cannot not be empty'
            this.setState({errors:updatedErrors})
        }
        else if (description.length>=1000) {
            let updatedErrors = {}
            updatedErrors.description = 'Description should not be more then 1000 charectors'
            this.setState({errors:updatedErrors})
        }
        else {
            return true
        }
    }

    handleSubmit(){
        if (this.handleValidation()) {
            //Calling backend api
            saveActivity(this.state.userInput)
            this.props.navigate(-1)
        }
    }

    render() { 
        let {description,dueDate,status,tag,time,title} = this.state.userInput

        return (
            <React.Fragment>
                <form onSubmit={(e)=>e.preventDefault()}>
                <div className="activitiesForm">
                <h1>Activity</h1>
                    <div className="timeStampContainer">
                        <p className='timeStamp'>The Time</p>
                        <div className='time'>{time}</div>
                    </div>
                    <div className='titleContainer'>
                        <p className='title'>Title</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={title} name='title' placeholder='Enter Title' />
                        <div className='errorFound'>{this.state.errors.title}</div>
                    </div>
                    <div className='descriptionContainer'>
                        <p className='description'>Description</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={description} name='description' placeholder='Enter Description' />
                        <div className='errorFound'>{this.state.errors.description}</div>
                    </div>
                    <div className='dueDateContainer'>
                        <p className='dueDate'>Due Date</p>
                        <input min={this.disablePreviousDate()}  type="date" onChange={(e)=>this.handleChange(e)} value={dueDate} name="dueDate" />
                    </div>
                    <div className='TagContainer'>
                        <p className='tag'>Tag</p>
                        <select name='tag' onChange={(e)=>this.handleChange(e)} value={tag}>
                            <option value="">Select Tag</option>
                            <option value="Important">Important</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Not Important">Not Important</option>
                            <option value="High Priority">High Priority</option>
                            <option value="Meeting">Meeting</option>
                        </select>
                    </div>
                    <div className='statusContainer'>
                        <p className='status'>Status</p>
                        <select name='status' onChange={(e)=>this.handleChange(e)} value={status}>
                            <option value="Open">Open</option>
                            <option value="Working">Working</option>
                            <option value="Done">Done</option>
                            <option value="Over Due">Over Due</option>
                        </select>
                    </div>
                    <div className="activityFormButtons">
                        <Button type='primary' onClick={()=>this.handleSubmit()}>Submit</Button>
                        <button className='delete' disabled={this.props.params.id == "new"?true:false} onClick={()=>this.handleDetele()}>Delete</button>
                    </div>
                </div>
                </form>
            </React.Fragment>
        );
    }
}
 
export default ActivityClass;