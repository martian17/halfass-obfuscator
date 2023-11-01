import { parse } from '@babel/parser';
import trav from '@babel/traverse';
import gen from '@babel/generator';


const traverse = trav.default
const generate = gen.default

const manifesto = `
Hello World, I don't know who tf is reading this, but why? Why are you reading this? This is just an obfuscated piece of code. Nothing to do with FizzBuzz or anything else that matter. How would it make any sense that this text gets translated into fizzbuss? I don't get it.
`

const longestSubstr = function(s1,s2){
    // convolve two texts and find matching sequence
    let absoluteMaxStreak = 0;
    let absoluteMaxStart = 0;
    let absoluteMaxEnd = 0;
    let absoluteMaxStart2 = 0;
    let absoluteMaxEnd2 = 0;
    for(let i1 = 1-s1.length; i1 < s2.length+s1.length; i1++){
        let min = i1<0?0:i1;
        let maxStreak = 0;
        let maxStart = 0;
        let maxEnd = 0;
        let streak = 0;
        for(let p1 = 0; p1 < s1.length; p1++){
            if(i1+p1 < 0)continue;
            if(i1+p1 >= s2.length)continue;
            if(s1[p1] === s2[i1+p1]){
                streak++;
            }else{
                if(maxStreak < streak){
                    maxStreak = streak;
                    maxStart = p1-streak;
                    maxEnd = p1;
                }
                streak = 0;
            }
        }
        if(maxStreak < streak){
            maxStreak = streak;
            maxStart = s1.length-streak;
            maxEnd = s1.length;
        }
        if(maxStreak > absoluteMaxStreak){
            absoluteMaxStreak = maxStreak;
            absoluteMaxStart = maxStart;
            absoluteMaxEnd = maxEnd;
            absoluteMaxStart2 = i1+maxStart;
            absoluteMaxEnd2 = i1+maxEnd;
        }
    }
    return [absoluteMaxStart, absoluteMaxStart2, absoluteMaxStreak];
};

const obfuscateArg = function(arg){
    if(arg === "")return "";
    const [s1,s2,len] = longestSubstr(arg,manifesto);
    if(len === 0)return JSON.stringify(arg);
    return [obfuscateArg(arg.slice(0,s1)),`m(${s2},${s2+len})`,obfuscateArg(arg.slice(s1+len))].filter(v=>v.length !== 0).join("+")
}


export const obfuscate = function(code){
    code = code+"";
    const ast = parse(code);
    const res = traverse(ast,{
        FunctionExpression: {
            exit(path){
                const node = path.node;
                const args = [
                    ...node.params.map(v=>v.name),
                    generate(path.node.body,{compact:true}).code
                ];
                const encodedArgs = args.map(obfuscateArg).join(",")
                const body = generate(path.node.body,{compact:true}).code;
                const res = parse(`new Function(${encodedArgs})`).program.body[0];
                path.replaceWith(res);
            }
        }
    });
    const result = 
`const manifesto = \`${manifesto}\`;
const m = (s,e) => manifesto.slice(s,e);
${generate(ast).code}`;
    return result;
}
