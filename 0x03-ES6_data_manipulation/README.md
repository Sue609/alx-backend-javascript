JavaScript Arrays and Data Manipulation
This README serves as a guide to understanding JavaScript arrays and performing data manipulation operations using arrays.

Table of Contents
Introduction to Arrays
Common Array Methods
Data Manipulation Techniques
Examples
Resources
Introduction to Arrays
Arrays in JavaScript are a fundamental data structure that stores a collection of elements, allowing easy access and manipulation of data. They can contain various types of values, including numbers, strings, objects, or even other arrays.

Declaration and Initialization
javascript
Copy code
// Declaration and initialization of an array
const myArray = [1, 2, 3, 4, 5];
Common Array Methods
JavaScript provides several built-in methods for array manipulation. Some commonly used methods include:

push(): Adds one or more elements to the end of an array.
pop(): Removes the last element from an array.
shift(): Removes the first element from an array.
unshift(): Adds one or more elements to the beginning of an array.
splice(): Adds or removes elements from a specific position in an array.
For a full list of array methods and their usage, refer to the MDN Array Documentation.

Data Manipulation Techniques
Iterating Through Arrays
javascript
Copy code
// Iterating through an array using forEach
myArray.forEach((element) => {
  console.log(element);
});
Filtering Data
javascript
Copy code
// Filtering elements based on a condition
const filteredArray = myArray.filter((element) => {
  return element > 2;
});
Mapping Elements
javascript
Copy code
// Modifying elements in an array using map
const mappedArray = myArray.map((element) => {
  return element * 2;
});
Examples
Example 1: Adding Elements to an Array
javascript
Copy code
const fruits = ['apple', 'banana'];
fruits.push('orange'); // Adds 'orange' to the end of the array
Example 2: Removing Elements from an Array
javascript
Copy code
const numbers = [1, 2, 3, 4, 5];
numbers.pop(); // Removes the last element (5) from the array
Resources
MDN Web Docs - Arrays
JavaScript Array Methods Cheat Sheet
