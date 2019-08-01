var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",  //don't change this
    server_key: "xxx",  //don't change this
    mode: ""
};

describe('MidTrans authorization test', function(){

    it('base64 encode', function(){
        var mdt = new MidTrans(config);
        assert.equal(mdt.encode(mdt.server_key),'eHh4');
    });

    it('base64 decode', function(){
        var mdt = new MidTrans(config);
        assert.equal(mdt.decode('eHh4'),'xxx');
    });

    it('base64 authorization', function(){
        var mdt = new MidTrans(config);
        assert.equal(mdt.encode(mdt.server_key+':'),'eHh4Og==');
    });

});