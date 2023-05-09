 /**
  *  Función que igual te crea una task si hay conjunción con Saturno
  */
 function newTask(cardId, nombre,  descripcion, color, dia, completada, horaI, horaF){
  let hI = parseInt(horaI);
  let hF = parseInt(horaF);
  const query = JSON.stringify({
    query: `mutation CreateTask {
      createTask(
          taskInput: {cardId: "${cardId}", nombre: "${nombre}", descripcion: "${descripcion}", color: "${color}", dia: "${dia}", completada: ${completada}, horaI: ${hI}, horaF: ${hF}}
      ) {
          taskId
          cardId
          nombre
          descripcion
          color
          dia
          completada
          horaI
          horaF
      }
  }`
  })

    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      tasks(res.data.createTask); 
      generateTask()   ;        //creamos la nueva tarea semanal 
      return res.data.createTask;
    })
    .catch((error) => {
      console.error('Error al crear la tarea:', error);
      return {"taskId": -1};
    });
  }


/**
  *  Función que te actualiza la task pero no te la hace
  */
function editTask(taskId, cardId, nombre,  descripcion, color, dia, completada, horaI, horaF){

  let hI = parseInt(horaI);
  let hF = parseInt(horaF);

  //Query GraphQL
  const query = JSON.stringify({
    query: `mutation editTask {
      editTask(taskId: "${taskId}",
             TaskUpdate: {nombre: "${nombre}", descripcion: "${descripcion}", color: "${color}", dia: "${dia}", completada: ${completada}, horaI: ${hI}, horaF: ${hF}}
      ) 
  }`
  });
  console.log(query);
  fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      if (res.data.editTask){ //actualizamos si ha ido bien, creamos primero el objeto json con los datos
        taskj = {"taskId":taskId, "cardId": cardId, "nombre": nombre, "descripcion": descripcion, "color": color, "dia": dia, "completada": completada, "horaI": horaI, "horaF": horaF};
        tasks(taskj); 
        updateTaskDiv(taskj); //pintamos la card con los nuevos datos
      } 
      return res.data.editTask;
    })
    .catch((error) => {
      alert("Error al actualizar la tarea");
      console.error('Error al actualizar la tarea:', error);
      return false;
    });
  }

/**
  *  Función que te actualiza el dia de la tarea en el mongo
  */
function editDiaTask(taskId,  dia, plan){

  const query = JSON.stringify({
    query: `
    mutation EditDayTask {
      editDayTask(
          taskId: "${taskId}"
          TaskDiaUpdate: {dia: "${dia}"}
      )
  }`
  });
  fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      if (res.data.editDayTask){ //actualizamos si ha ido bien, creamos primero el objeto json con los datos
        updateDayTaskDiv(dia, taskId);
      } 
      return res.data.editDayTask;
    })
    .catch((error) => {
      alert("Error al actualizar el dia de la tarea");
      console.error('Error al actualizar el dia de la tarea:', error);
      weekTasks(plan); //si falla recargamos el plan
      return false;
    });
  }

   /**
  *  Función que te recupera las cards de weeks y te las pinta
  */
 function fetchTasks(cardId){
  fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        query: `{
          getTasks(cardId: "${cardId}"){
            taskId
            cardId
            nombre
            descripcion
            color
            dia
            completada
            horaI
            horaF
            }
        }`
    })
})
  .then((res) => res.json())
  .then((res) => {
    res.data.getTasks.map(task => {
      tasks(task); 
      generateTask();//pintamos las cards
    });
  })
  .catch((error) => {
    console.error('Error al obtener tarjetas:', error);
  });
}

/**
 * Función que elimina una tarea
 */

function deleteTasks(taskId, plan){
  const query = JSON.stringify({
    query: `mutation DeleteTask {
      deleteTask(taskId: "${taskId}")
  }`
  })
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
  
      body: query})
    .then((res) => res.json())
    .then((res) => {
      resp = res.data.deleteTask;
      if (resp) taskRemove(taskId);
      return resp;
    })
    .catch((error) => {
      alert("Error al eliminar la tarea")
      console.error('Error al eliminar la tarea', error);
      weekTasks(plan); //si no funciona recarga
      return false;
    });
  }