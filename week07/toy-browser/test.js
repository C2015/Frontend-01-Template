const map = { type: 'element',
children:
 [ { type: 'text',
     content: '\nbody div #myid{\n    width:100px;\n    background-color: #ff5000;\n}\nbody div img{\n    width:30px;\n    background-color: #ff1111;\n}\n    ' } ],
attributes: [],
tagName: 'style',
parents:
 [ { type: 'element',
     children: [Array],
     attributes: [],
     tagName: 'head',
     parents: [Array],
     computeStyle: {} },
   { type: 'element',
     children: [Array],
     attributes: [Array],
     tagName: 'html',
     parents: [Array],
     computeStyle: {} },
   { type: 'document', children: [Array] } ],
computeStyle: {} }

  console.log(JSON.stringify(map, null, '    '))