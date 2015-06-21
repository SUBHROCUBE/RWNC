exports.getRecentLowStocks = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["Stock ID"] = obj.stock_id;
        datum["Item ID"] = obj.item_id;
        datum["Item Material"] = obj.material;
        datum["Item Description"] = obj.description;
	datum["Item Type"] = obj.type;
        datum["Stock Amount"] = obj.quantity + "/" + obj.weight;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentOrders = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["Customer ID"] = obj.customer_id;
        datum["Customer Alias"] = obj.alias;
        datum["Customer Name"] = obj.name;
        datum["Item ID"] = obj.item_id;
        datum["Item Material"] = obj.material;
        datum["Item Description"] = obj.description;
	datum["Item Type"] = obj.type;
        datum["Order ID"] = obj.order_id;
        datum["Order Amount"] = obj.quantity + "/" + obj.weight;
        datum["Order Date"] = obj.order_date;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentDeliveries = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["Customer ID"] = obj.customer_id;
        datum["Customer Alias"] = obj.alias;
        datum["Customer Name"] = obj.name;
        datum["Item ID"] = obj.item_id;
        datum["Item Material"] = obj.material;
        datum["Item Description"] = obj.description;
	datum["Item Type"] = obj.type;
        datum["Order ID"] = obj.order_id;
        datum["Order Amount"] = obj.quantity + "/" + obj.weight;
        datum["Order Date"] = obj.order_date;
	datum["Delivery ID"] = obj.delivery_id;
	datum["Delivery Date"] = obj.delivery_date;
	datum["Delivered By"] = obj.delivered_by;
	datum["Delivery Vehicle Number"] = obj.vehicle_no;
	datum["Delivery Bill Number"] = obj.bill_no;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentReceived = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["Customer ID"] = obj.customer_id;
        datum["Customer Alias"] = obj.alias;
        datum["Customer Name"] = obj.name;
        datum["Item ID"] = obj.item_id;
        datum["Item Material"] = obj.material;
        datum["Item Description"] = obj.description;
	datum["Item Type"] = obj.type;
        datum["Received ID"] = obj.received_id;
        datum["Received Amount"] = obj.quantity + "/" + obj.weight;
        datum["Received Date"] = obj.received_date;
        returnData.push(datum);
    });
    return returnData;
};

exports.getAllCustomers = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["ID"] = obj.customer_id;
        datum["Alias"] = obj.alias;
        datum["Name"] = obj.name;
        datum["SPOC Name"] = obj.spoc;
        datum["Contact 1"] = obj.contact1;
        datum["Contact 2"] = obj.contact2;
        datum["Address"] = obj.address;
        datum["Email 1"] = obj.email1;
        datum["Email 2"] = obj.email2;
        datum["VAT No."] = obj.vat_no;
        datum["CST No."] = obj.cst_no;
        returnData.push(datum);
    });
    return returnData;
};
