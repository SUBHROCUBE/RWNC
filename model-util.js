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
	console.log(stockFilterModel);
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
		returnArray.push("item.material = '"+ stockFilterModel['itemMaterial']+"'");
	}
	if (stockFilterModel.hasOwnProperty('itemType')) {
		returnArray.push("item.type = '"+ stockFilterModel['itemType']+"'");
	}
	if (stockFilterModel.hasOwnProperty('itemThickness')) {
		returnArray.push("item.thickness = "+ stockFilterModel['itemThickness']);
	}
	if (stockFilterModel.hasOwnProperty('itemRawReady')) {
		returnArray.push("item.raw_ready = '"+ stockFilterModel['itemRawReady']+"'");
	}
	if (stockFilterModel.hasOwnProperty('itemIsClamped')) {
		returnArray.push("item.is_clamp = "+ stockFilterModel['itemIsClamped']);
	}
	if (stockFilterModel.hasOwnProperty('itemClampThickness')) {
		returnArray.push("item.c_thickness = "+ stockFilterModel['itemClampThickness']);
	}
	if (stockFilterModel.hasOwnProperty('stockDateFrom') && stockFilterModel.hasOwnProperty('stockDateTo')) {
		returnArray.push("stock.co between '"+ stockFilterModel['stockDateFrom'] + "' and '"+ stockFilterModel['stockDateTo']+"'");
	}
	console.log(returnArray);
	deffered.resolve(returnArray);
	return deffered.promise;
};

exports.itemFilterModelToDB = function (itemFilterModel) {
	var deffered = q.defer();
	var returnArray=[];
	if (itemFilterModel.hasOwnProperty('itemOpening')) {
		returnArray.push("item.opening = "+ itemFilterModel['itemOpening']);
	}
	if (itemFilterModel.hasOwnProperty('itemDiameter')) {
		returnArray.push("item.diameter = "+ itemFilterModel['itemDiameter']);
	}
	if (itemFilterModel.hasOwnProperty('itemLength')) {
		returnArray.push("item.length = "+ itemFilterModel['itemLength']);
	}
	if (itemFilterModel.hasOwnProperty('itemWidth')) {
		returnArray.push("item.width = "+ itemFilterModel['itemWidth']);
	}
	if (itemFilterModel.hasOwnProperty('itemMaterial')) {
		returnArray.push("item.material = '"+ itemFilterModel['itemMaterial']+"'");
	}
	if (itemFilterModel.hasOwnProperty('itemType')) {
		returnArray.push("item.type = '"+ itemFilterModel['itemType']+"'");
	}
	if (itemFilterModel.hasOwnProperty('itemRawReady')) {
		returnArray.push("item.raw_ready = '"+ itemFilterModel['itemRawReady']+"'");
	}
	if (itemFilterModel.hasOwnProperty('itemClamped') && itemFilterModel['itemClamped'] != null) {
		returnArray.push("item.is_clamp = "+ itemFilterModel['itemClamped']);
	}
	if (itemFilterModel.hasOwnProperty('itemClampThickness')) {
		returnArray.push("item.c_thickness = "+ itemFilterModel['itemClampThickness']);
	}
	if (itemFilterModel.hasOwnProperty('itemClampPosition')) {
		returnArray.push("item.c_pos = "+ itemFilterModel['itemClampPosition']);
	}
	if (itemFilterModel.hasOwnProperty('itemClampLength')) {
		returnArray.push("item.c_length = "+ itemFilterModel['itemClampLength']);
	}

	deffered.resolve(returnArray);
	return deffered.promise;
};

