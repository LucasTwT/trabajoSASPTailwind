module.exports = {
  darkmode: 'class',
    content: [
      "./proyectoFlask/templates/**/*.html", // Ajusta según tu estructura
      "./proyectoFlask/static/**/*.js"
    ],
    theme: {
      extend: {
        colors: {
          "rosa-persian":'#F283B6',
          "azul-antiguo":'#6E9887',
        },
        spacing:{
          '42': '170px'
        },
        screens :{
            'tablet': '900px'
          }
      }
    },
    plugins: []
}