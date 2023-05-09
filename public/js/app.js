/**
 * JS funciones generales de control del FrontEnd
 */


const GRAPHQL_URL = "http://localhost:3000/graphql"

// Paleta de colores
const DEFAULT_COLOR = "#edede9"; 
const DEFAULT_TASK_COLOR = "#eab676"
const WHT_COLOR = "#FAFAFA";
 
const socket = io();

  /**
   * pone el título en el navbar
   */

  function loadNavBar(t){
    let titulo = document.getElementById("titulo");
    titulo.innerHTML = t;
  }

  /**
   *  Container donde se irán almacenando las tarjetas que se generen mediante el formulario, como en el enunciado
   *  se solicita explicitamente que se muestren algunos datos introducidos a mano, añadiremos tres tarjetas estáticas
   *  que estarán aquí siempre que refresques la página (aún y si las eliminas).
   */

  function loadDivCardWeeks(){
    let container = document.getElementById("container");
    container.innerHTML=`<button class="btn btn-primary mt-4 ml-5 mb-5 d-flex justify-content-center align-items-center" onclick="addWeekModal()">+ Añadir Semana</button>
    <div class="row" id="weekContainer">
    </div>`;
  }


  function loadMain(){
      loadNavBar("TARJETAS SEMANALES");
      loadDivCardWeeks();
      modalDialogCard();
      modalAddTask();
      modalDeleteTask();
      fetchWeeks();
      // Inicializamos socket io en la app
      io();
  }


//carga las semanas.
document.onload = loadMain();