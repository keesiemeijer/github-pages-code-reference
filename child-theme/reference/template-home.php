<?php
	$parsed_name = $package['parsed_name'];
	$repo_url    = $package['repo_url'];
	$app_url     = '';
	$title       = '';

	if( ( $parsed_name ) ) {
		$title = $strings['page_title'];
		$app_url = $package['app_url'];
	}

	$repo        = $strings['repo'] ? $strings['repo'] : 'GitHub';
	$parsed_type = $package['parsed_type'] ? $package['parsed_type'] : 'code base';

?>
<?php if($title) : ?>
	<h2><?php echo $title; ?></h2>
<?php endif; ?>
<p>
	<?php printf( __( "Want to know what's going on inside this %s.", 'wporg-developer-child' ), $parsed_type ); ?>
	<?php _e( "Search the Code Reference for more information about functions, classes, methods, and hooks.", 'wporg-developer-child' ); ?>
</p>
<?php if ( $app_url || $repo_url ) : ?>
<ul>
	<?php if( $app_url ) : ?>
		<li>
			<a href="<?php echo $app_url; ?>"><?php echo $parsed_name; ?></a>
		</li>
	<?php endif; ?>
	<?php if( $repo_url) : ?>
		<li>
			<a href="<?php echo $repo_url; ?>"><?php echo $repo; ?></a>
		</li>
	<?php endif; ?>
</ul>
<?php endif; ?>
