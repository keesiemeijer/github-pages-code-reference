<?php if (  $package['parsed_name'] && $package['parsed_type'] ) : ?>
	<h2><?php printf( __( 'Welcome to the %1$s %2$s code reference', 'wporg-developer-child' ), $package['parsed_name'], $package['parsed_type'] ); ?></h2>
<?php elseif ( $package['parsed_name'] ) : ?>
	<h2><?php printf( __( 'Welcome to the %1$s code reference', 'wporg-developer-child' ), $package['parsed_name'] ); ?></h2>
<?php else :  ?>
	<h2><?php _e( 'Welcome to the code reference', 'wporg-developer-child' ); ?></h2>
<?php endif; ?>
<p>
<?php if ( $package['parsed_type'] ) : ?>
	<?php printf( __( "Want to know what's going on inside this %s.", 'wporg-developer-child' ), $package['parsed_type'] ); ?>
<?php endif; ?>
	<?php _e( "Search the Code Reference for more information about functions, classes, methods, and hooks.", 'wporg-developer-child' ); ?>
</p>
