import { useState } from "react";

export function CreateTodo(){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    return <div>

        <input id="title" style={{padding:10,margin:10}} onChange={function(e){
            const value = e.target.value;
            setTitle(e.target.value);
        }} type="text" placeholder="title"></input><br/>

        <input id="description" style={{padding:10,margin:10}} onChange={function(e){
            const value = e.target.value;
            setDescription(e.target.value);
        }} type="text" placeholder="description"></input><br/>

        <button style={{padding:10,margin:10}} onClick={()=>{
            fetch("https://localhost:3000/todo",{
                method : "POST",
                body:JSON.stringify({
                    title:title,
                    description:description
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(async function(res){
                const json = await res.json();
                alert("todo created");
            })
        }}>Add Todo</button>
    </div>
}