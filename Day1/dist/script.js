"use strict";
const updateUser = (user) => {
    // Only some properties may be provided
    console.log(user);
};
updateUser({ name: "Abishek" }); //here age is optional 
const applySettings = (settings) => {
    console.log(settings);
};
// applySettings({ theme: "dark"}); Error: fontSize is required
applySettings({ theme: "dark", fontSize: 14 }); // 
const user1 = {
    name: "Arjun",
    age: 18
};
const preview = { id: 1, name: "Laptop" };
console.log(preview);
const item = { id: 2, name: "Mouse" };
console.log(item);
const permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read'],
};
console.log(permissions);
//# sourceMappingURL=script.js.map