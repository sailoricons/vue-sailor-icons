# vue-sailor-icons

[![NPM version](https://img.shields.io/npm/v/vue-sailor-icons.svg?style=flat)](https://npmjs.com/package/vue-sailor-icons) [![NPM downloads](https://img.shields.io/npm/dm/vue-sailor-icons.svg?style=flat)](https://npmjs.com/package/vue-sailor-icons) [![CircleCI](https://circleci.com/gh/katalonne/vue-sailor-icons/tree/master.svg?style=shield)](https://circleci.com/gh/katalonne/vue-sailor-icons/tree/master)

## Install

```bash
yarn add vue-sailor-icons

// or

npm i vue-sailor-icons --save
```

## Usage

```js
// Only import what you need!
import { AnchorIcon, BoatIcon, ... } from 'vue-sailor-icons'
```

See all icons and usage here: https://

### Sizing

By default, icons will be sized based on the font size of the parent element.

You can set a custom size using the `size` attribute. 
For multiple based sizing, pass the desired multiple followed by an `x`.

By default, icons' color is `#000`.
You can set a custom color using the `color` attribute.

```html
<anchor-icon size="2.5x" class="custom-class"></anchor-icon> 
```

You can also set a `px` size directly by just passing an integer

```html
<anchor-icon size="24" class="custom-class"></anchor-icon> 
```

## Tree shaking

By using ES imports like `import { AnchorIcon } from 'vue-sailor-icons'` with [webpack + minifier](https://webpack.js.org/guides/tree-shaking/#minify-the-output) or Rollup, unused exports in this module will be automatically eliminated.

To make webpack tree shaking work without using any minifier, you can use the per-file icons from [`icons`](https://unpkg.com/vue-sailor-icons/icons/) directory, e.g. `import AnchorIcon from 'vue-sailor-icons/icons/AnchorIcon'`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## Author

**vue-sailor-icons** © [katalonne](https://github.com/katalonne), Released under the [MIT](./LICENSE) License.<br>
Highly inspired by ([vue-feather-iconsst](https://github.com/egoist/vue-feather-icons)).
