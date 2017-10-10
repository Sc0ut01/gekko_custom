// helpers
var _ = require('lodash');
var log = require('../core/log.js');

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
  //this.uplevel = 100;
  //this.downlevel = 100;
  //this.persisted = 0;
var cci1_parameters = {constant: 0.015, history: 0, up: 100, down: -100, persistenc: 1}
global.stevec = 0;
global.cena0 = 0;
global.cena1 = 0;
global.kupil = 0;
global.stevec_candle = 0;
global.ze_naredil = 0;

  // log.debug("CCI started with:\nup:\t", this.uplevel, "\ndown:\t", this.downlevel, "\npersistence:\t", this.persisted);
  // define the indicators we need
  this.addIndicator('cci', 'CCI', cci1_parameters);
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

//log.debug(stevec_candle,'candle_stevec',stevec,'stevec');  
//stevec_candle = stevec_candle + 1;

ze_naredil = 0;

  if (stevec == 0 && ze_naredil == 0) {

    cena0 = candle.close;
    log.debug(stevec,'stevec',cena0,' ',cena1);
    stevec = stevec + 1;
    ze_naredil = 1;

  } 
  
  if (stevec == 1 && ze_naredil == 0) {

    cena1 = candle.close;

    if (cena1 > cena0 && ze_naredil == 0) {

        this.advice('long');
        kupil = 1;
        log.debug(stevec,'stevec',cena0,' ',cena1,'kupil');
        cena0 = cena1;
        stevec = stevec + 1;
        ze_naredil = 1;

    }

  } 
  
  if (stevec > 1 && kupil == 1 && ze_naredil == 0) {

    cena1 = candle.close;

    if (cena1 < cena0) {

        this.advice('short');
        kupil = 0;
        log.debug(stevec,'stevec',cena0,' ',cena1,'prodal');
        stevec = stevec + 1;
        ze_naredil = 1;

    }

    cena0 = cena1;

 }
    
 if (stevec > 1 && kupil == 0 && ze_naredil == 0) {
  
      cena1 = candle.close;
  
      if (cena1 > cena0*1.2) {
  
          this.advice('long');
          kupil = 1;
          log.debug(stevec,'stevec',cena0,' ',cena1,'kupil');
          stevec = stevec + 1;
          ze_naredil = 1;
  
      }
  
      cena0 = cena1;
  
   }



}

module.exports = method;
