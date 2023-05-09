/**
 * nuevo método a la clase Date para calcular el número de semana de una fecha
 * @returns number
 */
Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  };

/**
 * Nuevo método a la clase Date para que devuelva el número de semanas por año
 * @returns number
 */
Date.prototype.getMaxWeeksPerYear = function(){
    dateI = new Date(this.getFullYear(), '1', '1');
    dateF = new Date(this.getFullYear() +1, '1', '1');
    weeks = Math.ceil((((dateF - dateI) / 86400000) + 1)/7);
    return weeks;
};


/**
 * Nuevo método a la clase Date para que devuelve la fecha del primer día de la semana de una fecha dada.
 * @returns Date
 */
Date.prototype.getFirstDayWeek = function(){
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())); 
  let numdia = this.getDay(); //los días van de 0(domingo) a 6(sábado)
  if (numdia === 0) numdia = 7; //domingo, el domingo es 7 para la gente normal
  let aLunes = numdia-1; //el dia 1 es lunes
  d.setDate(d.getDate() -  aLunes);
  return d;
};


/**
 * Comprueba si numero semana es valido para un año
 * @param {*} modYear 
 * @param {*} modNumSem 
 * @returns 
 */
function  checkYearWeekNumber(modYear, modNumSem){
  let ok = false;
  try{
    let year = parseInt(modYear);
    let numSem = parseInt(modNumSem);
    d = new Date(year, 0, 1);
    ok = ((numSem < 0) || (numSem >d.getMaxWeeksPerYear()));
  }
  catch (e) {
    console.log(e);
    ok = false;
  }
  return ok;
} 

/**
 * Añade días a una fecha
 * @param {*} date 
 * @param {*} days 
 * @returns 
 */
function addDaysToDate(date, days){
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

/**
 * calcula primer dia de un número de semana de un año
 * @param {*} modYear 
 * @param {*} modNumSem 
 * @returns 
 */
function calculaPrimerDiaSemana(modYear, modNumSem){
  let d;
  try{
    let year = parseInt(modYear);
    let numSem = parseInt(modNumSem);
    let numdias = numSem * 7;
    d = addDaysToDate(new Date(year, 0, 1), numdias).getFirstDayWeek();
  }
  catch (e) {
    console.log(e);
  }
  return d;
}

