
# Release Checklist

It's easiest to start from a working directory within an Omeka installation.
`git flow` should have been set up. Make sure to run `npm install` and `bower
install`.

1. `VERSION=42.0.13` — We'll use this value later.
1. `git flow release start $VERSION`
1. Update the version numbers in these files:
  * `plugin.ini`
  * `package.json`
  * `bower.json`
1. `git add plugin.ini package.json bower.json && git commit -m "Bumped version."`
1. `grunt build`
1. Make sure extraneous files aren't in your working directory. (I'm looking at you, `tags`.)
1. `grunt package`
1. `git add --all views/shared`
1. `git commit -m "Updated generated assets."`
1. quick check the zip in `./pkg/`
1. test the zip
1. `git flow release finish $VERSION`
1. `git push --all`
1. `git push --tags`
1. upload the zip to http://omeka.org/add-ons/plugins/.

