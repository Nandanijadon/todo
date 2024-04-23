import React, { useState } from 'react';

const ModalExample = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

const[sno,setsno] = useState("");
const[task,settask] = useState(" ");
const[status,setstatus] = useState("");
const[deudate,setdeudate] = useState("");
const[completedate,setcompletedate] = useState("");

const setData = () => {
    let data = { sno, task, status, deudate, completedate };
    fetch("http://localhost:2000/post/api", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      console.log(result);
    });
  };

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(true)}>
      Add new task
      </button>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
              
              </div>
              <div className="modal-body">
         

              <form>


<label for="fname">Task</label><br></br>
<input type ="text"
value={task}
onChange={(e)=>
settask(e.target.value)}/><br></br>

<label for="fname">Status</label> <br></br>
<input type="text"
value={status}
onChange={(e)=>
setstatus(e.target.value)} /> <br></br>

<label for="fname">Due Date</label><br></br>
<input type="text"
value={deudate}
onChange={(e)=>
setdeudate(e.target.value)}/><br></br>

<label for="fname">completion Date</label><br></br>
<input type="text"
value={completedate}            
onChange={(e)=>
setcompletedate(e.target.value)}/><br></br>

<button type='submit' onClick={setData} style={{marginTop:"20px"}}  className="btn btn-secondary"> add </button>
</form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalExample;
