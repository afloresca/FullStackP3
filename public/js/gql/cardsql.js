
/**
  *  Función que igual te crea una card como que te hace un bocadillo de choped
  */
 function createCardWeeks(color, descripcion, nombre, semana, vacas, any){
  const vacaciones = (vacas === "S");
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

      // Enviamos señal al servidor conforme se ha creado el card.
      socket.emit('client:newCard');

      // Recibimos la señal de que el servidor ha recibido la anterior
      // Señal y mostramos la señal en el cliente.
      socket.on('server:newCard', () => console.log('Se ha creado una nueva tarjeta correctamente!'))

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

      // Enviamos señal al servidor conforme se estan mostrando las cards.
      socket.emit('client:showCards');
      socket.on('server:showCards', () => console.log('Mostrando tarjetas...'));

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

      // Enviamos señal al servidor conforme se estan mostrando las cards.
      socket.emit('client:deleteCard');
      socket.on('server:deleteCard', () => console.log('Tarjeta eliminada correctamente!'));

      if (res.data.deleteCards) weekRemove(id);
      return res.data.deleteCards;
    })
    .catch((error) => {
      console.error('Error al crear la tarjeta:', error);
      return {"cardId": -1};
    });
  }
  