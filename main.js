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
  let rawdata = fs.readFileSync('todos.json');
  let todos = JSON.parse(rawdata);
  console.log('printing', todos.length, 'notes')
  for (todo of todos) {
    console.log('Title:', todo.title, 'Body:', todo.body)
  }
}

function add() {
  // node main.js add
  // node main.js add --title react --body learn_react

}

function read() {
  // node main.js read
  // node main.js read --title react

}

function remove() {
  // node main.js remove
  // node main.js remove --title react

}

for (let i = 2; i < process.argv.length; i++) {
  switch (process.argv[2]) {
    case '--help': help(); break;
    case 'list': list(); break;
    case 'add': add(); break;
    case 'read': read(); break;
    case 'remove': remove(); break;
    default: help(); break;
  }
}

if (process.argv.length < 3) help();

