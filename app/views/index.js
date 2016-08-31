/*---------------------------------------------------------------------------------------------------------------
*                                                                                                               *
* This view generates outbound files ie XML files to be imported into Highjump                                  *
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
  'app/collections/stock_quantity',
  'app/models/stock_quantity',
  'app/collections/invoice',
  'app/models/invoice',
  'app/collections/invoice_line_items',
  'app/models/invoice_line_items',
  'app/collections/branches',
  'app/models/branches',
  'app/collections/trading_companies',
  'app/models/trading_companies',
  'text!templates/810-template.xml',
  'text!templates/856-template.xml',
  'text!templates/940-template.xml',
  'text!templates/943-template.xml'
  ], function($, _, Backbone, clientsCollection, clientsModel, poCollection, poModel, poliCollection, poliModel, soCollection, soModel, soliCollection, soliModel, stockCollection, stockModel, stockquantityCollection, stockquantityModel, invoiceCollection, invoiceModel, invoiceliCollection, invoiceliModel, branchCollection, trading_companiesModel, trading_companiesCollection, branchModel, template810, template856, template940, template943) {

  return Backbone.View.extend({

    initialize: function (data)
    {
      this.num = data.num;
      this.edi = data.type;

      switch (this.edi) {
        case "810":
          this.template = template810;
          this.thing = 'invoice';
          break;
        /*case "850":
          this.template = template850;
          this.thing = 'po';
          break;*/
        case "856":
          this.template = template856;
          this.thing = 'so';
          break;
        case "940":
          this.template = template940;
          this.thing = 'so';
          break;
        case "943":
          this.template = template943;
          this.thing = 'so';
          break;
        case "944":
          this.template = template944;
          this.thing = 'so';
          break;
        case "945":
          this.template = template945;
          this.thing = 'so';
          break;
       }

       switch (this.thing) {
        case "so":
          this.col = new soCollection();
          this.fetchObj = {
            fields: '*,sales_order.*,sales_order.sales_order_line_items.*,sales_order_line_items.*,sales_order_line_items.stock.*,sales_order_line_items.stock.stock_quantity.*,stock.stock_quantity.*,stock_quantity.*,sales_order.invoice.*,invoice.*,sales_order.branch.*,branch.*,sales_order.client.*,client.*',
            id: this.num
          };
          break;
        case "invoice":
          this.col = new invoiceCollection();
          this.fetchObj = {
            fields: '*,invoice.invoice_line_items.*,invoice_line_items.*',
            invoice_no: this.num
          };
          break;
        case "po":
          this.col = new poCollection();
          this.fetchObj = {
            fields: '*,purchase_orders.*,purchase_orders.purchase_order_line_items.*,purchase_order_line_items.*,purchase_orders.sales_order.*,sales_order.*,purchase_orders.client.*,client.*,purchase_orders.trading_company.*,trading_company.*',
            invoice_no: this.num
          };
          break;
      }

      this.col.fetch({
        data: this.fetchObj,
        success: _.bind(function()
        {
                console.log(this.col.models);

          this.render();
        }, this)

      });

    },

    events:
    {
      //
    },

    buttonOption: function (e)
    {
      e.stopPropagation();

    },

    dateConv: function (date)
    {
      var dateArr = date.split("-");
      return dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
    },

    render: function ()
    {
      console.log(this.col.models);

       if (this.thing === 'so') {
//           shipfromcode: this.col.models[0]._embedded['sales_order:client'].location_code, - kept as a reminder coz it might need to be included

        var data = {
          ponum: this.num,
          podate: this.col.models[0].get('podate'),
          shiptoname: this.col.models[0]._embedded['sales_order:client'].shiptoname,
          shiptoaddress1: this.col.models[0]._embedded['sales_order:client'].shiptoaddress1,
          shiptoaddress2: this.col.models[0]._embedded['sales_order:client'].street_address,
          shiptocity: this.col.models[0]._embedded['sales_order:client'].shiptocity,
          shiptostate: this.col.models[0]._embedded['sales_order:client'].shiptostate,
          shiptozip: this.col.models[0]._embedded['sales_order:client'].shiptozip,
          shiptocountry: this.col.models[0]._embedded['sales_order:client'].shiptocountry,
          shipfromcode: "",
          shipdate: this.dateConv(this.col.models[0].get('ship_date')),
          paymentmethod: this.col.models[0].get('delivery_terms'),
          transportmethod: this.col.models[0].get('transportmethod'),
          canceldate: this.dateConv(this.col.models[0].get('canceldate')),
          clientnum: this.col.models[0].get('clientnum'),
          customerordernum: this.col.models[0].get('cust_order_num'),
          items: this.col.models[0]._embedded['sales_order:sales_order_line_items'],
          quantityordered: this.col.models[0].get('quantityordered'),
          status: this.col.models[0].get('status'),
          value: 'value'
         };

         if (this.col.models[0]._embedded['sales_order:sales_order_line_items'][0]._embedded['sales_order_line_items:stock']._embedded['stock:stock_quantity'][0].hasOwnProperty('warehouse')) {
          data['warehousename'] = this.col.models[0]._embedded['sales_order:sales_order_line_items'][0]._embedded['sales_order_line_items:stock']._embedded['stock:stock_quantity'][0].warehouse;
         } else {
          data['warehousename'] = '';
         }

       } else if (this.thing === 'po') {
        var data = {
          ponum: this.num,
          podate: this.col.models[0].get('creation_date'),
          transportmethod: this.col.models[0].get('transportmethod'),
          shipdate: this.dateConv(this.col.models[0]._embedded['purchase_orders:sales_order'].ship_date),
          shiptoname: this.col.models[0]._embedded['purchase_orders:trading_company'].delivery_to,
          shiptoaddress1: this.col.models[0]._embedded['purchase_orders:trading_company'].delivery_address,
          shiptocity: this.col.models[0]._embedded['purchase_orders:trading_company'].delivery_post_town,
          shiptostate: this.col.models[0]._embedded['purchase_orders:trading_company'].delivery_county,
          shiptozip: this.col.models[0]._embedded['purchase_orders:trading_company'].delivery_postcode,
          shiptocountry: this.col.models[0]._embedded['purchase_orders:sales_order'].address_delivery_country,
          terms: this.col.models[0]._embedded['purchase_orders:sales_order'].delivery_terms,
          items: this.col.models[0]._embedded['purchase_orders:purchase_order_line_items']
        };

       } else if (this.thing === 'invoice') {

        var data = {
          invoice_no: this.num,
          invoice_date: this.col.models[0].get('invoice_date'),
          address_delivery_fao: this.col.models[0].get('address_delivery_fao'),
          address_delivery_street_address: this.col.models[0].get('address_delivery_street_address'),
          address_delivery_post_town: this.col.models[0].get('address_delivery_post_town'),
          address_delivery_county: this.col.models[0].get('address_delivery_county'),
          address_delivery_post_code: this.col.models[0].get('address_delivery_post_code'),
          address_delivery_country: this.col.models[0].get('address_delivery_country'),
          customer_display_name: this.col.models[0].get('address_delivery_fao'),
          ia_street_address: this.col.models[0].get('ia_street_address'),
          ia_post_town: this.col.models[0].get('ia_post_town'),
          ia_county: this.col.models[0].get('ia_county'),
          ia_post_code: this.col.models[0].get('ia_post_code'),
          ia_country: this.col.models[0].get('ia_country'),
          payment_terms: this.col.models[0].get('payment_terms'),
          notes_for_invoice: this.col.models[0].get('notes_for_invoice'),
          tax: this.col.models[0].get('tax'),
          items: this.col.models[0]._embedded['invoice:invoice_line_items'],
          value: 'value'
         };

       }
       var compiledTemplate = _.template(this.template);
       //this.$el.html(compiledTemplate(data));
       //document.write("<pre>"+compiledTemplate(data)+"</pre>");
       var fileName = this.num + '-' + this.edi + '.xml';

       var makeFile = $.post('writeEDI.php', { file: fileName, data: compiledTemplate(data) } );
       makeFile.done(function() {
          alert(fileName);
       });

    }

  });


});