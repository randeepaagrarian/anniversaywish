const request = require('request')
const schedule = require('node-schedule')
const lineReader = require('line-reader');

let rule = new schedule.RecurrenceRule();

rule.second = 0
rule.minute = 13
rule.hour = 23

let api = '15572917316573'
let message = 'Ada dina Randeepa sayavana (6) sanvathsarayedi ape havulkaruvan vu oba samata sthuthiya puda karamu ~ Govi Bimatayi, Govi Rajutayi - Randeepa'

lineReader.eachLine('./numbers_all_dev.txt', function(number) {

  console.log("Number read for => " + number)

  let sendMessage = schedule.scheduleJob(rule, function() {
    console.log("Started scheduling for => " + number)
    request('https://cpsolutions.dialog.lk/index.php/cbs/sms/send?destination=' + number + '&q=' + api + '&message=' + message, { json: true }, function(err, res, body) {
      if(err) { return console.log(err) }
      if(res.body == 0) {
        console.log("Sent successfully => " + number)
      } else {
        console.log("Failed to send => " + number)
      }
    })
  })

});
