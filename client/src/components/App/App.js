import "./App.scss";
import {useReducer} from 'react'
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "../Login/Registration";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import cafeContext from "../../utils/contexts/cafeContext";
import reducer from '../../utils/reducer/reducer'
import About from '../About/About'

function App() {
  const[state,dispatch] = useReducer(reducer, {list:[], about:[]})
  // console.log('cafe',state);
  return (
    <BrowserRouter>
      <Navbar />
      <cafeContext.Provider value={{state,dispatch}}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/about/:id">
            <About />
          </Route>
        </Switch>
      </cafeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
