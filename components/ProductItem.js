import React from "react";
const basketCounter = document.querySelector(".basket-count");

const incrementCartCount = (e) => {
    e.preventDefault();
    basketCounter.textContent = (1 * basketCounter.textContent) + 1;
} 

const ProductItem = props => {
    return (<div className="product_item">

        <a href={props.link} className="product_item__link">
			<img src={props.thumbnail} alt={"Картинку не найдено"} title={props.name}
				width="100%" height="auto" />
		    <h3>
				{props.name}
			</h3>
			<p className="product_item__price">
				{props.price} грн.
			</p>
		</a>
        {props.type === 'variable'? 
            (
                <a href={props.link} className="button-medium">Выбрать...</a>
            ):
            (<a href={`?add-to-cart=${props.ID}`} 
                className="button-medium product_type_simple add_to_cart_button ajax_add_to_cart" 
                data-quantity={1}
                data-product_id={props.ID} 
                data-product_sku
                onClick={incrementCartCount}>
                В корзину
            </a>)}
    </div>)
}

export default ProductItem;