exports.orderFilterModelToDB = function (orderFilterModel) {
	var deffered = q.defer();
	var returnArray=[];
	if (orderFilterModel.hasOwnProperty('parentOrderId') && orderFilterModel['parentOrderId'] != null) {
		returnArray.push("orders.parent_order_id = "+ orderFilterModel['parentOrderId']);
	}
	if (orderFilterModel.hasOwnProperty('customerId')) {
		returnArray.push("orders.customer_id = "+ orderFilterModel['customerId']);
	}
	if (orderFilterModel.hasOwnProperty('itemOpening')) {
		returnArray.push("item.opening = "+ orderFilterModel['itemOpening']);
	}
	if (orderFilterModel.hasOwnProperty('itemDiameter')) {
		returnArray.push("item.diameter = "+ orderFilterModel['itemDiameter']);
	}
	if (orderFilterModel.hasOwnProperty('itemLength')) {
		returnArray.push("item.length = "+ orderFilterModel['itemLength']);
	}
	if (orderFilterModel.hasOwnProperty('itemWidth')) {
		returnArray.push("item.width = "+ orderFilterModel['itemWidth']);
	}
	if (orderFilterModel.hasOwnProperty('itemMaterial')) {
		returnArray.push("item.material = '"+ orderFilterModel['itemMaterial']+"'");
	}
	if (orderFilterModel.hasOwnProperty('itemType')) {
		returnArray.push("item.type = '"+ orderFilterModel['itemType']+"'");
	}
	if (orderFilterModel.hasOwnProperty('isRawReady')) {
		returnArray.push("item.raw_ready = '"+ orderFilterModel['isRawReady']+"'");
	}
	if (orderFilterModel.hasOwnProperty('isClamped') && orderFilterModel['isClamped'] != null) {
		returnArray.push("item.is_clamp = "+ orderFilterModel['isClamped']);
	}
	if (orderFilterModel.hasOwnProperty('clampThickness')) {
		returnArray.push("item.c_thickness = "+ orderFilterModel['clampThickness']);
	}
	if (orderFilterModel.hasOwnProperty('orderStatus')) {
		returnArray.push("orders.status = '"+ orderFilterModel['orderStatus']+"'");
	}
	if (orderFilterModel.hasOwnProperty('orderDateFrom') && orderFilterModel.hasOwnProperty('orderDateTo')) {
		returnArray.push("orders.order_date between '"+ orderFilterModel['orderDateFrom'] + "' and '"+ orderFilterModel['orderDateTo']+"'");
	}
	if (orderFilterModel.hasOwnProperty('deliveryDateFrom') && orderFilterModel.hasOwnProperty('deliveryDateTo')) {
		returnArray.push("orders.delivery_date between '"+ orderFilterModel['deliveryDateFrom'] + "' and '"+ orderFilterModel['deliveryDateTo']+"'");
	}

	deffered.resolve(returnArray);
	return deffered.promise;
};


exports.receiveFilterModelToDB = function (receiveFilterModel) {
	var deffered = q.defer();
	var returnArray=[];
	if (receiveFilterModel.hasOwnProperty('customerId')) {
		returnArray.push("received.customer_id = "+ receiveFilterModel['customerId']);
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
		datum["stockWeight"] = obj.weight;
        datum["stockQuantity"] = obj.quantity;
		if (obj.weight != null && obj.weight!=0)
			datum["stockAmount"] = obj.weight + " kg";
		else
			datum["stockAmount"] = obj.quantity + " pcs ";
        datum["itemOpening"] = obj.opening;
        datum["itemDiameter"] = obj.diameter;
        datum["itemLength"] = obj.length;
        datum["itemWidth"] = obj.width;
        datum["itemType"] = obj.type;
        datum["itemMaterial"] = obj.material;
        datum["itemRawReady"] = obj.raw_ready;
        datum["itemDescription"] = obj.description;
        datum["itemIsClamped"] = obj.is_clamp ;
		if (obj.is_clamp==0)
			datum["itemClampStatus"] = "Not Clamped";
		else
			datum["itemClampStatus"] = "Clamped";
        datum["itemClampPosition"] = obj.c_pos;
        datum["itemClampLength"] = obj.c_length;
        datum["itemClampThickness"] = obj.c_thickness;
        datum["itemClampDescription"] = obj.c_desc;
        datum["itemThreshold"] = obj.threshold;
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
		datum["stockWeight"] = obj.weight;
        datum["stockQuantity"] = obj.quantity;
		if (obj.weight != null && obj.weight!=0)
			datum["stockAmount"] = obj.weight + " kg";
		else
			datum["stockAmount"] = obj.quantity + " pcs ";
        datum["itemOpening"] = obj.opening;
        datum["itemDiameter"] = obj.diameter;
        datum["itemLength"] = obj.length;
        datum["itemWidth"] = obj.width;
        datum["itemType"] = obj.type;
        datum["itemMaterial"] = obj.material;
        datum["itemRawReady"] = obj.raw_ready;
        datum["itemDescription"] = obj.description;
        datum["itemIsClamped"] = obj.is_clamp;
		if (obj.is_clamp==0)
			datum["itemClampStatus"] = "Not Clamped";
		else
			datum["itemClampStatus"] = "Clamped";
        datum["itemClampPosition"] = obj.c_pos;
        datum["itemClampLength"] = obj.c_length;
        datum["itemClampThickness"] = obj.c_thickness;
        datum["itemClampDescription"] = obj.c_desc;
        datum["itemThreshold"] = obj.threshold;
        returnData.push(datum);
    });
    return returnData;
};



