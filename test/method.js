var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",
    server_key: "xxx",
    mode: ""
};

describe('MidTrans method test', function(){

    it('should display all methods in array', function(){
        var mdt = new MidTrans(config);
        assert.equal(Array.isArray(mdt.showAllMethods(mdt)),true);
    });

    it('method type() without following chain action() method will return undefined', function(){
        var mdt = new MidTrans(config);
        mdt.type([]);
        assert.deepEqual(mdt.url,undefined);
    });

    it('method action() will be auto fix type() method', function(){
        var mdt = new MidTrans(config);
        mdt.type([]).action('status','INV001');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/INV001/status');
    });

    it('method add() with wrong parameter object type or undefined parameter will not adding any key in body request', function(){
        var mdt = new MidTrans(config);
        var body = mdt.action('transactions').add([],undefined).getBody();
        assert.deepEqual(body,{});
    });

    it('method add() with second wrong parameter object type or undefined parameter will not adding any key in body request', function(){
        var mdt = new MidTrans(config);
        var body = mdt.action('transactions').add('transaction_details',undefined).getBody();
        assert.deepEqual(body,{});
    });

    it('method remove() with wrong parameter object type or undefined parameter will not remove any key in body request', function(){
        var mdt = new MidTrans(config);
        var body = mdt.action('transactions').transaction_details('INV001',1000).remove().getBody();
        assert.deepEqual(body,{ transaction_details: { order_id: 'INV001', gross_amount: 1000 } });
    });
    
});