import React, { useState } from 'react';
import './task.css'

function TaskMonitor() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Grab some Pizza', completed: false },
    { id: 2, title: 'Do your workout', completed: false },
    { id: 3, title: 'Hangout with friends', completed: true },
    { id: 4, title: 'Talk to Jeremy', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const handleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, completed:!task.completed };
        }
        return task;
      })
    );
  };

  const handleTaskDeletion = (taskId) => {
      setTasks(tasks.filter((task) => task.id!== taskId));
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmission = (event) => {
    event.preventDefault();
    if (newTask.trim()!== '') {
      setTasks([
   ...tasks,
        { id: tasks.length + 1, title: newTask, completed: false },
      ]);
      setNewTask('');
    }
    else{
      setTasks([
        ...tasks,
             { id: tasks.length + 1, title: "OK", completed: false },
           ]);
           setNewTask('');
    }
  };

  const uncompletedTasksCount = tasks.filter((task) =>!task.completed).length;

  const check = (taskID) =>{
    if (tasks[taskID-1].completed === true){
      handleTaskDeletion(taskID)
    }
    else{
      return ''
    }
  }

  return (
    <div className="task-monitor">
      <h1>Pending tasks: ({uncompletedTasksCount})</h1>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span className={task.completed? 'completed' : ''}>{task.title}</span>
            <span className='if'></span>
            <button className="button complete" onClick={() => handleTaskCompletion(task.id)}>{task.completed? 'Uncomplete' : 'Complete'}</button>
            <button className="button cancel" onClick={() =>  check(task.id)}><img src="cancel.png" alt="Cancel" /></button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleNewTaskSubmission}>
        <input className='ip'
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Hello"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleNewTaskSubmission(event);
            }
          }}
        />
      </form>
    </div>
  );
}

export default TaskMonitor;