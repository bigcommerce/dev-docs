# Step 3: Integrate the BigCommerce API and Add a Database

<div class="otp" id="no-index">

### On this page
- [Install npm packages](#install-npm-packages)
- [Add TypeScript definitions](#add-typescript-definitions)
- [Initialize React Context](#initialize-react-context)
- [Update environment variables](#update-environment-variables)
- [Update the auth lib page](#update-the-auth-lib-page)
- [Add a database](#add-a-database)
- [Set up Firebase database](#set-up-firebase-database)
- [Set up MySQL database](#set-up-mysql-database)
- [Set up a db lib page](#set-up-a-db-lib-page)
- [Upgrade the endpoints](#upgrade-the-endpoints)
- [Add the Products endpoint](#add-the-products-endpoint)
- [Create a custom hook](#create-a-custom-hook)
- [Create a header component](#create-a-header-component)
- [Update the homepage](#update-the-homepage)
- [Update the user interface](#update-the-user-interface)
- [Test your app](#test-your-app)

</div>

Now that you have embedded your app in the BigCommerce platform, you're ready to integrate the BigCommerce API.

Anytime you make an API call to BigCommerce, you need to pass in the access token. Storing the access token in a database allows you to persist the session when you call `/auth`, `/load`, or `/uninstall` endpoints. 

This step demonstrates how to integrate the sample app with [Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart), a cloud-hosted NoSQLFirebase database, and [MySQL](https://www.mysql.com/), a relational database management system.

## Install npm packages

If using Firebase, install `firebase`, `jsonwebtoken`, and `swr` npm packages.

```shell
npm install --save firebase jsonwebtoken swr
```

If using MySQL, install `mysql`, `jsonwebtoken`, and `swr` npm packages.

```shell
npm install --save mysql jsonwebtoken swr
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> These instructions have been tested using the **firebase v8** package.  You can view a list of all the tested package versions in the [package.json file on the Step 3 branch](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/package.json) of this sample app's repo.

</div>
</div>
</div>
## Add TypeScript definitions

1. In the root directory of your project, add a `types` folder.

2. In the `types` folder, create `auth.ts`, `data.ts`, `db.ts`, and `index.ts` files.

3. Open the `auth.ts` file and export `User`, `SessionProps`, and `QueryParams` TypeScript type definitions.

```js
export interface User {
    id: number;
    username?: string;
    email: string;
}

export interface SessionProps {
    access_token?: string;
    scope?: string;
    user: User;
    context: string;
    store_hash?: string;
    timestamp?: number;
}

export interface QueryParams {
    [key: string]: string | string[];
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/types/auth.ts)

4. Open the `data.ts` file and export `ContextValues` TypeScript type definition.

```js
export interface ContextValues {
  context: string;
  setContext: (key: string) => void;
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/types/data.ts)

5. Open the `db.ts` file. Import `SessionProps` from `./index` and export `StoreData`, `UserData`, and `Db` TypeScript type definitions.

```js
import { SessionProps } from './index';

export interface StoreData {
    accessToken?: string;
    scope?: string;
    storeHash: string;
}

export interface UserData {
    email: string;
    storeHash: string;
    username?: string;
}

export interface Db {
    setUser(session: SessionProps): Promise<void>;
    setStore(session: SessionProps): Promise<void>;
    getStoreToken(storeHash: string): string | null;
    deleteStore(session: SessionProps): Promise<void>;
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/types/db.ts)

6. Open the `index.ts` file and export all interfaces.

```js
export * from './auth';
export * from './data';
export * from './db';
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/types/index.ts)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> If ngrok stops working or your ngrok session expires, restart the tunnel to get the new `ngrok_id` and update the callback URLs in the Developer Portal and the `AUTH_CALLBACK` in the `.env` file.

</div>
</div>
</div>

## Initialize React Context

React's Context API is a state management tool that streamlines the process of passing data to multiple components at different nesting levels. It lets you pass data through the component tree without having to pass props through multiple levels of React components. To learn more about Context, see React's [Context guide](https://reactjs.org/docs/context.html).

1. In the root of your app, create a `context` folder.

2. In the `context` folder, create a `session.tsx` file.

3. Add the logic to create a context.

```js
import { createContext, useContext, useState } from 'react';
import { ContextValues } from '../types';

const SessionContext = createContext<Partial<ContextValues>>({});

const SessionProvider = ({ children }) => {
    const [context, setContext] = useState('');
    const value = { context, setContext };

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);

export default SessionProvider;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/context/session.tsx)

## Update environment variables

You use a JSON Web Token (**JWT**) to securely transmit information encoded as a JSON object between parties. To learn more about JWT, see the [Internet Engineering Task Force documentation](https://datatracker.ietf.org/doc/html/rfc7519).

1. Open the `.env` file.

2. Enter a JWT secret. Your JWT key should be at least 32 random characters (256 bits) for HS256.

```shell
JWT_KEY={SECRET}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> The JWT key should be at least 32 random characters (256 bits) for HS256.

</div>
</div>
</div>

## Update the auth lib page

1. In the `lib` folder, open the `auth.ts` file.

2. At the top of the file, add the following imports:

```js
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { QueryParams, SessionProps } from '../types';
import db from './db';
```

3. Below the import statements, add the following line of code to destructure environment variables from `.env`:

```js
const { AUTH_CALLBACK, CLIENT_ID, CLIENT_SECRET, JWT_KEY } = process.env;
```

4. Remove the `process.env` global variable from the BigCommerce instances.

```js
const bigcommerce = new BigCommerce({
    logLevel: 'info',
    clientId: CLIENT_ID,
    secret: CLIENT_SECRET,
    callback: AUTH_CALLBACK,
    responseType: 'json',
    headers: { 'Accept-Encoding': '*' },
    apiVersion: 'v3'
});

const bigcommerceSigned = new BigCommerce({
    secret: CLIENT_SECRET,
    responseType: 'json'
});
```

5. Remove the `QueryParams` interface.

```js
//Delete this code
interface QueryParams {
   [key: string]: string;
}
```

6. Below the `bigcommerceSigned` variable, export the `bigcommerceClient` function.

```js
export function bigcommerceClient(accessToken: string, storeHash: string) {
    return new BigCommerce({
        clientId: CLIENT_ID,
        accessToken,
        storeHash,
        responseType: 'json',
        apiVersion: 'v3'
    });
}
```

7. Export `getBCAuth` and `getBCVerify` functions.

```js
export function getBCAuth(query: QueryParams) {
    return bigcommerce.authorize(query);
}

export function getBCVerify({ signed_payload_jwt }: QueryParams) {
    return bigcommerceSigned.verifyJWT(signed_payload_jwt);
}
``` 

8. Add the `setSession`, `getSession`, and `removeSession` functions.

```js
export async function setSession(session: SessionProps) {
    db.setUser(session);
    db.setStore(session);
}

export async function getSession({ query: { context = '' } }: NextApiRequest) {
    if (typeof context !== 'string') return;
    const decodedContext = decodePayload(context)?.context;
    const accessToken = await db.getStoreToken(decodedContext);

    return { accessToken, storeHash: decodedContext };
}

export async function removeSession(res: NextApiResponse, session: SessionProps) {
    await db.deleteStore(session);
}
```

9. Add the `encodePayload` and `decodePayload` functions.

```js
export function encodePayload(context: string) {
    return jwt.sign({ context }, JWT_KEY, { expiresIn: '24h' });
}

export function decodePayload(encodedContext: string) {
    return jwt.verify(encodedContext, JWT_KEY);
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/lib/auth.ts)

## Add a database

In this section of the tutorial, we provide config and initialization code for both Firebase and MySQL databases. Depending on the database you choose to integrate your app with, use the configuration instructions specific to your setup. 

For Firebase configuration instructions, see [Set up Firebase database](#set-up-firebase-database).

For MySQL configuration instructions, see [Set up MySQL database](#set-up-mysql-database).

## Set up Firebase database

[Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart) is a cloud-hosted NoSQL Firebase database built on Google's infrastructure. To learn more about Firebase, including how-to guides and code samples, see [Firebase Documentation](https://firebase.google.com/docs). For a quickstart on how to set up your Cloud Firestore, see [Get started](https://firebase.google.com/docs/firestore/quickstart).

### Create a Firebase project

1. Sign in to [Cloud Firestore](https://firebase.google.com/products/firestore) using your Google account. To create a Google account, visit the [Google signup page](https://accounts.google.com/signup/v2/webcreateaccount?hl=en&flowName=GlifWebSignIn&flowEntry=SignUp).

2. Once logged in, click **Go to console** in the top right corner.

3. In the Firebase console, click **Add project**.

4. Enter your project name and click **Continue**.

5. Click **Create project**.

### Create a Firebase config

1. In your Firebase project console, click on the **settings icon** that resembles a gear in the top left corner.

2. Select **Project settings** from the dropdown menu.

3. Under the **General** tab, scroll down to **Your apps** and click on the **code icon** (</>) to select the web platform.

4. Type in the name of your app and click **Register app**.

5. Make a note of the Firebase `apiKey`, `authDomain`, and `projectId`. You will need that information to update the app's environment variables.

### Create a Cloud Firestore database

1. In your Firebase console, click **Firestore Database** under **Build** in the left pane. Follow the steps to create a Cloud Firestore database.

2. Click **Create database**.

3. Choose **Start in test mode**.

4. Select your Cloud Firestore location and click **Enable**.

### Update environment variables

1. In the `.env` file, specify the database type.

```shell
DB_TYPE=firebase
```

2. Enter your Firebase database config keys.

```shell
FIRE_API_KEY={firebaseConfig.apiKey}
FIRE_DOMAIN={firebaseConfig.authDomain}
FIRE_PROJECT_ID={firebaseConfig.projectId}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> In the development mode, every time you modify your environment variables, make sure to restart the process (`npm run dev`) to capture the changes.

</div>
</div>
</div>

### Configure the Firebase database

1. In the `lib` folder, create a `dbs` folder. 

2. In the `dbs` folder, create a `firebase.ts` file.

3. At the top of the file, import the Firebase packages and TypeScript definitions.

```js
import firebase from 'firebase/app';
import 'firebase/firestore';
import { SessionProps, UserData } from '../../types';
```

4. Add the Firebase config and initialization logic.

```js
// Firebase config and initialization
// Prod applications might use config file

// Destructure the Firebase API key, domain, and project ID from the environment variables
const { FIRE_API_KEY, FIRE_DOMAIN, FIRE_PROJECT_ID } = process.env;

// Set up the Firebase config
const firebaseConfig = {
    apiKey: FIRE_API_KEY,
    authDomain: FIRE_DOMAIN,
    projectId: FIRE_PROJECT_ID,
};

// Set up conditions to determine app's initialization
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

// Set up the database
const db = firebase.firestore();

// Add Firestore database management functions

// setUser will capture information about the user
export async function setUser({ context, user }: SessionProps) {
    if (!user) return null;

    const { email, id, username } = user;
    const storeHash = context?.split('/')[1] || '';
    const ref = db.collection('users').doc(String(id));
    const data: UserData = { email, storeHash };

    if (username) {
        data.username = username;
    }

    await ref.set(data, { merge: true });
}

// setStore will capture the store's access token, context, and scope.
export async function setStore(session: SessionProps) {
    const { access_token: accessToken, context, scope } = session;
    // Only set on app install or update
    if (!accessToken || !scope) return null;

    const storeHash = context?.split('/')[1] || '';
    const ref = db.collection('store').doc(storeHash);
    const data = { accessToken, scope };

    await ref.set(data);
}

// Add a function to retrieve the store hash from the database
export async function getStoreToken(storeHash: string) {
    if (!storeHash) return null;
    const storeDoc = await db.collection('store').doc(storeHash).get();

    return storeDoc.exists ? storeDoc.data()?.accessToken : null;
}

// Delete the store when the user uninstalls the app
export async function deleteStore({ store_hash: storeHash }: SessionProps) {
    const ref = db.collection('store').doc(storeHash);

    await ref.delete();
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/lib/dbs/firebase.ts)

Running `firebase.initializeApp()` will initialize the app. For initialized apps, call `firebase.app()` to retrieve the Firebase app instance.

## Set up MySQL database

[MySQL](https://www.mysql.com/) is a relational database management system. For instructions on how to set up and use MySQL, see [Getting Started with MySQL](https://dev.mysql.com/doc/mysql-getting-started/en/). Once you complete the database setup, make a note of the MySQL `host`, `domain`, `username`, `password`, and `port` variables. You will need them to update the app's environment variables in the next step.

### Update environment variables

1. In the `.env` file, specify the database type.

```shell
DB_TYPE=mysql
```

2. Enter your MySQL database config keys.

```shell
MYSQL_HOST={mysql host}
MYSQL_DATABASE={mysql domain}
MYSQL_USERNAME={mysql username}
MYSQL_PASSWORD={mysql password}
MYSQL_PORT={mysql port}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> In the development mode, every time you modify your environment variables, make sure to restart the process (`npm run dev`) to capture the changes.

</div>
</div>
</div>

### Configure MySQL

1. In the `dbs` folder, create a `mysql.ts` file.

2. At the top of the file, add the following imports:

```js
import * as mysql from 'mysql';
import { promisify } from 'util';
import { SessionProps, StoreData } from '../../types';
```

3. Add the MySQL config and initialization logic.

```js
const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
const query = promisify(connection.query.bind(connection));

export async function setUser({ context, user }: SessionProps) {
    if (!user) return null;

    const { email, id, username } = user;
    const storeHash = context?.split('/')[1] || '';

    const userData = { email, userId: id, storeHash, username };

    await query('REPLACE INTO users SET ?', userData);
}

export async function setStore(session: SessionProps) {
    const { access_token: accessToken, context, scope } = session;
    // Only set on app install or update
    if (!accessToken || !scope) return null;

    const storeHash = context?.split('/')[1] || '';

    const storeData: StoreData = { accessToken, scope, storeHash };
    await query('REPLACE INTO stores SET ?', storeData);
}

export async function getStore() {
    const results = await query('SELECT * from stores limit 1');

    return results.length ? results[0] : null;
}

export async function getStoreToken(storeHash: string) {
    if (!storeHash) return null;

    const results = await query('SELECT accessToken from stores limit 1');

    return results.length ? results[0].accessToken : null;
}

export async function deleteStore({ store_hash: storeHash }: SessionProps) {
    await query('DELETE FROM stores WHERE storeHash = ?', storeHash);
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/lib/dbs/mysql.ts)



## Set up a db lib page

2. In the `lib` folder, create a `db.ts` file.

3. Open the `db.ts` file and add the `Db` import at the top of the file.

```js
import { Db } from '../types'
```

4. Add the switch expression to determine which database code to execute.

```js
const { DB_TYPE } = process.env;

let db: Db;

switch (DB_TYPE) {
    case 'firebase':
        db = require('./dbs/firebase');
        break;
    case 'mysql':
        db = require('./dbs/mysql');
        break;
    default:
        db = require('./dbs/firebase');
        break;
}

export default db;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/lib/db.ts)

## Upgrade the endpoints

**auth**

1. Open the `auth.ts` file nested inside the `pages/api` folder.

2. Import `encodePayload` and `setSession` from `/lib/auth`. Your imports should now look like this:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { encodePayload, getBCAuth, setSession } from '../../lib/auth';
```

3. Update the logic to authenticate the app on install.

```js
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Authenticate the app on install
        const session = await getBCAuth(req.query);
        const storeHash = session?.context?.split('/')[1] || '';
        const encodedContext = encodePayload(storeHash); // Signed JWT to validate/ prevent tampering

        await setSession(session);
        res.redirect(302, `/?context=${encodedContext}`);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json(message);
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/api/auth.ts)

**load**

1. Open the `load.ts` file nested inside the `pages/api` folder.

2. Import `encodePayload` and `setSession` from `/lib/auth`. Your imports should now look like this:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { encodePayload, getBCVerify, setSession } from '../../lib/auth';
```

3. Update the logic to authenticate the app on load.

```js
export default async function load(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Verify when app loaded (launch)
        const session = await getBCVerify(req.query);
        const storeHash = session?.context?.split('/')[1] || '';
        const encodedContext = encodePayload(storeHash); // Signed JWT to validate/ prevent tampering

        await setSession(session);
        res.redirect(302, `/?context=${encodedContext}`);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json(message);
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/api/load.ts)

**uninstall** 

1. Open the `uninstall.ts` file nested inside the `pages/api` folder.

2. Import `getBCVerify` and `removeSession` from `/lib/auth`. Your imports should now look like this:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { getBCVerify, removeSession } from '../../lib/auth';
```

3. Update the logic to delete the session on uninstall.

```js
export default async function uninstall(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getBCVerify(req.query);

        await removeSession(res, session);
        res.status(200).end();
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json(message);
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/api/uninstall.tss)

## Add the Products endpoint

The Products endpoint retrieves your products summary from the [Catalog API](https://developer.bigcommerce.com/api-reference/store-management/catalog/summary/getcatalogsummary).

1. In the `pages/api` folder, create a new folder called `products`.

2. In the `products` folder, create an `index.ts` file. This will create a `/products` route.

3. At the top of the file, import the following packages:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';
```

4. Add the async `products` function, which awaits the data returned from `bigcommerce.get`.

```js
export default async function products(req: NextApiRequest, res: NextApiResponse) {
    try {
        // First, retrieve the session by calling:
        const { accessToken, storeHash } = await getSession(req);
        // Then, connect the Node API client (to make API calls to BigCommerce)
        const bigcommerce = bigcommerceClient(accessToken, storeHash);
        // For this example, we'll be connecting to the Catalog API
        const { data } = await bigcommerce.get('/catalog/summary');
        res.status(200).json(data);
        // Finally, handle errors
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/api/products/index.ts)

The `products` function calls the `getSession` function to retrieve the session's access token and store hash. 

## Create a custom hook

To consume the Products endpoint, create a custom React hook using [SWR](https://swr.vercel.app/). 

1.  In the `lib` folder, create a `hooks.ts` file.

2. At the top of the file, import the `useSWR` React hook from SWR and `useSession` from Context.

```js
import useSWR from 'swr';
import { useSession } from '../context/session';
```

3. Declare the `fetcher` function.

```js
function fetcher(url: string, encodedContext: string) {
    return fetch(`${url}?context=${encodedContext}`).then(res => res.json());
}
```

The `fetcher` function accepts the API URL and returns data asynchronously.

4. Export the `useProducts` function.

```js
// Reusable SWR hooks
// https://swr.vercel.app/
export function useProducts() {
    const encodedContext = useSession()?.context;
    // Request is deduped and cached; Can be shared across components
    const { data, error } = useSWR(encodedContext ? ['/api/products', encodedContext] : null, fetcher);

    return {
        summary: data,
        isError: error,
    };
}
```

`useSWR` accepts two arguments: the API URL and the `fetcher` function. The `fetcher` function takes the `/api/products` URL passed in from the `useProduct` function. The `useProducts` function destructures the data returned by the `useSWR` hook. 

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/lib/hooks.ts)

## Create a header component

1. In the app's root directory, create a `components` folder.

2. In the `component`s folder, create a `header.tsx` file.

3. Import `Box` and `Link` components from BigDesign.

```js
import { Box, Link } from '@bigcommerce/big-design';
```

4. Define the `Header` functional component.

```js
const Header = () => (
    <Box marginBottom="xxLarge">
        <Link href="#">Home</Link>
    </Box>
);

export default Header;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/components/header.tsx)

## Update the homepage

1. In the `pages` folder, open the `index.tsx` file.

2. At the top of the file, replace the existing import with the following:

```js
import { Box, Flex, Panel, Text } from '@bigcommerce/big-design';
import { useEffect } from 'react';
import Header from '../components/header';
import { useSession } from '../context/session';
import { useProducts } from '../lib/hooks';
```

3. Update the `Index` functional component.

```js
const Index = ({ context }: { context: string }) => {
    // Destructure summary from useProducts
    const { summary } = useProducts();
    // Destructure setContext from useSession
    const { setContext } = useSession();

    useEffect(() => {
        if (context) setContext(context);
    }, [context, setContext]);

    return (
        <Panel header="Homepage">
            {summary &&
                <Flex>
                    <Box marginRight="xLarge">
                        <Text>Inventory Count</Text>
                        <Text>{summary.inventory_count}</Text>
                    </Box>
                    <Box marginRight="xLarge">
                        <Text>Variant Count</Text>
                        <Text>{summary.variant_count}</Text>
                    </Box>
                    <Box>
                        <Text>Primary Category</Text>
                        <Text>{summary.primary_category_name}</Text>
                    </Box>
                </Flex>
            }
        </Panel>
    );
};

export const getServerSideProps = async ({ query }) => ({
    props: { context: query?.context ?? '' }
});

export default Index;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/index.tsx)

`summary` creates the `Flex` component with three `Box` components inside of it. `inventory_count`, `variant_count`, and `primary_category_name` are populated with data returned from calling the `/catalog/summary` endpoint added in [Add the Products endpoint](#add-the-products-endpoint). 

For the complete list of properties returned by the `/catalog/summary` endpoint, see [Get a Catalog Summary](https://developer.bigcommerce.com/api-reference/store-management/catalog/summary/getcatalogsummary). 

## Update the user interface

1. In the root of the pages folder, open the `_app.tsx` file.

2. Import the `Box` and `Header` components.

```js
import { Box, GlobalStyles } from '@bigcommerce/big-design';
import Header from '../components/header';
```

3. Import `SessionProvider` from Context.

```js
import SessionProvider from '../context/session';
```

Your updated import statements should resemble the following:

```js
import { Box, GlobalStyles } from '@bigcommerce/big-design';
import type { AppProps } from 'next/app';
import Header from '../components/header';
import SessionProvider from '../context/session';
```

4. For Context to properly propagate, we need to wrap `<Component {...pageProps} />` with the Context `SessionProvider`. This ensures that each page has access to the React Context.

```js
<SessionProvider>
  <Component {...pageProps} />
</SessionProvider>
```

5. Add a `Box` component and place the `Header` and `SessionProvider` components inside of it.

```js
const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyles />
        <Box marginHorizontal="xxxLarge" marginVertical="xxLarge">
            <Header />
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </Box>
    </>
);

export default MyApp;
```

[View code in GitHub](hhttps://github.com/bigcommerce/sample-app-nodejs/blob/step-3-add-database/pages/_app.tsx)

4. In the root of the `pages` folder, open `index.tsx`.

5. Import the `Header` component.

```js
import Header from '../components/header';
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-add-database/pages/index.tsx)

## Test your app

Now that you have synced up the database, your app should display information under **Inventory Count**, **Variant Count**, and **Primary Category** fields.

![Sample app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-13.png "Sample app")

[Next: Enhance the User Experience with BigDesign](https://developer.bigcommerce.com/api-docs/apps/tutorials/sample-app-nextjs/step-4-enhance)
