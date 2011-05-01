$(function() {
		window.Product = Backbone.Model.extend({

			constructor: function Product() {
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

		window.ProductList = Backbone.Collection.extend({
		
      url: 'list/',

			model: Product,
			
			constructor: function ProductList() {
				Backbone.Collection.prototype.constructor.apply(this, arguments);
			},

      tobuy: function () {
          return this.filter(function (item) { return item.get('state') === 'To buy'; });
      }

			
		});
	

		
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

    window.ProductForm = Backbone.View.extend({

      events : {
        'submit': 'onsubmit'
      },

      constructor: function ProductForm() {
        Backbone.View.prototype.constructor.apply(this, arguments);
      },

      onsubmit: function(event) {
        var task = new window.Product,
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

    window.ProductCount = Backbone.View.extend({



      constructor: function ProductCount() {
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
        console.log(this.collection.tobuy()); 
        this.el.children().remove();
        this.el.append(this.template({
          total: this.collection.length,
          buying: this.collection.tobuy().length
        })); 
      }


    });
		$(function () {
		  window.Products = new ProductList();
		
		  var list = new ProductView({
			  el: $("#product-list"),
			  collection: Products
		  });
		  var count = new ProductCount({
        el: $("#product-count"),
        collection: Products
      });
		  list.render();
      count.render();

      var form = new ProductForm({
        el: document.getElementById("shopping-form")
      });

      form.bind('create', function (product) {
        window.Products.add(product);
      });
    });
	});
