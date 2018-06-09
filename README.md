# GitHub Pages Code Reference

Generate a PHP code reference of a repository and host it on GitHub pages (gh-pages). The reference is created from the PHP DocBlocks in your code.

[Demo code reference](https://keesiemeijer.github.io/related-posts-by-taxonomy/)

This reference generator is WordPress oriented as I use it for my plugins, but can be used to generate a reference for any PHP code base. It uses the [WP Parser](https://github.com/WordPress/phpdoc-parser) for parsing PHP files.

## Requirements
[VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) or [Local by Flywheel](https://local.getflywheel.com/).

## Setup GitHub Pages
Open a terminal and go to your local repository where you would like to have a PHP code reference generated. Create the `gh-pages` branch and add an index.html file.
```
# Create the gh-pages Branch.
git checkout -b gh-pages

# Create an index.html file with some content.
echo "Hello World!" > index.html
```

Push the changes to the remote GitHub repository.
```
# Commit all changes (index.html).
git add -A && git commit -m "Add index.html file"

# Push the new branch to your remote GitHub repository.
git push origin gh-pages
```

You should now be able to visit the GitHub page `https://user-name.github.io/repository-name/`

## Installation with VVV

If you have VVV set up use the [wp-reference](https://github.com/keesiemeijer/wp-reference) auto site setup script to parse your PHP codebase.

Setup your site with these settings in your `vvv-custom.yml` file:
```
---
sites:
  wp-reference:
    repo: https://github.com/keesiemeijer/wp-reference.git
    hosts:
      - wp-reference.test
    parse_source_code: false
    wp_parser_quick_mode: true
    reset_wordpress: true
    update_assets: false
    exclude_wp_external_libs: true
    source_code_wp_version: ""
```

If your Vagrant is running, from the Vagrant directory run `vagrant halt`. To setup the reference site run `vagrant up --provision`. This site can be used to create a WordPress PHP code reference. But for our purposes its used to generate the PHP code reference for GitHub pages. 

You should now be able to visit the [wp-reference.test](http://wp-reference.test) site. 

In the `vvv-custom.yml` file change `parse_source_code: false` to `parse_source_code: true`. Be aware that with the current `vvv-custom.yml` settings the database for this site is deleted every time before you parse PHP code.

Open a terminal and go the site's plugins directory (`www/wp-reference/public/wp-content/plugins`). Install the [WP Parser JSON](https://github.com/keesiemeijer/wp-parser-json) plugin.
```
git clone https://github.com/keesiemeijer/wp-parser-json.git
```

Go to the site's themes directory (`www/wp-reference/public/wp-content/themes`) and install this repository there.
```
git clone https://github.com/keesiemeijer/github-pages-code-reference.git
```

Log in at [wp-reference.test/wp-admin](http://wp-reference.test/wp-admin) with user `admin` and password `password`. Go to Plugins and de-activate the `WP Parser` plugin and activate the `WP Parser JSON` plugin. Go to Appearance -> Themes and activate the `wporg-developer-child` theme.

Open the package.json file in the `www/wp-reference/public/wp-content/themes/github-pages-code-reference` directory and change these values for your code reference.

* `homepage` - Point it to your GitHub pages (e.g. `https://keesiemeijer.github.io/github-pages-code-reference`)
* `appname` - Your repository slug (e.g. `github-pages-code-reference`)
* `deploy` - Change the repository in `--repo=https://github.com/keesiemeijer/github-pages-code-reference.git`
* `parsed_name` - The name of the parsed code.
* `parsed_type` - The type of code that was parsed ("plugin" or "theme")
* `parsed_version` - The version of the code that was parsed (e.g. "1.0.0")

Now we are set up to parse some PHP code.

## Parsing Code
Put the code you want to parse in the `/www/wp-reference/source-code` directory.  
From the Vagrant directory run `vagrant ssh` and go the site (root) directory.

```
cd /vagrant/www/wp-reference/
```

And parse the code with the `vvv-init.sh` file.
```
bash vvv-init.sh
```

Check if your code was imported by visiting the reference site [wp-reference.test](http://wp-reference.test).

## Generate the Code Reference
Go to Appearance -> Theme and activate the `wporg-developer-child` theme.
Go to Plugins and activate the `WP Parser JSON` plugin.

Go to Settings -> WP Parser JSON and generate the JSON files used by the generated code reference.

To see the code reference before deploying open your terminal and go to the theme directory (`www/wp-reference/source-code/wp-content/themes/github-pages-code-reference`)

Install the dependencies (if not already installed).
```
npm install
```

To see the local generated code reference in your browser use the following command
```
npm run start
```

## Deploy the Generated Code Reference
Open your terminal and go to the child theme directory (`www/wp-reference/source-code/wp-content/themes/github-pages-code-reference`).

**NOTE** Check before deploying if the `homepage`, `appname` and `deploy` values point to the correct `homepage` and `repository`. Also check if the `parsed_name` `parsed_type` and `parsed_version` values are correct.

Install the dependencies (if not already installed).
```
npm install
```

Run the following command to push the generated code reference to your GitHub pages.
```
npm run deploy
```
