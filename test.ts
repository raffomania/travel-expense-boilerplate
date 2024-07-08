import { assertSnapshot } from "https://deno.land/std@0.224.0/testing/snapshot.ts";
import { parse as parseYaml } from "https://deno.land/std@0.63.0/encoding/yaml.ts";
import render from "./template.ts";
import { RawInput, process } from "./render.ts";

Deno.test("basicSnapshot", async function (t): Promise<void> {
    const yaml = process(
        (await parseYaml(`
author: Herbert Derpert
company: Corp
date: 10.05.2024
start_date: 01.04.2024
end_date: 30.04.2023
city: Hamburg
title: Travelin

entries:
    - index: 1
      date: 10.04.
      start_time: "08:30"
      end_time: "17:30"
      subject: "Did some stuff"
      hours: 9
      km: 20
      food_money: 14
    - index: 2
      date: 23.04.
      start_time: "10:00"
      end_time: "18:00"
      subject: "There's more stuff here"
      hours: 8
      km: 20
      food_money: 10
    `)) as RawInput
    );
    const rendered = render(yaml);
    await assertSnapshot(t, rendered);
});

Deno.test("snapshotNoIndices", async function (t): Promise<void> {
    const yaml = process(
        (await parseYaml(`
author: Herbert Derpert
company: Corp
date: 10.05.2024
start_date: 01.04.2024
end_date: 30.04.2023
city: Hamburg
title: Travelin

entries:
    - date: 10.04.
      start_time: "08:30"
      end_time: "17:30"
      subject: "Did some stuff"
      hours: 9
      km: 20
      food_money: 14
    - date: 23.04.
      start_time: "10:00"
      end_time: "18:00"
      subject: "There's more stuff here"
      hours: 8
      km: 20
      food_money: 14
    `)) as RawInput
    );
    const rendered = render(yaml);
    await assertSnapshot(t, rendered);
});

Deno.test("snapshotNoFoodMoney", async function (t): Promise<void> {
    const yaml = process(
        (await parseYaml(`
author: Herbert Derpert
company: Corp
date: 10.05.2024
start_date: 01.04.2024
end_date: 30.04.2023
city: Hamburg
title: Travelin

entries:
    - date: 10.04.
      start_time: "08:30"
      end_time: "17:30"
      subject: "Did some stuff"
      hours: 9
      km: 20
    - date: 23.04.
      start_time: "10:00"
      end_time: "18:00"
      subject: "There's more stuff here"
      hours: 8
      km: 20
    `)) as RawInput
    );
    const rendered = render(yaml);
    await assertSnapshot(t, rendered);
});
