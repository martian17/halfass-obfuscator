# Halfass Obfuscator
## API
```js
import {obfuscate} from "halfass-obfuscator";

const obfuscatedCode = obfuscate(`(function(){console.log("this piece of code will be obfuscated")})()`)
console.log(obfuscatedCode);

```
## Example input
```js
const fizzbuzz = function(n){
    for(let i = 1; i <= n; i++){
        if(i%3 === 0 && i%5 === 0){
            console.log(i,"fizzbuzz");
        }else if(i%3 === 0){
            console.log(i,"fizz");
        }else if(i%5 === 0){
            console.log(i,"buzz");
        }
    }
}
fizzbuzz(100);
```
## Example output
```js
const manifesto = `
Hello World, I don't know who tf is reading this, but why?
Why are you reading this? This is just an obfuscated piece of code.
Nothing to do with FizzBuzz or anything else that matter.
How would it make any sense that this text gets translated into fizzbuss?
I don't get it.
`;
const m = (s,e) => manifesto.slice(s,e);
const fizzbuzz = new Function(m(18, 19), "{" + m(32, 33) + m(8, 10) +
"(" + m(3, 4) + m(269, 273) + "=1;" + m(34, 35) + "<=" + m(18, 19) +
";" + m(34, 35) + "++){" + m(34, 35) + m(32, 33) + "(" + m(34, 35) +
"%3===0&&" + m(34, 35) + "%5===0){" + m(107, 108) + m(17, 19) +
m(35, 36) + m(5, 6) + m(3, 4) + m(125, 127) + m(4, 6) + m(43, 44) +
"(" + m(34, 35) + m(12, 13) + "\"" + m(250, 256) + m(149, 151) +
"\");}" + m(168, 173) + m(34, 35) + m(32, 33) + "(" + m(34, 35) +
"%3===0){" + m(107, 108) + m(17, 19) + m(35, 36) + m(5, 6) + m(3, 4)
+ m(125, 127) + m(4, 6) + m(43, 44) + "(" + m(34, 35) + m(12, 13) +
"\"" + m(250, 254) + "\");}" + m(168, 173) + m(34, 35) + m(32, 33) +
"(" + m(34, 35) + "%5===0){" + m(107, 108) + m(17, 19) + m(35, 36) +
m(5, 6) + m(3, 4) + m(125, 127) + m(4, 6) + m(43, 44) + "(" +
m(34, 35) + m(12, 13) + "\"" + m(51, 52) + m(152, 155) + "\");}}}");
fizzbuzz(100);
```
