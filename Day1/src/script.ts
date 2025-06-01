//Partial<T> - Makes all properties optional
interface User {
    name: string;
    age: number;
  }
  const updateUser = (user: Partial<User>) => {
    // Only some properties may be provided
    console.log(user);
  };
  updateUser({ name: "Abishek"}); //here age is optional 



  //Required<T> - Makes all properties required even if they r optional 
  interface Settings {
  theme?: string;
  fontSize?: number;
}
const applySettings = (settings: Required<Settings>) => {
  console.log(settings);
};
// applySettings({ theme: "dark"}); Error: fontSize is required
applySettings({ theme: "dark", fontSize: 14 }); // 


// Readonly<T> - Makes all properties immutable
type User1 = {
    name: string,
    age:number;
  };
  const user1: Readonly<User1> = {
    name: "Arjun",
    age : 18
  };
//   user1.name = "Bob";user1.age =19; // cant bcz its on readonly mode

//Pick<T, K> - Picks specific keys from a type
interface Product {
    id: number;
    name: string;
    price: number;
  }
  type ProductPreview = Pick<Product, 'id' | 'name'>;
  const preview: ProductPreview = { id: 1, name: "Laptop" };
  console.log(preview);


  //Omit<T, K> - Removes specific keys from a type
  type ProductWithoutPrice = Omit<Product, 'price'>;
  const item: ProductWithoutPrice = { id: 2, name: "Mouse" };
  console.log(item);

  //Record<K, T> - Constructs a type with a set of properties K of type T
  type Roles = 'admin' | 'user' | 'guest';
  const permissions: Record<Roles, string[]> = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read'],
  };
  console.log(permissions);
  

