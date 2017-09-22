var config = {};

config.debug = true; // for additional logging / debugging

config.trader = {
  enabled: false,
  key: '',
  secret: '',
  username: '', // your username, only required for specific exchanges.
  passphrase: '' // GDAX, requires a passphrase.
}


config.watch = {

  exchange: 'poloniex',
  currency: 'USDT',
  asset: 'BTC'
}



config.paperTrader = {
  enabled: true,
  reportInCurrency: true,
  simulationBalance: {
    asset: 0,
    currency: 147,
  },
  verbose: false,
  feeMaker: 0.15,
  feeTaker: 0.25,
  feeUsing: 'maker',
  slippage: 0.001
}


config.tradingAdvisor = {
  enabled: true,
  method: 'custom',
  candleSize: 1,
  historySize: 3,
  adapter: 'sqlite',
  talib: {
    enabled: true,
    version: '1.0.2'
  }
}



config.adviceLogger = {
  enabled: false
}

config.performanceAnalyzer = {
  enabled: true,
  riskFreeReturn: 5
}



config.adapter = 'sqlite';

config.sqlite = {
  path: 'plugins/sqlite',

  dataDirectory: 'history',
  version: 0.1,

  dependencies: []
}

config.backtest = {
    daterange: {from: '2017-06-20', to: '2017-09-18'},
    batchSize: 50
}

module.exports = config;
