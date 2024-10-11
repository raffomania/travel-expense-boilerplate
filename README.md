# Travel Expense Boilerplate

Automatically generate german travel expense report for freelancers from a YAML file.

## Setup

Install dependencies:

- [just](https://github.com/casey/just/)
- [deno](https://deno.land/)
- [wkthmltopdf](https://wkhtmltopdf.org/)

Copy `details.example.yml` to `details.yml` and add your travel expenses.
Run `just build` to generate `output.html` and `output.pdf`.

## License

[GPL](http://www.gnu.org/licenses/gpl-3.0.txt)
