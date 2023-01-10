import React, { Component } from 'react';
import {Table, Button,Input,Tag,message,Popconfirm} from 'antd'
import {Link} from 'react-router-dom'
import { getActivities,deleteActivity } from "../../Assets/BackendService";
import './Table.css'

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
            },
            {
                title:<div>Delete</div>,
                dataIndex:'delete',
                key:7
            }
        ],
        tableData:[],
        searchData:[]
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
                title:<Link to={'/table'+'/'+data._id} title={'Edit'}>{data.title}</Link>,
                status:<Tag color={statusColor}>{data.status}</Tag>,
                description:data.description,
                dueDate:data.dueDate,
                tags:<Tag color={tagColor}>{data.tags}</Tag>,
                key:data._id,
                delete: <Popconfirm onConfirm={()=>this.handleDelete(data)} title='Delete this Activity' description="Are you sure to delete this task?" okText="Yes" cancelText="No"><button className='delete'>Delete</button></Popconfirm>
            }
        })
        this.setState({tableData:updatedTableData, searchData:updatedTableData})
    }

    handleDelete (data){
        let updatedTableData = [...this.state.tableData]
        let deleteIndex = updatedTableData.findIndex(a=>a.key==data._id)
        updatedTableData.splice(deleteIndex,1)

        this.setState({tableData:updatedTableData,searchData:updatedTableData})

        //Calling backend delete api
        deleteActivity(data._id)
        message.success('Successfully Deleted')
    }

    handleSearch({currentTarget}){
        let currentSearch = currentTarget.value.toUpperCase()

        // Search from title
        let titleSearch = this.state.tableData.filter(a=>{
            return a.title.props.children.toUpperCase().startsWith(currentSearch)
        })

        // Search from description
        let descriptionSearch = this.state.tableData.filter(a=>{
            return a.description.toUpperCase().startsWith(currentSearch)
        })

        // Search from Status
        let statusSearch = this.state.tableData.filter(a=>{
            return a.status.props.children.toUpperCase().startsWith(currentSearch)
        })

        // Search from Time
        let timeSearch = this.state.tableData.filter(a=>{
            return a.time.toUpperCase().startsWith(currentSearch)
        })

        // Eleminating the duplicate elements
        let search = [ ...titleSearch, ...descriptionSearch, ...statusSearch, ...timeSearch]
        let searchData = search.filter((e,i)=>search.indexOf(e)==i)
        this.setState({searchData})
    }

    render() { 
        let {tableColumn,searchData} = this.state

        return (
            <React.Fragment>
                <header>To Do List</header>
                <div className="toolBar">
                    <Input onChange={(e)=>this.handleSearch(e)} placeholder='Search'/>
                    <Button type='primary'><Link to='/table/new'>Add Activity</Link></Button>
                </div>
                <div className="tableContainer">
                    <Table dataSource={searchData} columns={tableColumn}/>
                </div>
            </React.Fragment>
        );
    }
}

export default TheTable;