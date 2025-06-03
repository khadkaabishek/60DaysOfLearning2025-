export abstract class Person { 
    name : string;
    age : number;
    phone : number; 
    isVerified : boolean;
    public constructor(name : string,age: number,phone : number,isVerified : boolean  ){
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.isVerified = isVerified;
    }
    abstract   displayDetails() : any;
}