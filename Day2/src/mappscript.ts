type Person = {
    name: string;
    age: number;
};
// Make all fields optional
  type OptionalPerson = {
    [K in keyof Person]?: Person[K];
  };
  const person:OptionalPerson = {name : "Abishek"}
  console.log(person);

  type Person1 = {
    name: string;
    age: number;
    isStudent: boolean;
  };
  //Makes all the types to string 
  type AllStrings = {
    [K in keyof Person1]: string;
  };
  // Usage:
  const personStrings: AllStrings = {
    name: "Alice",
    age: "25",
    isStudent: "true",
  };

  type ReadonlyPerson = {
    [K in keyof Person1]: Readonly<Person1[K]>;
  };
  // Same as: Readonly<Person>
  const p: ReadonlyPerson = {
    name: "Bob",
    age: 30,
    isStudent: false
  };
  // p.name = "Charlie"; //  Error: Cannot assign to 'name'


  type AsyncPerson = {
    [K in keyof Person1]: Promise<Person1[K]>;
  };
  const asyncPerson: AsyncPerson = {
    name: Promise.resolve("Karan"),
    age: Promise.resolve(28),
    isStudent: Promise.resolve(true),
  };
  console.log(asyncPerson);
  
  

  type NullablePerson = {
    name: string | null;
    age: number | null;
  };
  //Removes the nullable property
  type NonNullablePerson = {
    [K in keyof NullablePerson]: NonNullable<NullablePerson[K]>;
  };
  
  const person2: NonNullablePerson = {
    name: "John",
    age: 25,
  };
  
  
// Mapped type utility to convert any type's fields to booleans
type Flags<T> = {
    [K in keyof T]: boolean;
  };
  
  // Original configuration type with different types
  type ConfigSettings = {
    darkMode: string;
    betaAccess: number;
  };
  
  // Resulting type: all values become booleans
  type FeatureToggles = Flags<ConfigSettings>;
  
  // Usage
  const userToggles: FeatureToggles = {
    darkMode: true,
    betaAccess: false
  };
  
  console.log(userToggles);

  
  