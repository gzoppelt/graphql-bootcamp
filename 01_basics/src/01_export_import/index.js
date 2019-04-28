import { message, name, getGreeting } from './myModule'; //named export - {message, name, location} would not work!
import myCurrentLocation from './myModule'; // default export = location
import secret from './myModule2'; // default export das not have a name,m that's why you have to specify the name here

import sub, { add } from './math';

console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(secret);
console.log(getGreeting('Paul'));
console.log(add(3, 4), sub(10, 3)); 