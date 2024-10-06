import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import { prop, sum } from "https://deno.land/x/ramda@v0.27.2/mod.ts";

export var SMALL_FOOD_MONEY = 14;
export var BIG_FOOD_MONEY = 28;

export interface RawInput {
    city: string;
    date?: string;
    title: string;
    author: string;
    start_date: string;
    end_date: string;
    company: string;
    signature_image?: string;
    entries: ProcessedEntry[];
}

export interface ProcessedInput extends RawInput {
    date: string;
    total_km: number;
    total_driving_costs: number;
    total_food_money: number;
}

export interface RawEntry {
    date: string;
    start_time: string;
    subject: string;
    hours: number;
    km: number;
    end_time: string;
    food_money?: number;
}

export interface ProcessedEntry {
    date: string;
    start_time: string;
    subject: string;
    hours: number;
    km: number;
    food_money: number;
    end_time: string;
}

export async function load(): Promise<RawInput> {
    const decoder = new TextDecoder("utf-8");

    const yamlFile = await Deno.readFile(Deno.args[0]);

    /** Decoding the file text. */
    const yamlText = decoder.decode(yamlFile);

    /** Returning parsed yaml as an object. */
    return (await parseYaml(yamlText)) as RawInput;
}

export function process(rawDetails: RawInput): ProcessedInput {
    const entries = rawDetails.entries.map(processEntry);

    for (var entry of entries) {
        // Set some default in case those values aren't specified
        if (entry.km == undefined) {
            entry.km = 0;
        }
        if (entry.start_time == undefined) {
            entry.start_time = "00:00";
        }
        if (entry.end_time == undefined) {
            entry.end_time = "24:00";
        }

        // Calculate the hours based on the given time strings.
        // Let the javascript dateparser do its job.
        var start = new Date(`01/01/2024 ${entry.start_time}`);
        var end = new Date(`01/01/2024 ${entry.end_time}`);

        var milliseconds_diff = end - start;
        var hours = Math.floor(milliseconds_diff / 1000 / 60 / 60);
        entry.hours = hours

        // Set the food money based on the spent time on site.
        if (hours > 8 && hours < 24) {
            entry.food_money = SMALL_FOOD_MONEY;
        } else if (hours === 24) {
            entry.food_money = BIG_FOOD_MONEY;
        }
    }

    const total_km = sum(entries.map(prop("km")));
    const total_driving_costs = total_km * 0.3;
    const total_food_money = sum(entries.map(prop("food_money")));

    const today = new Date();
    const date =
        rawDetails.date ??
        `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

    return {
        ...rawDetails,
        total_km,
        total_driving_costs,
        total_food_money,
        entries,
        date,
    };
}

function processEntry(raw: RawEntry): ProcessedEntry {
    let food_money = 0;
    if (raw.hours >= 8) {
        food_money = 14;
    } else if (raw.hours > 24) {
        food_money = 24;
    }
    return {
        food_money: raw.food_money ?? food_money,
        ...raw,
    };
}
