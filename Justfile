build:
	deno run --allow-read=. render.ts > output.html
	wkhtmltopdf output.html output.pdf

watch:
	watchexec -e yml,html,ts,css --no-project-ignore -i 'html2pdf*' -i 'output.*' 'just build'

clean:
	rm output.pdf output.html
