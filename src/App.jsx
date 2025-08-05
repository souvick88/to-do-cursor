import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos')
        return savedTodos ? JSON.parse(savedTodos) : []
    })
    const [inputValue, setInputValue] = useState('')
    const [filter, setFilter] = useState('all')
    const [sortBy, setSortBy] = useState('date')

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addTodo = (e) => {
        e.preventDefault()
        if (inputValue.trim() === '') return

        const newTodo = {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        }

        setTodos([...todos, newTodo])
        setInputValue('')
    }

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed))
    }

    const completedCount = todos.filter(todo => todo.completed).length
    const activeCount = todos.length - completedCount

    const getFilteredTodos = () => {
        let filtered = todos
        
        switch (filter) {
            case 'active':
                filtered = todos.filter(todo => !todo.completed)
                break
            case 'completed':
                filtered = todos.filter(todo => todo.completed)
                break
            default:
                filtered = todos
        }

        return filtered.sort((a, b) => {
            if (sortBy === 'alphabetical') {
                return a.text.localeCompare(b.text)
            } else {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }
        })
    }

    const filteredTodos = getFilteredTodos()

    return (
        <div className="app">
            <div className="todo-container">
                <h1>Todo App</h1>

                <form onSubmit={addTodo} className="todo-form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="What needs to be done?"
                        className="todo-input"
                    />
                    <button type="submit" className="add-button">
                        Add
                    </button>
                </form>

                {todos.length > 0 && (
                    <div className="controls">
                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                All ({todos.length})
                            </button>
                            <button
                                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                                onClick={() => setFilter('active')}
                            >
                                Active ({activeCount})
                            </button>
                            <button
                                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                                onClick={() => setFilter('completed')}
                            >
                                Completed ({completedCount})
                            </button>
                        </div>
                        <div className="sort-controls">
                            <label htmlFor="sort-select">Sort by:</label>
                            <select
                                id="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select"
                            >
                                <option value="date">Date (newest first)</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="todo-list">
                    {todos.length === 0 ? (
                        <p className="empty-state">No todos yet. Add one above!</p>
                    ) : filteredTodos.length === 0 ? (
                        <p className="empty-state">No todos match the current filter.</p>
                    ) : (
                        filteredTodos.map(todo => (
                            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className="todo-checkbox"
                                />
                                <span className="todo-text">{todo.text}</span>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="delete-button"
                                >
                                    ×
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {todos.length > 0 && (
                    <div className="todo-footer">
                        <div className="todo-stats">
                            <span>{activeCount} active</span>
                            <span>{completedCount} completed</span>
                        </div>
                        {completedCount > 0 && (
                            <button onClick={clearCompleted} className="clear-button">
                                Clear completed
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default App 