import React, { useEffect, useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';




function TaskTable(){

  
const[sno,setsno] = useState("");
const[task,settask] = useState(" ");
const[status,setstatus] = useState("");
const[deudate,setdeudate] = useState("");
const[completedate,setcompletedate] = useState("");


    let [data,setData] = useState([]);

    function getData(){
        fetch ("http://localhost:2000/get/api")

        .then((res)=>{
            return res.json();
        })

        .then((result)=>{
            console.log(result);
            setData(result)
        });
    }

    useEffect(()=> getData(),[])

    
                    
    function deleteUsers(sno){
    
      fetch(`http://localhost:2000/delete/api/`+ sno, {
  
      method : 'DELETE'   
      }).then((result)=>{
  
        result.json()
      }).then((resp)=>{
        console.warn(resp)
      })  }
  


 return( 
         <>

         <div >

         <h1 style={{fontSize:"50px", color:"#191919",  paddingLeft: "560px", paddingTop:"50px"}} className='gradient_background' >TODOS</h1>
         

         <table class="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Sno</th>
      <th scope="col">Task</th>
      <th scope="col">Status</th>
      <th scope="col">Due Date</th>
      <th scope="col">Completion Date</th>
      <th scope="col">Action</th>
      <th scope="col">Action</th>
    </tr>
    {data.map((currEle, i )=>{

      const assignedate = new Date(currEle.completedate).toLocaleString(
        "en-IN",
        {
          day:"numeric",
          month:"long",
          year: "numeric",
        }
      );

      const dueDate = new Date(currEle.deudate).toLocaleString(
        "en-IN",
        {
          day:"numeric",
          month:"long",
          year: "numeric",
        }
      );
      const rowStyle = {
        backgroundColor: currEle.status === 'completed' ? 'lightgreen' : 'inherit'
    };      

            return(
        <tr key={i} style={rowStyle}>
        <td scope="col" style={rowStyle}>{i+1}</td>
        <td scope="col" style={rowStyle}>{currEle.task}</td>
        <td scope="col" style={rowStyle}>{currEle.status}</td>
        <td scope="col" style={rowStyle}>{dueDate}</td>
        <td scope="col" style={rowStyle}> {assignedate} </td>
   <td style={rowStyle}> <button style={{backgroundColor:"#b4acac",border:"0"}}  >EDIT</button></td> <td style={rowStyle}> <button onClick={()=>deleteUsers(currEle.sno)} style={{backgroundColor:"#b4acac", border:"0"}}> DELETE </button> </td>
    </tr> 
)
})

}

</thead>
        
</table>



</div>    
   
</>

 )




}

export default TaskTable;