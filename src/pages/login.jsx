import React, { useState } from "react";
import TaskForm from "../pages/task";
import Loader from "../components/Loader";

function Login() {
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("Click@123");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "user" && password === "Click@123") {
      setIsLoggedIn(true);
      postData();
    } else {
      setError(true);
    }
  };

  //   const handleLogout = () => {
  //     setIsLoggedIn(false);
  //   };

  const togglePassword = () => {
    setShowPass(!showPass);
  };

  if (isLoggedIn && !isLoading) {
    return <TaskForm userData={userData} />;
  }

  const postData = () => {
    const url = "https://private-39b650-scheduler34.apiary-mock.com/login";
    const data = {
      username: username,
      password: password,
    };
    setIsLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      {!isLoading ? (
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Password:
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
            />
            {password && (
              <span onClick={togglePassword}>{showPass ? "Hide" : "Show"}</span>
            )}
          </label>
          {error && (
            <p className="task-incomplete">username or password is incorrect</p>
          )}
          <button type="submit">Login</button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Login;
