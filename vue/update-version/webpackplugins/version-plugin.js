const fs = require('fs')
const path = require('path')

class VersionPlugin {
  constructor({ version }) {
    this.version = version
  }
  apply(compiler) {
    compiler.hooks.done.tap('VersionPlugin', (stats) => {
      const versionInfo = {
        version: this.version,
        buildTime: new Date().toISOString()
      }
      const outputPath = stats.compilation.options.output.path
      const versionFilePath = path.resolve(outputPath, 'version.json')
      fs.writeFileSync(versionFilePath, JSON.stringify(versionInfo, null, 2))
      console.log('Version file generated successfully!')
    })
  }
}
module.exports = VersionPlugin
