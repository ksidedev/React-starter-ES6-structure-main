# Contributing

There are a few ways to make the process of contributing code to this project nice and smooth. The best way to get across these processes is to checkout the **Spark frontend workflow** repo which covers everything from workflow, testing, code styles etc. through to the release lifecycle.

Aside from the above, all contributions should come in the form of a Pull Request.

## Filing Issues

We have two ways of filing issues. If you are opening an issue about a bug in the code this is the place. If it is for the overall system and its behaviour or something concerned with the acceptance criteria, it's probably better suited to be on the JIRA board.

Either way, make sure that you include clear steps for how we can reproduce the problem. If we can't reproduce it, we can't fix it. If you are suggesting a feature, make sure your explanation is clear and detailed. Generally speaking feature requests should go through the business.

## Install

To get up and developing you will need to:

```
git clone https://github.com/touchcast/spark-component-library
cd spark-component-library
npm install

npm test
npm start
```


## Commit Messaging

The commit messages in this project follow a very specific format that allows us to auto generate changelogs and bump the semver according to what's been committed. So please, make sure you follow this <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/workflow.md#commit-messaging" target="_blank">convention</a> *(same as Google's AngularJS project)* as explained in the workflow repo.

In short it should looks something like the following:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

#### Clean Up

If you're feeling brave and know what your doing then feel free to clean up your commits using `git rebase` **before you push to the remote - never rebase the master or remote repo**.

It's not expected that you do this and most often there isn't the need. Sometimes though you may want to clean your commits in order to ensure you've followed the [correct message format](#commit-messaging). It also means you can ensure each commit does something significant, rather than being a typo or development bug fix.

A good way to do this is with <a href="https://help.github.com/articles/about-git-rebase/" target="_blank">git rebase -i</a>.

```
$ git rebase -i HEAD~3 // where three is the number of previous commits to edit
```

## PR Musts

Before a PR can be merged it will need to check off against our production pre-flight checklist. You can find more info about each item on this checklist in the <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/workflow.md#commit-messaging" target="_blank">Spark workflow</a> repo.

A few of the key items are:

1. <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/workflow.md#tests" target="_blank">Tests</a>
1. <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/workflow.md#style-guide" target="_blank">Code Style</a>
1. <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/other.md#structure" target="_blank">Structure</a>
1. <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/other.md#naming-conventions" target="_blank">Naming</a>
1. <a href="https://github.com/touchcast/spark-workflow/blob/master/docs/other.md#docs" target="_blank">Docs</a>

## Layout

Please stick with the project structure that's already established.

The general gist is:

* `dist` the compiled source - this is auto generated **DO NOT** add or modify code in this directory
* `src` contains all source code
	* `components` is the directory for all components/features
		* `<component-name>` a component directory containing all `js` and `css` specific to the one component
			* `test` a sub directory in the component directory containing tests specific to the one component
* `test` contains all project level tests
