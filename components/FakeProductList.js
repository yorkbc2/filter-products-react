import React from "react";
import PropTypes from "prop-types";

const FakeProductItem = props => (
	<div className="fake_product_item">
		<div className="fake_blink fake_thumbnail"></div>
		<div className="fake_blink fake_title"></div>
		<div className="fake_blink fake_button"></div>
	</div>
)

const generateFakeProductItems = count => {
	let list = [];

	for (var i = 0; i < count; i++)
	{
		list.push(<FakeProductItem key={i} />);
	}

	return list;
}


const FakeProductList = props => (
	<div className="product_grid">
		{generateFakeProductItems(props.count)}
	</div>
);

FakeProductList.propTypes = {
	count: PropTypes.number
}

export default FakeProductList;