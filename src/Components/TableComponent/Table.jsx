import React, { Component } from 'react';
import {Table, Button,Input,Tag,message,Popconfirm,Space} from 'antd'
import {Link} from 'react-router-dom'
import { getActivities,deleteActivity } from "../../Assets/BackendService";
import './Table.css'

class TheTable extends Component {
    state={
        tableColumn:[
            
            {
                title:'Title',
                dataIndex:'title',
                key:'1',
                sorter:(a,b)=>{
                    let count1 = a.title.props.children.toString().toUpperCase()
                    let count2 = b.title.props.children.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Description',
                dataIndex:'description',
                key:'2',
                sorter:(a,b)=>{
                    let count1 = a.description.toString().toUpperCase()
                    let count2 = b.description.toString().toUpperCase()
                    if (count1<count2) {return -1}
                    if (count1>count2) {return 1}
                    return 0
                }
            },
            {
                title:'Time',
                dataIndex:'time',
                key:'3',
                sorter:(a,b)=>{
                    let count1 = a.time.toString().toUpperCase()
                    let count2 = b.time.toString().toUpperCase()
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
                title: <div>Tag</div>,
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
                    let tagsArray = record.tags.map(e=>e.props.children)
                    for (let i = 0; i < tagsArray.length ; i++) {
                        let individualTags = tagsArray[i] == value
                        if (individualTags) {
                            return true
                        }
                    }
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
                title:<div>Edit or Delete</div>,
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

            // Status Color
            let statusColor = null
            if (data.status == "Open") statusColor = '#0000FF'
            if (data.status == "Working") statusColor = '#fdbe00'
            if (data.status == "Done") statusColor = '#0ea227'
            if (data.status == "Over Due") statusColor = '#FF0000'

            // To Render Tags
            let tagsRendered = data.tags.map((tagData,index)=>{
                let tagColor = null
                if (tagData == "Urgent") tagColor = 'red'
                if (tagData == "High Priority") tagColor = 'magenta'
                if (tagData == "Important") tagColor = 'green'
                if (tagData == "Not Important") tagColor = 'geekblue'
                if (tagData == "Meeting") tagColor = 'purple'

                if (data.status == 'Done') {
                    return <Tag color={tagColor} key={index}>{<strike>{tagData}</strike>}</Tag>
                }
                else {
                    return <Tag color={tagColor} key={index}>{tagData}</Tag>
                }

            })

            if (data.status == "Done") {
                return {
                    time:<strike>{data.timeStamp}</strike>,
                    title:<strike><Link to={'/table'+'/'+data._id} title={'Edit'}>{data.title}</Link></strike>,
                    status:<strike><Tag color={statusColor}>{data.status}</Tag></strike>,
                    description:<strike>{data.description}</strike>,
                    dueDate:<strike>{data.dueDate}</strike>,
                    tags:tagsRendered,
                    key:data._id,
                    delete: (
                        <Space>
                            <Link to={'/table'+'/'+data._id}>
                                <Button type='primary' className='edit'>Edit</Button>
                            </Link>
                            <Popconfirm onConfirm={()=>this.handleDelete(data)} title='Delete this Activity' description="Are you sure to delete this task?" okText="Yes" cancelText="No">
                                <Button className='delete'>Delete</Button>
                            </Popconfirm>
                        </Space>
                    )
                }
            }

            else {
                return {
                    time:data.timeStamp,
                    title:<Link to={'/table'+'/'+data._id} title={'Edit'}>{data.title}</Link>,
                    status:<Tag color={statusColor}>{data.status}</Tag>,
                    description:data.description,
                    dueDate:data.dueDate,
                    tags:tagsRendered,
                    key:data._id,
                    delete: (
                        <Space>
                            <Link to={'/table'+'/'+data._id}>
                                <Button type='primary' className='edit'>Edit</Button>
                            </Link>
                            <Popconfirm onConfirm={()=>this.handleDelete(data)} title='Delete this Activity' description="Are you sure to delete this task?" okText="Yes" cancelText="No">
                                <Button className='delete'>Delete</Button>
                            </Popconfirm>
                        </Space>
                    )
                }

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
        let {tableData} = this.state

        // Search from title
        let titleSearch = tableData.filter(e=>{
            return e.title.props.children.toUpperCase().startsWith(currentSearch)
        })

        // Search from description
        let descriptionSearch = tableData.filter(e=>{
            return e.description.toUpperCase().startsWith(currentSearch)
        })

        // Search from Status
        let statusSearch = tableData.filter(e=>{
            return e.status.props.children.toUpperCase().startsWith(currentSearch)
        })

        // Search from Time
        let timeSearch = tableData.filter(e=>{
            return e.time.toUpperCase().startsWith(currentSearch)
        })

        // Search from Tags
        let tagSearch = tableData.filter(e=>{
            let tagsArray = e.tags.map(e=>e.props.children)
            for (let i = 0; i < tagsArray.length ; i++) {
                let individualTags = tagsArray[i].toUpperCase().startsWith(currentSearch)
                if (individualTags) {
                    return true
                }
            }
        })

        // Eleminating the duplicate elements
        let search = [ ...titleSearch, ...descriptionSearch, ...statusSearch, ...timeSearch, ...tagSearch]
        let searchData = search.filter((e,i)=>search.indexOf(e)==i)
        this.setState({searchData})
    }

    render() { 
        let {tableColumn,searchData} = this.state

        return (
            <React.Fragment>
                <header>To Do List</header>
                <div className="toolBar">
                    <Input onChange={(e)=>this.handleSearch(e)} placeholder='Search by Title, Description, Time, Tags or Status'/>
                    <Link to='/table/new'><Button type='primary'>Add Activity</Button></Link>
                </div>
                <div className="tableContainer">
                    <Table dataSource={searchData} columns={tableColumn}/>
                </div>
            </React.Fragment>
        );
    }
}

export default TheTable;