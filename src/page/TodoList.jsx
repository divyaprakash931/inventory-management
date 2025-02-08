import React, { useState, useEffect } from 'react';

// Function to get the number of days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const TodoList = () => {
  const today = new Date();
  const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
  
  // Initialize todos based on the number of days in the current month
  const initialTodos = Array.from({ length: daysInMonth }, () => []);

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (day) => {
    const todo = prompt(`Add a todo for Day ${day + 1}`);
    if (todo) {
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos[day] = [...newTodos[day], { text: todo, completed: false }];
        return newTodos;
      });
    }
  };

  const toggleTodo = (day, index) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos[day] = newTodos[day].map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      );
      return newTodos;
    });
  };

  const clearCompleted = (day) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos[day] = newTodos[day].filter(todo => !todo.completed);
      return newTodos;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((dayTodos, day) => (
        <Day 
          key={day} 
          day={day} 
          todos={dayTodos} 
          addTodo={addTodo} 
          toggleTodo={toggleTodo} 
          clearCompleted={clearCompleted} 
          currentDate={today} 
        />
      ))}
    </div>
  );
};

const Day = ({ day, todos, addTodo, toggleTodo, clearCompleted, currentDate }) => {
  const todoDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day + 1); // Day is zero-based

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Day {day + 1}</h2>
      <button 
        onClick={() => addTodo(day)} 
        className="bg-blue-500 text-white px-2 py-1 rounded mb-2"
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo, index) => {
          const isBeforeToday = todoDate < currentDate && !todo.completed;
          return (
            <li key={index} className={`flex items-center ${isBeforeToday ? 'bg-yellow-200' : ''}`}>
              <input 
                type="checkbox" 
                checked={todo.completed} 
                onChange={() => toggleTodo(day, index)} 
                className="mr-2" 
              />
              <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
            </li>
          );
        })}
      </ul>
      <button 
        onClick={() => clearCompleted(day)} 
        className="text-red-500 mt-2"
      >
        Clear Completed
      </button>
    </div>
  );
};

export default TodoList;
