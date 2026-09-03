<?php
/*
Template Name: Airport Transfers
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Airport Transfers — Oracle Private Hire";
$pageDescription = "Premium UK airport transfers with meet & greet, flight monitoring and fixed pricing. Heathrow, Gatwick, Stansted, Luton, Manchester.";
$canonical = "/airport-transfers.php";
get_header();
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/airport.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Airport Transfers</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">Fly stress-free. We'll handle the rest.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Fixed-price airport transfers, real-time flight tracking and personal meet & greet at arrivals. Trusted by frequent flyers across the UK.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="mb-14 mx-auto max-w-2xl text-center">
    <div class="flex items-center justify-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Airports Covered</span>
    </div>
    <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Every major UK airport, door to door.</h2>
  </div>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
    <?php
    $airports = [
      "London Heathrow (LHR)", "London Gatwick (LGW)", "London Stansted (STN)", "London Luton (LTN)",
      "London City (LCY)", "Manchester (MAN)", "Birmingham (BHX)", "Edinburgh (EDI)",
    ];
    foreach ($airports as $a): ?>
      <div class="glass-card flex items-center gap-3 rounded-2xl p-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
        <span class="text-sm text-foreground/90"><?php echo $a; ?></span>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<div class="border-y border-white/5 bg-onyx/40">
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 mx-auto max-w-2xl text-center">
      <div class="flex items-center justify-center gap-3">
        <span class="h-px w-8 bg-gold"></span>
        <span class="text-xs uppercase tracking-[0.32em] text-gold">How It Works</span>
      </div>
      <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">A seamless airport experience.</h2>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
      <?php
      $steps = [
        ['icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'title' => 'Flight Monitoring', 'desc' => 'We track your flight in real time and adjust your pickup automatically for delays — with no extra waiting charges.'],
        ['icon' => '<path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"/><path d="M10 20V8"/><path d="M14 20V8"/><path d="M10 4h4"/>', 'title' => 'Meet & Greet', 'desc' => 'Your uniformed driver will be waiting at arrivals with a name board, ready to assist with your luggage.'],
        ['icon' => '<path d="M18 7c0-5.333-8-5.333-8 0"/><path d="M10 7v14"/><path d="M6 21h12"/><path d="M6 13h10"/>', 'title' => 'Fixed Pricing', 'desc' => 'Transparent, all-inclusive fares quoted upfront. No hidden extras, no surge pricing — ever.'],
      ];
      foreach ($steps as $s): ?>
        <div class="glass-card rounded-3xl p-8 text-center">
          <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/5 text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><?php echo $s['icon']; ?></svg>
          </div>
          <h3 class="mt-6 font-display text-xl"><?php echo $s['title']; ?></h3>
          <p class="mt-3 leading-relaxed text-muted-foreground"><?php echo $s['desc']; ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </section>
</div>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="grid gap-10 rounded-3xl border border-gold/20 bg-gradient-to-br from-onyx to-ink p-10 md:p-16 lg:grid-cols-2 lg:items-center">
    <div>
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
        <span class="text-xs uppercase tracking-[0.32em] text-gold">Guaranteed</span>
      </div>
      <h2 class="mt-5 font-display text-3xl md:text-5xl">Reserve your airport transfer.</h2>
      <p class="mt-4 max-w-md text-muted-foreground">Book online in minutes — fixed price, driver assigned instantly, confirmation in your inbox.</p>
    </div>
    <div class="flex flex-wrap gap-3 lg:justify-end">
      <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="rounded-full btn-gold px-8 py-4 inline-flex items-center gap-2">
        Book Transfer
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
      <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="rounded-full btn-ghost-gold px-8 py-4 inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
        Get Quote
      </a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
