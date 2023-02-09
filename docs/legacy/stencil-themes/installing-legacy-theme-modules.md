# Installing Legacy Theme Modules



If a theme’s version number is lower than `1.10.0`, the theme uses `jspm` as its JavaScript build system. Follow the steps outlined on this article to install theme modules via `jspm`.

 

## Step 1: Install `jspm`

```shell copy 
npm install -g jspm@0.16.30
```

Or, for Windows:

```shell copy 
npm install -g jspm@0.16.31
```

## Step 2: Register `jspm` Instance

Next, register your jspm instance with GitHub. To do so:
* Navigate to your [GitHub Personal Access Tokens page](https://github.com/settings/tokens).
* Generate a new personal access token with the name `Stencil` and scope `repo` (GitHub provides specific instructions).
* Verify the token includes the following scopes: `repo:status`, `repo_deployment`, and `public_repo`.
* Run the following command in a terminal to associate the `jspm` module and GitHub account: `jspm registry config github`
* When prompted with `Set up GitHub credentials?`, copy and paste the access token created above.

## Step 3: Install `jspm-git`

For the next step, you will need the [jspm-git registry plug-in](https://www.npmjs.com/package/jspm-git).

To install it, enter the following in a terminal: 

```shell copy showLineNumbers
# Install jspm-git registry plug-in
npm install -g jspm-git
```

If you already have an earlier version of `jspm-git` installed, you might need to update it to handle git projects with two-digit version numbers: 

```shell copy showLineNumbers
npm upgrade jspm-git@latest
```

## Step 4: Add BitBucket as a `jspm` Registry

Working with downloaded Marketplace themes requires adding a BitBucket registry for `jspm`. To do so, you'll need a [BitBucket account](https://bitbucket.org/product). Once you have an account, enter the following in a terminal to add BitBucket as a `jspm` registry:

```shell copy showLineNumbers
jspm registry create bitbucket jspm-git

# When prompted for a base URL, Enter: ssh://git@bitbucket.org
```

## Step 5: Install the Modules

Finally, install the `npm` and `jspm` modules required to access Stencil JavaScript events:

```shell copy showLineNumbers
# move into the theme's directory
cd ~/path/to/theme

# install the modules with jspm
jspm install
```
