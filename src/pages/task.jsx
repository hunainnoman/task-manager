import React, { useEffect, useState } from "react";
import "../styles/task.css";
import Loader from "../components/Loader";

const TaskForm = (props) => {
  const { userData } = props;
  const [tasks, setTasks] = useState([
    {
      title: "Laundry",
      description: "T-shirts and trousers",
      completed: false,
      createdBy: "User 2",
    },
    {
      title: "Go to Gym",
      description: "Chest Workout 10:00 AM",
      completed: true,
      createdBy: "User 9",
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(false);

    setTasks([
      ...tasks,
      { title, description, completed: false, createdBy: userData.name },
    ]);
    // Clear fields
    setTitle("");
    setDescription("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleTaskStatusChange = (index, completed) => {
    // Update the status of the task at the specified index
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = completed;
    setTasks(updatedTasks);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      {userData && !isLoading ? (
        <div style={{ textAlign: "center" }}>
          {modal && <div className="overlay" />}
          <h1>{`Welcome, ${userData.name}`} </h1>

          <h2>{`${userData.groupName} Group`} </h2>

          {modal && (
            <div className="modal">
              <button className="close-button" onClick={handleModalClose}>
                X
              </button>
              <form onSubmit={handleSubmit}>
                <label>
                  Title:
                  <input
                    required={true}
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </label>
                <br />
                <label>
                  Description:
                  <input
                    required={true}
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </label>
                <br />
                <button type="submit">Add</button>
              </form>
            </div>
          )}
          <p className="time-style">{getCurrentTime()}</p>

          <button className="add-task-button" onClick={handleModalOpen}>
            Add Task
          </button>

          <div className="task-list">
            {tasks.length ? (
              tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Created by: {task.createdBy}</p>
                  <button
                    disabled={task.completed}
                    onClick={() =>
                      handleTaskStatusChange(index, !task.completed)
                    }
                  >
                    {task.completed ? (
                      <span className="task-complete">Task Completed</span>
                    ) : (
                      <span className="task-mark">Mark as done</span>
                    )}
                  </button>
                  <button onClick={() => handleDeleteTask(index)}>
                    <span className="task-incomplete">Delete</span>
                  </button>
                </div>
              ))
            ) : (
              <p>No tasks to display</p>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default TaskForm;
