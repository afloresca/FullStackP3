 /**
  *  Función que igual te crea una card como que te hace un bocadillo de choped
  */
 function createCardWeeks(color, descripcion, nombre, semana, vacas, any){
  const vacaciones = (vacas === "S");
  console.log(vacaciones, vacas);
  const query = JSON.stringify({
    query: `mutation CreateCards {
      createCards(
          CardsInput: {semana: ${semana}, nombre: "${nombre}", color: "${color}", descripcion: "${descripcion}", year: ${any}, vacaciones: ${vacaciones}}
      ) {
          cardId
          semana
          nombre
          color
          descripcion
          year
          vacaciones
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
      cards(res.data.createCards); //pon la card en el tablero con esmero.
      return res.data.createCards;
    })
    .catch((error) => {
      console.error('Error al crear la tarjeta:', error);
      return {"cardId": -1};
    });
  }

   /**
  *  Función que te recupera las cards de weeks y te las pinta
  */
 function fetchWeeks(){
  fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        query: `{
          getCards{
              cardId
              semana
              nombre
              color
              descripcion
              year
              vacaciones
            }
        }`
    })
})
  .then((res) => res.json())
  .then((res) => {
    res.data.getCards.map(card => {
      cards(card); //pintamos las cards
    });
  })
  .catch((error) => {
    console.error('Error al obtener tarjetas:', error);
  });
}

/**
 * Función que elimina tarjetas y bichos que pican
 */

function deleteCardWeeks(id, cardId){
  const query = JSON.stringify({
    query: `mutation DeleteCards {
      deleteCards(cardId: "${cardId}")
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
      if (res.data.deleteCards) weekRemove(id);
      return res.data.deleteCards;
    })
    .catch((error) => {
      console.error('Error al crear la tarjeta:', error);
      return {"cardId": -1};
    });
  }