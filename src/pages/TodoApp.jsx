import React from 'react'
import { useState } from 'react'
import "/src/index.css"

const TodoApp = () => {
    const [todos, setTodos]=useState([])  /* printing the todos dynamically when user creates a todo*/
    const [input, setInput]=useState("")
    const [editId, setEditId]=useState(null)
    const [editText, setEditText]=useState("")
    console.log(editText)

    // function to create todo
    const addTodo =()=>{
      if(input.trim()){
        setTodos([...todos,{id:Date.now(),text:input,done:false}])
        setInput("")
      }
    }

    // function to remove todo
    const removeTodo= (id)=>{
       setTodos( todos.filter(todo=>todo.id!==id))
    }
    // function to toggle todo
    const toggleTodo =(id)=>{
         setTodos(todos.map(todo=>todo.id===id?{...todo,done:!todo.done}:todo))
    }
    // function to edit todo
    const StartEdit =(id,text)=>{
        setEditId(id)
        setEditText(text)

    }
    // function to save-edit todo
    const SaveEdit =(id)=>{
        setTodos(todos.map(todo=>todo.id===id?{...todo,text:editText}:todo))
        setEditId(null)
        setEditText("")

    }
    
  return (
    <>
    
    <div className='container'>
    <h1>TODO LIST</h1>
        {/* input start */}
        <div className=" entertext ">
        <input 
        type="text" 
        value={input}
        className="form-control border " 
        placeholder="enter todo..."
        onChange={(e)=>setInput(e.target.value)}
        />
        {/* input end */}

        {/* addbtn start */}
        <button className='btn btn-success mx-3' onClick={()=>addTodo()}>
            addtodo</button>
        {/* addbtn end */}
        </div>

        {/* todolist items start */}
        
            <div className='output'>
            {
            todos.map(todo=>(
                <li key={todo.id} className='list-group-item'>
                    {/* editing the text */}
                    {
                        editId===todo.id?(
                            <input 
                            className="form-control border border-danger"
                            type="text" 
                            value={editText}
                            placeholder="enter todo..."
                            onChange={(e)=>setEditText(e.target.value)}
        />
                        ):(<span className={todo.done? "text-decoration-line-through text-secondary":"text-dark"}>{todo.text}</span>

                        )
                    }
                     {/* buttons */}
                     {
                        editId===todo.id?(
                            <button className='btn btn-success mx-1 my-2' onClick={()=>SaveEdit(todo.id,todo.text)}>save</button>
                        ):(<>
                             <button className='btn btn-success mx-1 my-2' onClick={()=>StartEdit(todo.id,todo.text)}>edit</button>
                             <button className='btn btn-success mx-1 my-2' onClick={()=>toggleTodo(todo.id)}>{todo.done?"undo":"done"}</button>
                        </>)
                     }
                  <button className='btn btn-danger' onClick={()=>removeTodo(todo.id)}>Delete</button>
                </li>
            ))
        }
        </div>
        {/* todolist items end */}
      </div>
      </>
  )
}

export default TodoApp
