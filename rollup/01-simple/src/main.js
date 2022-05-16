import { username } from "./modules/a.js";
import answer from "./modules/b.js";
import arr from "./modules/c";
import Greeter from "./modules/d";
import "./style.css";


var g = new Greeter('This is a message!');
console.log(g.greet('Hello!'));

console.log(arr);

answer();

console.log(`${username()} is super man`);

const container = document.createElement('div');
// container.setAttribute('class', "container");
container.className = "container";
container.innerHTML = 'biaoqian';
document.body.appendChild(container);

