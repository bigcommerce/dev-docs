# Introduction



This tutorial demonstrates how to build and embed a BigCommerce app using Node.js, React, Next.js, and BigDesign, BigCommerce's library of React components. 

You will learn how to connect your app to BigCommerce, integrate an API, and set up a database to store app data. You will use BigDesign to give your app a native BigCommerce visual style and behavior. 

At the end of this tutorial, you will have a functional single-click app that can make API calls and store app data in a database.

<!-- theme: info -->
> #### Note
> To get the app up and running quickly, follow the steps described in [Quick Start: Deploy to Heroku Install Flow](/api-docs/apps/tutorials/sample-app-nextjs/deploy-to-heroku). 



## Prerequisites

To successfully complete this tutorial, you need the following:

* Experience using a text editor and a terminal app
* Experience with [Node.js](https://nodejs.org/en/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), and [React](https://www.reactjs.org/)
* Experience using [npm](https://www.npmjs.com/)
* [BigCommerce sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store) (required to develop and test apps)
* [Developer Portal Account](https://devtools.bigcommerce.com/) (required to register apps)

You will be using [Next.js](https://nextjs.org/), [BigDesign](https://developer.bigcommerce.com/big-design), and [styled-components](https://styled-components.com/docs) to build this sample app.

[Next.js](https://nextjs.org/) is a production-ready React framework equipped with many built-in features that allows you to create static and dynamic React-based applications quickly. Next.js handles a lot of the backend work for you giving you a jump start on building applications. Among other built-in features, Next.js comes with a [page-based](https://nextjs.org/docs/basic-features/pages) routing system, [server-side rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering), and [client-side routing](https://nextjs.org/docs/routing/introduction#linking-between-pages).

With the exception of automated routing, our sample app is very React-ive. Even if you haven't worked with Next.js before, having React experience will enable you to read the app.

[BigDesign](https://developer.bigcommerce.com/big-design) is a BigCommerce library of React components. Using BigDesign when developing your BigCommerce apps will ensure that your app has a similar interface and adheres to the same user experience standards as the rest of the BigCommerce platform. We encourage you to familiarize yourself with BigDesign to simplify future integrations with BigCommerce.

[Next: Set up Your Local Environment](/api-docs/apps/tutorials/sample-app-nextjs/step-1-setup)
