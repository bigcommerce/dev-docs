/**
 * playground_tabs.js - BigCommerce GraphQL Playground Query Tabs
 * 
 * Used to pass all tabs or a specific tab to the GraphQL Playground
 * 
 * Ex: 
 * 
 * var tabs = playgroundTabs("https://buybutton.store/graphql", "Bearer {token}");
 * tabs.get("customerDetails");
 * */

var playgroundTabs = function(endpoint, authHeader){
    var predefined = {
        firstThreeProducts: {
            name: "First 3 Products",
            endpoint: endpoint,
            query: "query paginateProducts {\r\n  site {\r\n    products (first: 3) {\r\n      pageInfo {\r\n        startCursor\r\n        endCursor\r\n      }\r\n      edges {\r\n        cursor\r\n        node {\r\n          entityId \r\n          name\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        categoryTree: {
            name: "Category Tree",
            endpoint: endpoint,
            query: "query CategoryTree3LevelsDeep {\r\n  site {\r\n    categoryTree {\r\n      ...CategoryFields\r\n      children {\r\n        ...CategoryFields\r\n        children {\r\n          ...CategoryFields\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfragment CategoryFields on CategoryTreeItem {\r\n  name\r\n  path\r\n  entityId\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        categoriesByUrl: {
            name: "Categories by URL",
            endpoint: endpoint,
            query: "query CategoryByUrl {\r\n  site {\r\n    route(path: "/shop-all/") {\r\n      node {\r\n        id\r\n        ... on Category {\r\n          name\r\n          entityId\r\n          description\r\n          products {\r\n            edges {\r\n              node {\r\n                name\r\n                defaultImage {\r\n                  url(width: 1200)\r\n                }\r\n                brand {\r\n                  name\r\n                  defaultImage {\r\n                    url(width: 200)\r\n                  }\r\n                }\r\n                prices {\r\n                  price {\r\n                    ...PriceFields\r\n                  }\r\n\r\n                  priceRange {\r\n                    min {\r\n                      ...PriceFields\r\n                    }\r\n                    max {\r\n                      ...PriceFields\r\n                    }\r\n                  }\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\nfragment PriceFields on Money {\r\n  value\r\n  currencyCode\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        objectsByUrl: {
            name: "Objects by URL",
            endpoint: endpoint,
            query: "query LookUpUrl {\r\n  site {\r\n    route(path: \"\/shop-all\/\") {\r\n      node {\r\n        __typename\r\n        id\r\n        ... on Category {\r\n          name\r\n          description\r\n        }\r\n        ... on Brand {\r\n          name\r\n          defaultImage {\r\n            url(width: 200)\r\n          }\r\n        }\r\n        ... on Product {\r\n          name\r\n          description\r\n          images {\r\n            edges {\r\n              node {\r\n                url(width: 500, height: 500)\r\n              }\r\n            }\r\n          }\r\n          brand {\r\n            name\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        productImages: {
            name: "Product Images Different Res",
            endpoint: endpoint,
            query: "query SrcsetImages {\r\n  site {\r\n    product(entityId: 123) {\r\n      images {\r\n        edges {\r\n          node {\r\n            url320wide: url(width: 320)\r\n            url640wide: url(width: 640)\r\n            url960wide: url(width: 960)\r\n            url1280wide: url(width: 1280)\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        singleProduct: {
            name: "Single Product",
            endpoint: endpoint,
            query: "query SingleProduct {\r\n  site {\r\n    products (entityIds: [81]) {\r\n      edges {\r\n        node {\r\n          id \r\n          entityId\r\n          name\r\n          prices {\r\n            price {\r\n              value\r\n              currencyCode\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        variantDetails: {
            name: "Variant Details as a Product Object",
            endpoint: endpoint,
            query: "query VariantById {\r\n  site {\r\n    product(variantEntityId: 82) {\r\n      name\r\n      sku\r\n      defaultImage {\r\n        url(width: 500, height: 500)\r\n      }\r\n      prices {\r\n        price {\r\n          ...PriceFields\r\n        }\r\n        salePrice {\r\n          ...PriceFields\r\n        }\r\n        retailPrice {\r\n          ...PriceFields\r\n        }\r\n      }\r\n      width {\r\n        ...DimensionFields\r\n      }\r\n      height {\r\n        ...DimensionFields\r\n      }\r\n      depth {\r\n        ...DimensionFields\r\n      }\r\n    }\r\n  }\r\n}\r\nfragment PriceFields on Money {\r\n  value\r\n  currencyCode\r\n}\r\nfragment DimensionFields on Measurement {\r\n  value\r\n  unit\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        productOptions: {
            name: "Product Option Details by Product ID",
            endpoint: endpoint,
            query: "query SeveralProductsByID {\r\n  site {\r\n    products(entityIds: [80, 81, 82]) {\r\n      edges {\r\n        node {\r\n          name\r\n          options {\r\n            edges {\r\n              node {\r\n                entityId\r\n                displayName\r\n                isRequired\r\n                values {\r\n                  edges {\r\n                    node {\r\n                      entityId\r\n                      label\r\n                    }\r\n                  }\r\n                }\r\n              }\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
        refinedProduct: {
            name: "Refined Product Object for Given Options",
            endpoint: endpoint,
            query: "query ProductsWithOptionSelections {\r\n  site {\r\n    product123: product(\r\n      entityId: 123\r\n      optionValueIds: [\r\n        { optionEntityId: 4, valueEntityId: 543 }\r\n        { optionEntityId: 5, valueEntityId: 443 }\r\n      ]\r\n    ) {\r\n      ...ProductFields\r\n    }\r\n    product234: product(\r\n      entityId: 234\r\n      optionValueIds: [\r\n        { optionEntityId: 8, valueEntityId: 768 }\r\n        { optionEntityId: 13, valueEntityId: 883 }\r\n      ]\r\n    ) {\r\n      ...ProductFields\r\n    }\r\n  }\r\n}\r\n\r\nfragment ProductFields on Product {\r\n  name\r\n  defaultImage {\r\n    url(width: 1000)\r\n  }\r\n  sku\r\n  availability\r\n}",
            headers: {
                Authorization: authHeader
            },
        },
    };

    var get = function(key) {
        if (key.toLowerCase() === "all") {
           return  Object.values(predefined);
        }

        if (key === undefined) {
            return predefined.slice(0,3)
        }
        
        return (key in predefined ? [predefined[key]] : []);
    }

    return {
        get: get
    };
}