# Step 4: Enhance the User Experience with BigDesign



[BigDesign](https://developer.bigcommerce.com/big-design) plays a pivotal part in the BigCommerce control panel and ecosystem. App developers are encouraged to use BigDesign to develop apps that have a native BigCommerce look and feel.

This step focuses on expanding functionality and integrating advanced design elements available as part of the BigDesign library.

## Create the Products List route

1. From the `pages/api` folder, open the `products` folder.

2. In the `products` folder, create a `list.ts` file. The `list.ts` file will be routed to `/api/list` and treated as an API endpoint, instead of a regular component.

3. At the top of the file, import the following packages:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';
```

4. Add the logic to call the Products endpoint of BigCommerce's [Catalog API](/api-reference/store-management/catalog).

```js
export default async function list(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash);
        // Optional: pass in API params here
        const params = [
            'limit=11',
        ].join('&');

        const { data } = await bigcommerce.get(`/catalog/products?${params}`);
        res.status(200).json(data);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/api/products/list.ts)

## Update custom hooks

1. In the `lib` folder, open the `hooks.ts` file.

2. Add the ` isLoading` property to the `useProducts` custom hook.

```js
export function useProducts() {
    const encodedContext = useSession()?.context;
    // Request is deduped and cached; Can be shared across components
    const { data, error } = useSWR(encodedContext ? ['/api/products', encodedContext] : null, fetcher);

    return {
        summary: data,
        isLoading: !data && !error,
        isError: error,
    };
}
```

3. Add the `useProductList` custom hook.

```js
export function useProductList() {
    const encodedContext = useSession()?.context;
    // Use an array to send multiple arguments to fetcher
    const { data, error, mutate: mutateList } = useSWR(encodedContext ? ['/api/products/list', encodedContext] : null, fetcher);

    return {
        list: data,
        isLoading: !data && !error,
        isError: error,
        mutateList,
    };
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/lib/hooks.ts)

## Create the Products page

1. In the `pages` folder, create a `products` folder.

2. In the `products` folder, create an `index.tsx` file.

3. At the top of the file, import the following packages:

```js
import { Button, Dropdown, Panel, Small, StatefulTable, Link as StyledLink } from '@bigcommerce/big-design';
import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useProductList } from '../../lib/hooks';
```
<!-- theme: info -->
> #### Note
> Because BigDesign and Next.js both have a component called `Link`, you need to import BigDesign's `Link` as `StyledLink` to avoid TypeScript errors.



4. Add the `Products` functional component. The `Products` component uses the BigDesign's [StatefulTable](https://developer.bigcommerce.com/big-design/statefulTable), a wrapper of the [Table](https://developer.bigcommerce.com/big-design/table) component that supports pagination, row selection, and sorting.

```js
const Products = () => {
    const router = useRouter();
    // Retrieve data from the catalog/products endpoint
    const { isError, isLoading, list = [] } = useProductList();
    // Properly format data for BigDesign's StatefulTable
    const tableItems = list.map(({ id, inventory_level: stock, name, price }) => ({
        id,
        name,
        price,
        stock,
    }));
    // When rendering table headers, you can return a string or a React component:
    const renderName = (id: number, name: string): ReactElement => (
        <Link href={`/products/${id}`}>
            <StyledLink>{name}</StyledLink>
        </Link>
    );

    const renderPrice = (price: number): string => (
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
    );

    const renderStock = (stock: number): ReactElement => (stock > 0
        ? <Small>{stock}</Small>
        : <Small bold marginBottom="none" color="danger">0</Small>
    );

    const renderAction = (id: number): ReactElement => (
        <Dropdown
            items={[ { content: 'Edit product', onItemClick: () => router.push(`/products/${id}`), hash: 'edit' } ]}
            toggle={<Button iconOnly={<MoreHorizIcon color="secondary60" />} variant="subtle" />}
        />
    );

    return (
        <Panel>
            <StatefulTable
                columns={[
                    { header: 'Product name', hash: 'name', render: ({ id, name }) => renderName(id, name), sortKey: 'name' },
                    { header: 'Stock', hash: 'stock', render: ({ stock }) => renderStock(stock), sortKey: 'stock' },
                    { header: 'Price', hash: 'price', render: ({ price }) => renderPrice(price), sortKey: 'price' },
                    { header: 'Action', hideHeader: true, hash: 'id', render: ({ id }) => renderAction(id), sortKey: 'id' },
                ]}
                items={tableItems}
                itemName="Products"
                stickyHeader
            />
        </Panel>
    );
};

