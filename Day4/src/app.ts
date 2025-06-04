//Error Handling 
class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
  function fetchData(id: number): string {
    if (id !== 1) {
      throw new NotFoundError("Data not found for ID " + id);
    }
    return "Data for ID " + id;
  }
  
  try {
    const result = fetchData(2);
    console.log(result);
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.error("Handled NotFoundError:", error.message);
    } else {
      console.error("Unknown error", error);
    }
  }
  

  //use of typeOf keyword
  const person = {
    name: "Arjun Erig",
    age: 30,
  };
  
  type PersonType = typeof person;
  
  const anotherPerson: PersonType = {
    name: "Fabi",
    age: 25,
  };
  console.log(anotherPerson);


  //infer: Extract type inside a conditional type

  type GetReturnType<T> = T extends (...args : any[]) => infer R ? R : never;

  function greet(name: string): object {
    return {
        Name : name,
    };
  }
  
  type GreetReturnType = GetReturnType<typeof greet>; // string
  
//   ReturnType: Get return type of a function : works same as above but in easy wayyy 
  function add(x: number, y: number): number {
    return x + y;
  }
  
  type AddReturnType = ReturnType<typeof add>; 

  