import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import { prop, sum } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

export interface RawDetails {
    city: string;
    date: string;
    title: string;
    author: string;
    start_date: string;
    end_date: string;
    company: string;
    signature_image?: string;
    entries: RawEntry[];
}

export interface Details extends RawDetails {
    total_km: number;
    total_driving_costs: number;
    total_food_money: number;
}

export interface RawEntry {
    index: number;
    date: string;
    start_time: string;
    subject: string;
    hours: number;
    km: number;
    food_money: number;
    end_time: string;
}

export async function load(): Promise<RawDetails> {
    const decoder = new TextDecoder("utf-8");

    const yamlFile = await Deno.readFile(Deno.args[0]);

    /** Decoding the file text. */
    const yamlText = decoder.decode(yamlFile);

    /** Returning parsed yaml as an object. */
    return (await parseYaml(yamlText)) as RawDetails;
}

export function process(rawDetails: RawDetails): Details {
    const total_km = sum(rawDetails["entries"].map(prop("km")));
    const total_driving_costs = total_km * 0.3;
    const total_food_money = sum(rawDetails["entries"].map(prop("food_money")));

    return {
        total_km,
        total_driving_costs,
        total_food_money,
        ...rawDetails,
    };
}
