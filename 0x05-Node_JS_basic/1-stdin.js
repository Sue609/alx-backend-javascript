const readline = require('readline');

console.log('Welcome to Holberton School, what is your name?');

const rd = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rd.on('line', (input) => {
  if (input.trim() === '') {
    rd.close();
    return;
  }
  console.log(`Your name is: ${input}`);
  console.log('This important software is now closing');
  rd.close();
});
