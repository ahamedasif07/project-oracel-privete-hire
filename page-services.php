<?php
/*
Template Name: Services
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Our Services — Oracle Private Hire";
$pageDescription = "Airport transfers, executive travel, corporate, wedding and 24/7 private hire from Oracle Private Hire.";
$canonical = "/services.php";
get_header();
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Our Services</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">Chauffeured travel, tailored to you.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      From executive airport transfers to weddings and long-distance journeys, every Oracle service is delivered to the same uncompromising standard.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="grid gap-6 md:grid-cols-2">
    <?php
    $services = [
      [
        'icon' => '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
        'title' => 'Airport Transfers',
        'desc' => 'Professional airport pickups and drop-offs with real-time flight monitoring, meet & greet at arrivals and full luggage assistance. Fixed fares to every major UK airport.',
        'features' => ['Meet & Greet', 'Flight monitoring', 'Luggage assistance', 'Fixed pricing'],
      ],
      [
        'icon' => '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
        'title' => 'Local Taxi Service',
        'desc' => 'The everyday journey, done properly. School runs, shopping trips, medical appointments and daily transport in an executive vehicle.',
        'features' => ['Short-notice booking', 'Local knowledge', 'Account clients welcome', 'Child seats available'],
      ],
      [
        'icon' => '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        'title' => 'Corporate Travel',
        'desc' => 'Discreet, punctual and consistent chauffeur service for meetings, conferences, hotel pickups and VIP client transport.',
        'features' => ['Account billing', 'Multi-stop itineraries', 'Dedicated driver', 'Confidentiality assured'],
      ],
      [
        'icon' => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
        'title' => 'Long Distance Journeys',
        'desc' => 'Nationwide travel in total comfort. Fixed pricing, luxury vehicles and experienced drivers for those longer routes.',
        'features' => ['UK-wide coverage', 'Fixed distance quotes', 'Complimentary refreshments', 'Wi-Fi & USB charging'],
      ],
      [
        'icon' => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
        'title' => 'Event & Wedding Transport',
        'desc' => 'Weddings, birthdays, private parties and family events. Elegant chauffeur-driven vehicles for the moments that matter most.',
        'features' => ['Ribbons & décor', 'Multi-vehicle bookings', 'Bridal party transport', 'Bespoke itineraries'],
      ],
      [
        'icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        'title' => '24/7 Private Hire',
        'desc' => "Available around the clock — including holidays, overnight and short-notice bookings. When you need us, we're already on the way.",
        'features' => ['Instant reservations', 'Emergency travel', 'Overnight service', '365 days a year'],
      ],
    ];
    foreach ($services as $s): ?>
      <article class="glass-card rounded-3xl p-8 md:p-10">
        <div class="flex items-center gap-4">
          <div class="grid h-14 w-14 place-items-center rounded-2xl border border-gold/30 bg-gold/5 text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><?php echo $s['icon']; ?></svg>
          </div>
          <h2 class="font-display text-2xl md:text-3xl"><?php echo $s['title']; ?></h2>
        </div>
        <p class="mt-5 leading-relaxed text-muted-foreground"><?php echo $s['desc']; ?></p>
        <ul class="mt-6 grid grid-cols-2 gap-2 text-sm">
          <?php foreach ($s['features'] as $f): ?>
            <li class="flex items-center gap-2 text-foreground/90">
              <span class="h-1.5 w-1.5 rounded-full bg-gold"></span> <?php echo $f; ?>
            </li>
          <?php endforeach; ?>
        </ul>
        <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="mt-8 inline-flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all">
          Book this service
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<?php get_footer(); ?>
