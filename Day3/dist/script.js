import { Person } from './Person/person.js';
import { greet } from './mylib.js';
class Employee extends Person {
    constructor(name, age, phone, isVerified, salary) {
        super(name, age, phone, isVerified);
        this.salary = salary;
    }
    //Override
    displayDetails() {
        return this;
    }
}
const E1 = new Employee("Abishek", 19, 9876543210, true, 0);
const infoOfEmp = E1.displayDetails();
//  console.log("Information of Employee");
console.log(infoOfEmp);
console.log(greet('Abishek'));
//# sourceMappingURL=script.js.map