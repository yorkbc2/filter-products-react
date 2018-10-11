import React from "react";
import PropTypes from "prop-types";
import Slider from "rc-slider";
import {
    pft,
    ntp,
    pfn
} from "./../fns";

const Range = Slider.Range;

class DoublePriceRange extends React.Component
{
	constructor(props)
	{
		super(props)
		this.state = {
			lowerValue: ntp(props.max, 0),
			higherValue: ntp(props.max, 100),
			max: props.max,
			values: [props.lowerValue, props.higherValue]
		}
	}


	onSliderChange(val)
	{

		this.setState(state => {
			return {
				...state,
				lowerValue: ntp(this.props.max, val[0]),
				higherValue: ntp(this.props.max, val[1]),
				values: val
			};
		}, () => this.props.onChange(val));
	}

	changeHigherValue(event)
	{
		const {value} = event.target;
		// this.setState(state => ({...state, values: [state.values[0], ntp(this.props.max, parseInt(value))]}), () => this.props.onChange(this.state.values));
	}

	changeLowerValue(event)
	{
		const value = parseInt(event.target.value);

		// let values = this.state.values;
		// values[0] = pfn(this.state.max, value);
		// this.setState(state => ({
		// 	...state,
		// 	values,
		// 	lowerValue: value
		// }), () => this.props.onChange(values));
	}

	render()
	{
		return ( 
			<div>
				<div className="double_price_range_container">
					<div>
						<label htmlFor="double_price_range_from">От: </label>
						<input type="number" id="double_price_range_from" value={this.props.lowerValue} onChange={this.changeLowerValue.bind(this)} />
					</div>
					<div>
						<label htmlFor="double_price_range_to">До: </label>
						<input type="number" id="double_price_range_to" value={this.props.higherValue} onChange={this.changeHigherValue.bind(this)} />
					</div>
				</div>
		    	<Range allowCross={false} value={[pft(this.props.max, this.props.lowerValue), 
		    		pft(this.props.max, this.props.higherValue)]} onChange={this.onSliderChange.bind(this)} />
		    </div>
		);
	}
}	

DoublePriceRange.propTypes = {
	lowerValue: PropTypes.number.isRequired,
	higherValue: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	// onLowerChange: PropTypes.func.isRequired,
	// onHigherChange: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
}

export default DoublePriceRange;