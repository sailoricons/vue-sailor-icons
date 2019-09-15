const path = require('path')
const sailor = require('sailor-icons')
const pascalCase = require('pascal-case')
const fs = require('fs-extra')
const { JSDOM } = require("jsdom");


const defaultIconColor = '#000';
const componentTemplate = (name, svg) => `
export default {
  name: '${name}',
  
  props: {
    size: {
      type: String,
      default: '24',
      validator: (s) => (!isNaN(s) || s.length >= 2 && !isNaN(s.slice(0, s.length -1)) && s.slice(-1) === 'x' )
    },
    color: {
      type: String,
      default: '${defaultIconColor}'
    }
  },

  functional: true,

  render(h, ctx) {
    const size = ctx.props.size.slice(-1) === 'x' 
      ? ctx.props.size.slice(0, ctx.props.size.length -1) + 'em'
      : parseInt(ctx.props.size) + 'px';

    const attrs = ctx.data.attrs || {}
    attrs.width = attrs.width || size
    attrs.height = attrs.height || size
    ctx.data.attrs = attrs
  
    return ${svg.replace(/<svg([^>]+)>/, '<svg$1 {...ctx.data}>').replace(/fill="#000"/g, 'fill={ctx.props.color}')}
  }
}
`.trim()

const handleComponentName = name => name.replace(/\-(\d+)/, '$1')
const withFill = svg => {
  const dom = new JSDOM(`<!DOCTYPE html>${svg}`);
  const newSvg = dom.window.document.querySelector("svg");
  const svgChildrenElems = newSvg.children
  Array.from(svgChildrenElems).forEach(el => {
    el.setAttribute('fill', defaultIconColor)
  })
  const newSvgString = newSvg.outerHTML
  return newSvgString
}

const icons = Object.keys(sailor.icons).map(name => ({
  name,
  pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`)
}))

Promise.all(icons.map((icon, idx) => {
  const svg = sailor.icons[icon.name].toSvg()
  const newSvg = withFill(svg)
 
  const component = componentTemplate(icon.pascalCasedComponentName, newSvg)
  const filepath = `./src/components/${icon.pascalCasedComponentName}.js`
  return fs.ensureDir(path.dirname(filepath))
    .then(() => fs.writeFile(filepath, component, 'utf8'))
})).then(() => {
  const main = icons
    .map(icon => `export { default as ${icon.pascalCasedComponentName} } from '../icons/${icon.pascalCasedComponentName}'`)
    .join('\n\n')
  return fs.outputFile('./src/index.js', main, 'utf8')
})
