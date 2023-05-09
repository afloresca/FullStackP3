const mongoose = require('mongoose');
const express = require('express');

// Importamos apollo server (Importamos los typeDefs y los resolvers)
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

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

  // Aviso usuario conectado
  io.on('connection', (socket) => {
    console.log(`Nuevo usuario conectado con el ID: ${socket.id}`);

    // --- Señales Cards ---

    // Crear
    socket.on('client:newCard', () => {
      console.log(`Se ha creado una nueva tarjeta correctamente!`)
      socket.emit('server:newCard');
    });

    // Leer
    socket.on('client:showCards', () => {
      console.log('Mostrando tarjetas...')
      socket.emit('server:showCards');
    })

    // Eliminar
    socket.on('client:deleteCard', () => {
      console.log('Tarjeta eliminada correctamente!')
      socket.emit('server:deleteCard');
    })

    // --- Señales Tasks ---

    // Crear
    socket.on('client:newTask', () => {
      console.log(`Se ha creado una nueva tarea correctamente!`)
      socket.emit('server:newTask');
    });

    // Leer
    socket.on('client:showTasks', () => {
      console.log('Mostrando Tareas...')
      socket.emit('server:showTasks');
    })

    // Editar
    socket.on('client:editTask', () => {
      console.log('Tarea editada correctamente!')
      socket.emit('server:editTask');
    })

    // Eliminar
    socket.on('client:deleteTask', () => {
      console.log('Tarea eliminada correctamente!')
      socket.emit('server:deleteTask');
    })

    
    // Aviso usuario desconectado
    socket.on('disconnect', () => {
      console.log(`Usuario con el ID ${socket.id} se ha desconectado`);
    });

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
