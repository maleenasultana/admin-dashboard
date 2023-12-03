import React,{useEffect, useState,useSortBy} from 'react'
import axios from "axios";
import "./Table.css"

const Table = () => {
    const [data,setData]= useState([]);
    const [name, setName]=useState("");
    const [email, setEmail] =useState("");
    const [editId, setEditId] = useState(-1);
    const [updateName, setUpdateName]= useState("")
    const [updateEmail, setUpdateEmail]= useState("")



    useEffect(()=>{
        axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(res => setData(res.data))
    .catch(err => console.log(err))
    },[])

const handleSubmit=(e)=>{
    e.preventDefault();
    const id = data.length + 1;
    axios.post("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json" ,{id:id, name:name, email:email})
.then(res => {
    // location.reload()
})
.catch(err => console.log(err))
}

const handleEdit= (id) =>{
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json' + id)
    .then(res =>{ 
        console.log(res)
        setUpdateName(res.data.name)
        setUpdateEmail(res.data.email)
    })
    .catch(err => console.log(err))
   setEditId(id)
}


const handleUpdate=()=>{
    axios.put('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json' + editId,{id: editId, name:updateName, email:updateEmail})
     .then (res => {
        console.log(res);
        // location.reload()
        setEditId(-1);
     }).catch(err => console.log(err))
}


const handleDelete =() => {
    axios.delete('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json' + editId,{id: editId, name:updateName, email:updateEmail})
    .then (res => {
    //   location.reload()
    
    })
    .catch(err=> console.log(err))
}

const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }
  return (
    <div className='container'>
        <h2>Admin Dashboard</h2>
        <div className='form-div'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='enter your name'
                onChange={e => setName(e.target.value)}/>
                <input type='text' placeholder='enter your email-id'
                onChange={e => setEmail(e.target.value)}/>
                <button className='btn btn-outline-success'>Add</button>
            </form>
        </div>
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th >
                            ID
                            {generateSortingIndicator(data)}
                            </th>
                        <th>Name</th>
                        <th>Email-Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ }}>
                   {
                    data.map((user,id)=>(
                        user.id === editId ?
                        <tr>
                            <td>{user.id}</td>
                            <td><input type='text' value={updateName} onChange={e =>setUpdateName(e.target.value)}/></td>
                            <td><input type='text' value={updateEmail} onChange={e => setUpdateEmail(e.target.value)}/></td>
                            <button onClick={handleUpdate} className='btn btn-outline-warning'>Update</button>
                        </tr>
                        :
                        <tr key={id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={()=>handleEdit(user.id)}>edit</button>
                                    <button onClick={()=>handleDelete(user.id)}>delete</button>
                                </td>
                        </tr>
                    ))
                   }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Table