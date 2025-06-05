let someValue : unknown = "Hey Siri";
// let stringLength1 = someValue.length; // Not allowed bcz type of someValue is unknown
let stringLength = (someValue as string).length;


let strLength = (<string>someValue).length;// Also we can do this one ... but which is not allowed in tsx


//type Castling
let num : unknown = "5";
let modified = (num as number);

//also we can do this
let str = "42";
let num1 = Number(str); 


function fetchUserData(json: string) {
    try {
      const rawData = JSON.parse(json); // returns json
    //   console.log(rawData);
      const user = rawData as { id: number; name: string; age: number };
    //   console.log(user);
  
      console.log(`User ${user.name} (ID: ${user.id}) is ${user.age} years old.`);
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
  }
  
  fetchUserData('{"id": 1, "name": "Bina", "age": 30}');
  