export default Products;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/products/index.tsx)

## Add the InnerHeader component

1. In the `components` folder, create an `innerHeader.tsx` file.

2. At the top of the file, import the following packages:

```js
import { Box, Button, H1, HR, Text } from '@bigcommerce/big-design';
import { ArrowBackIcon } from '@bigcommerce/big-design-icons';
import { useRouter } from 'next/router';
import { useProductList } from '../lib/hooks';
import { TabIds, TabRoutes } from './header';
```

3. Define the `InnerHeader` functional component. You use it for the Product Edit page, a subpage of `products` (`/products/[pid]`), whereas the main `Header` component is used for the main pages such as `/` and `/products`.

```js
const InnerHeader = () => {
    const router = useRouter();
    const { pid } = router.query;
    const { list = [] } = useProductList();
    const { name } = list.find(item => item.id === Number(pid)) ?? {};

    const handleBackClick = () => router.push(TabRoutes[TabIds.PRODUCTS]);

    return (
        <Box marginBottom="xxLarge">
            <Button iconLeft={<ArrowBackIcon color="secondary50" />} variant="subtle" onClick={handleBackClick}>
                <Text bold color="secondary50">Products</Text>
            </Button>
            {name &&
                <H1>{name}</H1>
            }
            <HR color="secondary30" />
        </Box>
    );
};

export default InnerHeader;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/components/innerHeader.tsx)

The `InnerHeader` component uses BigDesign's `Button` component with the `variant` property set to `subtle`. By setting the variant type to `subtle`, you remove the button's border and simultaneously add a hover effect. To learn more about the BigDesign's `Button` component, see [Buttons Design Guidelines](https://developer.bigcommerce.com/big-design/button).

The `ArrowBackIcon` component is part of the BigDesign's Icons package. You can modify the look of the icon by setting its color and size. To learn more about BigDesign's Icons, see [Icons](https://developer.bigcommerce.com/big-design/icons).

## Update the Header component

In this step, you incorporate the BigDesign's `Tabs` component into your app. You use the `Tabs` component to organize and navigate between content types. To learn more, see [Tabs Developer Docs](https://developer.bigcommerce.com/big-design/tabs). 

1. In the components folder, open the `header.tsx` file and update the imports.

```js
import { Box, Tabs } from '@bigcommerce/big-design';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InnerHeader from './innerHeader';
```

2. Declare `TabIds`, `TabRoutes`, `InnerRoutes`, and `HeaderTypes` variables.

```js
export const TabIds = {
    HOME: 'home',
    PRODUCTS: 'products',
};

export const TabRoutes = {
    [TabIds.HOME]: '/',
    [TabIds.PRODUCTS]: '/products',
};

const InnerRoutes = [
    '/products/[pid]',
];

const HeaderTypes = {
    GLOBAL: 'global',
    INNER: 'inner',
};
```

3. Update the `Header` functional component.

```js
const Header = () => {
    const [activeTab, setActiveTab] = useState<string>('');
    const [headerType, setHeaderType] = useState<string>(HeaderTypes.GLOBAL);
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        if (InnerRoutes.includes(pathname)) {
            // Use InnerHeader if route matches inner routes
            setHeaderType(HeaderTypes.INNER);
        } else {
            // Check if new route matches TabRoutes
            const tabKey = Object.keys(TabRoutes).find(key => TabRoutes[key] === pathname);

            // Set the active tab to tabKey or set no active tab if route doesn't match (404)
            setActiveTab(tabKey ?? '');
            setHeaderType(HeaderTypes.GLOBAL);
        }

    }, [pathname]);

    useEffect(() => {
        // Prefetch products page to reduce latency (doesn't prefetch in dev)
        router.prefetch('/products');
    });

    const items = [
        { id: TabIds.HOME, title: 'Home' },
        { id: TabIds.PRODUCTS, title: 'Products' },
    ];

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);

        return router.push(TabRoutes[tabId]);
    };

    if (headerType === HeaderTypes.INNER) return <InnerHeader />;

    return (
        <Box marginBottom="xxLarge">
            <Tabs
                activeTab={activeTab}
                items={items}
                onTabClick={handleTabClick}
            />
        </Box>
    );
};

