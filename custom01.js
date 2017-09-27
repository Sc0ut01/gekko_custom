// helpers
var _ = require('lodash');
var log = require('../core/log.js');


// configuration
var config = require('../core/util.js').getConfig();
// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  
  this.name = 'MACD_DEMA_RSI_CCI';
  this.trend = {
    direction: 'none',
    duration: 0,
    persisted: false,
    adviced: false
  };

  this.requiredHistory = config.tradingAdvisor.historySize;
  // define the indicators we need
  var macd1_parameters = {short: 10, long: 21, signal: 9};
  this.addIndicator('macd1', 'MACD', macd1_parameters);
  
  var dema1_parameters = {short: 10, long: 21};
  this.addIndicator('dema1', 'DEMA', dema1_parameters);
  
  //var rsi1_parameters = {interval: global.rs1_interval, low: global.rs1_low, high: global.rs1_high, persistence: global.rs1_persistence};
  //this.addIndicator('rsi1', 'RSI', rsi1_parameters);
  
  //var cci1_parameters = {constant: global.cci1_constant, history: global.cci1_history, up: global.cci1_up, down: global.cci1_down, persistence: global.cci1_persistence};
  //this.addIndicator('cci1', 'CCI', cci1_parameters);
  
  //this.addIndicator('ema21', 'EMA', 21);
  //this.addIndicator('ema34', 'EMA', 34);
  //this.addIndicator('ema144', 'EMA', 144);
  
  // initial value
  //this.lastLongPrice = 0;
}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!  
}

// for debugging purposes: log the last calculated
method.log = function() {

}

method.check = function() {
  
  var macd1_down = -0.025;
  var macd1_up = 0.025;
  var macd1_persistence = 1;
  
  var dema1_down = -0.25;
  var dema1_up = 0.25;
  
  var strat_sum = 0;
  
  //macd1-----------------------------------------------------------
  
  var macd1_diff = this.indicators.macd1.result; 
  if(macd1_diff > macd1_up) {
    if(this.trend.direction !== 'up')
      this.trend = {
        duration: 0,
        persisted: false,
        direction: 'up',
        adviced: false
      };
  this.trend.duration++;
  log.debug('In uptrend since', this.trend.duration, 'candle(s)');
    if(this.trend.duration >= macd1_persistence)
      this.trend.persisted = true;
    if(this.trend.persisted && !this.trend.adviced) {
      this.trend.adviced = true;
      strat_sum = strat_sum + 2;
      //this.advice('long');
      } else
      this.advice(); 
 
  }else if(macd1_diff < macd1_down) {
    if(this.trend.direction !== 'down')
      this.trend = {
        duration: 0,
        persisted: false,
        direction: 'down',
        adviced: false
      };
    this.trend.duration++;
    log.debug('In downtrend since', this.trend.duration, 'candle(s)');
    if(this.trend.duration >= macd1_persistence)
      this.trend.persisted = true;
    if(this.trend.persisted && !this.trend.adviced) {
      this.trend.adviced = true;
      strat_sum =strat_sum + 4;
      //this.advice('short');
    } else
      this.advice();

  } else {

    log.debug('In no trend');
    
  }
  
  //dema1----------------------------------------------------------------------------  
    
  //var dema1_result = this.indicators.dema1;
  var dema1_diff = this.indicators.dema1.result;
  var dema1_price = candle.close;

  //var message = '@ ' + price.toFixed(8) + ' (' + diff.toFixed(5) + ')';

  if(dema1_diff > dema1_up) {
    log.debug('we are currently in uptrend', message);

    if(this.currentTrend !== 'up') {
      this.currentTrend = 'up';
      strat_sum =strat_sum + 8;
      //this.advice('long');
    } else
      this.advice();

  } else if(dema1_diff < dema1_down) {
    log.debug('we are currently in a downtrend', message);

    if(this.currentTrend !== 'down') {
      this.currentTrend = 'down';
      strat_sum =strat_sum + 16;
      //this.advice('short');
    } else
      this.advice();

  } else {
    log.debug('we are currently not in an up or down trend', message);
    this.advice();
  }

    
if(strat_sum = 10) {
      this.currentTrend = 'long';
      this.advice('long')    
} else if (strat_sum = 20) {
      this.currentTrend = 'short;
      this.advice('short')
}
 
}

module.exports = method;
