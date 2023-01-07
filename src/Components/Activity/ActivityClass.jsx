import React, { Component } from 'react';

class ActivityClass extends Component {
    state = {
        userInput:{time:'',title:'',description:'',dueDate:'',tag:'',status:''},
        errors:{}
    }

    handleChange({currentTarget}){
        let inputData = currentTarget.value
        let name = currentTarget.name

        let updatedUserInput = this.state.userInput
        updatedUserInput[name] = inputData
        
        this.setState({userInput:updatedUserInput})
    }

    handleSubmit(event){
        event.preventDefault()
    }

    render() { 
        let {params} = this.props
        let {description,dueDate,status,tag,time,title} = this.state.userInput
        console.log(title);
        return (
            <React.Fragment>
                <h1>Activity</h1>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div className="timeStampContainer">
                        <p className='timeStamp'>The Time</p>
                        <p className='time'>Time</p>
                    </div>
                    <div className='titleContainer'>
                        <p className='title'>Title</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} value={title} name='title' placeholder='Enter Title' />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='descriptionContainer'>
                        <p className='description'>Description</p>
                        <input type="text" onChange={(e)=>this.handleChange(e)} name='description' placeholder='Enter Description' />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='dueDateContainer'>
                        <p className='dueDate'>Due Date</p>
                        <input type="text" />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='TagContainer'>
                        <p className='tag'>Tag</p>
                        <input type="text" placeholder='Enter Tag Name' />
                        <p className='errors'>errors</p>
                    </div>
                    <div className='statusContainer'>
                        <p className='status'>Status</p>
                        <select>
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