import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import render from "./template.ts";

export interface Details {
    city: string;
    date: string;
    title: string;
    author: string;
    start_date: string;
    end_date: string;
    company: string;
    signature_image: string;
    entries: Entry[];
}

export interface Entry {
    index: number;
    date: string;
    start_time: string;
    subject: string;
    hours: number;
    km: number;
    food_money: number;
    end_time: string;
}

console.log(Deno.args[0]);

const decoder = new TextDecoder("utf-8");

const yamlFile = await Deno.readFile("./details.yml");

/** Decoding the file text. */
const yamlText = decoder.decode(yamlFile);

/** Returning parsed yaml as an object. */
const details: Details = (await parseYaml(yamlText)) as Details;

const rendered = render(details);

console.log(rendered);
