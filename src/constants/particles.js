export const particleOptions = {
    "particles":{
       "number":{
          "value":80,
          "density":{
             "enable":true,
             "value_area":800
          }
       },
       "color":{
          "value":"#ffffff"
       },
       "line_linked":{
          "enable":true,
          "distance":150,
          "color":"#ffffff",
          "opacity":0.4,
          "width":1
       }
    },
    "interactivity":{
       "detect_on":"window",
       "events":{
          "onhover":{
             "enable":true,
             "mode":"repulse"
          },
          "onclick":{
             "enable":true,
             "mode":"push"
          },
          "resize":true
       },
       "modes":{
          "repulse":{
             "distance":200,
             "duration":0.4
          },
          "push":{
             "particles_nb":4
          }
       }
    },
    "retina_detect":true
  };

  // All propertys url https://codepen.io/pen/?&editable=true=https%3A%2F%2Fvincentgarreau.com%2Fparticles.js%2F