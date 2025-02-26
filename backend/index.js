const express = require('express');
require('dotenv').config();
const { createTodo } = require('./types');
const { todo } = require('./db');
const app = express();

app.use(express.json());

app.post('/todo',async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent the wrong input",
        })
        return;
    }
    //if success store in db
    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed : false
    })

    res.json({
        msg : "todo created"
    })
});

app.get('/todos',async (req,res)=>{
    const todos = await todo.find();
    res.json({
        todos
    })
});

app.put('/completed',async (req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = createTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"you sent the wrong input",
        })
        return;
    }
    await todo.update({_id:req.body},{completed:true});
    res.json({
        msg: "todo marked as completed"
    })
})

app.listen(3000,()=>{
    console.log('server running on 3000')
});