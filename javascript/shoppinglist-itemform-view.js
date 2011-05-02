$(function () {
    window.ItemForm = Backbone.View.extend({

        events : {
        'submit': 'onsubmit'
        },

        constructor: function ItemForm() {
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        onsubmit: function(event) {
            var task = new window.Item,
                input = this.$('input');

            task.save({
              title: input.val()
            });

            input.val('');
            this.trigger('create', task, this);
            if (event) {
              event.preventDefault();
            }
        }
    });
});
