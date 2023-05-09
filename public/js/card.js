
 let  id = "";
 let  semana = -1;
 let  nombre = "";
 let  color = "";
 let  descripcion = "";
 let  year = -1;
 let  fechaInicio = "99-99-9999";
 let  cardParms ="";
 let vacaciones ="";


function cards(card) {
    this.id = card.cardId;
    this.semana = card.semana;
    this.nombre = card.nombre;
    this.color = card.color;
    this.descripcion = card.descripcion;
    this.year = card.year;
    this.fechaInicio = calculaPrimerDiaSemana(this.year, this.semana).toLocaleDateString("es-ES");
    if (card.vacaciones) this.vacaciones = "S"
    else   this.vacaciones = "N";
    this.cardParms = JSON.stringify(card).replaceAll('"', "'"); 
    createDomCard();
}



function getDivIdCard(){
    return "card" + this.id;
}
/**
 * crea el contenedor de semanas
 */
function createDomCard(){
    let weekContainer = document.getElementById("weekContainer");
    let newCard = document.createElement("div");
    newCard.classList.add("col-sm-4");
    newCard.setAttribute("id", getDivIdCard());
    newCard.innerHTML = getHtmlCard()
    weekContainer.appendChild(newCard);
}

/**
 * retorna el codigo html para las cards de semana
 * @returns html
 */
function getHtmlCard(){
    let html = 
    `<div  class="card mb-3 p-2" style="background-color: ${this.color}; border: 1px solid DEE2E6;  border-radius: 18px">
        <div class="card-body">
            <div class="d-flex justify-content-between">
            <h5 class="card-title "><strong>${this.nombre}</strong></h5>`+  ((this.vacaciones === "S") ? `<strong>¡VACACIONES!</strong>` : ``) + 
            `</div> <p class="card-text">${this.descripcion}</p>
                    <p class="card-text"><strong>Semana Número: </strong>${this.semana}</p>
                    <p class="card-text"><strong>Año: </strong>${this.year}</p>
                    <p class="card-text"><strong>Fecha Inicio Semana: </strong>${this.fechaInicio}</p>
                    <button class="btn btn-primary" onclick="weekTasks(${this.cardParms}, )"> Acceder </button>
                    <button class="btn btn-danger" onclick="deleteCardById('${this.getDivIdCard()}', ${this.cardParms})"> Eliminar </button>
                </div>
            </div>`;
    return html;
}
