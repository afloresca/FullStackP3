/**
 * Componente dedicado princiaplmente a la manipulación de los datos del modal que se muestra
 * al pulsar el botón "+ Añadir Semana". Creación de nuevas tarjetas de semana y su eliminación.
 * Validación de los datos del formulario del modal, tratamiento de los mismos para incrustarlos
 * en el HTML de las tarjetas.
 */

// Identificamos el botón "Añadir".
const btnAddWeek = document.getElementById("btnAddWeek");

// Identificamos el modal.
const modal = document.getElementById("addWeekModal");


// Recogemos todos los datos que añadimos en el modal.
let modNombre = document.getElementById("nombre-semana");
let modDesc = document.getElementById("descripcion");
let modColor = document.getElementById("cardcolor");
let modYear = document.getElementById("year");
let modNumSemana = document.getElementById("numSemana");


// Recogemos los datos relativos al modal de confirmación
let deleteModal = document.getElementById('deleteModal');
let deleteBtn = document.getElementById("deleteBtn");
let confirmModal = document.getElementById("confirm-modal");
let confirmTrueBtn = document.getElementById("confirm-yes");
let confirmFalseBtn = document.getElementById("confirm-no");
let closeDeleteButton = document.getElementById('btnCloseDeleteModal')
let closeButton = document.getElementById('btnCloseWeekModal');

// Funcion que abre el modal tras tocar el botón de añadir semana
 function addWeekModal() {
    document.getElementById("vacaciones").checked = false;
    modal.showModal();
 
 }
// Función que cierra los modales al pulsar el botón de cerrar
 closeButton.addEventListener('click', function(){
    closeButton.parentNode.parentNode.parentNode.close();
 })

 //Evento que cuando clickas en el boton añadir valida los campos del modal y añade la semana si son correctos
 btnAddWeek.addEventListener('click', function (){
  // Validacion de campos obligatorios
  if (
    modNombre.value === "" ||
    modYear.value === "" 
  ) {
    alert("Debes rellenar todos los campos obligarorios");
    return false;
  } else if (
    modYear.value < "1990"  ||
    modYear.value > "2099" 
  ) {
    alert("Los años deben ser entre 1990 y 2099");
    return false;    
  } else if (
    checkYearWeekNumber(modYear.value, modNumSemana.value) 
  ) {
    alert("Número semana no válido");
    return false;
  } 
  
  else {

    //creamos la nueva card de semanal
    let modVacaciones = "N";
    if (document.getElementById("vacaciones").checked) modVacaciones = "S";
    //creamos la card en mongo y la cargamos en tablero
    cardCreated = createCardWeeks(modColor.value, modDesc.value, modNombre.value, modNumSemana.value, modVacaciones, modYear.value);

    // Limpiamos los valores del formulario

    modNombre.value = "";
    modDesc.value = "";
    modVacaciones = "N";    
    modColor.value = DEFAULT_COLOR; 
    modal.close();
  }
}
);


/**
 * Funcion que abre el modal de confirmación de eliminar
 * y si se confirma se E L I M I N A
 * @param {*} id 
 */

function deleteCardById(id, card){
  deleteModal.showModal();
  deleteBtn.addEventListener('click', function(){
      deleteCardWeeks(id, card.cardId);  
      deleteModal.close();
  })
  closeDeleteButton.addEventListener('click', function(){
      deleteModal.close();
  })
}

function weekRemove(id){
  const week= document.getElementById(id);
  week.remove();
}



