const mongoose = require('mongoose');
const express = require('express');

// Importamos apollo server (Importamos los typeDefs y los resolvers)
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../FullStackP2/src/graphql/typeDefs');
const resolvers = require('../FullStackP2/src/graphql/resolvers');

// Importamos http y Socket IO
const http = require('http');
const { Server } = require('socket.io');

// Cadena de conexión
const uri = 'mongodb+srv://admin:1234@cluster0.amvowh2.mongodb.net/weektasks';

// Opciones de configuración de la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conexión a la base de datos
mongoose.connect(uri, options);

// Obtener la instancia de la conexión
const db = mongoose.connection;

// Manejar eventos de la conexión
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log("Conexión exitosa a la base de datos");
  // hacer algo con la base de datos
});

// Funcion para iniciar el servidor Apollo-Express
async function startServer() {
  
  // Constructor express
  const app = express();

  // Configuracion Socket IO
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  // Cors
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // Pasamos la ejecucion del servidor por la carpeta 'public' para mostrar el html
  app.use(express.static('public'));


  io.on('connection', (socket) => {
    console.log(`Nuevo usuario conectado con el ID: ${socket.id}`);

    socket.emit('createCards', (data) => {
      console.log(`Se ha creado una nueva tarjeta correctamente: ${data}`)
    });

    // socket.on('disconnect', () => {
    //   console.log(`User disconnected with ID ${socket.id}`);
    // });
  });

  const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      const context = {req}
      context.io = io;
      return context;
    }
  });

  // Se debe declarar esta funcion asíncrona para evitar que el middelware
  // que une apollo con express se aplique antes de que se inicie el servicio y cause errores
  await server.start();

  // Unimos apollo server a la aplicacion de express
  server.applyMiddleware({app});
  
  // Definimos el pueto predeterminado y lo que se ejecutara cuando se inicie el servidor.
  httpServer.listen(3000, function() {
    console.log('🚀 Frontend client corriendo en http://localhost:3000 🚀 ')
    console.log(`🚀 Servidor de apollo en http://localhost:3000${server.graphqlPath} 🚀`)
  });
}

// Iniciamos el servidor
startServer();
