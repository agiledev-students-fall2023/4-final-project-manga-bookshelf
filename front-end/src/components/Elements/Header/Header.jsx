import React from 'react'
import "./Header"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}


function Header() {
  return (

    <>
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/about">About</Link>
                      </li>
                      <li>
                          <Link to="/users">Users</Link>
                      </li>
                  </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Routes>
                    <Route path="/about">
                        About component
                    </Route>
                    <Route path="/users">
                        User component
                    </Route>
                    <Route path="/">
                        Home component
                    </Route>
                </Routes>
          </div>
      </Router>
    
    </>
  )
}

export default Header