const {model, Schema} = require('mongoose');

const cardsSchema = new Schema({
    cardId: {type: String, required:true},
    semana: {type: Number, required: true},
    nombre: {type: String, required: true},
    color: {type: String, required: true},
    descripcion: {type: String, required: true},
    year: {type: Number, required: true},
    vacaciones: {type: Boolean, required: true}
});

module.exports = model('Cards', cardsSchema);