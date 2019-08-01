var assert = require('assert');
var MidTrans = require('../src/midtrans.js');

var config = {
    client_key: "xxx",
    server_key: "xxx",
    mode: ""
};

describe('MidTrans body test', function(){

    it('transaction_details', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions').transaction_details('INV001',1000).getBody();
        assert.equal(body.transaction_details.order_id,'INV001');
        assert.equal(body.transaction_details.gross_amount,1000);
    });

    it('item_details', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1,'Kid Toys')
            .getBody();
        assert.equal(body.item_details[0].name,'Midtrans Bear');
        assert.equal(body.item_details[0].price,1000);
        assert.equal(body.item_details[0].quantity,1);
        assert.equal(body.item_details[0].brand,'Kid Toys');
        assert.equal(body.item_details[0].category,undefined);
        assert.equal(body.item_details[0].merchant_name,undefined);
    });

    it('multiple item_details', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',2000)
            .item_details('Midtrans Bear',1000,1,'Kid Toys')
            .item_details('Midtrans Cat',1000,1,'Kid Toys')
            .getBody();
            assert.equal(body.item_details[0].name,'Midtrans Bear');
            assert.equal(body.item_details[0].price,1000);
            assert.equal(body.item_details[0].quantity,1);
            assert.equal(body.item_details[0].brand,'Kid Toys');
            assert.equal(body.item_details[0].category,undefined);
            assert.equal(body.item_details[0].merchant_name,undefined);
            assert.equal(body.item_details[1].name,'Midtrans Cat');
            assert.equal(body.item_details[1].price,1000);
            assert.equal(body.item_details[1].quantity,1);
            assert.equal(body.item_details[1].brand,'Kid Toys');
            assert.equal(body.item_details[1].category,undefined);
            assert.equal(body.item_details[1].merchant_name,undefined);
    });

    it('customer_details', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .customer_details('John','Doe','john.doe@gmail.com','+62856')
            .getBody();
        assert.equal(body.customer_details.first_name,'John');
        assert.equal(body.customer_details.last_name,'Doe');
        assert.equal(body.customer_details.email,'john.doe@gmail.com');
        assert.equal(body.customer_details.phone,'+62856');
    });

    it('customer_details replace', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .customer_details('John','Doe','john.doe@gmail.com','+62856')
            .customer_details('John','Doe','john.doe.2@gmail.com','+62838')
            .getBody();
        assert.equal(body.customer_details.first_name,'John');
        assert.equal(body.customer_details.last_name,'Doe');
        assert.equal(body.customer_details.email,'john.doe.2@gmail.com');
        assert.equal(body.customer_details.phone,'+62838');
    });

    it('billing_address', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .customer_details('John','Doe','john.doe@gmail.com','+62856')
            .billing_address('John','Doe','john.doe@gmail.com','+62856')
            .getBody();
        assert.equal(body.customer_details.billing_address.first_name,'John');
        assert.equal(body.customer_details.billing_address.last_name,'Doe');
        assert.equal(body.customer_details.billing_address.email,'john.doe@gmail.com');
        assert.equal(body.customer_details.billing_address.phone,'+62856');
    });

    it('shipping_address', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .customer_details('John','Doe','john.doe@gmail.com','+62856')
            .shipping_address('John','Doe','john.doe@gmail.com','+62856')
            .getBody();
        assert.equal(body.customer_details.shipping_address.first_name,'John');
        assert.equal(body.customer_details.shipping_address.last_name,'Doe');
        assert.equal(body.customer_details.shipping_address.email,'john.doe@gmail.com');
        assert.equal(body.customer_details.shipping_address.phone,'+62856');
    });

    it('billing_address must have customer_details data', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .billing_address('John','Doe','john.doe@gmail.com','+62856')
            .getBody();
        assert.equal(body.customer_details,undefined);
    });

    it('shipping_address must have customer_details data', function(){
        var mdt = new MidTrans(config);
        var body = mdt.type('snap').action('transactions')
            .transaction_details('INV001',1000)
            .item_details('Midtrans Bear',1000,1)
            .shipping_address('John','Doe','john.doe@gmail.com','+62856')
            .getBody();
        assert.equal(body.customer_details,undefined);
    });

});