var reference = require('../src/reference.json');
var ghpages = require('gh-pages');

if (reference.repo_gh_pages) {
	ghpages.publish('build', {
		repo: reference.repo_gh_pages
	}, function(err) { console.log(err) });
}