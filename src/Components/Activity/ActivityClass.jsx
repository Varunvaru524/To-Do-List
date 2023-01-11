import React, { Component } from 'react';
import { Button, message,Popconfirm,Tag } from 'antd'
import { getActivity, saveActivity, deleteActivity } from '../../Assets/BackendService';
import './ActivityClass.css'

class ActivityClass extends Component {
    state = {
        userInput: { time:'', title:'', description:'', dueDate:'', tag:[], status:'Open', _id:''},
        errors: { title:null, description:null,dueDate:null,tag:null },
        tagInput:'',
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

    handleTagSubmit(){
        let updatedUserInput = this.state.userInput
        updatedUserInput.tag.push(this.state.tagInput)
        this.setState({userInput:updatedUserInput,tagInput:''})
    }

    handleDelete(e){
        message.success('Successfully deleted')

        //calling backend delete api
        deleteActivity(this.props.params.id)
        this.props.navigate(-1)
    }

    handleValidation(){
        let {title,description,dueDate,tag} = this.state.userInput

        if (title.length<=0) {
            let updatedErrors = {}
            updatedErrors.title = '* Title cannot be empty'
            this.setState({errors:updatedErrors})
        }
        else if (title.length>=100) {
            let updatedErrors = {}
            updatedErrors.title = '* Title should not be more then 100 charectors'
            this.setState({errors:updatedErrors})
        }
        else if (description.length<=0) {
            let updatedErrors = {}
            updatedErrors.description = '* Description cannot not be empty'
            this.setState({errors:updatedErrors})
        }
        else if (description.length>=1000) {
            let updatedErrors = {}
            updatedErrors.description = '* Description should not be more then 1000 charectors'
            this.setState({errors:updatedErrors})
        }
        else if (dueDate == '') {
            let updatedErrors = {}
            updatedErrors.dueDate = '* Due Date cannot be empty'
            this.setState({errors:updatedErrors})
        }
        else if (tag.length == 0) {
            let updatedErrors = {}
            updatedErrors.tag = '* Tags cannot be empty'
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
            message.success('Successfully Added')
            this.props.navigate(-1)
        }
    }

    render() { 
        let {description,dueDate,status,tag,time,title} = this.state.userInput
        let {title:errorTitle,description:errorDescription,dueDate:errorDueDate,tag:errorTag} = this.state.errors

        return (
            <React.Fragment>
                <form onSubmit={(e)=>e.preventDefault()}>
                <div className="activitiesForm">
                    <h1 className="activityHeadder">Activity</h1>
                    <div className="timeStampContainer">
                        <p className='timeStamp'>The Time</p>
                        <div className='time'>{time}</div>
                    </div>
                    <div className='titleContainer'>
                        <p className='title'>Title</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={title} name='title' placeholder='Enter Title' />
                        <div className='errorFound'>{errorTitle}</div>
                    </div>
                    <div className='descriptionContainer'>
                        <p className='description'>Description</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={description} name='description' placeholder='Enter Description' />
                        <div className='errorFound'>{errorDescription}</div>
                    </div>
                    <div className='dueDateContainer'>
                        <p className='dueDate'>Due Date</p>
                        <input min={this.disablePreviousDate()}  type="date" onChange={(e)=>this.handleChange(e)} value={dueDate} name="dueDate" />
                        <div className='errorFound'>{errorDueDate}</div>
                    </div>
                    <div className='tagContainer'>
                        <p className='tag'>Tag</p>
                        <div className='tagsContainer'>
                            {tag.map((e,i)=><Tag closable key={i}>{e}</Tag>)}
                        </div>
                        <input style={{display:'block'}} type="text" value={this.state.tagInput} onChange={(e)=>{this.setState({tagInput:e.currentTarget.value})}} placeholder='Enter Tag'/>
                        <div className='errorFound'>{errorTag}</div>
                        <Button style={{display:'block'}} onClick={()=>this.handleTagSubmit()} type='primary'>Add Tag</Button>
                    </div>
                    <div className='statusContainer'>
                        <p className='status'>Status</p>
                        <select name='status' onChange={(e)=>this.handleChange(e)} value={status}>
                            <option value="Open">Open</option>
                            <option value="Working">Working</option>
                            <option value="Done">Done</option>
                            <option value="Over Due">Over Due</option>
                        </select>
                        <div className='errorFound'></div>
                    </div>
                    <div className="activityFormButtons">
                        <Button type='primary' onClick={()=>this.handleSubmit()}>Submit</Button>
                        {
                            this.props.params.id !== 'new'&&<Popconfirm onConfirm={(e)=>this.handleDelete(e)} title='Delete this Activity' description="Are you sure to delete this task?" okText="Yes" cancelText="No"><button className='delete'>Delete</button></Popconfirm>
                        }
                    </div>
                </div>
                </form>
            </React.Fragment>
        );
    }
}
 
export default ActivityClass;