$(function () {
    window.ItemForm = Backbone.View.extend({

        events : {
        'submit': 'onsubmit'
        },

        constructor: function ItemForm() {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        onsubmit: function(event) {
                
            var item = new window.Item,
                input = this.$('input');

            item.save({
              title: input.val()
            });

            input.val('');

            this.trigger('create', item, this);
            if (event) {
              event.preventDefault();
            }
        }
    });
});
