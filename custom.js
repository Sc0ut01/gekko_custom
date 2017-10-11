// helpers
var _ = require('lodash');
var log = require('../core/log.js');
var RSI = require('./indicators/RSI.js');

var fs = require('fs');

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  this.currentTrend;
  //this.requiredHistory = 2;

  this.age = 0;
  this.trend = {
    direction: 'undefined',
    duration: 0,
    persisted: false,
    adviced: false
  };
  //this.historySize = 2;
  this.ppoadv = 'none';
  
  var cci1_parameters = {constant: 0.015, history: 0, up: 100, down: -100, persistence: 0}
  var rsi1_parameters = {interval: 14, low: 30, high: 70, persistence: 0}
  var StochRSI1_parameters = {interval: 3, low: 20, high: 80, persistence: 0}
  global.stevec = 0;
  global.cena0 = 0;
  global.cena1 = 0;
  global.kupil = 0;
  global.stevec_candle = 0;
  global.ze_naredil = 0;

  // log.debug("CCI started with:\nup:\t", this.uplevel, "\ndown:\t", this.downlevel, "\npersistence:\t", this.persisted);
  // define the indicators we need
  
  this.addIndicator('cci', 'CCI', cci1_parameters);
  this.addIndicator('rsi', 'RSI', rsi1_parameters);
  //this.addIndicator('StochRSI', 'StochRSI', StochRSI1_parameters);
  
}

// what happens on every new candle?
method.update = function(candle) {

  
  

}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function() {
  


}

/*
 *
 */
method.check = function(candle) {

 // var price = candle.close;

//log.debug(candle.close)

var cci = this.indicators.cci;
var rsi = this.indicators.rsi;
//var StochRSI = this.stochRSI;
var rsiVal = rsi.rsi;

//if (typeof(cci.result) == 'number') {
var cciVal = cci.result.toFixed(2);
//}

if (stevec_candle == 30) {

log.debug(stevec_candle,'candle_stevec',cciVal);  
//log.debug(stevec_candle,'candle_stevec',cci, rsi, StochRSI);  

}

stevec_candle = stevec_candle + 1;





}

module.exports = method;
