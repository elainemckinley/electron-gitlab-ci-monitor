const packager = require('electron-packager')
packager({
    arch: 'x64',
    dir: '.',
    overwrite: true,
    packageManager: 'yarn',
    platform: 'darwin'
}).then(installers => {
    console.log(`Built ${installers.length} artifacts, located at ${installers}`)
    console.log('Packaged Successfully!')
}).catch(error => {
    console.log('Failed to package app: ', error)
})