/**
 * función que recibe un argumento o no y te genera un uid
 */
exports.generateId = (args) => {
    let id = Date.now(); //nadie puede contra los milis    
    if (args != undefined){
        id = args + '.' + id;
    }
    return id;
}