<?php
/**
 * Reference Template: Description
 *
 * @package wporg-developer
 * @subpackage Reference
 */

namespace DevHub;
?>

<?php if ( $description = get_description() ) : ?>
	<hr />
	<section class="description">
		<h2><?php _e( 'Description', 'wporg' ); ?></h2>
		<?php echo $description; ?>
	</section>
<?php endif; ?>
