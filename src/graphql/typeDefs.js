const { gql } = require('apollo-server-express'); 

module.exports = gql`
type Task {
    taskId: String!,
    cardId: String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean!,
    horaI: Int,
    horaF: Int,
    filepath: String,
    filename: String,
    uploadDate: String
  }

type Cards{
    cardId: String!
    semana: Int!
    nombre: String!
    color: String!
    descripcion: String!
    year: Int
    vacaciones: Boolean
}

input CardsInput {
    semana: Int!
    nombre: String!
    color: String!
    descripcion: String!
    year: Int
    vacaciones: Boolean
}


input TaskInput { 
    cardId:  String!,
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int
}

input TaskUpdate { 
    nombre: String!,
    descripcion: String!,
    color: String!,
    dia: String,
    completada: Boolean,
    horaI: Int,
    horaF: Int,
    filename: String,
    uploadDate: String
}

input TaskDiaUpdate { 
    dia: String!
}

input TaskFileUpdate { 
    filepath: String,
    filename: String,
    uploadDate: String
}

type Query{    
    Task(taskId: String!): Task!
    getTasks(cardId: String!): [Task]
    Cards(cardId: String!): Cards!
    getCards: [Cards]
}

type Mutation {
    createCards(CardsInput: CardsInput): Cards!
    deleteCards(cardId: String!): Boolean
    editCards(cardId: String!, CardsInput: CardsInput): Boolean
  
    createTask(taskInput: TaskInput): Task!
    deleteTask(taskId: String!): Boolean
    deleteTasksOfTheWeek(cardId: String!): Int
    editTask(taskId: String!, TaskUpdate: TaskUpdate): Boolean
    editDayTask(taskId: String!, TaskDiaUpdate: TaskDiaUpdate): Boolean
    uploadFileTask(taskId: String!, TaskFileUpdate: TaskFileUpdate): Boolean
}
`

