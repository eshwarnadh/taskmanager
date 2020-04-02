const functions = require('firebase-functions');
const express = require('express')
const app = express()
const cors = (require('cors'))({origin:true})
app.use(cors)
const _ = require('lodash')
const { admin, db } = require('./config')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


app.post("/createtask", (req, res) => {
    console.log("createtask")
    const input = req.body
    const newTask = {
        title : input.title,
        description : input.description,
        date : input.date,
        priority : input.priority
    }
    let errCount = 0
    Object.entries(newTask).forEach(([key, value]) => {
        if(key === "date" && Date.parse(value) === NaN){
            errCount++
        }
        else if(value === "")
            errCount++
    })
    // if((new Date(newTask.date)).getTime() < (new Date()).getTime())
    //     throw new Error('date-mismatch')
    if(errCount > 0)
        throw new Error('invalid-entries')
    console.log("data-verified")
    const dbRef = db.collection("Tasks").doc()
    console.log("creating new task")
    dbRef.set({
        ...newTask,
        createdAt : (new Date()).toISOString(),
        isExist : true,
        id : dbRef.id
    })
    .then(() => {
        console.log("task created")
        return res.send({
            response : `New task ${dbRef.id} created successfully!`,
            status : false
        })
    })
    .catch(err => {
        console.log(err)
        if(err.toString().match('invalid-entries'))
            return res.send({
                response : `The fields must not be empty`,
                code : `invalid-entries`,
                status : false
            })
        return res.send({
            response : `An error occured while creating the task`,
            code : `unknown-error`,
            status : false
        })    
    })
})


app.post("/updatetask", (req, res) => {
    console.log("updatetask")
    const input = req.body
    const updatedTask = {
        title : input.title,
        description : input.description,
        date : input.date,
        priority : input.priority
    }
    const id = input.id
    let errCount = 0
    Object.entries(updatedTask).forEach(([key, value]) => {
        if(key === "date" && Date.parse(value) === NaN){
            errCount++
        }
        else if(value === "")
            errCount++
    })
    if(errCount > 0)
        throw new Error('invalid-entries')
    console.log("data-verified")
    const dbRef = db.collection("Tasks").doc(id)  
    
    db.collection("Tasks")
    .where("id","==",id)
    .where("isExist","==",true)
    .get()
    .then(snap => {
        if(snap.size < 1)
            throw new Error('no-task-exist')
        console.log("checking previous and new changes")    
        let task = snap.docs[0].data()
        const oldTask = {
            title : task.title,
            description : task.description,
            date : task.date,
            priority : task.priority
        }

        if(_.isEqual(updatedTask, oldTask))
            return res.send({
                response : `No updation made`,
                code : `no-update-made`,
                status : false
            })
        return updatedTask    
    })
    .then(() => {
        console.log("updating task")
       return dbRef.set({
                ...updatedTask
            },{merge:true})
    })
    .then(() => {
        console.log("task updated")
        return res.send({
            response : `Task updated successfully!`,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        if(err.toString().match('invalid-entries'))
            return res.send({
                response : `The fields must not be empty`,
                code : `invalid-entries`,
                status : false
            })
        if(err.toString().match('no-task-exist'))    
            return res.send({
                response : `An existing is does not exist with the requested id`,
                code : `no-task-exist`,
                status : false
            })
        return res.send({
            response : `Failed to update task`,
            code : `update-failed`,
            status : false
        })
    })  

})


app.post("/deletetask", (req, res) => {
    console.log("deletetask")
    const id = req.body.id
    if(id === "")
        throw new Error('invalid-id')
    db.collection('Tasks')
    .doc(id)
    .update({isExist : false})
    .then(() => {
        return res.send({
            response : `Task deleted successfully`,
            status : false
        })
    })    
    .catch(err => {
        console.log(err)
        if(err.toString().match('invalid-id'))
            return res.send({
                response : `The id is invalid`,
                code : `invalid-id`,
                status : false
            })
        return res.send({
            response : `Failed to delete task`,
            code : `delete-failed`,
            status : false
        })   
    })
})


app.post("/tasklist", (req, res) => cors(req, res, () => {
    console.log("tasklist")
    db.collection("Tasks")
    .get()
    .then(snap => {
        let tasks = snap.docs.map(doc => doc.data())
        return res.send({
            response : tasks,
            status : true
        })
    })
    .catch(err => {
        console.log(err)
        return res.send({
            response : `Failed to get tasks`,
            status : false
        })
    })
}))





exports.api = functions.https.onRequest(app)