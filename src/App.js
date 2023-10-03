import React, {useState, useCallback} from 'react';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import './App.css';
import 'tachyons';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
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

const App = () => {
  const [faceState, setFaceState] = useState({
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
  });

  const loadUser = (data) =>{
    setFaceState({...faceState, user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joinen
    }})
  }

  const calculateFaceLocation = (data) => {
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
 
  const displayFaceBox = (facesBoxes) => {
    setFaceState({...faceState, facesBoxes: facesBoxes});
  }

  const onInputChange = (event) => {
    setFaceState({...faceState,input:event.target.value});
  }
  const onHelpClicked = () =>{
    document.getElementById("help").style.display="block";
    document.getElementById("showHelp").style.display="none";
  }

  const onImageSubmit = () => {
    document.getElementById("help").style.display="none";
    document.getElementById("showHelp").style.display="block";
    setFaceState({...faceState,
      imageURL : faceState.input
    });
    fetch(urlapi+"/imageurl",{
      method: "post",
      headers: {"Content-Type":'application/json'},
      body: JSON.stringify({
        input:faceState.input
      })
    })
      .then(response=>response.json())
      .then(
        (response) => {

          if(response){
            console.log(response,'response')
            fetch(urlapi+"/image",{
              method: "put",
              headers: {"Content-Type":'application/json'},
              body: JSON.stringify({
                id:faceState.user.id
              })
            })
            .then(data=>data.json())
            .then(count=>setFaceState({...faceState, user: {...faceState.user, entries:count}}))
            .catch(err=>console.log("Ocurrio un error guardando los entries en el api local." + err))
          }else{
            console.log("not response")
          }

          displayFaceBox(calculateFaceLocation(response))
        }
      )
      .catch((error)=>console.log(error))
  }
  const onRouteChange = (route) => {
    if(route==='signout'){
      setFaceState(initialState)
      route='signin';
    }else if(route==='home')
    setFaceState({...faceState,isSignedin:true})

    setFaceState({...faceState,route:route});
  }

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const { isSignedin, imageURL, facesBoxes, route, user } = faceState;

  return (
    <div className="App">
    <Particles id="tsparticles" init={particlesInit} options={particleOptions} className="particle"/>
    <Navigation  onRouteChange={onRouteChange} isSignedin={isSignedin} Route={faceState.route} />
      { 
        route === 'home'?
        <div>
            <Logo />
            <Rank user = {user}/>
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onImageSubmit} onHelpClicked={onHelpClicked} />
            <FaceRecognition boxes={facesBoxes} imageURL={imageURL} />
        </div>
        :(route==='signin'?
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} urlApi={urlapi}/>
          :
          <Register onRouteChange={onRouteChange} loadUser={loadUser} urlApi={urlapi}/>
        )           
      }
    </div>
  );
    
}

export default App;
