import {
    filterProductsByAttributes,
    filterProductsByPrice
} from "./../fns/products";

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_END = "FETCH_PRODUCTS_END";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const SET_FILTERS = "SET_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const INCREMENT_PAGE = "INCREMENT_PAGE";
export const DISABLE_ACTIVE_FILTER = "DISABLE_ACTIVE_FILTER";
export const CHANGE_CURRENT_PRICE_RANGE = "CHANGE_CURRENT_PRICE_RANGE";

export function productReducer (state = {
    fetching: false,
    data: [],
    filteredData: [],
    filters: [],
    activeFilters: [],
    isFiltered: false,
    error: false,
    page: 1,
    itemsPerPage: 15,
    minPrice: 0,
    maxPrice: 0,
    currentPriceRangeFrom: 0,
    currentPriceRange: 0
}, {type, payload})
{
    switch (type)
    {
        case FETCH_PRODUCTS_START:
            return {...state, fetching: true};
        case FETCH_PRODUCTS_END:
            return {
                ...state,
                fetching: false,
                data: payload.products,
                filteredData: payload.products,
                filters: payload.filters,
                minPrice: payload.minPrice,
                maxPrice: payload.maxPrice,
                currentPriceRangeFrom: payload.minPrice,
                currentPriceRange: payload.maxPrice
            };
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                error: payload
            };
        case SET_FILTERS:
            return {
                ...state,
                activeFilters: payload,
                isFiltered: true,
                filteredData: filterProductsByPrice(filterProductsByAttributes(state.data, payload),
                    state.currentPriceRangeFrom,
                    state.currentPriceRange)
            };
        case CLEAR_FILTERS:
            return {
                ...state,
                activeFilters: {},
                filteredData: state.data,
                currentPriceRangeFrom: state.minPrice,
                currentPriceRange: state.maxPrice,
                isFiltered: false
            };
        case DISABLE_ACTIVE_FILTER:
            let newActiveFilters = {...state.activeFilters};
            let newActiveFiltersKeys = Object.keys(newActiveFilters);
            let {filter, item} = payload;
            if (newActiveFiltersKeys.length > 0)
            {
                let currentActiveFilter = newActiveFilters[newActiveFiltersKeys[filter]];
                newActiveFilters[newActiveFiltersKeys[filter]] = newActiveFilters[newActiveFiltersKeys[filter]].filter((x, i) => i !== item);
                return {
                    ...state,
                    activeFilters: newActiveFilters,
                    isFiltered: true,
                    filteredData: filterProductsByPrice(filterProductsByAttributes(state.data, newActiveFilters),
                        state.currentPriceRangeFrom,
                        state.currentPriceRange)
                }
            }

            return {
                ...state,
                activeFilters: {},
                isFiltered: false,
                filteredData: state.data
            }
        case INCREMENT_PAGE:
            return {
                ...state,
                page: state.page + 1
            };
        case CHANGE_CURRENT_PRICE_RANGE:
        console.dir(payload);
            var filteredData = (state.activeFilters.length > 0?
                filterProductsByPrice(state.filteredData, payload.min, payload.max):
                filterProductsByPrice(state.data, payload.min, payload.max) )
            return {
                ...state,
                isFiltered: true,
                filteredData,
                currentPriceRangeFrom: payload.min,
                currentPriceRange: payload.max
            };
        default:
            return {...state};
    }
}