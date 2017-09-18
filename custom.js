// helpers
var _ = require('lodash');
var log = require('../core/log.js');

//values
  //macd1
global.macd1_short = 10;
global.macd1_long = 21;
global.macd1_signal = 9;
global.macd1_down = -0.025;
global.macd1_up = 0.025;
global.macd1_persistence = 1;

  //dema1
global.dema1_short = 10;
global.dema1_long = 28;
global.dema1_down = -0.025;
global.dema1_up = 0.025;

  //RSI
global.rsi1_interval = 10;
global.rsi1_low = 30;
global.rsi1_high = 70;
global.rsi1_persistence = 1;

  //cci
global.cci1_constant = 0.015;
global.cci1_history = 90;
global.cci1_up = 120;
global.cci1_down = -30;
global.cci1_persistance = 1;

// configuration
var config = require('../core/util.js').getConfig();
// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  
  this.name = 'MACD_DEMA_RSI_CCI';
  this.currentTrend;
  this.requiredHistory = config.tradingAdvisor.historySize;
  // define the indicators we need
  var macd1_parameters = {short: global.macd1_short, long: global.macd1_long, signal: global.macd1_signal, down: global.macd1_down, up: global.macd1_up, persistence: global.macd1_persistence};
  this.addIndicator('macd1', 'MACD', macd1_parameters);
  
  var dema1_parameters = {short: global.dema1_short, long: global.dema1_short, down: global.dema1_down, up: global.dema1_up};
  this.addIndicator('dema1', 'DEMA', dema1_parameters);
  
  var rsi1_parameters = {interval: global.rs1_interval, low: global.rs1_low, high: global.rs1_high, persistence: global.rs1_persistence};
  this.addIndicator('rsi1', 'RSI', rsi1_parameters);
  
  var cci1_parameters = {constant: global.cci1_constant, history: global.cci1_history, up: global.cci1_up, down: global.cci1_down, persistence: global.cci1_persistence};
  this.addIndicator('cci1', 'CCI', cci1_parameters);
  
  //this.addIndicator('ema21', 'EMA', 21);
  //this.addIndicator('ema34', 'EMA', 34);
  //this.addIndicator('ema144', 'EMA', 144);
  
  // initial value
  this.lastLongPrice = 0;
}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!  
}

// for debugging purposes: log the last calculated
method.log = function() {
}

method.check = function() {
  var macd1_diff = this.indicators.macd1.result; 
  if(macd1_diff > macd1_up) {
    if(this.trend.direction !== 'up')
      this.trend = {
        duration: 0,
        persisted: false,
        direction: 'up',
        adviced: false
      };

  
  

  
  
  
  
}

module.exports = method;
