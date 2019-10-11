const str = `'After the sunset,' he said. 'We'll have to go home.'`;
console.log(str.replace(/^'|(\s)'|'(\s)|'$/g, '$1"$2'));