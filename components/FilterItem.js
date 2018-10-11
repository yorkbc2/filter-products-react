import React from "react";

const FilterItem = ({slug, value, onChange, filterIndex, itemIndex}) => {
    return (<div className="filter_item filter_checkbox">
        <input type="checkbox" 
            name={slug} 
            value={value}
            data-box_id={slug + '-' + value.toLowerCase()}
            id={`${slug}_${value.toLowerCase()}`}
            onChange={onChange} />
        <label htmlFor={`${slug}_${value.toLowerCase()}`} className="filter_checkbox_square"></label>
        <label htmlFor={`${slug}_${value.toLowerCase()}`}>
            {value}
        </label>
    </div>);
}

export default FilterItem;