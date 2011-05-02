$(function () {
    window.StatsBar = Backbone.View.extend({

        constructor: function StatsBar() {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        template: _.template($("#product-count-template").html()),

        initialize: function() {
            var view = this;
            this.collection.bind('change', function(model, collection) {
                console.log("Product count");
                view.render();
            });
        },

        render: function() {
            console.log(this.collection.toobuy());
            this.el.children().remove();
            this.el.append(this.template({
                total: this.collection.length,
                buying: this.collection.toobuy().length
            }));
        }
    });    
});
