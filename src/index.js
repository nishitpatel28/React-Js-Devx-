import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router,hashHistory, Route,Redirect} from 'react-router';
import './index.css';

const uemail = "sample@test.com";
const pass = "test";

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password :'',
            errors:{}
        };
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
         }

         
        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        }  

        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
         }


        

         this.setState({errors: errors});
       return formIsValid;
        //return this.state.email.length > 0 && this.state.password.length > 0;
      }
    

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
     }
    
    
    
      handleSubmit(event) {      
              event.preventDefault();
              if(this.validateForm()){
                  if(this.state.email===uemail && this.state.password===pass)
                        hashHistory.push('/dashboard');
                else{alert("User not Registered");}
             }
      }
      //hashHistory.push('/dashboard');
      render()
      {
        return(
            <div className="login-group">
            <div className="form">
            <form className='login-form' onSubmit={this.handleSubmit.bind(this)}>
                
                <div id='email' >
                
                    <input type='email' name='email' Placeholder='Email' value={this.state.email} onChange={this.handleChange.bind(this)}/>
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                </div>
                <div id='password'>
               
                   
                    <input type='password' name='password' Placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this)}/>
                    <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                
                </div >
                <div className='input'>
                <input type='submit' value='Submit' className='btn'  onClick={this.handleSubmit.bind(this)}/>
                </div>
            </form>
            </div>
            </div>
        )
      };
}




class Dashboard extends React.Component{
    
    handleSubmit(event){
        event.preventDefault();
        hashHistory.push('/');
    }
    
    render(){
        return(
            <div className='login-group'>
            <div className='form'>
                <center><h1>Welcome to Dashboard</h1></center>
                <button className="dashbtn"  onClick={this.handleSubmit.bind(this)}>Logout</button>
            </div></div>
        )
    };
}

ReactDOM.render(
    <Router history={hashHistory}><div>
        <Route path='/' component={LoginForm} />
        <Route path='/dashboard' component={Dashboard} /></div>
      </Router>,
    document.getElementById('root')
);

//ReactDOM.render(<LoginForm/>,document.getElementById('root'));


