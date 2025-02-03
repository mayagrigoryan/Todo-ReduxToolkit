import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, changeText, fetchTodos, deleteTodo, toggleComplete, editTodo } from '../../store/slices/todoSlice'
import './TodoList.css'

function TodoList() {
    const { text, todos } = useSelector((state) => state.todoReducer)
    const dispatch = useDispatch()

    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    console.log(todos);

    const handleEdit = (id, title) => {
        setEditId(id)
        setEditText(title)
    }

    const handleSaveEdit = () => {
        if (editText.trim() !== '') {
            dispatch(editTodo({ id: editId, newText: editText }))
            setEditId(null)
            setEditText('')
        }
    }

    return (
        <div className='App'>
            <div className='todo'>
                <h1>My Todo-List</h1>
                <input value={text} onChange={(e) => dispatch(changeText(e.target.value))} />
                <button onClick={() => dispatch(addTodo())}>+</button>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {editId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                    />
                                    <button onClick={handleSaveEdit}>Save</button>
                                </>
                            ) : (
                                <>
                                    {todo.title}
                                    <button onClick={() => dispatch(toggleComplete(todo.id))}>
                                        {todo.completed ? 'Undo' : 'Done'}
                                    </button>
                                    <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                                    <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TodoList