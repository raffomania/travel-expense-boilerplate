margin := "20"
pandoc_opts := "-f markdown -t html --template=template.html -V margin-left=" + margin + " -V margin-top=" + margin + " -V margin-right=" + margin + " -V margin-bottom=" + margin

build:
	pandoc {{pandoc_opts}} -o output.html details.yml
	pandoc {{pandoc_opts}} -o output.pdf details.yml

watch:
	watchexec -e yml,html --no-project-ignore -i 'html2pdf*' -i 'output.*' 'just build'

clean:
	rm output.pdf
