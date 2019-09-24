<h1>Installing Legacy Theme Modules</h1>

<div class="otp" id="no-index">

### On This Page

* [Step 1: Install `jspm`](#install-jspm)
* [Step 2: Register `jspm` Instance](#register-jspm-instance)
* [Step 3: Install `jspm-git`](#install-jspm-git)
* [Step 4: Add BitBucket as a `jspm Registry`](#add-bitbucket-as-a-jspm-registry)
* [Step 5: Install the Modules](#install-the-modules) 

</div>

If a theme’s version number is lower than `1.10.0`, the theme uses `jspm` as its JavaScript build system. Follow the steps outlined on this article to install theme modules via `jspm`.

--- 

<a href='#install-jspm' aria-hidden='true' class='block-anchor'  id='install-jspm'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 1: Install `jspm`

```shell
npm install -g jspm@0.16.30
```

Or, for Windows:

```shell
npm install -g jspm@0.16.31
```

---

<a href='#register-jspm-instance' aria-hidden='true' class='block-anchor'  id='register-jspm-instance'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 2: Register `jspm` Instance

Next, register your jspm instance with GitHub. To do so:
* Navigate to your [GitHub Personal Access Tokens page](https://github.com/settings/tokens).
* Generate a new personal access token with the name `Stencil` and scope `repo` (GitHub provides specific instructions).
* Verify the token includes the following scopes: `repo:status`, `repo_deployment`, and `public_repo`.
* Run the following command in a terminal to associate the `jspm` module and GitHub account: `jspm registry config github`
* When prompted with `Set up GitHub credentials?`, copy and paste the access token created above.

---

<a href='#install-jspm-git' aria-hidden='true' class='block-anchor'  id='install-jspm-git'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 3: Install `jspm-git`

For the next step, you will need the [jspm-git registry plug-in](https://www.npmjs.com/package/jspm-git).

To install it, enter the following in a terminal: 

```shell
# Install jspm-git registry plug-in
npm install -g jspm-git
```

If you already have an earlier version of `jspm-git` installed, you might need to update it to handle git projects with two-digit version numbers: 

```shell
npm upgrade jspm-git@latest
```

---

<a href='#add-bitbucket-as-a-jspm-registry' aria-hidden='true' class='block-anchor'  id='add-bitbucket-as-a-jspm-registry'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 4: Add BitBucket as a `jspm` Registry

Working with downloaded Marketplace themes requires adding a BitBucket registry for `jspm`. To do so, you'll need a [BitBucket account](https://bitbucket.org/product). Once you have an account, enter the following in a terminal to add BitBucket as a `jspm` registry:

```shell
jspm registry create bitbucket jspm-git

# When prompted for a base URL, Enter: ssh://git@bitbucket.org
```

---

<a href='#install-the-modules' aria-hidden='true' class='block-anchor'  id='install-the-modules'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 5: Install the Modules

Finally, install the `npm` and `jspm` modules required to access Stencil JavaScript events:

```shell
# move into the theme's directory
cd ~/path/to/theme

# install the modules with jspm
jspm install
```