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
			}
			
		});
	

		
		window.ProductView = Backbone.View.extend({
			
			events : {
				'click .bought' : 'onbought'
			},

			template: _.template($("#product-template").html()),
			
			constructor : function ProductView() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			},
			
			initialize: function() {
				var view = this;
				this.collection.bind('add', function(product, collection){
					view.add(product);
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

			onbought: function(event){
				var parent = event.target.parentNode.parentNode,
					product = this.collection.getByCid(parent.getAttribute('data-id'));
				console.log(parent.getAttribute('data-id'));
				if(product) {
					product.save({state : 'Done'});
					this.render();
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
        console.log(this.collection.length); 
        this.el.children().remove();
        this.el.append(this.template({
          total: this.collection.length
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
