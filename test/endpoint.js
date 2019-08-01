var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",
    server_key: "xxx",
    mode: ""
};

describe('MidTrans endpoint url test', function(){

    it('endpoint url production', function(){
        var mdt = new MidTrans(config);
        mdt.mode = 'production';
        mdt.action('status');
        assert.equal(mdt.url,'https://api.midtrans.com/v2/status');
    });

    it('endpoint url sandbox', function(){
        var mdt = new MidTrans(config);
        mdt.action('status');
        assert.equal(mdt.url,'https://api.sandbox.midtrans.com/v2/status');
    });

    it('endpoint url snap production transactions', function(){
        var mdt = new MidTrans(config);
        mdt.mode = 'production';
        mdt.type('snap').action('transactions');
        assert.equal(mdt.url,'https://app.midtrans.com/snap/v1/transactions');
    });

    it('endpoint url snap sandbox transactions', function(){
        var mdt = new MidTrans(config);
        mdt.type('snap').action('transactions');
        assert.equal(mdt.url,'https://app.sandbox.midtrans.com/snap/v1/transactions');
    });

});
