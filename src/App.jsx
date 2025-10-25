import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa"
import { MdDeleteSweep } from "react-icons/md"

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showF, setShowF] = useState(true)



  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleF = (e) => {
    setShowF(!showF)
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    if (confirm('Are you sure you want to delete')) {

      let newTodos = todos.filter(item => {
        return item.id !== id
      })
      setTodos(newTodos)
      saveToLS()
    }
  }

  return (
    <>
      <Navbar />
      <div className="container w-[60%] bg-violet-400 my-1 rounded-4xl min-h-[90vh] flex flex-col items-center mx-auto ">
        <h1 className='text-center font-bold md:text-xl  my-5'>iTask - Manage your todos at one place</h1>
        <div className="addTodo flex items-center justify-around w-full  flex-wrap">
          <h1 className='md:text-lg text-[10px] md:font-bold'>Add Todo</h1>
          <input onChange={handleChange} value={todo} type="text" className='bg-violet-300 outline-none rounded-xl p-1 w-1/2' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className=' disabled:bg-violet-700 disabled:font-light p-2 text-white bg-violet-700 hover:bg-violet-900 hover:font-bold rounded-bl-2xl rounded-tr-2xl cursor-pointer text-[10px] md:text-lg'>Save</button>
        </div>
        <span className='flex gap-2 my-4 md:font-bold text-[12px] md:text-lg'><input type="checkbox" onChange={toggleF} checked={showF} /> Show Finised</span>
        <hr className='w-[50vw] md:mb-5 mb-2 text-gray-700 ' />
        <div className="todos w-full justify-center">
          <h1 className='md:text-xl text-sm font-bold mb-2 mx-10'>Yours Todos</h1>
          {todos.length === 0 && <div className='m-5'>No Todo To Display</div>}
          {todos.map(item => {

            return (showF || !item.isCompleted) &&
              <div key={item.id} className="todo flex justify-between my-2 items-center">
                <div className='flex items-center gap-2 w-full justify-between '>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className='flex mx-3'/>
                  <div className={`text-[10px] md:text-lg ${item.isCompleted ? "line-through" : ""} ${item.isImportant ? "text-red-500" : ""}`} >{item.todo}</div>
                  <span className='gap-2 flex mx-2 flex-wrap items-center  '>
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='text-white bg-violet-700 hover:bg-violet-900  rounded-bl-2xl rounded-tr-2xl  text-xs md:text-xl md:p-3 p-2'><FaRegEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='text-white bg-violet-700 hover:bg-violet-900  rounded-bl-2xl rounded-tr-2xl text-sm md:text-xl md:p-3 p-2'><MdDeleteSweep /></button>
                  </span>
                </div>
              </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
