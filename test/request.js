var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
  client_key: "SB-Mid-client-VkoWRW-TxM--GpB1",      // you must change this client_key with yours
  server_key: "SB-Mid-server-KU7TmPkIVrVboMAsuN4P8fEN",      // you must change this server_key with yours
  mode: ""
};

describe('MidTrans request test', function(){
  it('request with wrong authorization should return 401', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    mdt.server_key = 'xxx';
    var body = mdt.type('snap').action('transactions').transaction_details('INV001',1000);
    body.send(function(response) {
      if(response.statusCode == 401){
        done();
      } else {
        done(new Error(JSON.stringify(response.body)));
      }
    });
  });

  it('request with wrong authorization should return 401 (Promise based)', function(done){
    this.timeout(10000);

    var mdt = new MidTrans(config);
    mdt.server_key = 'xxx';
    var body = mdt.type('snap').action('transactions').transaction_details('INV001',1000);

    body.sendAsync().then((response) => {
      done();
    }).catch(err => {
      if(err.status === 401) {
        done();
      } else {
        done(new Error(JSON.stringify(err)));
      }
    });
  });

  it('action: token with secure true will thrown error with wrong data information', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var payload = {
      card_number:'4811 1111 1111 1114',
      card_exp_month:12,
      card_exp_year:2019,
      card_cvv:123,
      gross_amount:10000,
      secure:true
    };
    var body = mdt.type('api').action('token',payload);
    body.send(function(response) {
      if(response.statusCode == 200 && response.body.status_code >= 400){
        done();
      } else {
        done(new Error(JSON.stringify(response.body)));
      }
    });
  });

  it('action: token with secure false will return success 200 (Promise based)', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var payload = {
      card_number: '4811 1111 1111 1114',
      card_exp_month: 12,
      card_exp_year: new Date().getFullYear(),
      card_cvv: 123,
      gross_amount: 10000,
      secure: false
    };
    var body = mdt.type('api').action('token',payload);
    body.sendAsync().then(res => {
      assert.strictEqual(res.body.status_code === '200', true);
      done();
    }).catch(err => {
      done(new Error(JSON.stringify(err)));
    });
  });

  it('request with header: get', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.action('status');
    body.send(function(response) {
      if(response.req.connection._httpMessage.method == 'GET'){
        done();
      } else {
        done(new Error(JSON.stringify({url:mdt.url,method:response.req.connection._httpMessage.method})));
      }
    });
  });

  it('request get with status 404 (Promise based)', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.action('status');
    body.sendAsync().then(res => {
      done();
    }).catch(err => {
      if(err.status === 404) {
        done();
      } else {
        done(new Error(JSON.stringify(err)));
      }
    });
  });

  it('request with header: post', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.do('enable').type('api').action('subscriptions','sub1');
    body.send(function(response) {
      if(response.req.connection._httpMessage.method == 'POST'){
        done();
      } else {
        done(new Error(JSON.stringify({url:mdt.url,method:response.req.connection._httpMessage.method})));
      }
    });
  });

  it('request post with status 404 (Promise based)', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.do('enable').type('api').action('subscriptions','sub1');
    body.sendAsync().then(res => {
      done();
    }).catch(err => {
      if(err.status === 404) {
        done();
      } else {
        done(new Error(JSON.stringify(err)));
      }
    });
  });

  it('request with header: patch', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.do('update').type('api').action('subscriptions','sub1');
    body.send(function(response) {
      if(response.req.connection._httpMessage.method == 'PATCH'){
        done();
      } else {
        done(new Error(JSON.stringify({url:mdt.url,method:response.req.connection._httpMessage.method})));
      }
    });
  });

  it('request patch with status 404', function(done){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    var body = mdt.do('update').type('api').action('subscriptions','sub1');
    body.sendAsync().then(res => {
      done();
    }).catch(err => {
      if(err.status === 404) {
        done();
      } else {
        done(new Error(JSON.stringify(err)));
      }
    });
  });

  it('request without action method will not make http request', function(){
    this.timeout(10000);
    var mdt = new MidTrans(config);
    mdt.server_key = 'xxx';
    assert.throws(function(){mdt.type('api').send(function(response) {})}, Error, "Error thrown");
  });

  // it('try to send transaction bca va', function () {
  //   this.timeout(10000);
  //   var mdt = new MidTrans(config);
  //   mdt.type('api').action('charge').transaction_details('TEST01','10000.00');
  //   mdt.add('payment_type','bank_transfer').add('bank_transfer',{'bank':'bca','va_number':'12345678'});
  //   mdt.send(function (response) {
  //     console.log(response.body);
  //   });
  // });
});
