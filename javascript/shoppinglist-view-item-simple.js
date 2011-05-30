$(function () {
window.ProductView = Backbone.View.extend({


	// Cache the template for this item so we don't have to grab it from the DOM every time
        template: _.template($("#product-template").html()),

        constructor : function ProductView() {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

	// The view will be constructed with a collection and the initialize method is the
	// place where we can bind to the events the view depends upon.
        initialize: function() {
            var view = this;
            this.collection.bind('add', function(item, collection){
                view.add(item);
            });
            this.collection.bind('remove', function(item, collection) {
                view.remove(item);
            });
        },


        render: function() {
            $("#product-list").children().remove();
            this.collection.each(function (product) {
                this.add(product);
            }, this);
            return this.el;
        },

        add: function(product) {
        this.el.append(this.template({
            title: product.get("title"),
            Id: product.cid,
            state: product.get("state")
            }));
        return this;
        },

        remove: function (item) {
            this.$('[data-id="' + item.cid + '"]').remove();
            return this;
        },
    });
});
