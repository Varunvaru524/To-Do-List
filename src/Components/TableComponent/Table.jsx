import React, { Component } from 'react';
import {Table, Button,Input,Tag} from 'antd'
import {Link} from 'react-router-dom'
import { getActivities } from "../../Assets/BackendService";
import './Table.css'

// let date = new Date()


class TheTable extends Component {
    state={
        tableColumn:[
            {
                title:'Time',
                dataIndex:'time',
                key:'1',
                sorter:(a,b)=>{
                    let count1 = a.time.toString().toUpperCase()
                    let count2 = b.time.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Title',
                dataIndex:'title',
                key:'2',
                sorter:(a,b)=>{
                    let count1 = a.title.toString().toUpperCase()
                    let count2 = b.title.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Description',
                dataIndex:'description',
                key:'3',
                sorter:(a,b)=>{
                    let count1 = a.description.toString().toUpperCase()
                    let count2 = b.description.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Due Date',
                dataIndex:'dueDate',
                key:'4',
                sorter:(a,b)=>{
                    let count1 = a.dueDate.toString().toUpperCase()
                    let count2 = b.dueDate.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Tag',
                dataIndex:'tags',
                key:'5',
                filters:[
                    {text:'Important',value:'Important'},
                    {text:'Not Important',value:'Not Important'},
                    {text:'Meeting',value:'Meeting'},
                    {text:'Urgent',value:'Urgent'},
                    {text:'High Priority',value:'High Priority'}
                ],
                onFilter:(value,record)=>{
                    return record.tags.props.children === value
                }
            },
            {
                title:'Status',
                dataIndex:'status',
                key:'6',
                filters:[
                    {text:'Open',value:'Open'},
                    {text:'Working',value:'Working'},
                    {text:'Done',value:'Done'},
                    {text:'Over Due',value:'Over Due'},
                ],
                onFilter:(value,record)=>{
                    return record.status.props.children === value
                }
            }
        ],
        tableData:[]
    }

    componentDidMount() {
        // Calling Backend Services
        let backendData = getActivities()
        let updatedTableData = backendData.map(data=>{
            
            let tagColor = null
            if (data.tags == "Urgent") tagColor = 'red'
            if (data.tags == "High Priority") tagColor = 'magenta'
            if (data.tags == "Important") tagColor = 'green'
            if (data.tags == "Not Important") tagColor = 'geekblue'
            if (data.tags == "Meeting") tagColor = 'purple'

            let statusColor = null
            if (data.status == "Open") statusColor = '#0000FF'
            if (data.status == "Working") statusColor = '#fdbe00'
            if (data.status == "Done") statusColor = '#0ea227'
            if (data.status == "Over Due") statusColor = '#FF0000'

            return {
                time:data.timeStamp,
                title:<Link to={'/table'+'/'+data._id}>{data.title}</Link>,
                status:<Tag color={statusColor}>{data.status}</Tag>,
                description:data.description,
                dueDate:data.dueDate,
                tags:<Tag color={tagColor}>{data.tags}</Tag>,
                key:data._id
            }
        })
        this.setState({tableData:updatedTableData})
    }

    render() { 
        let {tableColumn,tableData} = this.state
        return (
            <React.Fragment>
                <header>To Do List</header>
                <div className="toolBar">
                    <Input placeholder='Search'/>
                    <Button type='primary'><Link to='/table/new'>Add Activity</Link></Button>
                </div>
                <div className="tableContainer">
                    <Table dataSource={tableData} columns={tableColumn}/>
                </div>
            </React.Fragment>
        );
    }
}
 
export default TheTable;







