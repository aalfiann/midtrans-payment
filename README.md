# midtrans-payment
Midtrans Payment Gateway library for NodeJS

### Install
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

### Example to create Transactions via SNAP
```javascript
var mdt = MidTrans(config);
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

### Example to create API Charge Bank Transfer with Bank Permata
```javascript

var mdt = MidTrans(config);
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

### Example Get Credit Card Token
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

### Example to create API Charge Credit Card
```javascript
var mdt = MidTrans(config);
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

### Example to get Transaction Status
```javascript
var mdt = new MidTrans(config);
mdt.type('snap')    //you can set type with snap or api
    .action('status','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example to APPROVE Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('approve','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example to DENY Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('deny','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example to CANCEL Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('cancel','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example to EXPIRE Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('expire','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example to REFUND Transaction
```javascript
var mdt = new MidTrans(config);
mdt.type('api')    //you can set type with snap or api
    .action('refund','INV001')
    .send(function(response) {
        console.log(response.body);
    });
```

### Example create body request manually
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

### Response
We use [unirest](http://unirest.io/nodejs.html) library for handling call API to MidTrans.

### Available methods
If you want to know all available methods in this MidTrans Payment library
```javascript
var mdt = new MidTrans(config);
console.log(mdt.showAllMethods(mdt));
```

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

### Known Limitation
This library still not support yet for **RECURRING API**

### Unit Test
If you want to play arround with testing
```
npm test
```

Note:
- For request test you have to change the config variable