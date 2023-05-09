
    /**
     * JS con funciones para crear las tareas de la semana
     */

    // variables de las tareas
    let  idT = "";
    let  idCardTask = "";
    let  nombreT = "";
    let  colorT = "";
    let  descripcionT = "";
    let  dia = "";
    let completada=false;
    let horaI=""; 
    let horaF=""
    let plan; //datos de la card
    let numTareas = 0;

    /**
     * constructor de tarea a partir de un json dado
     * @param {*} task 
     */

    function tasks(task) {
        this.idT = task.taskId;
        this.idCardTask = task.cardId;
        this.nombreT = task.nombre;
        this.colorT = task.color;
        this.descripcionT = task.descripcion;
        this.dia = task.dia;
        this.completada = task.completada;
        this.horaF = task.horaF;
        this.horaI = task.horaI;
        this.taskParms = JSON.stringify(task).replaceAll('"', "'");         
    }
    
    function clearTasks(){
      tasks({"taskId":"", "cardId": "", "nombre": "", "descripcion": "", "color": "", "dia": "", "completada": false, "horaI": "", "horaF": ""});
    }
    function setTask(idT, idCardTask, nombreT, descripcionT, colorT, dia, completada, horaI, horaF){
      tasks({"taskId":idT, "cardId": idCardTask, "nombre": nombreT, "descripcion": descripcionT, "color": colorT, "dia": dia, "completada": completada, "horaI":  horaI, "horaF":horaF});
    }


    function generateTask(){
      if (this.dia === "") createUnaTask();
      else createAssignedTask();
    }


    /**
     * Puts an unassigned task into unassigned task div
     */

    function createUnaTask(){
        let unaTaskContainer = document.getElementById("unaTasks");
        unaTaskContainer.appendChild(createTask());
    }

    /**
     * Coloca cada tarea en su area de tarea por dia id = "{nombrededia}"
     */
    function createAssignedTask(){
        let taskContainer = document.getElementById(this.dia);
        taskContainer.appendChild(createTask());    
    }

    function getTaskDivId(){
        return this.idT;
    }

    /**
     * crea un elemento tarea
     * @returns task element
     */
    function createTask(){
        let task = document.createElement("div");
        task.setAttribute("id", this.getTaskDivId());
        task.setAttribute("draggable","true"); 
        task.setAttribute("style", "border: 1px solid DEE2E6;  border-radius: 18px; background-color:" + this.colorT);
        task.innerHTML = getTaskHtml();

        task.addEventListener("dragstart", (ev) => {
          ev.target.classList.add("dragging"); //que e haga semitransparente
          ev.dataTransfer.setData("text", ev.target.id); //para recuperar el id del div de la tarea
          });

        task.addEventListener("dragend", (event) => {
             event.target.classList.remove("dragging"); //que vuelva a ser normal y que pasen cosas
        });
        return task
    }

    function getTaskHtml(){
      let html= `<h5 class="p-2">${this.nombreT}</h5>  
      <input type="hidden" id="colorTarea" class="colorTarea" value="${this.colorT}">
      <input type="hidden" id="diaTarea" class="diaTarea" value="${this.dia}"> 
      <input type="hidden" id="nombreT" class="nombreT" value="${this.nombreT}">  
      <input type="hidden" id="idCardTask" class="idCardTask" value="${this.idCardTask}"> 
      <input type="hidden" id="descTarea" class="descTarea" value="${this.descripcionT}">  
      <input type="hidden" id="idT" class="idT" value="${this.idT}">      
      <input type="hidden" id="completada" class="completada" value="${this.completada}">   
      <input type="hidden" id="horaI" class="horaI" value="${this.horaI}"> 
      <input type="hidden" id="horaF" class="horaF" value="${this.horaF}">                          
       <div class="d-flex flex-row p-1 justify-content-center gap-1">
          <button class="btn btn-primary tareas-btn" onclick="updateTask(${this.taskParms})">
              Modificar
          </button>
          <button class="btn btn-danger tareas-btn" onclick="deleteTaskById('${this.getTaskDivId()}', ${this.taskParms})")>
              Eliminar
          </button>
      </div>`;
      return html;
    }
  



  /** ESTAS FUNCIONES YA NO SON NECESARIOAS
   * función que cargará las tarjetas obtenidas de la lectura de datos
   * si la tarea pertenece a la semana la carga
   * @param {*} jsonTask 
   
  function loadTasks(jsonTask){
    jsonTask.forEach(weekTask => {
      if (weekTask.idcard === plan.cardId){
        numTareas++;
        tasks(weekTask);
        generateTask();
      }    
    });
  }
*/

  /**
   * incorpora los datos, en principio de un fichero json, más tarde cambiará a backend
 
  function fetchTasks(){
    fetch('../src/data/mocktasks.json')
    .then((response) => response.json())
    .then((json) => {
      loadTasks(json);
    });
  }
*/

/**
 * Se encarga del panel de tareas y de abejas.
 * @param {*} plan
 */
  function weekTasks(p){
    clearTasks();
    plan = p; //cargamos los datos de la semana que nos ha llegado de la tarjeta
    loadDivTasksWeeks();
    createUnaTasksDiv();
    createWeekTaskDiv();
    createWeekDays();
    fetchTasks(p.cardId); //buscamos las tareas de la semana para pintarlas fecth al mongo
  }