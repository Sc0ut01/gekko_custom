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
  global.rsi_1 = 0;
  global.rsi_2 = 0;
  global.rsi_3 = 0;
  global.rsi_4 = 0;
  global.rsi_5 = 0;
  global.rsi_povprecje = 0;
  global.rsi_razmerje = 0;
  global.srsi_1 = 0;
  global.srsi_2 = 0;
  global.srsi_3 = 0;
  global.srsi_4 = 0;
  global.srsi_5 = 0;
  global.srsi_povprecje = 0;
  global.srsi_razmerje = 0;
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

if (stevec_candle == 1) {

  rsi_1 = rsiVal;
  srsi_1 = StochRSIVal;

}


if (stevec_candle == 2) {
  
  rsi_2 = rsiVal;
  srsi_2 = StochRSIVal;

}

if (stevec_candle == 3) {
    
  rsi_3 = rsiVal;
  srsi_3 = StochRSIVal;  

}

if (stevec_candle == 4) {
  
  rsi_4 = rsiVal;
  srsi_4 = StochRSIVal;

}

if (stevec_candle == 5) {
    
  rsi_5 = rsiVal;
  srsi_5 = StochRSIVal;  

}

if (stevec_candle > 5) {



  //rsi_povprecje = (rsi_1 + rsi_2 + rsi_3 + rsi_4 + rsi_5)/5;
  rsi_povprecje = ((rsi_2 - rsi_1) + (rsi_3 - rsi_2) + (rsi_4 - rsi_3) + (rsi_5 - rsi_4))/4;

  if (rsi_povprecje == 0) {
    
    rsi_povprecje = 0.00000001;
    
  }

  rsi_razmerje = (rsiVal - rsi_5)/rsi_povprecje;

  rsi_1 = rsi_2;
  rsi_2 = rsi_3;
  rsi_3 = rsi_4;
  rsi_4 = rsi_5;
  rsi_5 = rsiVal;

  //srsi_povprecje = (srsi_1 + srsi_2 + srsi_3 + srsi_4 + srsi_5)/5;
  srsi_povprecje = ((srsi_2 - srsi_1) + (srsi_3 - srsi_2) + (srsi_4 - srsi_3) + (srsi_5 - srsi_4))/4;
  
  if (srsi_povprecje == 0) {

    srsi_povprecje = 0.00000001;

  }

  srsi_razmerje = (StochRSIVal - srsi_5)/srsi_povprecje;

  srsi_1 = srsi_2;
  srsi_2 = srsi_3;
  srsi_3 = srsi_4;
  srsi_4 = srsi_5;
  srsi_5 = StochRSIVal;

  //if (stevec_candle < 40) {

  //log.debug(rsi_razmerje);
  

  //}

}

var zrsi_meja = 3;
var srsi_meja = -4;
var pada_rsi_razm = -0.7;
var pada_srsi_razm = -0.8;
var ravno_rsi_razm = 10;
var ravno_srsi_razm = 12;

var zsrsi_meja = 7;
var ssrsi_meja = -8;
var raste_rsi_razm = 1.1;
var raste_srsi_razm = 1.1;



//pada
//log.debug('rsi_povp',rsi_povprecje,'srsi_povp',srsi_povprecje);
//log.debug(srsi_povprecje);

if (stevec_candle > 0 && kupil == 0 && rsi_povprecje < srsi_meja) {
  
  //if (ze_naredil == 0 && StochRSIVal > StochRSIVal0 && rsiVal > rsiVal0 && cciVal > cciVal0) {

    if (ze_naredil == 0 && rsi_razmerje < pada_rsi_razm) {
    log.debug(stevec_candle,'pada',rsi_povprecje,rsiVal - rsi_4,rsi_razmerje);
  this.advice('long');
  kupil = 1;
  cena_nakup = candle.close;
  ze_naredil = 1;
  //log.debug('1','rsi_razm',rsi_razmerje, 'srsi_razm',srsi_razmerje,'rsi_povp',rsi_povprecje,'srsi_povp',srsi_povprecje);
 
  }

}

//vodoravno pod nulo
if (stevec_candle > 0 && kupil == 0 && rsi_povprecje > srsi_meja && rsi_povprecje < 0) {
  
  //if (ze_naredil == 0 && StochRSIVal > StochRSIVal0 && rsiVal > rsiVal0 && cciVal > cciVal0) {

    if (ze_naredil == 0 && rsi_razmerje < (-1*ravno_rsi_razm)) {
      log.debug(stevec_candle,'pod',rsi_povprecje,rsiVal - rsi_4,rsi_razmerje);
  this.advice('long');
  kupil = 1;
  cena_nakup = candle.close;
  ze_naredil = 1;
  //log.debug('2','rsi_razm',rsi_razmerje, 'srsi_razm',srsi_razmerje,'rsi_povp',rsi_povprecje,'srsi_povp',srsi_povprecje);
 
  }

}

//vodoravno naad nulo
if (stevec_candle > 0 && kupil == 0 && rsi_povprecje > 0 && rsi_povprecje < zrsi_meja) {
  
  //if (ze_naredil == 0 && StochRSIVal > StochRSIVal0 && rsiVal > rsiVal0 && cciVal > cciVal0) {

    if (ze_naredil == 0 && cciVal > cciVal0 && rsi_razmerje > ravno_rsi_razm) {
    log.debug(stevec_candle,'nad',rsi_povprecje,rsiVal - rsi_4,rsi_razmerje);
  this.advice('long');
  kupil = 1;
  cena_nakup = candle.close;
  ze_naredil = 1;
  //log.debug('2','rsi_razm',rsi_razmerje, 'srsi_razm',srsi_razmerje,'rsi_povp',rsi_povprecje,'srsi_povp',srsi_povprecje);
 
  }

}

//narasca
if (stevec_candle > 0 && kupil == 0 && rsi_povprecje > zrsi_meja) {
  //log.debug(stevec_candle,'trend rasti');
  //if (ze_naredil == 0 && StochRSIVal > StochRSIVal0 && rsiVal > rsiVal0 && cciVal > cciVal0) {

    if (ze_naredil == 0 && cciVal > cciVal0 && rsi_razmerje > raste_rsi_razm) {
    log.debug(stevec_candle,'raste',rsi_povprecje,rsiVal - rsi_4,rsi_razmerje);
  this.advice('long');
  kupil = 1;
  cena_nakup = candle.close;
  ze_naredil = 1;
  //log.debug('3','rsi_razm',rsi_razmerje, 'srsi_razm',srsi_razmerje,'rsi_povp',rsi_povprecje,'srsi_povp',srsi_povprecje);
 
  }

}

cena_zdaj = candle.close;

if (stevec_candle > 0 && ze_naredil == 0 && kupil ==1 && rsiVal < 70) {
  
  if (rsiVal < rsiVal0 || cciVal < cciVal0 || rsiVal == rsiVal0 || cciVal == cciVal0) {

    //if (cena_zdaj > cena_nakup*1.05) {

  this.advice('short');
  kupil = 0;
  //log.debug('buy',cena_nakup,'sell',cena_zdaj);

  ze_naredil = 1;
  stprodaj = stprodaj + 1;

    //}

 }

}

if (stevec_candle > 0 && ze_naredil == 0 && kupil ==1 && cena_zdaj > (cena_nakup*1.1)) {

  this.advice('short');
  kupil = 0;

  ze_naredil = 1;
  stprodaj = stprodaj + 1;

}


StochRSIVal0 = StochRSIVal;
rsiVal0 = rsiVal;
cciVal0 = cciVal; 

stevec_candle = stevec_candle + 1;

}

module.exports = method;
0
