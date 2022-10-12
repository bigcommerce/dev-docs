# Step 1: Set up Your Local Environment



Start by setting up your local development environment.

## Install Node

For this tutorial, you need Node.js version 10.13+. To check your version of Node.js, run the following command in your terminal:

```shell
node -v
```

If you do not have Node.js installed, you can download it from [Node.js Downloads](https://nodejs.org/en/download/). 

## Set up a project directory

1. Create a new project directory.

2. Navigate to the directory using the terminal.

## Generate a package.json file

<!-- theme: info -->
> #### Note
> * Make sure that you are using Node.js version 10.13+.
> * This sample app uses custom dependencies and does not rely on the `create-next-app` CLI tool.

 

1. Using the terminal, initialize the project's `package.json` file.

```shell
npm init
```

Press enter to continue prompts.

To write a `package.json` file with default values (descriptive fields will be blank), run `npm init -y` instead.

## Install npm packages

1. Install BigDesign, Next, React, ReactDOM, and styled-components.

```shell
npm install --save @bigcommerce/big-design next react react-dom styled-components
```

2. Install dev dependencies.

```shell
npm install --save-dev babel-plugin-styled-components @types/node @types/react typescript
```

[babel-plugin-styled-components](https://www.npmjs.com/package/babel-plugin-styled-components) is a supplement to the styled-components library that, among other things, offers improved debugging and minification of styles.

[@types/node](https://www.npmjs.com/package/@types/node) and [@types/react](https://www.npmjs.com/package/@types/react) contain TypeScript type definitions for Node.js and React.js respectively.

<!-- theme: info -->
> You can view a list of all the tested package versions in the [package.json file on the Step 1 branch](https://github.com/bigcommerce/sample-app-nodejs/blob/step-1-app-foundation/package.json) of this sample app's repo.



## Add scripts

1. Open `package.json` in your text editor.

2. Update the `scripts` property, by adding the `dev`, `build`, and `start` scripts.

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

3. Save your changes.

## Create a starter page

1. In the root directory of your project, create a `pages` folder.

2. In the `pages` folder, create an `index.tsx` file. This is your app's homepage.

3. Open `index.tsx` in your code editor.

4. Add `Panel` and `Text` BigDesign imports at the top of the file.

```js
import { Panel, Text } from '@bigcommerce/big-design';
```
The **Panel** component allows you to contain content in a structured format. To learn more about the BigDesign's **Panel** component, see [Panel Developer Docs](https://developer.bigcommerce.com/big-design/panel).

**Text** is one of the many predefined typography components in BigDesign. BigDesign offers multiple properties to customize the typographic palette. To view available typography components, see  [Typography](https://developer.bigcommerce.com/big-design/typography).

5. Add the `Index` functional component below the import statements.

```js
const Index = () => (
    <Panel header="Homepage" margin="xxLarge">
        <Text>Hello world</Text>
    </Panel>
);

export default Index;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-1-app-foundation/pages/index.tsx)

Next.js associates each file in the pages folder with a route based on the file's name. Consequently, the `Index` React component you exported in `pages/index.tsx` will be accessible at `/index`.

## Initialize BigDesign

Next.js allows you to use a theme provider and import CSS files from `node_modules`. In this tutorial, you integrate [BigDesign](/) to give your app a distinct BigCommerce look and feel.

1. Next.js uses the `App` component to initialize pages. To override the default `App` component, add the `_app.tsx` file to the `pages` folder. This is where you initialize BigDesign. 

2. Open `_app.tsx` and import `GlobalStyles` from BigDesign and `AppProps` from Next.js.

```js
import { GlobalStyles } from '@bigcommerce/big-design';
import type { AppProps } from 'next/app'
```

Importing the `GlobalStyles` component will set BigCommerce's base styles globally.

3. Add the `MyApp` functional component below the import statements.

```js
const MyApp = ({ Component, pageProps }: AppProps) => (
   <>
       <GlobalStyles />
       <Component {...pageProps} />
   </>
);
 
export default MyApp;
```

The `Component` prop represents the active page. Consequently, it will change when you navigate between routes.

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-1-app-foundation/pages/_app.tsx)

## Initialize styled-components

Because BigDesign uses styled-components, we need to add additional configuration for both BigDesign and styled-components to function properly.

1. Add a custom `_document.tsx` file to your pages folder. 

2. Import `Document` and `DocumentContext`, the built-in TypeScript types, from Next.js.

```js
import Document, { DocumentContext } from 'next/document';
```

3. Import `ServerStyleSheet` from styled-components.

```js
import { ServerStyleSheet } from 'styled-components';
```

4. Extend the `Document` class.

```js
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-1-app-foundation/pages/_document.tsx)

## Start the development server

1. Using the terminal, open the root directory of your app and start the development server. 

```shell
npm run dev
```

2. Open `http://localhost:3000` from your browser. You should see the text “Hello world” displayed under **Homepage**.

![Hello world](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-01.png "Hello world")

[Next: Connect Your App to BigCommerce](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect)
