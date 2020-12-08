import React from 'react';
import MainPage from './components/MainPage';
import Cart from './components/Cart';
import Admin from './components/Admin'
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

class App extends React.Component{
  render (){
    return (
      <Router>
        <div>
          <button>
            <Link to='/' type='button'> Home </Link>
          </button>
          <button>
            <Link to='/cart'> Cart </Link>
          </button>
          <button>
            <Link to='/admin'> Dont click if you are not admin </Link>
          </button>
        </div>
        <Route path="/" exact component={MainPage}/>
        <Route path="/cart" exact component={Cart}/>
        <Route path="/admin" exact component={Admin}/>
      </Router>
    )
  }
}
export default App;
