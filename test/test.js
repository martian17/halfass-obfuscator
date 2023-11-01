import {obfuscate} from "#src/index.js";
import fs from "fs";

console.log(obfuscate(fs.readFileSync("./fixtures/fizzbuzz.js")))

