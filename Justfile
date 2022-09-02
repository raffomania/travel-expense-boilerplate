build input="details.example.yml" output="output.pdf":
	deno run --allow-read=".,{{input}}" render.ts "{{input}}" | wkhtmltopdf - "{{output}}"

watch:
	watchexec -e yml,html,ts,css --no-project-ignore -i 'html2pdf*' -i 'output.*' 'just build'

clean:
	rm output.pdf output.html