export default Header;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/components/header.tsx)

The `Header` functional component uses the `useEffect` React hook to perform side effects and enhance performance. Notably, performance enhancement is only visible in a production or production-like environment (integration or staging). `router.prefetch()` does not prefetch the products page while in the development mode.

### Test your app

Your app should now display two tabs: **Home** and **Products**. Click on the **Products** tab. You should see a list of products from your test store.

![Products page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-14.png "Products page")

### Latency

When loading the products page for the first time, the latency you notice only happens in the development mode. In production or a production-like environment, `router.prefetch()` prefetches the products page reducing the latency.

To test your app in a production or a production-like environment (integration or staging), run `npm run build` instead of `npm run dev` in your terminal. This builds and compiles your local code. Then, run `npm run start` to get the performance enhancements traditionally not available in the development mode. 

Keep in mind that any changes you make to your code after running `npm run build` need to go through the build process to be captured.

## Create the ErrorMessage component

To surface error messages to the app's users, add an error message component. You can call this component from any `page` or `component`.

1. In the `components` folder, add the `error.tsx` file.

2. Copy and paste the following code to create the `ErrorMessage` component:

```js
import { H3, Panel } from '@bigcommerce/big-design';

interface ErrorMessageProps {
    error?: Error;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => (
    <Panel>
        <H3>Failed to load</H3>
        {error && error.message}
    </Panel>
);

export default ErrorMessage;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/components/error.tsx)

## Create the Loading component

The `Loading` component makes use of the BigDesign's indeterminant ProgressCircle indicator. The indeterminant [ProgressCircle](https://developer.bigcommerce.com/big-design/progress-circle) represents an unknown amount of time for a task to complete. To learn more about BigDesign's progress indicators, see [Progress Circle Developer Docs](https://developer.bigcommerce.com/big-design/progress-circle).

In the `components` folder, create a `loading.tsx` file.

```js
import { Flex, H3, Panel, ProgressCircle } from '@bigcommerce/big-design';

const Loading = () => (
    <Panel>
        <H3>Loading...</H3>
        <Flex justifyContent="center" alignItems="center">
            <ProgressCircle size="large" />
        </Flex>
    </Panel>
);

export default Loading;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/components/loading.tsx)

## Add system checks

Now that you have created the `ErrorMessage` and `Loading` components, you can add them to the `Products` component.

1. In the `/pages/products` folder, open the `index.tsx` file.

2. Import the `ErrorMessage` and `Loading` components.

```js
import ErrorMessage from '../../components/error';
import Loading from '../../components/loading';
```

3. Inside the `Products` functional component, above the `return` statement, add the logic to return `ErrorMessage` and `Loading` components. `isLoading` checks when the page or component is loading and `isError` checks for API errors.

```js
if (isLoading) return <Loading />;
if (isError) return <ErrorMessage />;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/products/index.tsx)

## Update TypeScript definitions

1. In the `types` folder, open the `data.ts` file.

2. Export `FormData` and `StringKeyValue` TypeScript definitions.

```js
export interface FormData {
    description: string;
    isVisible: boolean;
    name: string;
    price: number;
    type: string;
}

export interface StringKeyValue {
    [key: string]: string;
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/types/data.ts)

## Create the Form component

You use the BigDesign's `Form` component to display and edit individual product information.

The BigDesign's `Form` component comes with built-in support for accessibility, validation, and handling errors. It supports various input types, including Input, Checkbox, Radio, Select, and Textarea. To learn more, see [Form Developer Docs](https://developer.bigcommerce.com/big-design/form).

1. In the `components` folder, add the `form.tsx` file.

2. At the top of the file, import the following packages:

```js
import { Button, Checkbox, Flex, FormGroup, Input, Panel, Select, Form as StyledForm, Textarea } from '@bigcommerce/big-design';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FormData, StringKeyValue } from '../types';
```

3. Add the `FormProps` TypeScript definition.

```js
interface FormProps {
    formData: FormData;
    onCancel(): void;
    onSubmit(form: FormData): void;
}
```

4. Declare the `FormErrors` variable.

