import { encodeBase64 } from "https://deno.land/std@0.224.0/encoding/base64.ts";
import {
    ProcessedInput,
    ProcessedEntry,
    SMALL_FOOD_MONEY,
    BIG_FOOD_MONEY,
} from "./render.ts";
import { formatCurrency } from "./format.ts";

export default function render(details: ProcessedInput) {
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

    const rows = entries.map(renderRow).join("");
    const decoder = new TextDecoder("utf-8");
    const styles = ["./main.css"].map((file) =>
        decoder.decode(Deno.readFileSync(file))
    );

    let signature = "";
    if (signature_image !== undefined) {
        signature = encodeBase64(Deno.readFileSync(signature_image));
    }

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

  <table style="width: 100%;" class="pure-table pure-table-bordered">
    <thead>
      <tr>
        <th>lfd. Nr.</th>
        <th>Datum</th>
        <th>Reisebeginn/-ende</th>
        <th>Reiseanlass; Reiseweg (Ziel und Zweck der Reise)</th>
        <th>Std.</th>
        <th>dienstl. gefahrene km</th>
        <th>Verpflegungspauschbeträge, mind. 8h = ${formatCurrency(
            SMALL_FOOD_MONEY
        )}, 24h = ${formatCurrency(BIG_FOOD_MONEY)}</th>
      </tr>
    </thead>

    <tbody>
      ${rows}
      <tr valign="top">
        <td colspan=5 align="right"><strong>Summen</strong></td>
        <td>${total_km} km x ${formatCurrency(0.3)} = <strong>${formatCurrency(
        total_driving_costs
    )}</strong></td>
        <td><strong>${formatCurrency(total_food_money)}</strong></td>
      </tr>
    </tbody>
  </table>

  <p><strong>Gesamtsumme der Reisekosten: ${formatCurrency(
      total_driving_costs + total_food_money
  )}</strong></p>

  <p>${city}, den ${date}</p>
  <p>${author}</p>
  <img class="signature" src="data:image/png;base64,${signature}"/>
</body>
</html>`;
}

function renderRow(it: ProcessedEntry, index: number) {
    return `
<tr valign="top">
  <td rowspan=2>${index + 1}</td>
  <td rowspan=2>${it.date}</td>
  <td>${it.start_time}</td>
  <td rowspan=2>${it.subject}</td>
  <td rowspan=2>${it.hours}</td>
  <td rowspan=2>${it.km} km x ${formatCurrency(0.3)}</td>
  <td rowspan=2>${formatCurrency(it.food_money)}</td>
</tr>
<tr>
  <td>${it.end_time}</td>
</tr>
  `;
}
