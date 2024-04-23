const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')


let dbURL = "mongodb://localhost:27017/todo";

mongoose.connect(dbURL)


.then(()=>{
    console.log("connected")
})

.catch(()=>{
    console.log("err...")
})

const Schema = mongoose.Schema

const currentDate = new Date();
const month = currentDate.getMonth() + 1; // Adding 1 to month to make it 1-indexed
const year = currentDate.getFullYear();


const mySchema = new Schema({ 
    sno: "string",
    task: "String",
    status: "string",
    deudate: "date",
    completedate: "date"
})
const myModel = mongoose.model('myModel', mySchema, 'todolist')

mytodolist = express();
mytodolist.use(express.json());  
mytodolist.use(cors())

///////////////////////////////////////get api////////////////////////////////

mytodolist.get('/get/api', (req,res)=>{

    myModel.find({})

    .then((result)=>{
        res.send(result)
    })

    .catch((error)=>{
        res.send(error)
    })
})



/////////////////////////////post api////////////////////////////////////////////

mytodolist.post('/post/api', (req, res) => {
    let {sno, task, status, deudate, completedate} = req.body; 
    myModel.create({sno, task,status, deudate, completedate})
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            res.send(error); 
        });
}); 

//////////////////////////////delete api//////////////////////////////////////

mytodolist.delete('/delete/api/:sno', (req, res) => {
    const snoToDelete = req.params.sno;

    myModel.findOneAndDelete({ sno: snoToDelete })
        .then((result) => {
            if (result) {
                res.send(`Todo with sno ${snoToDelete} deleted successfully.`);
            } else {
                res.status(404).send(`Todo with sno ${snoToDelete} not found.`);
            }
        })
        .catch((error) => {
            res.status(500).send(`Error deleting todo: ${error.message}`);
        });
});

//////////////////////////patch api///////////////////////////////

mytodolist.patch('/update/api/:sno', (req, res) => {
    const snoToUpdate = req.params.sno;
    const { task, status, deudate, completedate } = req.body;

    myModel.findOneAndUpdate({ sno: snoToUpdate }, { task, status, deudate, completedate }, { new: true })
        .then((result) => {
            if (result) {
                res.send(result);
            } 
        })
        .catch((error) => {
            res.send(error);
        });
});

mytodolist.put('/put/api/:sno', (req, res) => {
    const snoToUpdate = req.params.sno;
    const { task, status, deudate, completedate } = req.body;

    myModel.findOneAndUpdate({ sno: snoToUpdate }, { task, status, deudate, completedate }, { new: true })
        .then((result) => {
            if (result) {
                res.send(result);
            } 
        })
        .catch((error) => {
            res.send(error);
        });
});





mytodolist.listen(2000,()=>{
console.log('server is running')
})
