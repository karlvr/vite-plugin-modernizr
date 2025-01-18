# vite-plugin-modernizr

A Vite plugin to generate and use a custom [Modernizr](https://github.com/Modernizr/Modernizr) build based on a JSON config.

## Installation

```shell
npm install --save-dev vite-plugin-modernizr
```

Then add the plugin to your Vite config:

```javascript
import modernizrPlugin from 'vite-plugin-modernizr'

export default defineConfig(() => {
	return {
		plugins: [
			modernizrPlugin({
				global: true,
			}),
		],
	}
})
```

## Configuration

The plugin supports the following options:

|Name|Type|Description|
|----|----|-----------|
|`global`|`boolean`|Whether to set `Modernizr` as a global on `window` of not. Default `false`.|

## Usage

Create a [Modernizr](https://github.com/Modernizr/Modernizr) config JSON file and name it `modernizr.json` or anything ending in `.modernizr.json` or `modernizrrc`. Import it in a JavaScript file:

```javascript
import './modernizr.json'
```

Your `modernizr.json` should look something like:

```json
{
	"options": [
		"domPrefixes",
		"html5shiv",
		"prefixed",
		"prefixedCSS",
		"prefixes",
		"setClasses",
		"testAllProps",
		"testProp",
		"testStyles"
	],
	"feature-detects": [
		"css/animations",
		"css/backdropfilter",
		"css/transforms",
		"css/transforms3d",
		"css/transitions",
		"css/flexbox",
		"css/flexboxlegacy",
		"css/objectfit",
		"svg",
		"touchevents"
	]
}
```
