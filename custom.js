var _ = require('lodash');
var log = require('../core/log.js');
var RSI = require('./indicators/RSI.js');
var fs = require('fs');

//////////////////////////////////////////////////////////////////////////////////////////
var method = {};

method.init = function() {
  this.currentTrend;
  var zgodovina = 15;
  this.requiredHistory = zgodovina;

  this.age = 0;
  this.trend = {
    direction: 'undefined',
    duration: 0,
    persisted: false,
    adviced: false
  };
  //this.historySize = 2;
  this.ppoadv = 'none';
  
  
  var cci1_parameters = {constant: 0.015, up: 100, down: -100, persistence: 0, history: zgodovina};
  var rsi1_parameters = {interval: 14, low: 30, high: 70, persistence: 0, history: zgodovina};
  var StochRSI1_parameters = {interval: 14, low: 20, high: 80, persistence: 0, history: zgodovina};
  //var StochRSI1_parameters = {interval: 14, low: 30, high: 70, persistence: 0, history: 90};
  global.stevec = 0;
  global.cena0 = 0;
  global.cena1 = 0;
  global.kupil = 0;
  global.stevec_candle = 0;
  global.ze_naredil = 0;
  global.StochRSIVal0 = 0;
  global.rsiVal0 = 0;
  global.cciVal0 = 0;
  global.StochRSIVal1 = 0;
  global.rsiVal1 = 0;
  global.cciVal1 = 0;
  global.kupil = 0;
  global.sveca1 = 0;
  global.sveca2 = 0;
  global.sveca3 = 0;
  global.sveca4 = 0;
  global.sveca5 = 0;
  global.povprecje0 = 0;
  global.povprecje1 = 1;
  global.razmerje = 0;
  global.cena_nakup = 0;
  global.cena_zdaj = 0;
  global.stprodaj = 0;
  
  this.addIndicator('cci', 'CCI', cci1_parameters);
  this.addIndicator('rsi', 'RSI', rsi1_parameters);
  this.addIndicator('stochrsi', 'RSI', StochRSI1_parameters);

  this.RSIhistory = [];

}

//////////////////////////////////////////////////////////////////////////////////////////
method.update = function(candle) {

  var rsi1_vmesn = this.indicators.stochrsi.rsi;
  
    this.RSIhistory.push(rsi1_vmesn);
  
    if(_.size(this.RSIhistory) > 14)
      this.RSIhistory.shift();
  
    this.lowestRSI = _.min(this.RSIhistory);
    this.highestRSI = _.max(this.RSIhistory);

    // return the stochRSI indicator
    this.stochRSI = ((rsi1_vmesn - this.lowestRSI) / (this.highestRSI - this.lowestRSI)) * 100;
    
}

//////////////////////////////////////////////////////////////////////////////////////////
method.log = function() {
  
}

//////////////////////////////////////////////////////////////////////////////////////////
method.check = function(candle) {

var ze_naredil = 0;

this.age++;
var cci = this.indicators.cci;
var rsi = this.indicators.rsi;

var StochRSIVal = this.stochRSI;
var rsiVal = rsi.rsi;
var cciVal = cci.result;

//if (stevec_candle == 190) {

//log.debug(stevec_candle,'StochRSIVal',StochRSIVal);  
//log.debug(stevec_candle,'rsiVAl',rsiVal);  
//log.debug(stevec_candle,'cciVal',cciVal);  

//}


if (stevec_candle == 0 && ze_naredil == 0) {

ze_naredil = 1;
kupil = 0;

}

if (stevec_candle > 0 && ze_naredil == 0 && kupil == 0 && StochRSIVal > StochRSIVal0 && rsiVal > rsiVal0 && cciVal > cciVal0 && stprodaj < 20) {
  
  this.advice('long');
  kupil = 1;
  cena_nakup = candle.close;
  ze_naredil = 1;
  
}

//cena_zdaj = candle.close;

if (stevec_candle > 0 && ze_naredil == 0 && kupil ==1 ) {
  
  if (StochRSIVal < StochRSIVal0 || rsiVal < rsiVal0 || cciVal < cciVal0 || StochRSIVal == StochRSIVal0 || rsiVal == rsiVal0 || cciVal == cciVal0) {

    //cena_zdaj = candle.close;

    //if (cena_zdaj > cena_nakup*1.2) {

  this.advice('short');
  kupil = 0;
  log.debug('buy',cena_nakup,'sell',cena_zdaj);

  ze_naredil = 1;
  stprodaj = stprodaj + 1;

    //}

 }

}

StochRSIVal0 = StochRSIVal;
rsiVal0 = rsiVal;
cciVal0 = cciVal; 

stevec_candle = stevec_candle + 1;

}

module.exports = method;
0
