'use strict';
const fs = require('fs');


function help() {
  // node main.js --help
  console.log('node main.js --help \t\t\t\t\t for help')
  console.log('node main.js list \t\t\t\t\t to show the list of todos')
  console.log('node main.js add --title your_title --body todo_body \t to add a todo note')
  console.log('node main.js read --title your_title \t\t\t to read a todo note ')
  console.log('node main.js remove --title your_title \t\t\t to remove a todo note')
}

function list() {
  // node main.js list
    let fd = fs.readFileSync('todos.json').toString()
    let todos = JSON.parse(fd);
    console.log('printing', todos.length, 'notes')

    for (let todo of todos) {
      console.log('- Title:', todo.Title, '\t- Body:', todo.Body)
    }
}

function add() {
  // node main.js add
  // node main.js add --title react --body learn_react
  let newtodo = {}

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else newtodo['Title'] = process.argv[indexTitle + 1]

  let indexBody = process.argv.findIndex((el) => el === '--body')
  if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined') {
    console.log('Missing required argument: --body')
    return
  }
  else newtodo['Body'] = process.argv[indexBody + 1]

  let todos = JSON.parse(fs.readFileSync('todos.json').toString());

  fs.writeFileSync('todos.json', JSON.stringify(todos.concat([newtodo])))
}

function read() {
  // node main.js read
  // node main.js read --title react
  let title = ''

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else title = process.argv[indexTitle + 1]

  let todos = JSON.parse(fs.readFileSync('todos.json').toString());
  let todo = todos.find(x => x.Title === title)
  if (todo) console.log('- Title:', todo.Title, '\t- Body:', todo.Body)
  else console.log('Todo not found')
}

function remove() {
  // node main.js remove
  // node main.js remove --title react
  let title = ''

  let indexTitle = process.argv.findIndex((el) => el === '--title')
  if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined') {
    console.log('Missing required argument: --title')
    return
  }
  else title = process.argv[indexTitle + 1]

  let todos = JSON.parse(fs.readFileSync('todos.json').toString());
  let todo = todos.find(x => x.Title === title)
  todos.splice(todos.indexOf(todos.find(x => x.Title === title)), 1);

  fs.writeFileSync('todos.json', JSON.stringify(todos))
  console.log('Todo: - Title:', todo.Title, ', - Body:', todo.Body, 'removed successfully')
}

switch (process.argv[2]) {
  case '--help': help(); break;
  case 'list': list(); break;
  case 'add': add(); break;
  case 'read': read(); break;
  case 'remove': remove(); break;
  default: help(); break;
}

if (process.argv.length < 3) help();