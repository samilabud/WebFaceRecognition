import React, { Component } from 'react';

class Signin extends Component {
    constructor(){
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) =>{
        this.setState({signInEmail:event.target.value})
    }
    onPasswordChange = (event) =>{
        this.setState({signInPassword:event.target.value})
    }
    onSubmitSignIn = () =>{
        fetch(this.props.urlApi+"/signin",{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(data=>data.json())
        .then(userData=>{
            console.log(userData);
            if(userData.id){
                this.props.loadUser(userData);
                this.props.onRouteChange('home');
            }else{
                alert(userData);
            }
        })

        
    }
    render(){
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Formulario de Ingreso</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Correo</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" name="email-address"  id="email-address" 
                        onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" name="password"  id="password" 
                        onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div>
                <input
                    onClick={this.onSubmitSignIn}
                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Entrar" />
    
                </div>
                <div className="lh-copy mt3">
                <a onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Registrarse</a>
                </div>
                
                </form>
            </main>
            </article>
        )
    }
    
}

export default Signin;