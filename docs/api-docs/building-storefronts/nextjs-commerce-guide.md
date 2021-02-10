# Next.js Commerce Quick Start Guide

<div class="otp" id="no-index">

### On this page

- [**Overview**](#overview)
- [**Getting started**](#getting-started)
- [**Application**](#application)
- [**Application settings**](#application-settings)
- [**Resources**](#resources)
</div>

## **Overview**

BigCommerce offers cloud-based, multi-channel, ecommerce solutions. We also offer themes with powerful design tools and features that allow store owners to build and host their storefront on our servers.

### **Headless BC**

BigCommerce's flexibility also allows for headless architecture, the ability to integrate storefront frontends with the BigCommerce backend. Some of the Headless setups have the advantage of providing the following:

- Customize your frontend technologies without migrating your database
- Preserve your legacy frontend while switching to BigCommerce as your ecommerce engine
- Power multiple stores on multiple sales channels from a single BigCommerce dashboard.

### **Next.js Commerce**

Next.js Commerce is a headless integration to BigCommerce. Created in partnership with the Next.js and Vercel teams, Next.js Commerce showcases how powerful Next.js is when partnered with our open SaaS ecommerce platform.

View the [demo application](https://demo.vercel.store/) to get an idea of the robust set of features that Next.js Commerce offers.

## **Getting started**

### **Connecting Next.js Commerce to BigCommerce**

To get started with Next.js Commerce, you’ll need to deploy a live version directly from Vercel. Then, you can develop locally by cloning the new Git repository created during deployment. The following steps will walk you through the process.

### **Prerequisites**

- An IDE
- Knowledge of [Next.js](https://nextjs.org/)
- Knowledge of [BigCommerce APIs](https://developer.bigcommerce.com/api-docs)
- Git provider (GitHub, Bitbucket, GitLab)
- NPM

### **Deploying Next.js Commerce directly from Vercel**

1. Visit [nextjs.org/commerce](https://nextjs.org/commerce) and click on the **Clone and Deploy** button.

   ![Clone and Deploy](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-01.png)

2. When prompted, create a Vercel account by logging in using one of the supported Git providers . The Git provider you choose is where Vercel will clone the Next.js Commerce repository.

   **Note:** If you have an existing Vercel account, you can sign in using those credentials.

   ![Create Vercel account](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-02.png)

   ![Log in with existing Vercel account](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-03.png)

3. After signing in, a **Clone Git Repository** dialogue will appear with a link to the commerce repository, a dropdown to select your Vercel account, and a **Project Name** text field. You may change the name of the project from the default or leave it as-is. Click **Continue** to proceed.

   ![Clone Git repository](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-04.png)

4. In the **Install Integrations** dialogue box, click the **Install** button next to the BigCommerce integration to connect your BigCommerce store to your Vercel project.

   ![Install BigCommerce integration](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-05.png)

5. The **Add BigCommerce to Your Vercel Project** dialogue will have options to either **Sign Up** or **Log In**.

   1. If you are an existing developer on BigCommerce, select **Log In** and use your existing BigCommerce credentials to integrate BigCommerce and Vercel. Follow the on-screen instructions to install the Vercel app to your BigCommerce store.

      ![Existing BigCommerce store log in button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-06.png)

      ![Log in to existing BigCommerce store dialogue](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-07.png)

   2. If you are new to BigCommerce, select **Sign Up** to create a BigCommerce developer sandbox store and populate it with sample data. Vercel will connect Next.js Commerce to this sandbox store automatically. If you would later like to upgrade your sandbox store to a live store, contact BigCommerce to assist with that process.

      ![Sign up for BigCommerce store button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-08.png)

      ![Sign up for BigCommerce store registration form](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-09.png)

6. When the integration completes, you will see a blue checkmark where the **Install** button used to be. Click **Continue**.

   ![BigCommerce integration installation confirmation](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-10.png)

7. In the **Create Git Repository** dialogue box, you'll see a confirmation that the Main branch of the Next.js Commerce repository will be imported into your Vercel account. To complete the process, select your Git provider and name the repository where you want Next.js Commerce cloned and deployed to Vercel. Click **Continue**.

   ![Create Git repository dialogue](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-11.png)

   ![Create Git repository continue button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-12.png)

8. In the **Import Project** dialogue, confirm your Vercel project settings and then click **Deploy**

   ![Import Vercel project to Git repository dialogue](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-13.png)

9. Upon completion of deployment to Vercel, you will see your site deployed in a thumbnail image.

   ![Commerce deployment confirmation dialogue](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-14.png)

### **Developing locally after Vercel deployment**

1. Visit the Git provider where Vercel created a new repository. Clone that repository locally.
2. Navigate to the locally cloned project's root directory and create a copy of the .env.template file. Rename the newly created file .env.local and insert the correct environmental variables using the following as a guide:

```bash
BIGCOMMERCE_STOREFRONT_API_URL=https://store-${STORE_ID}.mybigcommerce.com/graphql
BIGCOMMERCE_STOREFRONT_API_TOKEN=${STOREFRONT_TOKEN}
BIGCOMMERCE_STORE_API_URL=https://api.bigcommerce.com/stores/${STORE_ID}
BIGCOMMERCE_STORE_API_TOKEN=${STORE_TOKEN}
BIGCOMMERCE_STORE_API_CLIENT_ID=${STORE_CLIENT}
```

- `STORE_ID`: Your store ID can be retrieved from your BigCommerce Store Control Panel URL in the format of `https://store-${STORE_ID}.mybigcommerce.com/manage/dashboard`

  ![STORE-ID location in URL](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/nextjs-commerce-15.png)

- `STORE_TOKEN|STORE_CLIENT`: For instructions on generating Store API credentials, visit [Obtaining Store API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).
- `STOREFRONT_TOKEN`: For instructions on how to generate the Storefront API token, visit [Create a Token](https://developer.bigcommerce.com/api-reference/store-management/tokens/api-token/createtoken).

3. Once you have saved your `.env.local` file with environmental variables, open a terminal in your repository's root directory. To install the project's dependencies, run `npm install`.

4. When dependencies have finished installing, run `npm run dev` in your terminal. Next.js will load the env from `.env.local`, start a local server, and compile your project.

5. Visit `localhost:3000` in your browser to see your Next.js Commerce storefront running locally.

Note: Any saved changes you push to your Git repository will trigger a redeployment at Vercel. A redeployment can also be triggered manually through the Vercel dashboard.

## **Application**

The architecture for Commerce is standard for a Next.js application. For a refresher or to learn how Next.js functions, visit the Next.js tutorial: [https://nextjs.org/learn/basics/create-nextjs-app](https://nextjs.org/learn/basics/create-nextjs-app).

To understand how Commerce generates pages and updates product information on your storefront, we'll further explore a couple of concepts.

### **Pre-rendering pages**

One of the main advantages of Next.js is the fast page load times you can achieve by pre-rendering your content. By default, Next.js pre-renders all pages.

Next.js allows you to choose how pages are pre-rendered:

- **Static Generation:** Next.js generates the HTML at build time and reuses on each request.
- **Server-side Rendering:** Next.js generates the HTML on each request.

Next.js Commerce statically generates pages while still keeping store information updated by using Incremental Static Regeneration.

**Static Page Generation**

Next.js pre-renders static content by calling the `getStaticProps()` function at build time on the server-side. Since `getStaticProps()` does not run on the client-side, you can do direct database queries or run other functions without exposing them to the client. To verify what Next.js eliminates from the client-side bundle, you can use Vercel’s [Code Elimination](https://next-code-elimination.now.sh/) tool.

**Incremental Static Regen**

With `getStaticProps()`, you may still use dynamic content on your statically generated pages. Incremental Static Regeneration (ISR) updates existing pages by re-rendering them in the background when triggered by site traffic after a set timeout period. By default, data revalidation runs at most once every four hours, though you may customize this frequency.

For more information and a demonstration on how ISR works, visit Vercel's [Static Reactions Demo](https://reactions-demo.vercel.app/).

By default, Next.js Commerce will revalidate and update product information from BigCommerce at most once every four hours.

### **Fetching and Populating Store Data**

Next.js Commerce uses [Storefront-data-hooks](https://github.com/bigcommerce/storefront-data-hooks) to connect your Next.js frontend with the BigCommerce backend. The package contains code split React hooks for data fetching using [SWR](https://swr.vercel.app/) (stale-while-revalidate). SWR is a layer on top of React Hooks that automates cache management. Data can be transitively stale, but SWR will always re-fetch and synchronize the correct data from BigCommerce.

Storefront Data Hooks has helper functions to handle common user actions such as login, logout, and register.

SWR uses FETCH for data fetching: [vercel/fetch: Opinionated fetch (with retrying and DNS caching) optimized for use inside microservices](https://github.com/vercel/fetch)

## **Application settings**

### **Next SEO**

Next.js Commerce includes the [Next SEO](https://github.com/garmeeh/next-seo) plugin to simplify SEO settings so that Next.js Commerce appears correctly in search results and is more readily shareable on social media. To learn how to configure Next SEO settings, visit the [Next SEO Github repository](https://github.com/garmeeh/next-seo).

### **Component Styling**

Next.js Commerce uses [Tailwind](https://tailwindcss.com/) for styling components. Next.js Commerce's root directory contains a tailwind.config.js file where you can customize much of the project's styling. For more information on how to configure the tailwind.config.js file, visit [Tailwind CSS - Configuration](https://tailwindcss.com/docs/configuration).

### **Internationalized Routing**

Next.js supports internationalized (i18n) routing and Commerce uses [sub-path routing](https://nextjs.org/docs/advanced-features/i18n-routing#sub-path-routing) which puts the locale in the URL path. By default, the next.config.js file has US English (en-US) and Spanish (es) set as locales with en-US set as the default locale.

```json
i18n: {
locales: ['en-US', 'es'],
defaultLocale: 'en-US',
},
```

For more information on i18n routing in Next.js, see the Next.js documentation on [internationalized routing](https://nextjs.org/docs/advanced-features/i18n-routing).

## **Resources**

- [Next.js Commerce](http://nextjs.org/commerce)
- [Next.js Commerce Framework](https://github.com/vercel/commerce-framework)
- [BigCommerce Storefront Data Hooks](https://github.com/bigcommerce/storefront-data-hooks)
