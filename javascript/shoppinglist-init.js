
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

    list.render();
    count.render();

    var form = new ItemForm({
        el: document.getElementById("shopping-form")
    });

    form.bind('create', function (product) {
        window.Products.add(product);
    });
});
