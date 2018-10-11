import axios from "axios";

const haveSameElements = (arr1, arr2) => {
    for (var i = 0; i < arr1.length; i++)
    {
        if (arr2.indexOf(arr1[i]) !== -1)
        {
            return true;
        }
    }
    return false;
}

const rootElement = document.querySelector("#fp_root");
var endpointParam = "";
if (rootElement)
{
    endpointParam = rootElement.getAttribute('data-cat');
}

export const PRODUCTS_ENDPOINT = "/wp-json/brainworks/products?cat=" + endpointParam;

export function fetchProducts ()
{
    return axios.get(PRODUCTS_ENDPOINT);
}

export function filterProductsByAttributes(data, filters)
{
    if (Object.keys(filters).length < 1)
    {
        return data;
    }
    else
    {
        for (var i in filters)
        {
            if (filters[i].length == 0)
            {
                return data;
            }
        }
    }
    return data.filter((product) => {
        var result = false;
        for (var i in filters)
        {
            if (typeof product.attributes[i] === 'undefined' || typeof product.attributes !== 'object')
            {
                result = false;
                break;
            }
            if (!haveSameElements(filters[i], product.attributes[i].values))
            {
                result = false;
                break;
            }
            else
            {
                result = true;
            }
        }
        return result;
    });
}

export function filterProductsByPrice(products, min, max)
{
    return products.filter(p => {
        return p.price >= min && p.price <= max;
    });
}