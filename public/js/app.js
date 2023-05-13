/**
 * JS funciones generales de control del FrontEnd
 */

// Inicializamos el constructor para poder enviar señales
// del cliente al servidor y viceversa.
const socket = io();

const GRAPHQL_URL = "http://localhost:3000/graphql"

// Paleta de colores
const DEFAULT_COLOR = "#edede9"; 
const DEFAULT_TASK_COLOR = "#eab676"
const WHT_COLOR = "#FAFAFA";
 

  /**
   * pone el título en el navbar
   */

  function loadNavBar(t){
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = t;
  }

  /**
   *  Container donde se irán almacenando las tarjetas que se generen mediante el formulario
   */

  function loadDivCardWeeks(){
    let container = document.getElementById("container");
    container.innerHTML=`<button class="btn btn-primary mt-4 ml-5 mb-5 d-flex justify-content-center align-items-center" onclick="addWeekModal()">+ Añadir Semana</button>
    <div class="row" id="weekContainer">
    </div>`;
  }

  function upload(files) {
    console.log(files);
    socket.emit("upload", {"bytes":files[0], "filename":files[0].name}, (status) => {
      console.log("status: " + status);
    });
  }
  
  function loadMain(){
      loadNavBar("TARJETAS SEMANALES");
      loadDivCardWeeks();
      modalDialogCard();
      modalAddTask();
      modalDeleteTask();
      modalUploadFile();
      fetchWeeks();
  }


//carga las semanas.
document.onload = loadMain();