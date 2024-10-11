build input="details.yml" output="output.pdf":
	deno run --allow-read=".,{{input}}" main.ts "{{input}}" | wkhtmltopdf - "{{output}}"

watch:
	watchexec -e yml,html,ts,css --no-project-ignore -i 'html2pdf*' -i 'output.*' 'just build'

clean:
	rm output.pdf output.html

test:
	deno test --allow-read

update-snapshot-tests:
	deno test --allow-all -- --update
