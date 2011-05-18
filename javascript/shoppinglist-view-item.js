$(function () {
window.ProductView = Backbone.View.extend({

        getItem: function (event) {
            var parent = event.target.parentNode.parentNode,
            item = this.collection.getByCid(parent.getAttribute('data-id'));
            return item;
        },

        events : {
            'click .bought' : 'onbought',
            'click .delete' : 'ondelete'
        },

        template: _.template($("#product-template").html()),

        constructor : function ProductView() {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        initialize: function() {
            var view = this;
            this.collection.bind('add', function(item, collection){
                console.log("Adding an item");
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

        onbought: function(event){
            var parent = event.target.parentNode.parentNode,
            product = this.collection.getByCid(parent.getAttribute('data-id'));
            console.log(parent.getAttribute('data-id'));
            if(product) {
                product.save({state : 'Done'});
                this.render();
            }
            event.preventDefault();
        },

        ondelete: function (event) {
            var product = this.getItem(event);
            if(product) {
                product.destroy();
                this.collection.remove(product);
            }
            event.preventDefault();
        }


    });
});