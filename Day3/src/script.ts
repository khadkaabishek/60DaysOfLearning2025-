import {Person} from './Person/person.js';
import { greet } from './mylib.js';
class Employee extends Person{
     salary : number;
     public constructor(name : string,age: number,phone : number,isVerified : boolean ,salary : number ){
        super(name,age,phone,isVerified);
        this.salary = salary;
     }
     //Override
     displayDetails() :any{
         return this;
        }
    }
    const E1 : Employee = new Employee("Abishek",19,9876543210,true,0);
    const infoOfEmp = E1.displayDetails();
    //  console.log("Information of Employee");
console.log(infoOfEmp);



console.log(greet('Abishek'));
