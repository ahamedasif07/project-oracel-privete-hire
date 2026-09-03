<?php
/*
Template Name: About Us
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "About Us — Oracle Private Hire";
$pageDescription = "Oracle Private Hire: over a decade of premium chauffeur service. Meet the team, philosophy and standards behind every journey.";
$canonical = "/about.php";
get_header();
?>

<!-- Page hero -->
<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/about.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">About Oracle</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">A decade of the finer way to travel.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Founded on a simple belief — that private hire should feel like a private service. Today, Oracle chauffeurs thousands of clients across the UK with the same care we gave our very first passenger.
    </p>
  </div>
</section>

<!-- Our story -->
<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="mb-14 max-w-3xl">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Our Story</span>
    </div>
    <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Built on trust, driven by standards.</h2>
  </div>
  <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
    <div class="space-y-6 text-muted-foreground leading-relaxed">
      <p>
        Oracle Private Hire was established with one goal: to raise the
        bar for what a private hire service could feel like. What began
        with a single executive saloon has grown into a modern fleet of
        black chauffeur vehicles operated by fully licensed, uniformed
        drivers.
      </p>
      <p>
        Today, we're the trusted transport partner for corporate clients,
        frequent flyers, wedding parties and travellers who simply expect
        more from their journey.
      </p>
      <p>
        We never surge, never subcontract to unknown drivers and never
        compromise on the standard of vehicle you'll ride in. Every fare
        is fixed. Every driver is ours. Every ride is our reputation.
      </p>
    </div>
    <div class="relative overflow-hidden rounded-3xl border border-white/5">
      <img src="<?php echo get_template_directory_uri(); ?>/assets/images/interior.jpg" alt="Luxury car interior" loading="lazy" class="h-full w-full object-cover" width="1400" height="900">
    </div>
  </div>
</section>

<!-- Mission & values -->
<div class="border-y border-white/5 bg-onyx/40">
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 mx-auto max-w-2xl text-center">
      <div class="flex items-center justify-center gap-3">
        <span class="h-px w-8 bg-gold"></span>
        <span class="text-xs uppercase tracking-[0.32em] text-gold">Mission &amp; Values</span>
      </div>
      <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">What we stand for.</h2>
    </div>
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <?php
      $values = [
        ['icon' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', 'title' => 'Integrity', 'desc' => 'Transparent pricing and honest service, every time.'],
        ['icon' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>', 'title' => 'Safety', 'desc' => 'DBS-checked drivers and rigorously maintained vehicles.'],
        ['icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'title' => 'Reliability', 'desc' => 'Always on time — punctuality is non-negotiable.'],
        ['icon' => '<path d="m12 3-1.9 5.8-6.1.1 4.9 3.6-1.9 5.8 5-3.6 5 3.6-1.9-5.8 4.9-3.6-6.1-.1z"/>', 'title' => 'Professionalism', 'desc' => 'Uniformed, discreet, courteous. Always.'],
        ['icon' => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>', 'title' => 'Care', 'desc' => 'A client-first approach on every single journey.'],
        ['icon' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>', 'title' => 'Luxury', 'desc' => 'First-class comfort as standard, not as an upgrade.'],
      ];
      foreach ($values as $v): ?>
        <div class="glass-card rounded-2xl p-8">
          <div class="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><?php echo $v['icon']; ?></svg>
          </div>
          <h3 class="mt-6 font-display text-xl"><?php echo $v['title']; ?></h3>
          <p class="mt-2 text-sm leading-relaxed text-muted-foreground"><?php echo $v['desc']; ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </section>
</div>

<!-- Drivers -->
<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="mb-14 max-w-3xl">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Our Drivers</span>
    </div>
    <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">The people behind the wheel.</h2>
  </div>
  <div class="grid gap-10 lg:grid-cols-2">
    <p class="text-muted-foreground leading-relaxed">
      Every Oracle chauffeur is fully licensed, DBS-checked and
      professionally trained in customer service, defensive driving and
      executive protection basics. Our drivers arrive suited, courteous
      and thoroughly briefed on your journey — from preferred routes to
      climate and refreshments.
    </p>
    <ul class="space-y-4">
      <?php
      $driverPoints = [
        "Fully licensed & PCO registered",
        "Enhanced DBS background checks",
        "Minimum 5 years chauffeur experience",
        "Uniformed and professionally presented",
        "Trained in discretion and confidentiality",
        "Comprehensive local & national knowledge",
      ];
      foreach ($driverPoints as $line): ?>
        <li class="flex items-start gap-3 text-foreground/90">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
          <span><?php echo $line; ?></span>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<!-- By the numbers -->
<div class="border-t border-white/5 bg-onyx/40">
  <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 mx-auto max-w-2xl text-center">
      <div class="flex items-center justify-center gap-3">
        <span class="h-px w-8 bg-gold"></span>
        <span class="text-xs uppercase tracking-[0.32em] text-gold">By the numbers</span>
      </div>
      <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">A record we're proud of.</h2>
    </div>
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <?php
      $stats = [
        ['n' => '13+', 'l' => 'Years operating', 'icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'],
        ['n' => '50k+', 'l' => 'Journeys delivered', 'icon' => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'],
        ['n' => '4.9★', 'l' => 'Customer rating', 'icon' => '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'],
        ['n' => '24/7', 'l' => 'Nationwide service', 'icon' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'],
      ];
      foreach ($stats as $s): ?>
        <div class="glass-card rounded-2xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-6 w-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><?php echo $s['icon']; ?></svg>
          <p class="mt-4 font-display text-4xl text-gradient-gold"><?php echo $s['n']; ?></p>
          <p class="mt-2 text-xs uppercase tracking-widest text-muted-foreground"><?php echo $s['l']; ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </section>
</div>

<?php get_footer(); ?>
