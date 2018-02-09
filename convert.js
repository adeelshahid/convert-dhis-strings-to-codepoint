#!/usr/local/bin/node
const fs = require('fs')

const f = fs.readFileSync('./i18n_global_ur.properties', 'utf8')
const output = []
const lines = f.split('\n')

let temp 
for (let line of lines) {
	if (!line.includes('=')) {
		output.push(line)
		continue;
	}

	temp = line.split('=')
	if (temp.length > 2) {
		output.push(line)
		continue;
	}

	output.push(
		temp[0] + '=' + transformToCodePoint(temp[1])
	)
}


fs.writeFileSync('output.txt', output.join('\n'), 'utf8')

function trim(str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}

function transformToCodePoint(str) {
	str = trim(str)
	str = escape(str).replace(/%u/g, '\\u')
	str = decodeURIComponent(str)
	return str
}