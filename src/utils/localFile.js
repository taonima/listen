import { app } from 'electron'
const fs = require('fs')

export default {
  address: `${app.getPath('userData')}/json`,
  init () {
    fs.stat(this.address, (err, stats) => {
      if (err) {
        if (err.errno === -4058) {
          fs.mkdirSync(this.address, { recursive: true })
        }
      }
      ['user', 'play_control'].forEach(i => {
        fs.writeFile(`${this.address}/${i}.json`, '', {
          flag: 'wx'
        }, (err) => {
          if (err) console.error(`${i}文件已存在`)
        })
      })
    })
  },
  write (fileName, data) {
    console.log('写入:' + fileName)
    fs.writeFile(`${this.address}/${fileName}`, data, (err) => {
      if (err) {
        return console.error(err)
      }
      console.log(fileName + '数据写入成功！')
    })
  },
  read (fileName, func) {
    console.log('读取：' + fileName)
    fs.readFile(`${this.address}/${fileName}`, function (err, data) {
      if (err) {
        return console.error(err)
      }
      console.log('读取成功')
      func && func(JSON.parse(data.toString()))
    })
  }
}
