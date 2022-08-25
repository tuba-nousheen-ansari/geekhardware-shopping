function check(button,pid,cust_id)
        {
            if(cust_id)
            {
                var text=button.innerText;
                if(text =="ADD TO CART")
                {
                    $.ajax({
                        url: "/cart/addtocart/"+pid,
                        success: function(result) {
                            alert("Product Added To Your Cart");
                            button.innerText ="REMOVE FROM CART";
                        }
                    });
                }
                else if(text=="REMOVE FROM CART")
                {
                    $.ajax({
                        url:"/cart/removefromcart/"+pid,
                        success: function(result) {
                            alert("Remove From Cart")
                            button.innerText ="ADD TO CART";
                        }
                    });
                }
            }
            else
                window.location.href="/customer/login";
        }

function checkWishlist(button,pid,cust_id)
{
    if(cust_id)
    {
        var text=button.innerText;
        if(text =="LIKE")
        {
            $.ajax({
                url: "/wishlist/addwishlist/"+pid,
                success: function(result) {
                    alert("Added Into WishList");
                    button.innerText ="UNLIKE";
                }
            });
        }
        else if(text=="UNLIKE")
        {
            $.ajax({
                url:"/wishlist/removewishlist/"+pid,
                success: function(result) {
                    alert("Remove From WishList");
                    button.innerText ="LIKE";
                }
            });
        }
    }
    else
        window.location.href="/customer/login";
}
