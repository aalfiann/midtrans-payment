var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",  //don't change this
    server_key: "xxx",  //don't change this
    mode: ""
};

describe('MidTrans configuration test', function(){

    it('configuration must be object type',function(){
        var result = false;
        for(var key in config) {
            if(config.hasOwnProperty(key)) {
                result = true;
            }
        }
        assert.equal(result, true);
    });

    it('configuration must be hasOwnProperty',function(){
        const config = Object.create({name: 'inherited'})
        var mdt = new MidTrans(config);
        assert.equal(mdt.server_key,undefined);
        assert.equal(mdt.client_key,undefined);
        assert.equal(mdt.mode,'sandbox');
    });

    it('configuration with array object will throw an error',function(){
        assert.throws(function(){new MidTrans([])},Error,'Error thrown');
    });

    it('configuration with string object will throw an error',function(){
        assert.throws(function(){new MidTrans("")},Error,'Error thrown');
    });

    it('configuration undefined will throw an error',function(){
        assert.throws(function(){new MidTrans(undefined)},Error,'Error thrown');
    });

    it('configuration null will throw an error',function(){
        assert.throws(function(){new MidTrans(null)},Error,'Error thrown');
    });

    it('complete configuration',function(){
        var mdt = new MidTrans(config);
        assert.equal(mdt.client_key,'xxx');
        assert.equal(mdt.server_key,'xxx');
        assert.equal(mdt.mode,'sandbox');
    });

    it('configuration without mode then mode value will be as \'sandbox\'',function(){
        delete config.mode;
        var mdt = new MidTrans(config);
        assert.equal(mdt.client_key,'xxx');
        assert.equal(mdt.server_key,'xxx');
        assert.equal(mdt.mode,'sandbox');        
    });

    it('configuration for production',function(){
        config.mode = 'production';
        var mdt = new MidTrans(config);
        assert.equal(mdt.client_key,'xxx');
        assert.equal(mdt.server_key,'xxx');
        assert.equal(mdt.mode,'production');        
    });

});