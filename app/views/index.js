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
  'text!templates/940-template.xml'
  ], function($, _, Backbone, clientsCollection, clientsModel, poCollection, poModel, poliCollection, poliModel, soCollection, soModel, soliCollection, soliModel, stockCollection, stockModel, template940) {

  return Backbone.View.extend({

    initialize: function (data)
    {
      this.poNum = data.po;
      this.edi = data.type;
      this.po = new poCollection();
      this.po.fetch({
        data: {
          fields: '*,purchase_orders.purchase_order_line_items.*,purchase_order_line_items.*,purchase_orders.client.*,client.*,purchase_orders.sales_order.*,sales_order.*,purchase_order_line_items.sales_order_line_item.*,sales_order_line_item.*,purchase_order_line_items.stock.*,stock.*',
          id: this.poNum
        },
        success: _.bind(function()
        {
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

    render: function ()
    {
        switch (this.edi) {
          case "940":
            this.template = template940;
            break;
           case "943":
            this.template = template943;
            break;
          case "944":
            this.template = template944;
            break;
          case "945":
            this.template = template945;
            break;
       }

       var data = {
        ponum: this.poNum,
        podate: this.po.models[0].attributes.podate,
        shiptoname: this.po.models[0].related('purchase_orders:client').get('shiptoname'),
        shiptoaddress1: this.po.models[0].related('purchase_orders:client').get('shiptoaddress1'),
        shiptocity: this.po.models[0].related('purchase_orders:client').get('shiptocity'),
        shiptostate: this.po.models[0].related('purchase_orders:client').get('shiptostate'),
        shiptozip: this.po.models[0].related('purchase_orders:client').get('shiptozip'),
        shiptocountry: this.po.models[0].related('purchase_orders:client').get('shiptocountry'),
        shipfromcode: this.po.models[0].attributes.shipfromcode,
        transportmethod: this.po.models[0].attributes.transportmethod,
        canceldate: this.po.models[0].related('purchase_orders:sales_order').get('canceldate'),
        shipdate: this.po.models[0].related('purchase_orders:sales_order').get('shipdate'),
        clientnum: this.po.models[0].related('purchase_orders:sales_order').get('clientnum'),
        items: this.po.models[0].related('purchase_orders:purchase_order_line_items').attributes,
        value: 'value'
       };
       var compiledTemplate = _.template(this.template);
       //this.$el.html(compiledTemplate(data));
       document.write("<pre>"+compiledTemplate(data)+"</pre>");
       var fileName = this.poNum + '.xml';

       $.post('writePO.php', { file: fileName, data: compiledTemplate(data) } );

    }

  });


});