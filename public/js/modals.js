/**
 * JS de Carga y destrucción de modales
 */


/**
 * Carga los modales en el html de pagina Inicio
 */
function modalDialogCard(){
    modalAddWeek();
    modalDeleteCard()
}

function modalDialogTasks(){
  modalAddTask();
}


/**
 * Crea Modal y asigna id
 * @param {id del Element} id 
 * @returns 
 */
function createDialog(id){
  dialog = document.createElement("dialog");
  dialog.classList.add("col-sm-4");
  dialog.setAttribute("id", id);
  dialog.setAttribute("style", "border: 1px solid black; border-radius: 18px;");
  return dialog;
}


/**
 * Div para Avisos
 * @returns div Element
 */
function createDivWarning(){
    div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("flex-column");
    div.classList.add("p-3");
    div.classList.add("text-center");   
    div.classList.add("row-gap-2");
    div.classList.add("justify-content-center");
    return div;
}



/**
 * Div para Form
 * @returns div Element
 */
function createDivForm(){
  div = document.createElement("div");
  div.classList.add("d-flex");
  div.classList.add("flex-column");
  div.classList.add("p-3");
  div.classList.add("row-gap-3");
  div.classList.add("justify-content-center");
  return div;
}


/**
 * AddWeek Modal Form
 */
function modalAddWeek(){
    body = document.body; 
    dialog = createDialog("addWeekModal");
    div = createDivForm();
    div.innerHTML = modalAddWeekHtml();
    dialog.appendChild(div);
    body.appendChild(dialog);
}

/**
 * Modal de Insertar nueva semana
 * @returns html
 */

function modalAddWeekHtml(){
    html = `<h4 class="modal-title" id="myModalLabel">Formulario de registro de semana</h4>
    <form id="newWeekForm" class="d-flex flex-column row-gap-1">
      <div class="form-group">
        <label for="nombre-semana" class="col-form-label"><strong style="color: red;">*</strong> Nombre semana:</label>
        <input type="text" class="form-control" id="nombre-semana" required>
      </div>
      <div class="form-group">
        <label for="descripcion" class="col-form-label">Descripción:</label>
        <textarea class="form-control" id="descripcion"></textarea>
      </div>
      <div class="form-group">
        <label for="color" class="col-form-label"><strong style="color: red;">*</strong>Seleciona Color</span>
        <input type="color" class="form-select border border-1"  id="cardcolor" value = "#edede9" required> 
      </div>
      <div class="form-group">
        <div class="col-sm-10">
        <label for="vacaciones" class="col-form-label">Semana de Vacaciones</label>
          <input type="checkbox" id="vacaciones" name="vacaciones" value="N">
        </div
        <label for="numSemana" class="col-form-label"><strong style="color: red;">*</strong>Número Semana</label>
        <input type="numSemana" id="numSemana" min="1" max="${new Date().getMaxWeeksPerYear()}" step="1" value="${new Date().getWeekNumber()}" class="form-control" id="numSem-add">
        <label for="year" class="col-form-label"><strong style="color: red;">*</strong>Año</label>
        <input type="year" id="year" min="1900" max="2099" step="1" value="${new Date().getFullYear()}" class="form-control" id="año-add">
      </div>
    </form>
    <div class="modal-footer pt-2 d-flex gap-2">
      <button type="button" class="btn btn-secondary" id="btnCloseWeekModal">Cerrar</button>
      <button type="button" class="btn btn-primary"  id="btnAddWeek">Añadir</button>
    </div>
    `
    return html;
}


/**
 * Delete Confirmation Modal
 */
function modalDeleteCard(){
    body = document.body; 
    dialog = createDialog("deleteModal");
    div = createDivWarning();
    div.innerHTML = modalDeleteCardHtml();
    dialog.appendChild(div);
    body.appendChild(dialog);
}
/**
 * html del modal de confirmación tarjeta semana
 * @returns html
 */
function modalDeleteCardHtml(){
    html = `<h4>¿Estás seguro que deseas eliminar esta semana?</h4>
    <div class="d-flex flex-row column-gap-1 justify-content-center">
    <button type="button" class="btn btn-secondary" id="btnCloseDeleteModal">Cerrar</button>
    <button type="button" class="btn btn-danger"  id="deleteBtn">Eliminar</button>
    </div>
    `
    return html;
}


//Tasks Weeks MODAL (inteface 3)


/**
 * AddTarea Modal Form
 */
function modalAddTask(){    
  body = document.body; 
  dialog = createDialog("addTarea");
  div =  createDivForm();
  div.innerHTML = modalAddTaskHtml();
  dialog.appendChild(div);
  body.appendChild(dialog);
}

/**
 * Html del modal para actualizar/insertar tarea
 * @returns html text
 */
function modalAddTaskHtml(){
    html = `<h4 class="modal-title" id="accionTitulo" >INSERTAR / ACTUALIZAR TAREAS</h4>
    <input="hidden" id="accionT" value="add">
    <input="hidden" id="modIdTask" value="">
    <form id="addTareaForm" class="d-flex flex-column row-gap-1">
      <div class="form-group">
        <label for="nombre-tarea" class="col-form-label"><strong style="color: red;">*</strong>Nombre tarea :</label>
        <input type="text" class="form-control" id="nombre-tarea" required>
      </div>
      <div class="form-group">
        <label for="taskdesc" class="col-form-label"><strong style="color: red;">*</strong>Descripción:</label>
        <input type="text" class="form-control" id="taskdesc" required>
      </div>
      <div class="form-group">
        <label for="taskcolor" class="col-form-label"><strong style="color: red;">*</strong>Seleciona Color</span>
        <input type="color" class="form-select border border-1"  id="taskcolor" value = "${DEFAULT_TASK_COLOR}" required> 
      </div>
      <div class="form-group">
        <div class="col-sm-10">
        <label for="modCompletada" class="col-form-label">Tarea Completada</label>
          <input type="checkbox" id="modCompletada" name="completada">
        </div
        <label for="modHoraI" class="col-form-label"><strong style="color: red;">*</strong>Hora Inicio</label>
        <input type="text" id="modHoraI" min="0" max="24" value="0" class="form-control">
        <label for="modHoraF" class="col-form-label"><strong style="color: red;">*</strong>Hora Final</label>
        <input type="text" id="modHoraF" min="0" max="24" value="0" class="form-control">
      </div>      

    </form>
    <div class="modal-footer pt-2 d-flex gap-2">
      <button type="button" class="btn btn-secondary" id="btnCloseAddTarea">Cerrar</button>
      <button type="button" class="btn btn-primary"  id="btnAddTarea">Grabar</button>
    </div>
    `
    return html;
}

function modalDeleteTask(){
  body = document.body; 
  dialog = createDialog("deleteTarea");
  div = createDivWarning();
  div.innerHTML = modalDeleteTaskHtml();
  dialog.appendChild(div);
  body.appendChild(dialog);
}

function modalDeleteTaskHtml(){
  html = `
    <h4>¿Estás seguro que deseas eliminar esta tarea?</h4>
    <div class="d-flex flex-row column-gap-1 justify-content-center">
          <button type="button" class="btn btn-secondary" id="btnCloseDelTarea">Cerrar</button>
          <button type="button" class="btn btn-danger"  id="btnEliminarTarea">Eliminar</button>
    </div>
  `;
  return html;
}