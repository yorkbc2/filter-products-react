import React, {Component} from "react";
import { connect } from "react-redux";
import FilterGroup from "./FilterGroup";
import FilterPrice from "./FilterPrice";
import DoublePriceRange from "./DoublePriceRange";
import {
    pfn
} from "./../fns";
    

class FilterWrapper extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
    }
    submit(event)
    {
        if (typeof event === 'object' && 'preventDefault' in event)
            event.preventDefault();
        
        this.props.dispatch({type: "SET_FILTERS", payload: this.state});
    }
    changeCheckbox(e)
    {
        var name = e.target.name;
        var value = e.target.value;
        var checked = e.target.checked;

        if (checked === true)
        {
            var oldFilterValue = this.state[name] || [];

            this.setState((state) => {
                return {
                    ...state,
                    [name]: [...oldFilterValue, value]
                };
            }, this.submit);
        }
        else
        { 
            if (this.state[name].length !== 1)
                this.setState((state) => {
                    return {...state, [name]: state[name].filter(i => i !== value)};
                });
            else
            this.setState((state) => {
                delete state[name];
                return {...state};
            }, this.submit);
        }   
    }

    onPriceChange(parts)
    {
        const minValue = pfn(this.props.maxPrice, parts[0]);
        const maxValue = pfn(this.props.maxPrice, parts[1]);

        this.props.dispatch({type: "CHANGE_CURRENT_PRICE_RANGE", payload: {min: minValue, max: maxValue}});
    }

    render()
    {
        return (
            <form onSubmit={this.submit.bind(this)} className="filter_wrapper">
                {this.props.data.length > 0? (
                    <div className="filter_group">
                        <h4>Цена</h4>
                        <DoublePriceRange lowerValue={this.props.currentPriceRangeFrom} higherValue={this.props.currentPriceRange}
                        onChange={this.onPriceChange.bind(this)} max={this.props.maxPrice} />
                    </div>
                ): null}
                
                {
                    this.props.fetching === true?
                        (<span>Loading</span>):
                        Object.values(this.props.filters).map((f, index) => {
                            return (
                                <FilterGroup onChange={this.changeCheckbox.bind(this)} key={index} filterIndex={index} {...f} />
                            );
                        })
                }
                {/*<div className="filter_group text-center">
                    <button type="submit" className="button-large">Фильтровать</button>
                </div>*/}
            </form>
        )
    }
}

export default connect(
    state => (state.products)
)(FilterWrapper);