```js
const FormErrors = {
    name: 'Product name is required',
    price: 'Default price is required',
};
```

5. Declare and export the `Form` functional component.

```js
const Form = ({ formData, onCancel, onSubmit }: FormProps) => {
    const { description, isVisible, name, price, type } = formData;
    const [form, setForm] = useState<FormData>({ description, isVisible, name, price, type });
    const [errors, setErrors] = useState<StringKeyValue>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name: formName, value } = event?.target;
        setForm(prevForm => ({ ...prevForm, [formName]: value }));

        // Add error if it exists in FormErrors and the input is empty, otherwise remove from errors
        !value && FormErrors[formName]
            ? setErrors(prevErrors => ({ ...prevErrors, [formName]: FormErrors[formName] }))
            : setErrors(({ [formName]: removed, ...prevErrors }) => ({ ...prevErrors }));
    };

    const handleSelectChange = (value: string) => {
        setForm(prevForm => ({ ...prevForm, type: value }));
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, name: formName } = event?.target;
        setForm(prevForm => ({ ...prevForm, [formName]: checked }));
    };

    const handleSubmit = (event: FormEvent<EventTarget>) => {
        event.preventDefault();

        // If there are errors, do not submit the form
        const hasErrors = Object.keys(errors).length > 0;
        if (hasErrors) return;

        onSubmit(form);
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <Panel header="Basic Information">
                <FormGroup>
                    <Input
                        error={errors?.name}
                        label="Product name"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Select
                        label="Product type"
                        name="type"
                        options={[
                            { value: 'physical', content: 'Physical' },
                            { value: 'digital', content: 'Digital' }
                        ]}
                        required
                        value={form.type}
                        onOptionChange={handleSelectChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        error={errors?.price}
                        iconLeft={'$'}
                        label="Default price (excluding tax)"
                        name="price"
                        placeholder="10.00"
                        required
                        type="number"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Checkbox
                        name="isVisible"
                        checked={form.isVisible}
                        onChange={handleCheckboxChange}
                        label="Visible on storefront"
                    />
                </FormGroup>
            </Panel>
            <Panel header="Description">
                <FormGroup>
                    {/* Using description for demo purposes. Consider using a wysiwig instead (e.g. TinyMCE) */}
                    <Textarea
                        label="Description"
                        name="description"
                        placeholder="Product info"
                        value={form.description}
                        onChange={handleChange}
                    />
                </FormGroup>
            </Panel>
            <Flex justifyContent="flex-end">
                <Button
                    marginRight="medium"
                    type="button"
                    variant="subtle"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </Flex>
        </StyledForm>
    );
};

export default Form;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/components/form.tsx)

## Create dynamic product routes

Next.js allows you to create dynamic routes by adding brackets to a page; for example, `[pid]`. Any route similar to `products/123` or `products/abc` is matched by `pages/products/[pid].tsx`. To learn more about defining dynamic routes in Next.js, see [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes).

1. Navigate to the `/pages/products` folder and create a `[pid].tsx` file.

2. At the top of the file, import the following packages:

```js
import { useRouter } from 'next/router';
import ErrorMessage from '../../components/error';
import Form from '../../components/form';
import Loading from '../../components/loading';
import { useSession } from '../../context/session';
import { useProductList } from '../../lib/hooks';
import { FormData } from '../../types';
```

3. Declare and export the `ProductInfo` functional component.

```js
const ProductInfo = () => {
    const router = useRouter();
    const encodedContext = useSession()?.context;
    const { pid } = router.query;
    const { isError, isLoading, list = [], mutateList } = useProductList();
    const product = list.find(item => item.id === Number(pid));
    const { description, is_visible: isVisible, name, price, type } = product ?? {};
    const formData = { description, isVisible, name, price, type };

    const handleCancel = () => router.push('/products');

    const handleSubmit = async (data: FormData) => {
        try {
            const filteredList = list.filter(item => item.id !== Number(pid));
            const { description, isVisible, name, price, type } = data;
            const apiFormattedData = { description, is_visible: isVisible, name, price, type };

            // Update local data immediately (reduce latency to user)
            mutateList([...filteredList, { ...product, ...data }], false);

            // Update product details
            await fetch(`/api/products/${pid}?context=${encodedContext}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(apiFormattedData),
            });

            // Refetch to validate local data
            mutateList();

            router.push('/products');
        } catch (error) {
            console.error('Error updating the product: ', error);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage />;

    return (
        <Form formData={formData} onCancel={handleCancel} onSubmit={handleSubmit} />
    );
};

export default ProductInfo;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/products/%5Bpid%5D.tsx)

The `ProductInfo` functional component uses the `Form` component defined in `/components/form`. When you click on a product from the products list, it takes you to the corresponding page containing information about that particular product.

<!-- theme: info -->
> #### Note
> Because you fetch all of the products data with the initial Catalog API call, you do not need to make additional calls to retrieve individual product data.



The following image illustrates the `Form` input types:

![Form input types](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-15.png "Form input types")

## Integrate dynamic routes with the internal API

1. Navigate to the `/pages/api/products` folder.

2. In the `products` folder, create a `[pid].ts` file.

3. At the top of the file, import the following packages:

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';
```

4. Add the function to update individual products based on the data passed in a `PUT` request.

```js
export default async function products(req: NextApiRequest, res: NextApiResponse) {
    const {
        body,
        query: { pid },
    } = req;

    try {
        const { accessToken, storeHash } = await getSession(req);
        const bigcommerce = bigcommerceClient(accessToken, storeHash);

        const { data } = await bigcommerce.put(`/catalog/products/${pid}`, body);
        res.status(200).json(data);
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/api/products/%5Bpid%5D.ts)

### Test your app

1. Pick a product from the products list and try changing its information such as name or price. 

2. Save your changes. The changes should appear on the **Products** page.

## Style the home page

1. In the `pages` folder, open the `index.tsx` file.

2. Update the imported packages.

```js
import { Box, Flex, H1, H4, Panel } from '@bigcommerce/big-design';
import { useEffect } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../components/error';
import Loading from '../components/loading';
import { useSession } from '../context/session';
import { useProducts } from '../lib/hooks';
```

3. In the [Flex](https://developer.bigcommerce.com/big-design/flex) component, extend the styles of the [Box](https://developer.bigcommerce.com/big-design/box) component by specifying the `border`, `borderRadius`, `marginRight`, and `padding` attributes. Replace the `Text` component with `H4` and `H1` components. To learn more about BigDesign's typographic palette, see [Typography](https://developer.bigcommerce.com/big-design/typography). 

```js
const Index = ({ context }: { context: string }) => {
    const { isError, isLoading, summary } = useProducts();
    const { setContext } = useSession();

    useEffect(() => {
        if (context) setContext(context);
    }, [context, setContext]);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorMessage />;

    return (
        <Panel header="Homepage">
            <Flex>
                <StyledBox border="box" borderRadius="normal" marginRight="xLarge" padding="medium">
                    <H4>Inventory count</H4>
                    <H1 marginBottom="none">{summary.inventory_count}</H1>
                </StyledBox>
                <StyledBox border="box" borderRadius="normal" marginRight="xLarge" padding="medium">
                    <H4>Variant count</H4>
                    <H1 marginBottom="none">{summary.variant_count}</H1>
                </StyledBox>
                <StyledBox border="box" borderRadius="normal" padding="medium">
                    <H4>Primary category</H4>
                    <H1 marginBottom="none">{summary.primary_category_name}</H1>
                </StyledBox>
            </Flex>
        </Panel>
    );
};

const StyledBox = styled(Box)`
    min-width: 10rem;
`;

export const getServerSideProps = async ({ query }) => ({
    props: { context: query?.context ?? '' }
});

export default Index;
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-4-big-design/pages/index.tsx)

### Test your app

Your home page should now look similar to the following:

![Styled home page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-16.png "Styled home page")

## Start the app

To compile all of the production code for this project and start the app in the production environment, run the following commands in your terminal:

```shell
npm run build
npm run start
```

You should now have a fully functional app that pulls data from BigCommerce's Catalog API and allows you to update each product individually, all in one convenient location.

**Home page view**

![Styled home page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-16.png "Styled home page")

**Products page view**

![Products page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-14.png "Products page")

**Individual product page view**

![Individual product page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-17.png "Individual product page")

This concludes our Next.js Sample App tutorial. To continue developing with BigCommerce, consider working through these supplemental materials:

* [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal)
