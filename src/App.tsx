import React from 'react';
import './App.css';
import Home from './components/Home';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import CarModels from './components/CarModels';
import CarModelDetail from './components/CarModelDetail';
import CarOrderConfiguration from './components/CarOrderConfiguration';
import Orders from './components/Orders';
import ErrorHandler from './components/ErrorHandler';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch> 
            <Route path="/" exact component={Home}/>
            <Route path="/models" exact component={CarModels}/>
            <Route path="/models/:modelName/configure" component={CarOrderConfiguration}/>
            <Route path="/models/:modelName" component={CarModelDetail}/>
            <Route path="/orders" component={Orders}/>
            <Route path="*"><ErrorHandler message="Page not found"/></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;