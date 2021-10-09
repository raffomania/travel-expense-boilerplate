build:
	pandoc -f markdown -o output.pdf --template=template.tex --pdf-engine=xelatex details.yml

watch:
	watchexec 'just build'

clean:
	rm output.pdf
