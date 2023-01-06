import React, { Component } from 'react';
import {Table} from 'antd'
import {Link} from 'react-router-dom'
import { getActivities } from "../../Assets/BackendService";

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
                key:'5'
            },
            {
                title:'Status',
                dataIndex:'status',
                key:'6',
                filters:[
                    {text:'Open',value:'open'},
                    {text:'Working',value:'working'},
                    {text:'Done',value:'done'},
                    {text:'Over Due',value:'overDue'},
                ],
                onFilter:(value,record)=>{
                    return record.status === value
                }
            }
        ],
        tableData:[]
    }

    componentDidMount() {
        // Calling Backend Services
        let backendData = getActivities()
        let updatedTableData = backendData.map(data=>{
            return {
                time:data.timeStamp,
                title:<Link to={'/table'+'/'+data._id}>{data.title}</Link>,
                status:data.status,
                description:data.description,
                dueDate:data.dueDate,
                tags:data.tags,
                key:data._id
            }
        })
        this.setState({tableData:updatedTableData})
    }




    render() { 
        let {tableColumn,tableData} = this.state
        return (
            <React.Fragment>
                <div>To Do List</div>
                <div>Search</div>
                <Table dataSource={tableData} columns={tableColumn}/>
            </React.Fragment>
        );
    }
}
 
export default TheTable;


// console.log(date.getDate().toString()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.toLocaleTimeString());
