# midtrans-payment
[![NPM](https://nodei.co/npm/midtrans-payment.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/midtrans-payment/)  
  
[![npm version](https://img.shields.io/npm/v/midtrans-payment.svg?style=flat-square)](https://www.npmjs.org/package/midtrans-payment)
[![Build Status](https://travis-ci.org/aalfiann/midtrans-payment.svg?branch=master)](https://travis-ci.org/aalfiann/midtrans-payment)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/midtrans-payment/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/midtrans-payment?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/midtrans-payment/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/midtrans-payment?targetFile=package.json)
![NPM download/month](https://img.shields.io/npm/dm/midtrans-payment.svg)
![NPM download total](https://img.shields.io/npm/dt/midtrans-payment.svg)  
Midtrans Payment Gateway library for NodeJS

## Install using NPM
```bash
$ npm install midtrans-payment
```

## Usage
This library was created refer to MidTrans technical documentation version 3.48.0.  
Please see:  
- [SNAP Docs](https://snap-docs.midtrans.com/)
- [API Docs](http://api-docs.midtrans.com/)

### Set Config
```javascript
var MidTrans = require('midtrans-payment');

var config = {
    client_key: "YOUR_CLIENT_KEY",
    server_key: "YOUR_SERVER_KEY",
    mode: ""    // you can set to sandbox or production. Default is sandbox if empty.
};
```

### SNAP
#### Example to create Transactions
```javascript
var mdt = new MidTrans(config);
mdt.type('snap').action('transactions')
    .transaction_details('INV001',2000)
    .item_details('Midtrans Bear',1000,1,'Kid Toys')                //optional
    .item_details('Midtrans Cat',1000,1,'Kid Toys')                 //optional
    .customer_details('John','Doe','john.doe@gmail.com','+62856')   //optional
    .billing_address('John','Doe','john.doe@gmail.com','+62856')    //optional
    .shipping_address('John','Doe','john.doe@gmail.com','+62856')   //optional
    .send(function(response) {
        console.log(response.body);
    });
```

### API
#### Example to create API Charge Bank Transfer with Bank Permata
```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('charge')
    .transaction_details('INV002',2000)
    .item_details('Midtrans Bear',1000,1,'Kid Toys')                //optional
    .item_details('Midtrans Cat',1000,1,'Kid Toys')                 //optional
    .customer_details('John','Doe','john.doe@gmail.com','+62856')   //optional
    .billing_address('John','Doe','john.doe@gmail.com','+62856')    //optional
    .shipping_address('John','Doe','john.doe@gmail.com','+62856')   //optional
    .add('payment_type','bank_transfer')
    .add('bank_transfer',{
        bank: "permata",
        va_number: "1234567890"
    })
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example Get Credit Card Token
```javascript
var mdt = new MidTrans(config);

var payload = {
    gross_amount:10000,
    card_number:'4811 1111 1111 1114',
    card_exp_month:12,
    card_exp_year:2019,
    card_cvv:123
};

mdt.type('api').action('token',payload)
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to create API Charge Credit Card
```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('charge')
    .transaction_details('INV003',2000)
    .item_details('Midtrans Bear',1000,1,'Kid Toys')                //optional
    .item_details('Midtrans Cat',1000,1,'Kid Toys')                 //optional
    .customer_details('John','Doe','john.doe@gmail.com','+62856')   //optional
    .billing_address('John','Doe','john.doe@gmail.com','+62856')    //optional
    .shipping_address('John','Doe','john.doe@gmail.com','+62856')   //optional
    .add('payment_type','credit_card')
    .add('credit_card',{
        token_id: "<you must call API to get credit card token first>"
    })
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to get Transaction Status
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('status','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to get Transaction Status B2B
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('status/b2b','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to get Transaction Status B2B with pagination
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('status/b2b','INV001',{page:0,per_page:10})
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to APPROVE Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('approve','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to DENY Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('deny','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to CANCEL Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('cancel','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to EXPIRE Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('expire','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to REFUND Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('refund','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to REFUND DIRECT Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('refund/online/direct','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to Capture Transactions
```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('capture')
    .add('transaction_id','be4f3e44-d6ee-4355-8c64-c1d1dc7f4590')
    .add('gross_amount',145000)
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to Card Register
```javascript
var mdt = new MidTrans(config);

var payload = {
    card_number:'4811222233331114',
    card_exp_month:12,
    card_exp_year:2019,
    card_cvv:123
};

mdt.type('api')    //you can set type with snap or api
    .action('card/register',payload)
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to Point Inquiry
```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('point_inquiry','123',{gross_amount:1000})
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example to BIN API
```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('bins','455633')
    .send(function(response) {
        console.log(response.body);
    });
```

#### Example create body request manually
If our methods doesn't fit in your situation. You're able to build your custom body request.

```javascript
var mdt = new MidTrans(config);
mdt.type('api').action('charge')
    .add('payment_type','bank_transfer')
    .add('transaction_details',{
        gross_amount: 44000,
        order_id: "order-101c"
    })
    .add('customer_details',{
        email: "noreply@example.com",
        first_name: "budi",
        last_name: "utomo",
        phone: "+6281 1234 1234"
    })
    .add('item_details',[{
            id: "item01",
            price: 21000,
            quantity: 1,
            name: "Ayam Zozozo"
        },
        {
            id: "item02",
            price: 23000,    
            quantity: 1,
            name: "Ayam Xoxoxo"
        }
    ])
    .add('bank_transfer',{
        bank: "bca",
        va_number: "12345678901",
        free_text: {
            inquiry: [{
                id: "Your Custom Text in ID language",
                en: "Your Custom Text in EN language"
            }],
            payment: [{
                id: "Your Custom Text in ID language",
                en: "Your Custom Text in EN language"
            }]
        }
    })
    .send(function(response) {
        console.log(response.body);
    });
```

### RECURRING API
#### Example to Create Subscriptions
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .action('subscriptions')
        .subscriptions('SUB1',1000,'IDR','credit_card','yourtoken',1)
        .send(function(response){
            console.log(response.body);
        });
```

#### Example to Find Subscriptions
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .action('subscriptions','SUB1')
        .send(function(response){
            console.log(response.body);
        });
```

#### Example to Enable Subscriptions
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .do('enable').action('subscriptions','SUB1')
        .send(function(response){
            console.log(response.body);
        });
```

#### Example to Disable Subscriptions
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .do('disable').action('subscriptions','SUB1')
        .send(function(response){
            console.log(response.body);
        });
```

#### Example to Update Subscriptions
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .do('update').action('subscriptions','SUB1')
        .subscriptions('SUB1',2000,'IDR','credit_card','yourtoken',1)
        .send(function(response){
            console.log(response.body);
        });
```

#### Example create body request for subscriptions manually
```javascript
var mdt = new MidTrans(config);
    mdt.type('api')
        .action('subscriptions')
        .add('name','SUB1')
        .add('amount','2000')
        .add('currency','IDR')
        .add('payment_type','credit_card')
        .add('token','yourtoken')
        .add('interval',1)
        .send(function(response){
            console.log(response.body);
        });
```

### Response
We use [unirest](http://unirest.io/nodejs.html) library for handling call API to MidTrans.

### Available methods
If you want to know all available methods in this MidTrans Payment library
```javascript
var mdt = new MidTrans(config);
console.log(mdt.showAllMethods(mdt));
```

#### Main methods
- `type(name)`                                  this is to set SNAP or API  
- `do(name)`                                    this is to set update|enable|disable for subscriptions only  
- `action(name,data='',additional_payload='')`  this to set action API feature. Ex: `charge`|`approve`|`deny`|`cancel`|`expiry`|`point_inquiry`|`bins`|`subscriptions`|`status`|`status/b2b`|`refund`|`refund/online/direct`|`card/register`  
- `add(name,data)`                              this is to add new key for body request object  
- `send(callback)`                              this is to send request to MidTrans endpoint API  

#### Shortcut methods
We provide a shortcut methods for you to make easier create common body request
- `subscriptions(name,amount,currency,payment_type,token,interval)`  
- `transaction_details(order_id,amount)`  
- `item_details(name,price,quantity,brand='',category='',merchant_name='',tenor='',code_plan='',mid='')`  
- `customer_details(first_name='',last_name='',email='',phone='')`  
- `billing_address(first_name='',last_name='',email='',phone='',address='',city='',postal_code='',country_code='')`
- `shipping_address(first_name='',last_name='',email='',phone='',address='',city='',postal_code='',country_code='')`

#### Helper methods  
- `remove(name)`      this will delete the key in body request object  
- `clean()`           this will cleanup the body request object  
- `encode(data)`      this will encode {string|any) to base64 string  
- `decode(data)`      this will decode base64 string to original string  


### Additional Feature
For all additional feature like create `custom_field`, `custom_expiry`, `enabled_payments`, etc.  
We don't create that because we want this library always lightweight and stable when MidTrans add another new feature again.  

But you can still use additional feature with this way:
```javascript

// if you want to add enabled_payments in snap transaction
.add('enabled_payments',[ "credit_card", "permata_va", "bca_va", "bni_va"])

// if you want to add expiry in snap transactions
.add('expiry',{
    start_time: "2018-12-13 18:11:08 +0700",
    unit: "minutes",
    duration: 1
})

// if you want to add custom_expiry in API charge
.add('custom_expiry',{
    order_time: "2017-04-13 18:11:08 +0700",
    expiry_duration: 180,
    unit: "minute"
})
```

### Unit Test
If you want to play arround with testing
```
npm test
```