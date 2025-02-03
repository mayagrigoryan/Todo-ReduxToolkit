import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk(
    'fetchTodos',
    async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        const data = await res.json();
        return data
    }
)

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: {
        text: '',
        todos: []
    },
    reducers: {
        changeText(state, action) {
            state.text = action.payload
        },
        addTodo(state) {
            if (state.text.trim() !== '') {
                const newTodo = { id: Date.now(), title: state.text, completed: false }
                state.todos.push(newTodo)
                state.text = ''
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        editTodo: (state, action) => {
            const { id, newText } = action.payload
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) {
                todo.title = newText
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
    }
})

export const { changeText, addTodo, deleteTodo, toggleComplete, editTodo } = todoSlice.actions
export default todoSlice