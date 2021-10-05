import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { BASE_URL } from "assets/data/consts";
import { TokenContext } from "providers/TokenProvider";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "providers/UserProvider";

const URL = `${BASE_URL}/Authorization/SignIn`;

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [redirect, setRedirect] = useState(null);

  const { setToken } = useContext(TokenContext);
  const { setIsRegistered } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username: usernameValue, password: passwordValue };

    setUsernameValue("");
    setPasswordValue("");

    const requestBody = {
      Username: data.username,
      Password: data.password,
      Device: {
        Name: "7a6a86e5-356f-4795-8998-305e1b205531",
        PlatformCode: "WEB",
      },
    };

    axios
      .post(URL, { requestBody })
      .then(
        ({
          data: {
            AuthorizationToken: { Token },
          },
        }) => {
          setToken(Token);
          setIsRegistered(true);
          setRedirect(true);
        }
      )
      .catch((e) => console.log(e));
  };

  if (redirect) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div>
        <div>
          <h2>Registered users</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
            />
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
            />

            <button>Log in</button>
          </form>
        </div>
        <Link to="/splash">Log In as Guest</Link>
      </div>
    );
  }
};

export default Login;
