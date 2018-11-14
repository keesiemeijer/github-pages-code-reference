(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{29:function(s){s.exports={"related_posts_by_taxonomy_debug-20":{html:'<hr /><section class="description"><h2>Description</h2><p>Adds links for debugging shortcodes and widget. Displays debug information (to admins) in the footer of a website.</p></section>',methods:[{url:"/classes/related_posts_by_taxonomy_debug/__construct",title:"__construct",excerpt:"Method:",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/after_display",title:"after_display",excerpt:"Method: Stores the result after display",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/check_cache",title:"check_cache",excerpt:"Method: Check if related posts are cached.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/debug_link",title:"debug_link",excerpt:"Method: Creates a debug link.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/debug_setup",title:"debug_setup",excerpt:"Method: Calls plugin filters for debugging.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/debug_start",title:"debug_start",excerpt:"Method: Starts debugging at the arguments hook for widged and shortcode.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/get_header",title:"get_header",excerpt:"Method: Returns a fancy header for the debug information.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/get_supports",title:"get_supports",excerpt:"Method: Returns supported plugin features",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/get_template",title:"get_template",excerpt:"Method: Gets the requested template.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/get_terms_names",title:"get_terms_names",excerpt:"Method: Get the term names from ids.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/hide_empty",title:"hide_empty",excerpt:"Method: Shows widget or shortcode even if no related posts were found.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/object_terms",title:"object_terms",excerpt:"Method: Gets debug information Callback function for filter wp_get_object_terms.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/posts_clauses",title:"posts_clauses",excerpt:"Method: Gets query and function args from km_rpbt_query_related_posts().",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/posts_found",title:"posts_found",excerpt:"Method: Gets the post ids if related posts where found.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/widget_params",title:"widget_params",excerpt:"Method: Adds debug link before widget title.",deprecated:!1},{url:"/classes/related_posts_by_taxonomy_debug/wp_footer",title:"wp_footer",excerpt:"Method: Displays the results in the footer",deprecated:!1}],related:{uses:[],used_by:[]},changelog:[],signature:"Related_Posts_By_Taxonomy_Debug"},"related_posts_by_taxonomy_debug::__construct-30":{html:"",methods:[],related:{uses:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/debug_setup",text:"Related_Posts_By_Taxonomy_Debug::debug_setup()"}],used_by:[{source:"includes/class-plugin.php",url:"/classes/related_posts_by_taxonomy_plugin/debug_init",text:"Related_Posts_By_Taxonomy_Plugin::debug_init()"}]},changelog:[],signature:"Related_Posts_By_Taxonomy_Debug::__construct()"},"related_posts_by_taxonomy_debug::after_display-317":{html:"",methods:[],related:{uses:[],used_by:[]},changelog:[{description:"Introduced.",version:"2.1.1"}],signature:"Related_Posts_By_Taxonomy_Debug::after_display()"},"related_posts_by_taxonomy_debug::check_cache-138":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$args</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Required)</span><span class="description">Array with widget or shortcode arguments.</span></p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(void)</span> </p></section>',methods:[],related:{uses:[{source:"includes/settings.php",url:"/functions/km_rpbt_get_query_vars",text:"km_rpbt_get_query_vars()"},{source:"includes/functions.php",url:"/functions/km_rpbt_get_taxonomies",text:"km_rpbt_get_taxonomies()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/get_terms_names",text:"Related_Posts_By_Taxonomy_Debug::get_terms_names()"}],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/debug_start",text:"Related_Posts_By_Taxonomy_Debug::debug_start()"}]},changelog:[{description:"Introduced.",version:"2.1"}],signature:'Related_Posts_By_Taxonomy_Debug::check_cache( <span class="arg-type">array</span>&nbsp;<span class="arg-name">$args</span>&nbsp;)'},"related_posts_by_taxonomy_debug::debug_link-197":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$type</dt><dd><p class="desc"><span class="type">(<span class="string">string</span>)</span><span class="required">(Optional)</span><span class="description">Type shortcode or widget.</span></p><p class="default">Default value: \'widget\'</p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(string)</span> Link to debug information,</p></section>',methods:[],related:{uses:[],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/debug_start",text:"Related_Posts_By_Taxonomy_Debug::debug_start()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/widget_params",text:"Related_Posts_By_Taxonomy_Debug::widget_params()"}]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::debug_link( <span class="arg-type">string</span>&nbsp;<span class="arg-name">$type</span>&nbsp;=&nbsp;<span class="arg-default">\'widget\'</span>&nbsp;)'},"related_posts_by_taxonomy_debug::debug_setup-40":{html:"<hr /><section class=\"return\"><h3>Return</h3><p><span class='return-type'>(void)</span> </p></section>",methods:[],related:{uses:[{source:"includes/functions.php",url:"/functions/km_rpbt_is_cache_loaded",text:"km_rpbt_is_cache_loaded()"},{source:"includes/functions.php",url:"/functions/km_rpbt_plugin",text:"km_rpbt_plugin()"}],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/__construct",text:"Related_Posts_By_Taxonomy_Debug::__construct()"}]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:"Related_Posts_By_Taxonomy_Debug::debug_setup()"},"related_posts_by_taxonomy_debug::debug_start-102":{html:'<hr /><section class="description"><h2>Description</h2><p>Adds filter to wp_get_object_terms.</p></section><hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$args</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Required)</span><span class="description">Widget or shortcode arguments.</span></p></dd><dt>$widget</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Optional)</span><span class="description">Widget args.</span></p><p class="default">Default value: \'\'</p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(array)</span> Array with widget or shortcode arguments.</p></section>',methods:[],related:{uses:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/debug_link",text:"Related_Posts_By_Taxonomy_Debug::debug_link()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/check_cache",text:"Related_Posts_By_Taxonomy_Debug::check_cache()"}],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::debug_start( <span class="arg-type">array</span>&nbsp;<span class="arg-name">$args</span>,  <span class="arg-type">array</span>&nbsp;<span class="arg-name">$widget</span>&nbsp;=&nbsp;<span class="arg-default">\'\'</span>&nbsp;)'},"related_posts_by_taxonomy_debug::get_header-360":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$type</dt><dd><p class="desc"><span class="type">(<span class="string">string</span>)</span><span class="required">(Optional)</span><span class="description">Type of debug.</span></p><p class="default">Default value: \'\'</p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(string)</span> Fancy header.</p></section>',methods:[],related:{uses:[],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/wp_footer",text:"Related_Posts_By_Taxonomy_Debug::wp_footer()"}]},changelog:[{description:"Introduced.",version:"2.3.1"}],signature:'Related_Posts_By_Taxonomy_Debug::get_header( <span class="arg-type">string</span>&nbsp;<span class="arg-name">$type</span>&nbsp;=&nbsp;<span class="arg-default">\'\'</span>&nbsp;)'},"related_posts_by_taxonomy_debug::get_supports-393":{html:"<hr /><section class=\"return\"><h3>Return</h3><p><span class='return-type'>(array)</span> Array with supported plugin features.</p></section>",methods:[],related:{uses:[{source:"includes/settings.php",url:"/functions/km_rpbt_get_plugin_supports",text:"km_rpbt_get_plugin_supports()"},{source:"includes/functions.php",url:"/functions/km_rpbt_plugin_supports",text:"km_rpbt_plugin_supports()"}],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/wp_footer",text:"Related_Posts_By_Taxonomy_Debug::wp_footer()"}]},changelog:[{description:"Introduced.",version:"2.3.1"}],signature:"Related_Posts_By_Taxonomy_Debug::get_supports()"},"related_posts_by_taxonomy_debug::get_template-307":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$template</dt><dd><p class="desc"><span class="type">(<span class="string">string</span>)</span><span class="required">(Required)</span><span class="description">Template.</span></p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(string)</span> Template.</p></section>',methods:[],related:{uses:[],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::get_template( <span class="arg-type">string</span>&nbsp;<span class="arg-name">$template</span>, &nbsp;<span class="arg-name">$type</span>&nbsp;)'},"related_posts_by_taxonomy_debug::get_terms_names-333":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$term_ids</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Required)</span><span class="description">Array with term ids.</span></p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(string)</span> Term_names.</p></section>',methods:[],related:{uses:[],used_by:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/check_cache",text:"Related_Posts_By_Taxonomy_Debug::check_cache()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/object_terms",text:"Related_Posts_By_Taxonomy_Debug::object_terms()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/posts_clauses",text:"Related_Posts_By_Taxonomy_Debug::posts_clauses()"}]},changelog:[{description:"Introduced.",version:"2.4.0"}],signature:'Related_Posts_By_Taxonomy_Debug::get_terms_names( <span class="arg-type">array</span>&nbsp;<span class="arg-name">$term_ids</span>&nbsp;)'},"related_posts_by_taxonomy_debug::hide_empty-229":{html:'<hr /><section class="description"><h2>Description</h2><p>Removes filter wp_get_object_terms.</p></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(false.)</span> </p></section>',methods:[],related:{uses:[],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:"Related_Posts_By_Taxonomy_Debug::hide_empty()"},"related_posts_by_taxonomy_debug::object_terms-214":{html:"<hr /><section class=\"return\"><h3>Return</h3><p><span class='return-type'>(array)</span> Array term objects.</p></section>",methods:[],related:{uses:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/get_terms_names",text:"Related_Posts_By_Taxonomy_Debug::get_terms_names()"}],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::object_terms(&nbsp;<span class="arg-name">$terms</span>, &nbsp;<span class="arg-name">$object_ids</span>, &nbsp;<span class="arg-name">$taxonomies</span>, &nbsp;<span class="arg-name">$args</span>&nbsp;)'},"related_posts_by_taxonomy_debug::posts_clauses-244":{html:'<hr /><section class="description"><h2>Description</h2><p>adds filter to related_posts_by_taxonomy.</p></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(array)</span> Array with sql clauses.</p></section>',methods:[],related:{uses:[{source:"includes/settings.php",url:"/functions/km_rpbt_get_query_vars",text:"km_rpbt_get_query_vars()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/get_terms_names",text:"Related_Posts_By_Taxonomy_Debug::get_terms_names()"}],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::posts_clauses(&nbsp;<span class="arg-name">$pieces</span>, &nbsp;<span class="arg-name">$post_id</span>, &nbsp;<span class="arg-name">$taxonomies</span>, &nbsp;<span class="arg-name">$args</span>&nbsp;)'},"related_posts_by_taxonomy_debug::posts_found-283":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$results</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Required)</span><span class="description">Array with post objects.</span></p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(array)</span> Array with with post objects.</p></section>',methods:[],related:{uses:[],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::posts_found( <span class="arg-type">array</span>&nbsp;<span class="arg-name">$results</span>&nbsp;)'},"related_posts_by_taxonomy_debug::widget_params-175":{html:'<hr /><section class="parameters"><h3>Parameters</h3><dl><dt>$params</dt><dd><p class="desc"><span class="type">(<span class="array">array</span>)</span><span class="required">(Required)</span><span class="description">Array with widget parameters.</span></p></dd></dl></section><hr /><section class="return"><h3>Return</h3><p><span class=\'return-type\'>(array)</span> Array with widget parameters.</p></section>',methods:[],related:{uses:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/debug_link",text:"Related_Posts_By_Taxonomy_Debug::debug_link()"}],used_by:[]},changelog:[{description:"Introduced.",version:"2.0.0"}],signature:'Related_Posts_By_Taxonomy_Debug::widget_params( <span class="arg-type">array</span>&nbsp;<span class="arg-name">$params</span>&nbsp;)'},"related_posts_by_taxonomy_debug::wp_footer-408":{html:"",methods:[],related:{uses:[{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/get_header",text:"Related_Posts_By_Taxonomy_Debug::get_header()"},{source:"includes/class-debug.php",url:"/classes/related_posts_by_taxonomy_debug/get_supports",text:"Related_Posts_By_Taxonomy_Debug::get_supports()"}],used_by:[]},changelog:[],signature:"Related_Posts_By_Taxonomy_Debug::wp_footer()"}}}}]);
//# sourceMappingURL=2.c0d81b66.chunk.js.map