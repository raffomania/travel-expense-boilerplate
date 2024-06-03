import { load, process } from "./render.ts";
import render from "./template.ts";

const rendered = render(process(await load()));

console.log(rendered);
