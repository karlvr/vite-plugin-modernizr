import modernizr from 'modernizr'
import path from 'node:path'
import fs from 'node:fs/promises'
import { Plugin } from 'vite'

function accept(id: string): boolean {
	return id.endsWith('.modernizr.json')
		|| id.endsWith('/modernizr.json')
		|| id.endsWith('/modernizrrc')
}

interface Config {
	/** Whether to expose the global Modernizr */
	global: boolean
}

export default function modernizrPlugin(pluginConfig: Config): Plugin {
	return {
		name: 'vite-plugin-modernizr',
		enforce: 'pre',

		/* Handle virtual module loading for the Modernizr config */
		async resolveId(id, importer) {
			if (accept(id)) {
				if (importer) {
					return `virtual:modernizr:${path.resolve(path.dirname(importer), id)}`
				} else {
					return `virtual:modernizr:${path.resolve(id)}`
				}
			}
			return null
		},

		/* Generate Modernizr JS when a Modernizr config file is loaded */
		async load(id) {
			if (!id.startsWith('virtual:modernizr:')) {
				return
			}

			try {
				const configPath = id.substring('virtual:modernizr:'.length)
				const config = JSON.parse(await fs.readFile(configPath, 'utf-8'))
				config.scriptGlobalName = 'root'

				const modernizrJs = await new Promise((resolve, reject) => {
					modernizr.build(config, (result) => {
						if (result) {
							resolve(result)
						} else {
							reject(new Error('Failed to generate Modernizr build'))
						}
					})
				})

				let result = `const root = {}
${modernizrJs}
export default root.Modernizr;
`
				if (pluginConfig.global) {
					result += 'window.Modernizr = root.Modernizr;\n'
				}
				return result
			} catch (error) {
				throw new Error(`Failed to generate Modernizr build: ${error instanceof Error ? error.message : error}`)
			}
		},
	}
}
