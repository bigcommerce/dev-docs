# Contributing to BigCommerce Developer Documentation

- [Making a Quick Edit](#making-a-quick-edit)
- [Editing Locally](#editing-locally)
- [Editing Using Stoplight Studio](#editing-using-stoplight-studio)
- [Commit Messages](#commit-messages)
- [Style Guides](#style-guides)
- [Linting &amp; Spell Checking](#linting-amp-spell-checking)
- [Contributing to Other Projects](#contributing-to-other-projects)

Thanks for showing interest in contributing!

The following is a set of guidelines for contributing to BigCommerce Developer Documentation. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Making a Quick Edit
The easiest way to edit a file is using GitHub's web interface:

1. Navigate to the file in github ([making-requests.md](/bigcommerce/dev-docs/blob/master/docs/api-docs/getting-started/making-requests.md), for example)
2. Click the **pencil** icon to **Edit This File**
3. Make the edit
4. Type a commit message
5. Select **Create a new branch for this commit and start a pull request**
6. Give the branch a descriptive name
7. Click **Propose file change**
8. Give the pull request a descriptive title
9. Fill in the pull request description
10. Click **Create pull request**

That's it! You're done.

## Editing Locally
For more complex changes, fork and edit locally: 

1. Fork `bigcommerce/dev-docs`
2. `git clone` the fork to your local machine
3. Make edits in your favorite code editor on a new branch
4. Commit and pushes changes to your remote repo
5. Create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) against `bigcommerce/dev-docs/master`

## Editing Using Stoplight Studio

[Stoplight Studio](https://stoplight.io/p/docs/gh/stoplightio/studio) "is Stoplight's next generation application for API design, modeling, and technical writing". Studio makes contributing to BigCommerce Developer Documentation super easy -- simply navigate to https://stoplight.io/p/studio/gh/bigcommerce/dev-docs to load the in-browser editor, then

1. Create a new branch 
2. Make your edits
3. Click **Commit** to select the file changes you would like to commit and view a diff
4. Commit the changes
5. Navigate to the commit in GitHub and make a pull request against `bigcommerce/dev-docs/master`

## Commit Messages
* Always include subject; include body when necessary
* Use present tense ("Add feature" not "Added feature")
* Use imperative mood ("Fix broken link..." not "Fixes broken link...")
* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the body to explain what and why vs. how

## Style Guides
* [Documentation Style Guide](_project/_doc_style_guide.md)
* [API Specification Style Guide](_project/_spec_style_guide.md)

## Linting & Spell Checking

```bash
# install grunt-cli
npm install -g grunt-cli

# make sure you're in dev-docs root dir
cd ~/path/to/dev-docs

# install the linters and spell checkers
npm install

# run mdspell to spell check:
grunt mdspell

# run textlint to lint / check for dead links:
grunt textlint
```

**Configuration Files**:

```shell
...
├── .spelling                          # mdspell dictionary
├── .textlintrc                        # textlint configuration file
├── Gruntfile.js                       # grunt configuration file
├── package-lock.json                  # packages for grunt, linting, and spell checking
├── package.json                       # packages for grunt, linting, and spell checking
...
```

## Contributing to Other Projects
There are many other public BigCommerce repositories accepting contributions. If you're interested in contributing to those projects, see the [full list of public source repos](https://github.com/bigcommerce?utf8=%E2%9C%93&q=is%3Apublic&type=source&language=). Also, consider joining the [BigCommerce Developer Community Group](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers).
