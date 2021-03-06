
$(function() {
    window.Products = new ShoppingList();

    var list = new ProductView({
      el: $("#product-list"),
      collection: Products
    });

    var count = new StatsBar({
        el: $("#product-count"),
        collection: Products
    });

    window.Products.fetch({
        success: function(collection, response){
            console.log(collection, response);
            list.render();
            count.render();
        }
    });

    var form = new ItemForm({
        el: document.getElementById("shopping-form")
    });

    form.bind('create', function (product) {
        console.log("Added by the form.")
        window.Products.add(product);
    });

});
