type IsString<T> = T extends string ? 'Yes' : 'No';
type A = IsString<'hello'>;  // 'Yes'
type B = IsString<42>;       // 'No'

//Using Conditional Type to Filter a Union
type FilterString<T> = T extends string ? T : never;
type Result = FilterString<'a' | 1 |5| 'b'>;  // 'a' | 'b'


type IsArray<T> = T extends any[] ? "Array" : "NotArray";
// Array Check 
type A1 = IsArray<string[]>;   // "Array"
type B1 = IsArray<string>;     // "NotArray"


//Extract Return Type using infer
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => number;
type Wn = () => boolean;
type Result1 = GetReturnType<Fn>;  // number
type Result2 = GetReturnType<Wn>;  // boolean


