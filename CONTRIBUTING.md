# Contributing to BigCommerce Developer Documentation

- [Making a Quick Edit](#making-a-quick-edit)
- [Editing Locally](#editing-locally)
- [Commit Messages](#commit-messages)
- [Style Guides](#style-guides)
- [Contributing to Other Projects](#contributing-to-other-projects)

Thanks for showing interest in contributing!

The following is a set of guidelines for contributing to BigCommerce's Developer Documentation. These are guidelines, not rules. Use your best judgment, and make proposed changes to this document in a pull request.

## Making a Quick Edit

The easiest way to edit a file is using GitHub's web interface:

1. Navigate to the file in GitHub. For example, [store-logs.mdx](https://github.com/bigcommerce/docs/blob/main/docs/api-docs/store-logs/store-logs.mdx).

2. Click the **pencil** icon to **Edit This File**.
3. Make the edit.
4. Type a commit message.
5. Select **Create a new branch for this commit and start a pull request**.
6. Give the branch a descriptive name.
7. Click **Propose file change**.
8. Give the pull request a descriptive title.
9. Fill in the pull request description.
10. Click **Create pull request**.

That's it! You're done.

## Editing Locally

For more complex changes, fork and edit locally:

1. Fork `bigcommerce/docs`.

2. `git clone` the fork to your local machine.

3. Make edits on a new branch in your IDE of choice.

4. Commit and push changes to your remote repo.

5. Create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to `bigcommerce:docs/main`.


## Commit Messages

- Always include subject; include body when necessary.
- Use present tense ("Add feature" not "Added feature").
- Use imperative mood ("Fix broken link..." not "Fixes broken link...").
- Separate subject from body with a blank line.
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Use the body to explain what and why versus how.

## Style Guides

- [Documentation Style Guide](_project/_doc_style_guide.md)
- [API Specification Style Guide](_project/_spec_style_guide.md)

## Contributing to Other Projects

There are many other public BigCommerce repositories accepting contributions. If you're interested in contributing to those projects, see the [full list of public source repos](https://github.com/bigcommerce?utf8=%E2%9C%93&q=is%3Apublic&type=source&language=). Also, consider joining the [BigCommerce Developer Community](https://developer.bigcommerce.com/community).

# Contributing to BigCommerce's API Specifications

Thanks for your interest in contributing!

## Edit

* **Edit:** Fork the repository and edit with your preferred editor. We recommend [VS Code](https://code.visualstudio.com/).
* **Lint:** Check for errors using [Spectral](https://stoplight.io/open-source/spectral) or another OAS linter.

* **Commit:** Write good commit messages using the guidelines in the following section.
* **Push** to your fork to ensure that your pull request contains the most up-to-date version of your code.

## Write descriptive commit messages

* Describe the change using at least one verb and one noun.
* Use specific nouns to identify what you changed.
* Use the present tense ("Fix broken link to x" not "Fixed broken link to x").
* Use the imperative mood ("Fix broken link to x" not "Fixes broken link to x").

## Pull request

[What is a pull request?](https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)

Use the included `pull_request_template.md` to tell us more about the changes you propose.

## Tools

The following tools might be helpful.

| Tool | Description |
|:-----|:------------|
| [Spectral CLI](https://stoplight.io/open-source/spectral) | Node.js CLI for the Spectral OpenAPI linter |
| [Spectral Linter for VS Code](https://marketplace.visualstudio.com/items?itemName=stoplight.spectral)| The Spectral OpenAPI linter as a VS Code extension |
| [swagger2openapi](https://www.npmjs.com/package/swagger2openapi)| Node.js CLI for converting Swagger to OpenAPI 3.0 |
| [openapi.tools](https://openapi.tools/) | List of open-source OpenAPI tools |
