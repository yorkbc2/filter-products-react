import React from "react";
import { connect } from "react-redux";

const FilterPrice = props => (
	<div className="filter_group">
		<h4>Цена</h4>
		<input type="range" onChange={props.changePriceRange}
			min={props.minPrice} max={props.maxPrice} step={5}
				defaultValue={props.currentPriceRange} />
		<p>
			Цена: от {props.minPrice} до {props.currentPriceRange}
		</p>
	</div>
);

export default connect(
	state => (state.products),
	dispatch => ({
		changePriceRange: (e) => {
			dispatch({type: "CHANGE_CURRENT_PRICE_RANGE", payload: e.target.value});
		}
	})
)(FilterPrice);