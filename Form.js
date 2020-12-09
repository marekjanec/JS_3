import React from 'react';
import ReactDOM from 'react-dom';
import ThanksPage from './ThanksPage';
import {Route, BrowserRouter as Router, Link} from 'react-router-dom';

var redirectToReferrer = false;

export default class Form extends React.Component {
    

    constructor(props){
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleSubmit(event){ 
     event.preventDefault();
     
     fetch('http://localhost:8080/addCostumer', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "name": this.name.value,
       "address": this.address.value,
       "city": this.city.value,
       "zip": this.zip.value
      })
     }).then(() => {
      this.props.history.push('/thanks')
    }).catch((error) => {
      console.log(error)
    });
    };
   
    render () {
      return (
        <Router>
          <div id="signup">
            <form onSubmit={this.handleSubmit}>
                <div>
                  <input ref={(ref) => {this.name = ref}} placeholder="name" type="text" name="name"/><br />
                  <input ref={(ref) => {this.address = ref}} placeholder="address" type="text" name="address"/><br />
                  <input ref={(ref) => {this.city = ref}} placeholder="city" type="text" name="city"/><br />
                  <input ref={(ref) => {this.zip = ref}} placeholder="zip" type="text" name="zip"/><br />
                </div>
                <div>
                  <button type="Submit">Objednat</button>
                </div> 
                <button>
                  <Link to='/thanks'> Thanks page </Link>
                </button>  
            </form>
            <Route path="/thanks" exact component={ThanksPage}/>
          </div>
        </Router>
    )};
}

ReactDOM.render(
    <React.StrictMode>
      <Form />
    </React.StrictMode>,
    document.getElementById('root')
);