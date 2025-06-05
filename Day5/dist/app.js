"use strict";
let someValue = "Hey Siri";
// let stringLength1 = someValue.length; // Not allowed bcz type of someValue is unknown
let stringLength = someValue.length;
let strLength = someValue.length; // Also we can do this one ... but which is not allowed in tsx
//type Castling
let num = "5";
let modified = num;
//also we can do this
let str = "42";
let num1 = Number(str);
function fetchUserData(json) {
    try {
        const rawData = JSON.parse(json); // returns any
        console.log(rawData);
        const user = rawData;
        console.log(user);
        console.log(`User ${user.name} (ID: ${user.id}) is ${user.age} years old.`);
    }
    catch (error) {
        console.error("Failed to parse user data:", error);
    }
}
fetchUserData('{"id": 1, "name": "Bina", "age": 30}');
//# sourceMappingURL=app.js.map