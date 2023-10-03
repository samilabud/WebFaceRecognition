import React, { Component } from 'react';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }
    onNameChange = (event) =>{
        this.setState({registerName:event.target.value});
    }
    onEmailChange = (event) =>{
        this.setState({registerEmail:event.target.value});
    }
    onPasswordChange = (event) =>{
        this.setState({registerPassword:event.target.value});
    }
    onSubmitRegister = (event)=>{
        event.preventDefault();
        fetch(this.props.urlApi+"/register",{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name:this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
        .then(data=>data.json())
        .then(user=>{
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }else{
                alert("No te pudiste registrar");
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
                <legend className="f4 fw6 ph0 mh0">Formulario de Registro</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="name">Nombre</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="text" name="name"  id="name"
                    onChange={this.onNameChange} />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Correo</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" 
                    name="email-address"  id="email-address" 
                    onChange={this.onEmailChange}
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" 
                    name="password"  id="password" 
                    onChange={this.onPasswordChange}
                    />
                </div>
                </fieldset>
                <div>
                <input
                    onClick={this.onSubmitRegister}
                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Registrarse" />
    
                </div>
                <div className="lh-copy mt3">
                    <p> Tienes una cuenta?
                        <a onClick={()=>onRouteChange('signin')} href="#0" className="f6 link dim black db pointer">Ingresar</a>
                    </p>
                </div>
                
                </form>
            </main>
            </article>
        )
    }
    
}

export default Register;