exports.getOrders = function (orderDetails) {
    var returnData = [];
    orderDetails.forEach(function(obj) {
        var datum = {};
		datum["parentOrderId"] = obj.parent_order_id;
        datum["orderId"] = obj.order_id;
        datum["itemId"] = obj.item_id;
	datum["customerId"] = obj.customer_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["orderAmount"] = obj.weight + " kg";
	else
		datum["orderAmount"] = obj.quantity;

        datum["orderRate"] = obj.rate;
        datum["orderDate"] = obj.order_date;
        datum["orderDeliveryDate"] = obj.delivery_date;
        datum["orderIsStockProvided"] = obj.stock_provided;
        datum["orderStatus"] = obj.status;
        datum["orderQuantity"] = obj.quantity;
        datum["orderQuantityCompleted"] = obj.quantity_completed;
        datum["orderQuantityInProduction"] = obj.quantity_in_production;
        datum["orderQuantityRemaining"] = obj.quantity - obj.quantity_completed - obj.quantity_in_production;
	
        datum["itemOpening"] = obj.opening;
        datum["itemDiameter"] = obj.diameter;
        datum["itemLength"] = obj.length;
        datum["itemWidth"] = obj.width;
        datum["itemType"] = obj.type;
        datum["itemMaterial"] = obj.material;
        datum["itemRawReady"] = obj.raw_ready;
        datum["itemDescription"] = obj.description;
        datum["itemIsClamped"] = obj.is_clamp;
        datum["itemClampPosition"] = obj.c_pos;
        datum["itemClampLength"] = obj.c_length;
        datum["itemClampThickness"] = obj.c_thickness;
        datum["itemClampDescription"] = obj.c_desc;
        datum["itemThreshold"] = obj.threshold;
        returnData.push(datum);
    });
    return returnData;
};

exports.getReceive = function (receiveDetails) {
    var returnData = [];
    receiveDetails.forEach(function(obj) {
        var datum = {};
        datum["receivedId"] = obj.received_id;
		datum["customerId"] = obj.customer_id;
        datum["itemId"] = obj.item_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["receivedAmount"] = obj.weight + " kg";
	else
		datum["receivedAmount"] = obj.quantity;
	
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

exports.productionFilterModelToDB = function (productionFilterModel) {
	var deffered = q.defer();
	var returnArray=[];
	if (productionFilterModel.hasOwnProperty('customerId')) {
		returnArray.push("orders.customer_id = "+ productionFilterModel['customerId']);
	}
	if (productionFilterModel.hasOwnProperty('orderId')) {
		returnArray.push("orders.order_id = "+ productionFilterModel['orderId']);
	}
	if (productionFilterModel.hasOwnProperty('productionStatus')) {
		returnArray.push("production.status = '"+ productionFilterModel['productionStatus']+"'");
	}
	if (productionFilterModel.hasOwnProperty('itemType')) {
		returnArray.push("item.type = '"+ productionFilterModel['itemType']+"'");
	}
	
	deffered.resolve(returnArray);
	return deffered.promise;
};


exports.getProductions = function (productionDetails) {
    var returnData = [];
    productionDetails.forEach(function(obj) {
        var datum = {};

        datum["customerId"] = obj.customer_id;
        datum["customerAlias"] = obj.alias;

        datum["orderId"] = obj.order_id;
		datum["parentOrderId"] = obj.parent_order_id;
        datum["itemId"] = obj.item_id;
	if (obj.weight != null && obj.weight!=0)
        	datum["orderAmount"] = obj.weight + " kg";
	else
		datum["orderAmount"] = obj.quantity;

        datum["orderRate"] = obj.rate;
        datum["status"] = obj.status;
	
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

        datum["startDate"] = obj.start_date;
        datum["expectedEndDate"] = obj.expected_end_date;
        datum["endDate"] = obj.end_date;
        datum["productionManager"] = obj.pm;
        datum["dice"] = obj.dice;
        datum["machine"] = obj.machine;
        datum["endDate"] = obj.end_date;



        returnData.push(datum);
    });
    return returnData;
};
