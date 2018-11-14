var reference = require('../src/reference.json');
var ghpages = require('gh-pages');

console.log('Start deploy...');
if (reference.repo_gh_pages) {
	console.log('Deploying the reference to the gh-pages branch of the repository: ' + reference.repo_gh_pages);
	ghpages.publish('build', {
		repo: reference.repo_gh_pages
	}, function(err) {
		if(err) {
			console.log(err)
		} else {
			console.log('Deployed successfully');
		}
	});
} else {
	console.log('Error: Could not find the repo to deploy to');
}