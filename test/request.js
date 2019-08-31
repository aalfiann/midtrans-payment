var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",      // you must change this client_key with yours
    server_key: "xxx",      // you must change this server_key with yours
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

    it('request without action method will not make http request', function(){
        this.timeout(10000);
        var mdt = new MidTrans(config);
        mdt.server_key = 'xxx';
        assert.throws(function(){mdt.type('api').send(function(response) {})}, Error, "Error thrown");
    });

});