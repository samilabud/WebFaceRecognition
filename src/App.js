import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import {particleOptions} from './constants/particles';

const initialState = {
  input:'',
  imageURL:'',
  faceBox: '',
  route: 'signin',
  isSignedin: false,
  user:{
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state ={
      input:'',
      imageURL:'',
      faceBox: '',
      route: 'signin',
      isSignedin: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
  loadUser = (data) =>{
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joinen
    }})

  }

  calculateFaceLocation = (data) => {

    let boxFace = data['outputs'][0]['data'].regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: boxFace.left_col * width,
      topRow: boxFace.top_row * height,
      rightCol: width - (boxFace.right_col * width),
      bottomCol: height - (boxFace.bottom_row * height)
    }

  }
 
  displayFaceBox = (boxFace) => {
    this.setState({faceBox:boxFace});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  onImageSubmit = () => {
    this.setState ({
      imageURL : this.state.input
    });
    fetch("http://localhost:3000/imageurl",{
      method: "post",
      headers: {"Content-Type":'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    })
      .then(response=>response.json())
      .then(
        (response) => {

          if(response){
            fetch("http://localhost:3000/image",{
              method: "put",
              headers: {"Content-Type":'application/json'},
              body: JSON.stringify({
                id:this.state.user.id
              })
            })
            .then(data=>data.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user, {entries:count}));
            })
            .catch(err=>console.log("Ocurrio un error guardando los entries en el api local." + err))
          }

          this.displayFaceBox(this.calculateFaceLocation(response))
        }
      )
      .catch((error)=>console.log(error))
  }
  onRouteChange = (route) => {

    if(route==='signout'){
      this.setState(initialState)
      route='signin';
    }else if(route==='home')
      this.setState({isSignedin:true})

    this.setState({route:route});
  }

  render(){
        const { isSignedin, imageURL, faceBox, route, user } = this.state;
        return (
          <div className="App">
          <Particles params={ particleOptions} className="particle"/>
          <Navigation  onRouteChange={this.onRouteChange} isSignedin={isSignedin} />
            { 
              route === 'home'?
              <div>
                  
                  <Logo />
                  <Rank user = {user}/>
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onImageSubmit} />
                  <FaceRecognition box={faceBox} imageURL={imageURL} />
              </div>
              :(route==='signin'?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              )           
            }
          </div>
        );
    }
}

export default App;
