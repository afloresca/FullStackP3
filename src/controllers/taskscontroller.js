const Tasks = require('../models/tasks');
const Ids = require('../controllers/ids.js');

exports.findTask = async (id)=>{
    try{
        return await Tasks.findOne({ taskId: id });
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.qryTasks = async (cardId)=>{
    try{
        return  await Tasks.find({cardId : cardId}).sort({dia: -1, taskId: -1}).exec() //-1 the most recent ,1 the oldest
    }
    catch (e){
        console.log(e);
        return {error: -1, desc: e};
    }
}

exports.newTask = async (cardId, nombre, descripcion,  color, dia, completada, horaI, horaF)=>{
    try{
        //l'id de la task serà el cardId + los milis, no hi poden haver dos repetides
        const Id =  Ids.generateId(cardId);
           //primer crea l'objecte
           const createdTask = new Tasks({
            taskId:Id,
            cardId:cardId, 
            nombre:nombre,  
            descripcion:descripcion, 
            color:color, 
            dia:dia, 
            completada:completada, 
            horaI:horaI, 
            horaF:horaF
        });

        const res = await createdTask.save(); //MongoDb Saving
        //retorna el resultat
        let resj = {"taskId":res.taskId, "cardId":res.cardId, "nombre":res.nombre, "descripcion":res.descripcion,  "color":res.color, "dia":res.dia, "completada":res.completada, "horaI": res.horaI, "horaF": res.horaF}
        return resj;
    }
    catch(e){
        console.log(e);
        return {"taskId":-1}
    }  
}

exports.delTask= async (id) => {
    try{
        const cardDeleted = (await Tasks.deleteOne({taskId: id})).deletedCount;
        //llamar a borrado de tareas asociadas
        return (cardDeleted>0);
    }
    catch(e){
        console.log(e);
        return -1;
    }
}
exports.delCardTasks= async (cardid) => {
    try{
        const cardDeleted =  (await Tasks.deleteMany({cardId: cardid})).deletedCount;  
        //llamar a borrado de tareas asociadas
        return cardDeleted;
    }
    catch(e){
        console.log(e);
        return -1;
    }
}
  

exports.updTask= async (taskid, nombre, descripcion,  color, dia, completada, horaI, horaF) => {
    try{
        const cardMod = (await Tasks.updateOne({taskId: taskid}, {nombre, descripcion,  color, dia, completada, horaI, horaF})).modifiedCount;
        return (cardMod>0);
    }
    catch(e){
        console.log(e);
        return -1;
    }
}

exports.updDayTask= async (taskid, dia) => {
    try{
        const cardMod = (await Tasks.updateOne({taskId: taskid}, {dia})).modifiedCount;
        return (cardMod>0);
    }
    catch(e){
        console.log(e);
        return -1;
    }
}