import { YamlLoader } from "https://deno.land/x/yaml_loader@v0.1.0/mod.ts";
import render from "./template.ts";

const loader = new YamlLoader();
const details = await loader.parseFile("./details.yml");

const rendered = render(details);

const encoder = new TextEncoder();
await Deno.writeFile("output.html", encoder.encode(rendered));
