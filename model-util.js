var q = require('q');

exports.getRecentLowStocks = function(data) {
    var returnData = [];
    data.forEach(function(obj) {
        var datum = {};
        datum["stockId"] = obj.stock_id;
        datum["itemId"] = obj.item_id;
        datum["itemMaterial"] = obj.material;
        datum["itemDescription"] = obj.description;
	datum["itemType"] = obj.type;
	datum["itemDiameter"] = obj.diameter + " mm";
	if (obj.weight != null && obj.weight!=0)
        	datum["stockAmount"] = obj.weight + " kg";
	else
		datum["stockAmount"] = obj.quantity;
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
	if (obj.weight != null && obj.weight!=0)
        	datum["orderAmount"] = obj.weight + " kg";
	else
		datum["orderAmount"] = obj.quantity;
        datum["orderDate"] = obj.order_date;
	datum["deliveryDate"] = obj.delivery_date;
	datum["orderStatus"] = obj.status;
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
	if (obj.weight != null && obj.weight!=0)
        	datum["orderAmount"] = obj.weight + " kg";
	else
		datum["orderAmount"] = obj.quantity;
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
	if (obj.diameter != null && obj.diameter !=0)
		datum["itemType"] = obj.diameter+ " mm " + datum["itemType"];
        datum["receivedId"] = obj.received_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["receivedAmount"] = obj.weight + " kg";
	else
		datum["receivedAmount"] = obj.quantity;
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

exports.stockFilterModelToDB = function (stockFilterModel) {
	var deffered = q.defer();
	var returnArray=[];
	if (stockFilterModel.hasOwnProperty('customerId')) {
		returnArray.push("customer.customer_id = "+ stockFilterModel['customerId']);
	}
	if (stockFilterModel.hasOwnProperty('itemOpening')) {
		returnArray.push("item.opening = "+ stockFilterModel['itemOpening']);
	}
	if (stockFilterModel.hasOwnProperty('itemDiameter')) {
		returnArray.push("item.diameter = "+ stockFilterModel['itemDiameter']);
	}
	if (stockFilterModel.hasOwnProperty('itemLength')) {
		returnArray.push("item.length = "+ stockFilterModel['itemLength']);
	}
	if (stockFilterModel.hasOwnProperty('itemWidth')) {
		returnArray.push("item.width = "+ stockFilterModel['itemWidth']);
	}
	if (stockFilterModel.hasOwnProperty('itemMaterial')) {
		returnArray.push("item.material = "+ stockFilterModel['itemMaterial']);
	}
	if (stockFilterModel.hasOwnProperty('itemType')) {
		returnArray.push("item.type = "+ stockFilterModel['itemType']);
	}
	if (stockFilterModel.hasOwnProperty('itemThickness')) {
		returnArray.push("item.thickness = "+ stockFilterModel['itemThickness']);
	}
	if (stockFilterModel.hasOwnProperty('isRawReady')) {
		returnArray.push("item.raw_ready = "+ stockFilterModel['isRawReady']);
	}
	if (stockFilterModel.hasOwnProperty('isClamped')) {
		returnArray.push("item.is_clamp = "+ stockFilterModel['isClamped']);
	}
	if (stockFilterModel.hasOwnProperty('clampThickness')) {
		returnArray.push("item.c_thickness = "+ stockFilterModel['clampThickness']);
	}
	deffered.resolve(returnArray);
	return deffered.promise;
};

exports.getDeposit = function (depositDetails) {
    var returnData = [];
    depositDetails.forEach(function(obj) {
        var datum = {};
        datum["depositId"] = obj.deposit_id;
        datum["itemId"] = obj.item_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["stockAmount"] = obj.weight + " kg";
	else
		datum["stockAmount"] = obj.quantity;
        datum["customerId"] = obj.customer_id;
        datum["customerAlias"] = obj.alias;
        datum["customerName"] = obj.name;
        datum["opening"] = obj.opening;
        datum["diameter"] = obj.diameter;
        datum["length"] = obj.length;
        datum["width"] = obj.width;
        datum["type"] = obj.type;
        datum["material"] = obj.material;
        datum["isRawReady"] = obj.raw_ready;
        datum["description"] = obj.description;
        datum["isClamp"] = obj.is_clamp;
        datum["clampPosition"] = obj.c_pos;
        datum["clampLength"] = obj.c_length;
        datum["clampThickness"] = obj.c_thickness;
        datum["clampDescription"] = obj.c_desc;
        datum["threshold"] = obj.threshold;
        returnData.push(datum);
    });
    return returnData;
};

exports.getStock = function (stockDetails) {
    var returnData = [];
    stockDetails.forEach(function(obj) {
        var datum = {};
        datum["stockId"] = obj.stock_id;
        datum["itemId"] = obj.item_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["stockAmount"] = obj.weight + " kg";
	else
		datum["stockAmount"] = obj.quantity;
        datum["opening"] = obj.opening;
        datum["diameter"] = obj.diameter;
        datum["length"] = obj.length;
        datum["width"] = obj.width;
        datum["type"] = obj.type;
        datum["material"] = obj.material;
        datum["isRawReady"] = obj.raw_ready;
        datum["description"] = obj.description;
        datum["isClamp"] = obj.is_clamp;
        datum["clampPosition"] = obj.c_pos;
        datum["clampLength"] = obj.c_length;
        datum["clampThickness"] = obj.c_thickness;
        datum["clampDescription"] = obj.c_desc;
        datum["threshold"] = obj.threshold;
        returnData.push(datum);
    });
    return returnData;
};	
