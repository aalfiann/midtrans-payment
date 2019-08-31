var assert = require('assert');
var Base64 = require('../src/base64.js');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",  //don't change this
    server_key: "xxx",  //don't change this
    mode: ""
};

describe('Base64 String test', function(){
    var base64 = new Base64();
    it('encode',function(){
        var result = base64.encode('abcdefghijklmnopqrstuvwxyz');
        assert.equal(result,'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=');
    });

    it('decode',function(){
        var result = base64.decode('YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=');
        assert.equal(result,'abcdefghijklmnopqrstuvwxyz');
    });

    it('decode format buffer will return buffer',function(){
        var base64 = new Base64('buffer');
        var result = base64.decode('YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=');
        assert.equal(true,Buffer.isBuffer(result));
    });

    it('base64 authorization', function(){
        var mdt = new MidTrans(config);
        assert.equal(mdt.encode(mdt.server_key+':'),'eHh4Og==');
    });

});