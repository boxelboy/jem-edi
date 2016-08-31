/*---------------------------------------------------------------------------------------------------------------
*                                                                                                               *
* This view reads inbound files and imports into BusinessMan                                                    *
*                                                                                                               *
* +===============================+===========================+========================+                        *
* |       Table Name              |  API Entity Name          |  BusinessMan File      |                        *
* +===============================+===========================+========================+                        *
* | Purchase_Order                | purchase_orders           | BMData2                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Branches                      | branches                  | BMData7                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Purchase_Order_Line_Item      | purchase_order_line_items | BMData2                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Sales_Order                   | sales_order               | BMData6                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Sales_Order_LineItems         | sales_order_line_items    | BMData6                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Clients                       | clients                   | BMData7                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Stock                         | stock                     | BMData5                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Stock_Quantity                | stock_quantity            | BMData5                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Invoice                       | invoice                   | BMData3                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Invoice_Line_Items            | invoice_line_items        | BMData3                |                        *
* +-------------------------------+---------------------------+------------------------+                        *
* | Trading_Companies             | trading_companies         | BMData                 |                        *
* +-------------------------------+---------------------------+------------------------+                        *
*                                                                                                               *
---------------------------------------------------------------------------------------------------------------*/

define([
  'jquery',
  'underscore',
  'backbone',
  'app/collections/clients',
  'app/models/clients',
  'app/collections/purchase_order',
  'app/models/purchase_order',
  'app/collections/purchase_order_line_items',
  'app/models/purchase_order_line_items',
  'app/collections/sales_order',
  'app/models/sales_order',
  'app/collections/sales_order_line_items',
  'app/models/sales_order_line_items',
  'app/collections/stock',
  'app/models/stock',
  ], function($, _, Backbone, clientsCollection, clientsModel, poCollection, poModel, poliCollection, poliModel, soCollection, soModel, soliCollection, soliModel, stockCollection, stockModel) {

  return Backbone.View.extend({

    initialize: function (data)
    {
      this.edi = data.type;
      this.readData();
    },

    events:
    {
      //
    },

    buttonOption: function (e)
    {
      e.stopPropagation();

    },

    readData: function ()
    {
        switch (this.edi) {
           case "810":
            break;
          case "850":
            break;
          case "856":
            break;
       }
       console.log('read data');

       var getFile = $.get('get.php');
       getFile.done(function(response) {
        //console.log(response);
          var json = JSON.parse(response);
          _.each(json, _.bind(function (so) {
            //console.log(so);
            var somodel = new soModel({
              address_delivery_fao: so['HeaderRow'].ShipToName,
              address_delivery_street_address: so['HeaderRow'].ShipToAddressLineOne,
              address_delivery_post_town: so['HeaderRow'].ShipToCity,
              address_delivery_state: so['HeaderRow'].ShipToState,
              address_delivery_postcode: so['HeaderRow'].ShipToZipcode,
              canceldate: (so['HeaderRow'].CancelDate).slice(6, 109) + "-" + (so['HeaderRow'].CancelDate).slice(0, 2) + "-" + (so['HeaderRow'].CancelDate).slice(3, 5),
              clientnum: so['HeaderRow'].AccountingID,
              created_by: 'EDI import',
              cust_order_num: so['HeaderRow'].PurchaseOrderNumber,
              delivery_terms: so['HeaderRow'].Terms,
              department: so['HeaderRow'].DepartmentNumber,
              notes: so['HeaderRow'].Note,
              ship_date: (so['HeaderRow'].ShipDate).slice(6, 109) + "-" + (so['HeaderRow'].ShipDate).slice(0, 2) + "-" + (so['HeaderRow'].ShipDate).slice(3, 5)
            });
            //console.log(somodel);
            somodel.save(null, {
              success: function (modelResponse) {
                console.log(modelResponse.id);
                _.each(so['HeaderRow'].ItemRow, _.bind(function (item) {
                  var soli = new soliModel({
                    ordernumber: modelResponse.id,
                    description: item.Description,
                    qty: Number(item.Quantity),
                    retailprice: Number(item.UnitPrice),
                    vendoritemnum: item.VendorPart,
                    created_by: 'EDI Import',
                    prepack: Number(item.ofInnerPacks)
                  });
                  //console.log(soli);
                  soli.save();
                }, this));
              }
            });
          }, this));

       });

      /*$.getJSON('get.php', function(data) {
        console.log(data);
        $.each(data, function(key, val) {
          console.log(key,val);
        });
      });*/

    }

  });


});