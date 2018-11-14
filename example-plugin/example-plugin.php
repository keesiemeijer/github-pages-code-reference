<?php
/*
Plugin Name: GitHub Pages Code Reference Settings.
Description: Filter the GitHub Pages Code Reference settings.
Version: 1.0.0
Author:
Author URI:
License:
*/


add_filter( 'github_pages_code_reference_settings', function( $settings ) {

	/*
	 * 1 - Edit the values below for your own GitHub pages reference.
	 * 2 - Copy this plugin to the plugins folder and activate it.
	 * 3 - Genarate the reference with the `wp parser-json generate` command.
	 * 4 - Deploy the reference with the `npm run deploy` command.
	 *
	 * For more information see: https://github.com/keesiemeijer/github-pages-code-reference
	 */

	// The name of the reference.
	$settings['parsed_name'] = 'Example Repository Reference';

	// Reference home page (for the gh-pages branch).
	$settings['homepage'] = 'https://username.github.io/example-repository';

	// Base name of the app (Usually the basename of the `homepage` variable above).
	$settings['app_basename'] = 'example-repository';

	// Url used for linking to the (GitHub) repository of the reference.
	// Leave empty to not link to the the repository.
	$settings['repo_url'] = 'https://github.com/username/example-repository';

	// Url used for linking to source code from a GitHub tag or branch.
	// The parsed code used by the reference should be the same as in the GitHub tag or branch.
	// Leave empty to not link to source code
	$settings['repo_release_url'] = 'https://github.com/username/example-repository/tree/1.0.0';

	// The Github repository to deploy the generated reference to (with: npm run deploy).
	// The reference will be deployed to the gh-pages branch of this repository
	// See the `homepage` variable above.
	$settings['repo_gh_pages'] = 'https://github.com/username/example-repository.git';

	// Url used for linking to a home page of the parsed code.
	// The `parsed_name` variable (above) is used as the text for this link.
	// Leave empty to not link to a home page
	$settings['app_url'] = 'https://example.com/code-homepage';

	// Url to documentation.
	// Leave empty to not link to a documentation page.
	$settings['docs_url'] = '';

	// The version of the code that was parsed (e.g. "1.0.0")
	// Leave empty to not display the version of the parsed code.
	$settings['parsed_version'] = 'v1.0';

	// The type of code that was parsed ("plugin", "theme" or something else).
	$settings['parsed_type'] = 'plugin';

	return $settings;
} );
