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
			  price: 0
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
        $(this.el).html(this.template(this.collection.toJSON()));
        return this.el;
		/*		console.log(this.el);
				this.el.innerHTML = '';
				this.collection.each(function (product) {
					console.log(this);
          this.add(product);
				}, this);
			  return this.el;*/
			},
			
			add: function(product) {
				console.log("I am add in the view");
				this.el.append(this.template({
					title: product.get("title"),
					Id: product.cid
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
        var task = new window.Product({}),
            input = this.$('input');

        console.log(input.val());
        console.log(event);

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
		
		window.Products = new ProductList();
		
		var list = new ProductView({
			el: $("#product-list"),
			collection: Products
		});
		
		list.render();

    var form = new ProductForm({
      el: document.getElementById("shopping-form")
    });

    form.bind('create', function (product) {
      window.Products.add(product);
    });
    // console.log($("#product-template").html());
	});
