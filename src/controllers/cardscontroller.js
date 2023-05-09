const Cards = require('../models/cards');
const Ids = require('../controllers/ids.js');
const Tasks = require('../controllers/taskscontroller.js');

exports.findCard = async (id)=>{
    try{
        return await Cards.findOne({ cardId: id });
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.qryCards = async ()=>{
    try{
        return  await Cards.find({}).sort({year: -1, semana: -1, cardId: -1}) //-1 the most recent ,1 the oldest
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.newCard = async (semana, nombre, color, descripcion, year, vacaciones)=>{
    try{
        //l'id de la card serà any i semana, no hi poden haver dos repetides
        const Id = Ids.generateId(year.toString() + semana.toString());
        //primer crea l'objecte
        const createdCards = new Cards({
            cardId: Id,
            semana: semana, 
            nombre: nombre, 
            color: color, 
            descripcion:descripcion, 
            year:year, 
            vacaciones:vacaciones
        });

        const res = await createdCards.save(); //MongoDb Saving
        //retorna el resultat
        let resj =   {"cardId" : res.cardId, "semana" : res.semana, "nombre" : res.nombre, "color" : res.color, "descripcion" : res.descripcion, "year" : res.year, "vacaciones" : res.vacaciones};
        // socket.on('createCards', (newCard) => {
        //     console.log(`Se ha creado una nueva tarjeta: ${res.nombre}`);
        // });
        return resj;
    }
    catch(e){
        console.log(e);
        return {"cardId" : -1};
    }  
}

exports.delCard= async (id) => {
    try{
        const cardDeleted = await Cards.deleteOne({cardId: id});
        const deleted = (cardDeleted.deletedCount > 0);
        try{
            if (deleted) Tasks.delCardTasks(id);
        }
        catch(er){
            console.log(`error en borrado de tareas de semana, ${id} ,eliminar manualmente`);
        }

        return deleted;
    }
    catch(e){
        console.log(e);
        return false;
    }
}

exports.updCard= async (id, color, descripcion, vacaciones) => {
    try{
        const cardMod = (await Cards.updateOne({cardId: id}, { color, descripcion, vacaciones})).modifiedCount;
        return cardMod;
    }
    catch(e){
        console.log(e);
        return -1;
    }
}