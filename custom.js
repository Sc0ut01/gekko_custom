var _ = require('lodash');
var log = require('../core/log.js');
var RSI = require('./indicators/RSI.js');
var fs = require('fs');

//////////////////////////////////////////////////////////////////////////////////////////
var method = {};

method.init = function() {
  this.currentTrend;
  this.requiredHistory = 90;

  this.age = 0;
  this.trend = {
    direction: 'undefined',
    duration: 0,
    persisted: false,
    adviced: false
  };
  //this.historySize = 2;
  this.ppoadv = 'none';
  
  var cci1_parameters = {constant: 0.015, history: 0, up: 100, down: -100, persistence: 0, history: 90};
  var rsi1_parameters = {interval: 14, low: 30, high: 70, persistence: 0, history: 90};
  var StochRSI1_parameters = {interval: 14, low: 20, high: 80, persistence: 0, history: 90};
  //var StochRSI1_parameters = {interval: 14, low: 30, high: 70, persistence: 0, history: 90};
  global.stevec = 0;
  global.cena0 = 0;
  global.cena1 = 0;
  global.kupil = 0;
  global.stevec_candle = 0;
  global.ze_naredil = 0;
  
  this.addIndicator('cci', 'CCI', cci1_parameters);
  this.addIndicator('rsi', 'RSI', rsi1_parameters);
  this.addIndicator('stochrsi', 'RSI', StochRSI1_parameters);

  this.RSIhistory = [];

}

//////////////////////////////////////////////////////////////////////////////////////////
method.update = function(candle) {

  var rsi = this.indicators.stochrsi.rsi;
  
    this.RSIhistory.push(rsi);
  
    if(_.size(this.RSIhistory) > 14)
      this.RSIhistory.shift();
  
    this.lowestRSI = _.min(this.RSIhistory);
    this.highestRSI = _.max(this.RSIhistory);

    // return the stochRSI indicator
    this.stochRSI = ((rsi - this.lowestRSI) / (this.highestRSI - this.lowestRSI)) * 100;
    
}

//////////////////////////////////////////////////////////////////////////////////////////
method.log = function() {
  
}

//////////////////////////////////////////////////////////////////////////////////////////
method.check = function(candle) {

this.age++;
var cci = this.indicators.cci;
var rsi = this.indicators.rsi;

var StochRSIVal = this.stochRSI;
var rsiVal = rsi.rsi;
var cciVal = cci.result;

log.debug(stevec_candle,'StochRSIVal',StochRSIVal);  
log.debug(stevec_candle,'rsiVAl',rsiVal);  
log.debug(stevec_candle,'cciVal',cciVal);  

stevec_candle = stevec_candle + 1;

}

module.exports = method;
