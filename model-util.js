exports.getRecentLowStocks = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["stockId"] = obj.stock_id;
        datum["itemId"] = obj.item_id;
        datum["itemMaterial"] = obj.material;
        datum["itemDescription"] = obj.description;
	datum["itemType"] = obj.type;
        datum["stockAmount"] = obj.quantity + "/" + obj.weight;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentOrders = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["customerId"] = obj.customer_id;
        datum["customerAlias"] = obj.alias;
        datum["customerName"] = obj.name;
        datum["itemID"] = obj.item_id;
        datum["itemMaterial"] = obj.material;
        datum["itemDescription"] = obj.description;
	datum["itemType"] = obj.type;
        datum["orderID"] = obj.order_id;
        datum["orderAmount"] = obj.quantity + "/" + obj.weight;
        datum["orderDate"] = obj.order_date;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentDeliveries = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["customerID"] = obj.customer_id;
        datum["customerAlias"] = obj.alias;
        datum["customerName"] = obj.name;
        datum["itemID"] = obj.item_id;
        datum["itemMaterial"] = obj.material;
        datum["itemDescription"] = obj.description;
	datum["itemType"] = obj.type;
        datum["orderId"] = obj.order_id;
        datum["orderAmount"] = obj.quantity + "/" + obj.weight;
        datum["orderDate"] = obj.order_date;
	datum["deliveryId"] = obj.delivery_id;
	datum["deliveryDate"] = obj.delivery_date;
	datum["deliveredBy"] = obj.delivered_by;
	datum["deliveryVehicleNumber"] = obj.vehicle_no;
	datum["deliveryBillNumber"] = obj.bill_no;
        returnData.push(datum);
    });
    return returnData;
};

exports.getRecentReceived = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["customerId"] = obj.customer_id;
        datum["customerAlias"] = obj.alias;
        datum["customerName"] = obj.name;
        datum["itemId"] = obj.item_id;
        datum["itemMaterial"] = obj.material;
        datum["itemDescription"] = obj.description;
	datum["itemType"] = obj.type;
        datum["receivedId"] = obj.received_id;
        datum["receivedAmount"] = obj.quantity + "/" + obj.weight;
        datum["receivedDate"] = obj.received_date;
        returnData.push(datum);
    });
    return returnData;
};

exports.getAllCustomers = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["id"] = obj.customer_id;
        datum["alias"] = obj.alias;
        datum["name"] = obj.name;
        datum["spocName"] = obj.spoc;
        datum["contact1"] = obj.contact1;
        datum["contact2"] = obj.contact2;
        datum["address"] = obj.address;
        datum["email1"] = obj.email1;
        datum["email2"] = obj.email2;
        datum["vatNo"] = obj.vat_no;
        datum["cstNo"] = obj.cst_no;
        returnData.push(datum);
    });
    return returnData;
};
