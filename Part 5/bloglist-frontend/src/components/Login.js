import React from 'react'

const Login = ( { handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>login</h2>
    <form onSubmit={handleLogin}>
      <div>
              username
        <input
          id='username'
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
              password
        <input
          id='password'
          type='text'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button'>login</button>
    </form>
  </div>
)

export default Login