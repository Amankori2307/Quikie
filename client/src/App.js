import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header';
import Navbar from './components/Navbar';
import Upload from './components/upload/Upload';
import List from './components/list/List';
import Statistics from './components/statistics/Statistics';
import './style.css'
function App() {
  // Title for header
  const [title, setTitle] = useState("Upload")

  // To decide what should be the title in header for different pages
  const headerTitle = (active) => {
    const {upload,list,statistics} = active
    if(upload)
      setTitle("Upload")
    else if(list)
      setTitle("List/Modify Files")
    else
      setTitle("Statistics")
  }
  return (
      <Router>
        <div className="App">
            <Header title={title}/>
            <div className="container">
            <Navbar headerTitle={headerTitle}/>
            <Switch>
              <Route path = "/upload" component={Upload} />
              <Route path="/list" component={List}/>
              <Route to="/statistics" component={Statistics}/>
            </Switch>
            </div>
        </div>
      </Router>
  );
}

export default App;
