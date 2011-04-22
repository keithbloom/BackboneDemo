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
			
			model: Product,
			
			localStorage: new Store("products"),
			
			constructor: function ProductList() {
				Backbone.Collection.prototype.constructor.apply(this, arguments);
			}
			
		});
	

		
		window.ProductView = Backbone.View.extend({
			
		//	template: _.template("<li><%= title %></li>"),
			template: _.template($("#product-template").html()),
			
			constructor : function ProductView() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			},
			
			initialize: function() {
				var view = this;
				console.log(this.collection);
				this.collection.bind('add', function(product, collect){
					view.add(product);
				});
			},
			
			render: function() {
				console.log("I am render");
				this.el.innerHTML = '';
				this.collection.each(function (product) {
					console.log(product.cid);
					this.add(product);
				}, this);
			  return this.el;
			},
			
			add: function(product) {
				console.log("I am add in the view");
				this.el.append(this.template({
					title: product.get("title"),
					price: product.get("price"),
					cid: product.id,
					id: product.cid
					}));
				return this;
			}
			
			
		});
		
		window.Products = new ProductList({title: "T", price: 0});
		
		var list = new ProductView({
			el: $("#product-list"),
			collection: Products
		});
		
		list.render();
	console.log($("#product-template").html());
	});
