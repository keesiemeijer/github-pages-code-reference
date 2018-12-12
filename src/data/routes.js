import HomeTemplate from "../components/template-home";
import TemplateLoader from "../components/template-loader";

// Routes used in this app
const routes = [{
	path: '/',
	postType: "functions",
	component: HomeTemplate,
	exact: true,
},
{
	path: '/hooks',
	postType: 'hooks',
	component: TemplateLoader,
	exact: false,
},
{
	path: '/functions',
	postType: 'functions',
	component: TemplateLoader,
	exact: false,
},
{
	path: '/classes',
	postType: 'classes',
	component: TemplateLoader,
	exact: false,
}];

export default routes;