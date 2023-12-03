import React, {useEffect, useState} from 'react'
import axios from "axios";
import DataTable, {defaultThemes} from "react-data-table-component"

const customStyles={
    headRow:{
        style:{
            backgroundColor:"blue",
            color:"white"
        }
    },
    headCells: {
        style: {
            fontSize : "16px",
            fontWeight:"600",
            textTransform: "uppercase",
        },
    },
    cells:{
        style: {
            fontSize: "15px",
        },
    },
   
};

const column =[
    {
        name:"ID",
        selector: row => row.id,
        sortable:true
    },
    {
        name:"Name",
        selector: row => row.name
    },
    {
        name:"Email",
        selector: row => row.email
    },
{
    name:"Action",
   
},
    
]



const New = () => {
    const [records, setRecords]=useState([])
    const[filterRecords,setFilterRecords]=useState([])
    const [editable,setEditable]=useState({})


    useEffect(()=> {
        const fetchData = async () => {
            axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(res =>{ 
                setRecords(res.data)
            setFilterRecords(res.data)
            })
            .catch(err => console.log(err))
        }
        fetchData()
    }, [])

    const handleFilter=(e)=>{
     const newData= filterRecords.filter(row => row.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setRecords(newData)
    }
  return (
    <div style={{ padding:"50px 10%", backgroundColor:"gray"}}>
        <div>
            <input onChange={handleFilter} type='text' style={{padding:"6px 10px"}} placeholder='search...'/>
            <button onChange={handleFilter} className='search-icon'>🔍</button>         
        </div>
        <DataTable
        columns ={column}
        data={records}
        customStyles={customStyles}
        pagination
        selectableRows
     
       
        ></DataTable>
    </div>
  )
}

export default New