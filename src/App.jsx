import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { useState,useEffect } from "react"

function App() {

  // const todo = [
  // { input: 'Hello! Add your first todo!', complete: true },
  // { input: 'Get the groceries!', complete: false },
  // { input: 'Learn how to web design', complete: false },
  // { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todo,setTodo] = useState([{input: 'Hello! Add your first todo!', complete: true}])

  const [selectedTab,setSelectedTab] = useState('Open')

  function handleAddTodo(newTodo){
    const newTodoList = [...todo,{input:newTodo,complete:false}]
    setTodo(newTodoList)
    handleSaveData(newTodoList)
  }



  function handleCompleteTodo(index){
    let newTodoList = [...todo]
    let completedTodo = todo[index]
    completedTodo['complete']=true
    newTodoList[index] = completedTodo
    setTodo(newTodoList)
    handleSaveData(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index){
    console.log("The Index >>",index);
    let newTodoList = todo.filter((val,valIndex)=>{
      return valIndex!==index
    })
    setTodo(newTodoList)
    
  }

  function handleSaveData(curentTodos){
    localStorage.setItem('todo-app',JSON.stringify({todo:curentTodos}))
  }

  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app')){return}
   
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodo(db.todo)
    
  },[])

  return (
    <>
      <Header todos={todo}/>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todo}/>
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todo}/>
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
