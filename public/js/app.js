/**
 * JS funciones generales de control del FrontEnd
 */

// Inicializamos el constructor para poder enviar señales
// del cliente al servidor y viceversa.
const socket = io();
const SERVER_URL = "https://xkh61w-3000.csb.app/";
const GRAPHQL_URL = SERVER_URL + "graphql";

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

  function upload(taskId, files) {
   // console.log(files[0].name);
    socket.emit("upload",  {"bytes":files[0], "filename":files[0].name, "folder":taskId}, (status) => {
      console.log("status: " + status.message);
      if (status.message==="success"){
        console.log(status.message + ": " + status.filename)
        let fileDate = new Date(files[0].lastModified).toLocaleString();;
        //envia la actualización al graphql
        updateFileTask(taskId,  status.filepath, status.filename, fileDate);
        
      }
      else {
        alert("ERROR EN CARGA DE ARCHIVO: " + status.message);        
      }

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