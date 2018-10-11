import React from "react";

export const FilterActiveFilters = ({activeFilters, clearFilters, onRemoveFilter}) => {

    return (
        <div className="active_filter_tags">
            {Object.keys(activeFilters).map((filterKey, filterIndex) => (
                activeFilters[filterKey].map((item, itemIndex) => 
                item !== undefined? 
                (<div key={itemIndex} className="active_filter_tag">
                    {item} <button type="button" className="active_filter_tag_delete" 
                        onClick={() => onRemoveFilter(filterKey, item, filterIndex, itemIndex)}>&times;</button>
                </div>): null)
            ))}
            <a href="#" onClick={clearFilters} className="active_filters_clear">
                Сбросить фильтры
            </a>
        </div>
    );
}