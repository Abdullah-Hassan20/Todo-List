import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';   
import { MdEdit ,MdDelete} from "react-icons/md";
import {IoMdAdd} from "react-icons/io";

function Context(){   
  const [todo, settodo] = useState("");   
  const [todos, settodos] = useState([]); 
  const [showFinished,setshowFinished] =useState(false)
  
  useEffect(() => {
    let storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      let Todo = JSON.parse( localStorage.getItem("todos"));
      settodos(Todo);
    }
  }, []);  

  const save=()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {     
    if (todo.trim()) { 
      settodos([...todos, { id: uuidv4(), text: todo, isCompleted: false }]);     
      settodo("");
    }
    save()
  };    

  const change = (e) => {     
    settodo(e.target.value);   
  }; 
  
  const toodle=()=>{
    setshowFinished(!showFinished)
  }

  const handleCheck = (e) => {     
    let id = e.target.name;     
    let index = todos.findIndex((item) => item.id === id);     
    let newTodos = [...todos];     
    newTodos[index].isCompleted = !newTodos[index].isCompleted;     
    settodos(newTodos);   
    save()
  };   

  const handleEdit = (e) => {     
    let id = e.target.value;     
    let t = todos.find((item) => item.id === id);     
    settodo(t.text);     
    let newTodos = todos.filter((item) => item.id !== id);     
    settodos(newTodos); 
    save()  
  };   

  const handleDelete = (e) => {     
    let id = e.target.value;     
    let newTodos = todos.filter((item) => item.id !== id);     
    settodos(newTodos);
    save( )   
  };    

  return (
    <>     
      <div className=' my-14 flex flex-col min-w-full'>
        <div className='mx-auto'>
          <div className='flex min-w-[40vw]'>    
            <input className="rounded-lg p-2 text-black min-w-[40vw] right-2 relative"        
              type="text"       
              placeholder='Enter new Todo'        
              value={todo}         
              onChange={change}  
            />  
            <button className='bg-slate-800 rounded-md cursor-pointer min-w-6 p-2 disabled:bg-slate-950' 
            onClick={handleAdd} disabled={todo.length<3}><IoMdAdd/></button> 
          </div>              
        </div>   
        <div className='min-w-28 my-6 ml-[15vw]'> 
          <div className='flex'>
            <input type="checkbox" value={showFinished} onClick={toodle}/>
            <div className='ml-5 my-5 text-[13px] text-nowrap'>Show Finished Todo's</div>
          </div>    
          {todos.length === 0 
            ? <p className='text-[18px] font-semibold text-nowrap'>No Todo's to display</p>     
            : <p className='text-[18px] font-semibold'>List of Todo's</p>
          }       
          {todos.map((item, index) => {         
            return (showFinished || !item.isCompleted)&&(    
              <div key={item.id} className='flex my-3'>             
                <div className='flex items-center bg-slate-900 rounded-md p-2 min-w-[40vw]'>               
                  <input 
                    name={item.id} 
                    className="mr-2" 
                    type="checkbox" 
                    onClick={handleCheck} 
                    checked={item.isCompleted}
                  />               
                  <div className={`${item.isCompleted ? 'line-through' : ''} break-words max-w-[450px]`}>
                    {item.text}
                  </div>             
                </div>             
                <div className='flex'>               
                  <button 
                    className='cursor-pointer p-1 m-1 bg-slate-800 rounded-xl ' 
                    value={item.id} 
                    onClick={handleEdit}
                  ><MdEdit /></button>               
                  <button 
                    className='cursor-pointer p-1 m-1 bg-slate-800 rounded-xl' 
                    value={item.id} 
                    onClick={handleDelete}
                  >
                    <MdDelete />
                  </button>             
                </div>           
              </div>   
          );
          })}
        </div>     
      </div>     
    </>
  );   
} 

export default Context;
