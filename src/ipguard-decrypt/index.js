const fs = require('fs')

function transfer(oldpath, newPath) {
  
  console.log('copy file :',  oldpath)
  fs.promises.copyFile(oldpath,newPath)
}

;(function read(path = '') {
  const result = fs.readdirSync(`./input${path}`)
  result.forEach(it => {
    const realpath = `${path}/${it}`
    const stat = fs.statSync(`./input${realpath}`)
    if (stat.isFile()) {
      return transfer(`./input${realpath}`, `./output${realpath}`)
    }

    if (!fs.existsSync(`./output${realpath}`)) {
      fs.mkdirSync(`./output${realpath}`)
    }

    read(realpath)
  })
})()
