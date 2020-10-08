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
import {enviroments} from './constants/config';


let urlapi = "";
if(process.env.NODE_ENV.indexOf("development")>=0){
  urlapi = enviroments.development.urlapi;
}else{
  urlapi = enviroments.production.urlapi;
}

const initialState = {
  input:'',
  imageURL:'',
  facesBoxes: [],
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
      facesBoxes: [],
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
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    //Almacenando todas las cajas
    let facesBoxes = [];
    for(let region of data['outputs'][0]['data'].regions) {
      facesBoxes.push(region.region_info.bounding_box)
    }
    //Retornando todas las cajas
    let results = [];
    for(let boxFace of facesBoxes) {
      results.push({
        leftCol: boxFace.left_col * width,
        topRow: boxFace.top_row * height,
        rightCol: width - (boxFace.right_col * width),
        bottomCol: height - (boxFace.bottom_row * height)
      })
    }

    return results;

  }
 
  displayFaceBox = (facesBoxes) => {
    this.setState({facesBoxes:facesBoxes});
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }
  onHelpClicked = () =>{
    document.getElementById("help").style.display="block";
    document.getElementById("showHelp").style.display="none";
  }

  onImageSubmit = () => {
    document.getElementById("help").style.display="none";
    document.getElementById("showHelp").style.display="block";
    this.setState ({
      imageURL : this.state.input
    });
    fetch(urlapi+"/imageurl",{
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
            fetch(urlapi+"/image",{
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
        const { isSignedin, imageURL, facesBoxes, route, user } = this.state;
        return (
          <div className="App">
          <Particles params={ particleOptions} className="particle"/>
          <Navigation  onRouteChange={this.onRouteChange} isSignedin={isSignedin} Route={this.state.route} />
            { 
              route === 'home'?
              <div>
                  
                  <Logo />
                  <Rank user = {user}/>
                  <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onImageSubmit} onHelpClicked={this.onHelpClicked} />
                  <FaceRecognition boxes={facesBoxes} imageURL={imageURL} />
              </div>
              :(route==='signin'?
                <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} urlApi={urlapi}/>
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} urlApi={urlapi}/>
              )           
            }
          </div>
        );
    }
}

export default App;
