const {model, Schema} = require('mongoose');

const tasksSchema = new Schema({
    taskId: {type: String, required: true},
    cardId: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    color: {type: String, required: true},
    dia: {type: String, required: false},
    completada: {type: Boolean, required: true},
    horaI: {type: Number, required: true},
    horaF: {type: Number, required: true}
});

module.exports = model('Tasks', tasksSchema);