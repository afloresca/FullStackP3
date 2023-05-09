const Cards = require('../controllers/cardscontroller.js');
const Tasks = require('../controllers/taskscontroller.js');
const io = require('socket.io');


module.exports = {
    Query: {
        //Queries de las Cards
        Cards(_, {ID}){
            return Cards.findCard(ID);
        },
        getCards(){
            return Cards.qryCards();
        },

        //Queries de las Tasks
        async Task(_, {ID}){
            return Tasks.findTask(ID);
        },
        async getTasks(_, {cardId}){
            return Tasks.qryTasks(cardId);
        }     
       
    },

    Mutation: {
        /**
         * Mutations de Cards
         */

        /**
         * Creamos la Card
         * @param {*} _ 
         * @param {*} param1 
         * @returns 
         */
        async createCards(_, {CardsInput: {semana, nombre, color, descripcion, year, vacaciones}}){
            // context.io.emit('createCards')
           return Cards.newCard(semana, nombre, color, descripcion, year, vacaciones);
        },

        async deleteCards(_, {cardId:id}){     
            return Cards.delCard(id);
        },

        async editCards(_, {cardId:id, CardsInput: {color, descripcion, vacaciones}}){
            return Cards.updCard(id, color, descripcion, vacaciones);
        },
      
        /**
         * Mutations de Tasks
         */
        
        async createTask(_, {taskInput: {cardId, nombre,  descripcion, color, dia, completada, horaI, horaF}}){
           return Tasks.newTask(cardId, nombre, descripcion,  color, dia, completada, horaI, horaF);
        },

        async deleteTask(_, {taskId}){
            return Tasks.delTask(taskId);
        },

        async deleteTasksOfTheWeek(_, {cardId}){
            return Tasks.delCardTasks(cardId);
        },

        /**
         * Actualiza la tarea
         * @param {} _ 
         * @param {*} param1 
         * @returns 
         */
        async editTask(_, {taskId, TaskUpdate: {nombre, descripcion,  color, dia,completada,  horaI, horaF}}){
            return Tasks.updTask(taskId, nombre, descripcion,  color, dia, completada, horaI, horaF);
        },

        /**
         * Actualiza el día de la tarea
         * @param {} _ 
         * @param {*} param1 
         * @returns 
         */
        async editDayTask(_, {taskId, TaskDiaUpdate: {dia}}){
            return Tasks.updDayTask(taskId, dia);
        }

    }
}