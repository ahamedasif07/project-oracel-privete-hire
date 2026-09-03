<?php
/*
Template Name: Booking
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Book Your Chauffeur — Oracle Private Hire";
$pageDescription = "Book your executive private hire or airport transfer. Fixed prices, instant confirmation, nationwide UK service.";
$canonical = "/booking.php";
get_header();

$inputCls = "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3.5 text-sm text-black placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero.jpg" alt=""
    class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Reserve</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">Book your journey.
    </h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Complete the form below for an instant fixed-price quote. A confirmation will be sent to your inbox within
      minutes.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="mx-auto max-w-4xl">
    <?php echo do_shortcode('[oracle_booking_form]'); ?>
  </div>
</section>

<?php get_footer(); ?>