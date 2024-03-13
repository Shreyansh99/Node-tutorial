const express = require("express");
const fs = require("fs")  // module for file handling
const users = require("./MOCK_DATA.json")
const app=  express();

const PORT=8000;
//starting server at PORT 8000

app.use(express.urlencoded({extended:false}))



// routes
app.get('/users',(req,res)=>{
    const html=`
    <ul>${users.map((user)=>`<li>${user.first_name}</li>`).join('')}</ul>
    `
    res.send(html)
})


app.route('/api/users/:id')
.get((req,res)=>{
    const id= Number(req.params.id);
    const user=users.find(user=>user.id===id);
    res.json(user);
})
.patch((req,res)=>{
     // todo edit the user with id
     return res.json({status:"pending"});
})
// .delete((req,res)=>{
//     // todo delete the user with id
//     const id =Number(req.params.id)
//     const user = users.find(user=>user.id===id)
//     users.splice(id)
//     console.log("useer deleted",user.id)
//     return res.json({status :"pending"})
// })

app.post('/api/users',(req,res)=>{
    // todo crate new user
    const body =req.body;
    console.log("body",body)
    users.push({...body, id :users.length +1})
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users) ,(err,data)=>{
        return res.json({status:'success', id: users.length});
    })   
})
app.get('/api/users',(req,res)=>{
    res.json(users)
})

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`))