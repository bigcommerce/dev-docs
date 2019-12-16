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
        customerDetails: {
            name: "Customer Details",
            endpoint: endpoint,
            query: "# Fetch Customer Details\r\n\r\nquery CustomerAttributes {\r\n  customer {\r\n    firstName\r\n    lastName\r\n    email\r\n    entityId\r\n    customerGroupId\r\n    attributeCount\r\n    attributes {\r\n      shirtSize: attribute(entityId:123) {\r\n        entityId\r\n        value\r\n      }\r\n      favoriteColor: attribute(entityId:456) {\r\n        entityId\r\n        value\r\n      }\r\n    }\r\n  }\r\n}",
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
            query: "# query",
            headers: {
                Authorization: authHeader
            },
        },
        productImages: {
            name: "Product Images",
            endpoint: endpoint,
            query: "# query",
            headers: {
                Authorization: authHeader
            },
        },
        productImages: {
            name: "Product Images at Resolutions",
            endpoint: endpoint,
            query: "# query",
            headers: {
                Authorization: authHeader
            },
        },
        singleProduct: {
            name: "Single Product",
            endpoint: endpoint,
            query: "query SingleProduct {\r\n  site {\r\n    products (entityIds: [4917]) {\r\n      edges {\r\n        node {\r\n          id \r\n          entityId\r\n          name\r\n          prices {\r\n            price {\r\n              value\r\n              currencyCode\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  ",
            headers: {
                Authorization: authHeader
            },
        },
        variantDetails: {
            name: "Get Variant Details as a Product Object",
            endpoint: endpoint,
            query: "# query",
            headers: {
                Authorization: authHeader
            },
        },
        productOptions: {
            name: "Get Product Option Details by Product ID",
            endpoint: endpoint,
            query: "# query",
            headers: {
                Authorization: authHeader
            },
        },
        refinedProduct: {
            name: "Get Refined Product Object for Given Options",
            endpoint: endpoint,
            query: "# query",
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