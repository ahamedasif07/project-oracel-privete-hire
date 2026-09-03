<?php
/**
 * Fallback template (required by WordPress).
 * The real homepage design lives in front-page.php.
 * This file is used for blog listings / any content WordPress
 * cannot match to a more specific template.
 */
global $pageTitle, $pageDescription;
$pageTitle       = wp_get_document_title();
$pageDescription = get_bloginfo( 'description' );
get_header();
?>

<section class="mx-auto max-w-5xl px-6 py-32 lg:px-10">
  <?php if ( have_posts() ) : ?>
    <div class="space-y-16">
      <?php
      while ( have_posts() ) :
        the_post();
        ?>
        <article <?php post_class( 'border-b border-white/5 pb-12' ); ?>>
          <h2 class="font-display text-3xl md:text-4xl">
            <a class="hover:text-gold" href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h2>
          <p class="mt-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <?php echo esc_html( get_the_date() ); ?>
          </p>
          <div class="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            <?php the_excerpt(); ?>
          </div>
          <a href="<?php the_permalink(); ?>" class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:gap-3 transition-all">
            Read more
          </a>
        </article>
      <?php endwhile; ?>
    </div>

    <div class="mt-16 flex justify-between">
      <?php
      echo get_previous_posts_link( '&larr; Newer' );
      echo get_next_posts_link( 'Older &rarr;' );
      ?>
    </div>
  <?php else : ?>
    <p class="text-muted-foreground"><?php esc_html_e( 'Nothing found.', 'oracle' ); ?></p>
  <?php endif; ?>
</section>

<?php get_footer(); ?>
