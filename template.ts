import { encode } from "https://deno.land/std/encoding/base64.ts";
import { Details, Entry } from "./render.ts";

export default function render(details: Details) {
    const {
        city,
        date,
        title,
        author,
        start_date,
        end_date,
        company,
        entries,
        signature_image,
        total_km,
        total_food_money,
        total_driving_costs,
    } = details;

    const rows = entries.map(row).join("");
    const decoder = new TextDecoder("utf-8");
    const styles = decoder.decode(Deno.readFileSync("./main.css"));

    const signature = encode(Deno.readFileSync(signature_image));

    return `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <title></title>

  <style>${styles}</style>
</head>
<body>
  <header id="title-block-header">
  <span style="float: right;">Vom ${start_date} bis ${end_date}</span>
  <h1 class="title">${title}</h1>
  <p class="author">Name: ${author}, Firma: ${company}</p>
  </header>

  <table style="width: 100%;">
    <tr>
      <th>lfd. Nr.</th>
      <th>Datum</th>
      <th>Reisebeginn/-ende</th>
      <th>Reiseanlass; Reiseweg (Ziel und Zweck der Reise)</th>
      <th>Std.</th>
      <th>dienstl. gefahrene km</th>
      <th>Verpflegungspauschbeträge, mind. 8h = 14€, mind. 24h = 28€</th>
    </tr>

    ${rows}
    <tr valign="top">
      <td colspan=5 align="right"><strong>Summen</strong></td>
      <td>${total_km} km x 0,30€ = <strong>${total_driving_costs}€</strong></td>
      <td><strong>${total_food_money}€</strong></td>
    </tr>
  </table>

  <p><strong>Gesamtsumme der Reisekosten: ${
      total_driving_costs + total_food_money
  }€</strong></p>

  <p>${city}, den ${date}</p>
  <img class="signature" src="data:image/png;base64,${signature}"/>
</body>
</html>`;
}

function row(it: Entry, index: number) {
    return `
<tr valign="top">
  <td rowspan=2>${index + 1}</td>
  <td rowspan=2>${it.date}</td>
  <td>${it.start_time}</td>
  <td rowspan=2>${it.subject}</td>
  <td rowspan=2>${it.hours}</td>
  <td rowspan=2>${it.km} km x 0,30€</td>
  <td rowspan=2>${it.food_money}€</td>
</tr>
<tr>
  <td>${it.end_time}</td>
</tr>
  `;
}
