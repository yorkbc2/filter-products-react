import React, {Component} from "react";
import {connect} from "react-redux";
import ProductItem from "./ProductItem";
import FakeProductList from "./FakeProductList";
import {
    FilterActiveFilters
} from "./FilterActiveFilters";
import {
    _qs
} from "./../fns"

const MoreProductsButton = props => (
    <button type="button" className="button-medium" onClick={props.onClick}>
        Загрузить больше товаров...
    </button>
);


class ProductList extends Component
{
    incrementPage()
    {
        this.props.dispatch({type: "INCREMENT_PAGE"});
    }
    clearFilters(e)
    {
        e.preventDefault();
        this.props.dispatch({type: "CLEAR_FILTERS"});

        var checkboxes = _qs.$('.filter_wrapper input[type="checkbox"]');
        if (checkboxes.length > 0)
        {
            checkboxes.forEach(i => i.checked = false);
        }
    }
    removeFilter(filterKey, item, filterIndex, itemIndex)
    {
        this.props.dispatch({type: "DISABLE_ACTIVE_FILTER", payload: {filter: filterIndex, item: itemIndex}});
        let checkboxes = _qs.$(`.filter_wrapper input[type="checkbox"][data-box_id="${filterKey}-${item.toLowerCase()}"]`);
        if (checkboxes[0] !== undefined)
        {
            checkboxes[0].checked = false;
        }
    }
    render()
    {
        return (
            <div>
                {this.props.isFiltered === true ? (<FilterActiveFilters clearFilters={this.clearFilters.bind(this)} 
                    activeFilters={this.props.activeFilters}
                    onRemoveFilter={this.removeFilter.bind(this)} />): null}
                <div className="product_list">
                        {this.props.data.length > 0 ?
                            (<div className="product_grid">
                            {this.props.filteredData.slice(0, this.props.page * this.props.itemsPerPage).map((p, index) => <ProductItem {...p} key={index} />)}
                            </div>):
                            (this.props.fetching === true? (<FakeProductList count={6} />):
                            (<div className="text-center">
                                <div className="sp-4-md"></div>
                                <h3>Товаров по этой категории не найдено!</h3>
                                <div className="sp-4-md"></div>
                                <a href={"/shop"}>В магазин</a>
                            </div>))
                        }
                    {this.props.page * this.props.itemsPerPage < this.props.filteredData.length?
                        (<div className="text-center">
                            <MoreProductsButton onClick={this.incrementPage.bind(this)} />
                        </div>): null}
                </div>
            </div>
        );
    }
}

export default connect(
    state => (state.products)
)(ProductList);