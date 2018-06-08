# GitHub Pages Code Reference

Generate a PHP code reference of a repository and host it on GitHub pages (gh-pages). The reference is created from the PHP DocBlocks in your code.

[Demo code reference](https://keesiemeijer.github.io/related-posts-by-taxonomy/)

This reference generator is WordPress oriented as I use it for my plugins, but can be used to generate a reference for any PHP code base. It uses the [WP Parser](https://github.com/WordPress/phpdoc-parser) for parsing PHP files.

## Requirements
[VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) or [Local by Flywheel](https://local.getflywheel.com/).

## Setup GitHub Pages
Open a terminal and go to your local repository where you would like to have a PHP code reference generated. Create the `gh-pages` branch and add a index.html file.
```
# Create new Branch.
git checkout -b gh-pages

# Create index.html file with some content.
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

If your Vagrant is running, from the Vagrant directory run `vagrant halt`. To setup the reference site run `vagrant up --provision`. This site is used to generate a PHP code reference.

You should now be able to visit the [wp-reference.test](http://wp-reference.test) site. 

In the `vvv-custom.yml` file change `parse_source_code: false` to `parse_source_code: true`. Be aware that with the current `vvv-custom.yml` settings the database for this site is deleted before you parse PHP code.

Open a terminal and go the site's plugins directory. Install the [WP Parser JSON](https://github.com/keesiemeijer/wp-parser-json) plugin.
```
# Go to plugins directory
cd /vagrant/www/wp-reference/public/wp-content/plugins

# Install WP Parser Json plugin
git clone https://github.com/keesiemeijer/wp-parser-json.git
```

Go to the site's themes directory and install this repository as a child theme.
```
# Go to themes directory
cd /vagrant/www/wp-reference/public/wp-content/themes

# Install GitHub Pages Code Reference
git clone https://github.com/keesiemeijer/github-pages-code-reference.git
```

Log in the [wp-reference.test](http://wp-reference.test/wp-admin) with user `admin` and password `password`. Go to Plugins and de-activate the `WP Parser` plugin and activate the `WP Parser Json` plugin. Go to Appearance -> Themes and activate the `wporg-developer Child Theme`.

Open the package.json file in the github-pages-code-reference directory and change the `homepage`, `appname` and `deploy` values to point to your `gh-pages` branch and `repository`. The `appname` value is your GitHub repository slug.

Change the values `parsed_name` `parsed_type` and `parsed_version` to show up in the generated reference. 

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

## Generate the Code Reference

Go to Settings -> WP Parser Json and generate the JSON files used by the generated code reference.

To see the code reference before deploying open your terminal and go to the theme directory (`/www/wp-reference/source-code/wp-content/themes/github-pages-code-reference`)

Install the dependencies (if not already installed).
```
npm install
```

To see the local generated code reference in your browser use the following command
```
npm run start
```

## Deploy the Generated Code Reference
Open your terminal and go to the child theme directory (`/www/wp-reference/source-code/wp-content/themes/github-pages-code-reference`).

**NOTE** Check before deploying if the `homepage`, `appname` and `deploy` values point to the correct `homepage` and `repository`. Also check if the `parsed_name` `parsed_type` and `parsed_version` values are correct.

Run the following command to push the generated code reference to your GitHub pages.
```
npm run deploy
```









