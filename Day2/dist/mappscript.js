"use strict";
const person = { name: "Abishek" };
console.log(person);
// Usage:
const personStrings = {
    name: "Alice",
    age: "25",
    isStudent: "true",
};
// Same as: Readonly<Person>
const p = {
    name: "Bob",
    age: 30,
    isStudent: false
};
const asyncPerson = {
    name: Promise.resolve("Karan"),
    age: Promise.resolve(28),
    isStudent: Promise.resolve(true),
};
console.log(asyncPerson);
const person2 = {
    name: "John",
    age: 25,
};
// Usage
const userToggles = {
    darkMode: true,
    betaAccess: false
};
console.log(userToggles);
//# sourceMappingURL=mappscript.js.map