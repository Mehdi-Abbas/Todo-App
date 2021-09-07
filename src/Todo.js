import React, {useState} from "react"
import "./Todo.css";

const Todo=()=>{
    const [text, setText]= useState("")
    //const [completedTodos, setCompletedTodos]= useState([])
    const [inCompletedTodos, setInCompletedTodos]= useState([])
    const [isTyping, setIsTyping]= useState(false) 
    const [isEditing, setIsEditing]= useState(false)


    const onSubmit=()=>{
        let list=[...inCompletedTodos]
        let newTodo={
            text:text,
            isCompleted:false
        }
        
        list.push(newTodo)
        setInCompletedTodos(list)
        setText("")
        setIsTyping(false)
        setIsEditing(false)
        
    }

    const onDone=(value)=>{
        setInCompletedTodos(()=>{
            return(
                inCompletedTodos.map((todo)=>{
                    return(
                        todo.text===value?{
                            text:value, 
                            isCompleted:true}
                        :todo
                    )
                })
            )
        }) 
    }
    

    const onEdit=(todo)=>{
        onDelete(todo)
        setText(todo.text)
        setIsEditing(true)
        setIsTyping(true)
    }
    const onDelete=(todo)=>{
        let list=[...inCompletedTodos]
        const index = list.indexOf(todo);
        if (index > -1) {
            list.splice(index, 1);
        }
        setInCompletedTodos(list)
    }

    const inCompleteTodo=(todo)=>{
        return(
            <div className="incompleteList">
                <span>{todo.text}</span>
                <button onClick={()=>onDone(todo.text)}>Done</button>
                <button onClick={()=>onEdit(todo)} style={{display:isEditing?"none":"block"}}>Edit</button>
                <button onClick={()=>onDelete(todo)}>Delete</button>
            
            </div>
        )
    }
    const completeTodo=(value)=>{
        return(
            <div className="completeList">
                <span>{value.text}</span>
                <button onClick={()=>{
                    setInCompletedTodos(()=>{
                        return(
                            inCompletedTodos.map((todo)=>{
                                return(
                                    todo.text===value.text?{
                                        text:value.text, 
                                        isCompleted:false}
                                    :todo
                                    
                                )
                                
                            })
                        )
                    }) 
                }}>Undo</button>
                <button onClick={()=>onDelete(value)}>Delete</button>
            </div>
        )
    }

    return(
        <div className="main">
            <div className="todo">
                <div className="header">
                    Todos Application
                </div>
                <div className="topBar">
                    <input
                        placeholder="What you want to do?"
                        onChange={ (e)=>{
                            setText(e.target.value)
                            e.target.value.length>0?setIsTyping(true):setIsTyping(false)
                        }
                        }
                        value={text}
                        onKeyDown={(event)=>{
                            if (event.key === 'Enter') {
                                 return text.length>0 && onSubmit()
                              }
                        }}
                    />
                    
                    {isEditing?<button style={{display:isTyping?"block":"none"}}onClick={onSubmit}>Update</button>
                    :<button style={{display:isTyping?"block":"none"}}onClick={onSubmit}>Create</button>}
                    
                </div>
                {inCompletedTodos.map(todo=>{
                    return(!todo.isCompleted?inCompleteTodo(todo):completeTodo(todo))
                    
                })}
            </div>
        </div>
    )
}
    

export default Todo