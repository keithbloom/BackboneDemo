$(function() {
    window.Item = Backbone.Model.extend({

    constructor: function Item() {
        Backbone.Model.prototype.constructor.apply(this, arguments);

        if(!this.collection) {
            this.collection = Products;
        }
    },

    defaults: {
        title: "empty item..",
        price: 0,
        state: "To buy"
    }
    });

    window.ShoppingList = Backbone.Collection.extend({

        url: 'list/',

        model: Item,

        constructor: function ShoppingList() {
            Backbone.Collection.prototype.constructor.apply(this, arguments);
        },

        toobuy: function () {
            return this.filter(function (item) { return item.get('state') === 'To buy'; });
        }
    });
	

		





    // Set it all up



});
