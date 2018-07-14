# GitHub Pages Code Reference

Generate a PHP code reference of a repository and host it on GitHub pages (gh-pages). The reference is created from the PHP DocBlocks in your code.

[Demo code reference](https://keesiemeijer.github.io/related-posts-by-taxonomy/)

This reference generator is WordPress oriented because I use it for my plugins, but it can be used to generate a reference for any PHP code base. The [WP Parser](https://github.com/WordPress/phpdoc-parser) plugin is used for parsing PHP DocBlocks in files.

## Requirements
[VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) or [Local by Flywheel](https://local.getflywheel.com/).

## Setup GitHub Pages
Open a terminal and go to a local repository where you would like to have GitHub pages (reference). Create the `gh-pages` branch and add an index.html file.
```bash
# Create the gh-pages Branch.
git checkout -b gh-pages

# Create an index.html file with some content.
echo "Hello World!" > index.html
```

Push the changes to the remote GitHub repository.
```bash
# Commit all changes (index.html).
git add -A && git commit -m "Add index.html file"

# Push the new branch to your remote GitHub repository.
git push origin gh-pages
```

You should now be able to visit the GitHub page `https://user-name.github.io/repository-name/`

## Installation with VVV

If VVV is installed add a new reference site with the [wp-reference](https://github.com/keesiemeijer/wp-reference) script.

Put this in your [vvv-custom.yml file](https://varyingvagrantvagrants.org/docs/en-US/adding-a-new-site/) and run `vagrant up --provision` from the Vagrant directory.

```
sites:
  wp-reference:
    repo: https://github.com/keesiemeijer/wp-reference.git
    hosts:
      - wp-reference.test
    parse_source_code: false
    wp_parser_quick_mode: true
    reset_wordpress: 'empty'
    update_assets: false
    exclude_wp_external_libs: true
    source_code_wp_version: ""
    theme: "github-pages-code-reference"
```

You should now be able to visit the [wp-reference.test](http://wp-reference.test) site. 

This new site can now be used as a WordPress PHP code reference. But for our purposes its used to generate the JSON files for the GitHub pages reference.

In the `vvv-custom.yml` file change `parse_source_code: false` to `parse_source_code: true`. Be aware that with the current `vvv-custom.yml` settings the post data (posts, terms, meta, etc) is deleted every time (before) you parse PHP code.

Clone the [WP Parser JSON](https://github.com/keesiemeijer/wp-parser-json) plugin in the site's plugins directory (`www/wp-reference/public/wp-content/plugins`).
```
git clone https://github.com/keesiemeijer/wp-parser-json.git
```

Clone this repository in the site's themes directory (`www/wp-reference/public/wp-content/themes`).
```
git clone https://github.com/keesiemeijer/github-pages-code-reference.git
```

Go to the `github-pages-code-reference` directory and install the dependencies.
```
npm install
```

### Code Reference Settings
Open the package.json file in the `www/wp-reference/public/wp-content/themes/github-pages-code-reference` directory and change these values for your code reference.

* `homepage` - Point it to your GitHub pages
  * for example `https://username.github.io/example-repository`
* `reference`
  * `app_basename` - Basename of your GitHup pages slug
    * for example `example-repository`
  * `app_url` - For linking to code home page (with link text `parsed_name` below)
    * for example: `https://example.com/code-homepage`
  * `repo_url` - For linking to a repository
    * for example: `https://github.com/username/example-repository`
  * `repo_release_url` - For linking to code in a GitHub repository 
    * for example (tags): `https://github.com/username/example-repository/tree/1.0.0`.
    * for example (branch): `https://github.com/username/example-repository/tree/master`.
  * `parsed_name` - The name of the parsed code.
  * `parsed_type` - The type of code that was parsed ("plugin" or "theme")
  * `parsed_version` - The version of the code that was parsed (e.g. "1.0.0")
* `scripts`
  * `deploy` - Change the repository in `--repo=https://github.com/username/example-repository.git`

Now we are set up to parse some PHP code and generate the code reference for GitHub pages.

## Generate the Code Reference
Put the code you want to parse in the `/www/wp-reference/source-code` directory.  
From the Vagrant directory run `vagrant ssh` and go the site root directory.
```
cd /vagrant/www/wp-reference/
```

And parse the code with the following command.
```
bash vvv-init.sh
```

Check if your code was imported by visiting the reference site [wp-reference.test](http://wp-reference.test).

Go the public directory.
```
cd /vagrant/www/wp-reference/public/
```

Activate the WP Parser and WP Parser JSON plugin.
```bash
# Activate WP Parser
wp plugin activate wp-parser

# Activate WP Parser JSON
wp plugin activate wp-parser-json
```

**Note** Check before generating the JSON files if the [settings in the package.json](#code-reference-settings) file are correct.

Generate the JSON files for the reference.
```
wp parser-json generate
```

To see the code reference before deploying open your terminal and go to this repository in the themes directory (`www/wp-reference/public/wp-content/themes/github-pages-code-reference`)

With this command a new tab is opened in your browser with the locally generated code reference.
```
npm run start
```

## Deploy the Generated Code Reference
Deploy your reference to GitHub pages after you've generated the [JSON files](#generate-the-code-reference). 

**NOTE** Check before deploying if the [settings in the package.json](#code-reference-settings) file were correct before generating the reference.

Open your terminal and and go to this repository in the themes directory (`www/wp-reference/public/wp-content/themes/github-pages-code-reference`).

Deploy (push) the generated code reference to the GitHub pages branch (in the packagage.json file).
```
npm run deploy
```
