import React from "react";
import FilterItem from "./FilterItem";

const FilterGroup = ({name, slug, items, onChange, filterIndex}) => {
    return (
        <div className="filter_group">
            <h4>{name}</h4>
            {Object.values(items).map((item, index) => {
                return (<FilterItem onChange={onChange} {...item} key={index} slug={slug}
                	filterIndex={filterIndex} itemIndex={index} />)
            })}
        </div>
    );
}

export default FilterGroup;