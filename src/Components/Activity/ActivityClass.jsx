import React, { Component } from 'react';
import { getActivity } from '../../Assets/BackendService';

class ActivityClass extends Component {
    state = {
        userInput:{time:'',title:'',description:'',dueDate:'',tag:'',status:'',_id:''},
        errors:{}
    }

    componentDidMount(){
        if (this.props.params.id == "new") {
            let newUserInput = this.state.userInput

            let date = new Date()
            newUserInput.time = date.toLocaleDateString()+' '+date.toLocaleTimeString()
            
            this.setState({userInput:newUserInput})
        }
        else {
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

    }

    handleValidation(){

    }

    handleSubmit(event){
        event.preventDefault()
    }

    render() { 
        let {params} = this.props
        let {description,dueDate,status,tag,time,title} = this.state.userInput
        return (
            <React.Fragment>
                <h1>Activity</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className="timeStampContainer">
                        <p className='timeStamp'>The Time</p>
                        <p className='time'>{time}</p>
                    </div>
                    <div className='titleContainer'>
                        <p className='title'>Title</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={title} name='title' placeholder='Enter Title' />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='descriptionContainer'>
                        <p className='description'>Description</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={description} name='description' placeholder='Enter Description' />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='dueDateContainer'>
                        <p className='dueDate'>Due Date</p>
                        <input min={this.disablePreviousDate()}  type="date" onChange={(e)=>this.handleChange(e)} value={dueDate} name="dueDate" />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='TagContainer'>
                        <p className='tag'>Tag</p>
                        <select name='tag' onChange={(e)=>this.handleChange(e)} value={tag}>
                            <option value="important">Important</option>
                            <option value="urgent">Urgent</option>
                            <option value="notImportant">Not Important</option>
                            <option value="highPriority">High Priority</option>
                            <option value="meeting">Meeting</option>
                        </select>
                        <p className='errors'>errors</p>
                    </div>
                    <div className='statusContainer'>
                        <p className='status'>Status</p>
                        <select name='status' onChange={(e)=>this.handleChange(e)} value={status}>
                            <option value="open">Open</option>
                            <option value="working">Working</option>
                            <option value="done">Done</option>
                            <option value="overDue">Over Due</option>
                        </select>
                        <p className='errors'>errors</p>
                    </div>
                    <button>Submit</button>
                    <button>Delete</button>
                </form>
            </React.Fragment>
        );
    }
}
 
export default ActivityClass;