const express = require('express')


// setup
const app = express()


// routes
app.use((req, res, next) => {
  let { ip:ipaddress } = req
  let { 'accept-language':language, 'user-agent': software } = req.headers

  // parse ipv4
  ipaddress = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(ipaddress)[0]
  // format languages
  language = language.replace(/[;,\.0-9=q]/g, ' ').replace(/\s+/g, ';')
  // extract data
  software = /\(.*\)/.exec(software).join(';').replace(/\(|\)/g, '')

  res.json({ ipaddress, language, software })
})

// go!
app.on('error', console.error)
app.listen(process.env.NODE_PORT || process.env.PORT || 8000)
