<?php
/*
Template Name: Fleet
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Fleet — Oracle Private Hire";
$pageDescription = "Explore our fleet of executive saloons, luxury MPVs and prestige SUVs. All black, all immaculate.";
$canonical = "/fleet.php";
get_header();
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/interior.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">The Fleet</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">A modern black fleet, immaculately maintained.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Every vehicle in our fleet is finished in black, valeted before each journey, and equipped with the amenities discerning travellers expect.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="space-y-10">
    <?php
    $vehicles = [
      ['name' => 'Executive Saloon', 'tag' => 'Mercedes-Benz E-Class', 'image' => 'fleet-executive.jpg', 'seats' => 3, 'bags' => 2, 'desc' => 'The gold standard of executive travel — refined, quiet and quick.'],
      ['name' => 'Luxury MPV', 'tag' => 'Mercedes-Benz V-Class', 'image' => 'fleet-mpv.jpg', 'seats' => 7, 'bags' => 7, 'desc' => 'Spacious luxury for groups, families and larger luggage requirements.'],
      ['name' => 'Prestige SUV', 'tag' => 'Range Rover', 'image' => 'fleet-suv.jpg', 'seats' => 4, 'bags' => 4, 'desc' => 'Commanding presence with limousine-grade comfort inside.'],
    ];
    $amenities = [
      ['icon' => '<line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/>', 'label' => 'Climate Control'],
      ['icon' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>', 'label' => 'Leather Seats'],
      ['icon' => '<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>', 'label' => 'Wi-Fi'],
      ['icon' => '<rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/>', 'label' => 'USB Charging'],
      ['icon' => '<path d="M12 2.69 5.5 8.36a7.78 7.78 0 1 0 13 0z"/>', 'label' => 'Bottled Water'],
    ];
    foreach ($vehicles as $idx => $v): ?>
      <article class="grid gap-8 overflow-hidden rounded-3xl border border-white/5 bg-card lg:grid-cols-2 lg:items-stretch">
        <div class="relative aspect-[4/3] lg:aspect-auto <?php echo $idx % 2 ? 'lg:order-2' : ''; ?>">
          <img src="<?php echo get_template_directory_uri(); ?>/assets/images/<?php echo $v['image']; ?>" alt="<?php echo $v['name']; ?>" loading="lazy" width="1400" height="900" class="h-full w-full object-cover">
        </div>
        <div class="flex flex-col justify-center p-8 md:p-12">
          <span class="text-xs uppercase tracking-[0.32em] text-gold"><?php echo $v['tag']; ?></span>
          <h2 class="mt-3 font-display text-3xl md:text-4xl"><?php echo $v['name']; ?></h2>
          <p class="mt-4 leading-relaxed text-muted-foreground"><?php echo $v['desc']; ?></p>

          <div class="mt-6 flex flex-wrap gap-6 text-sm text-foreground/90">
            <span class="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <?php echo $v['seats']; ?> passengers
            </span>
            <span class="inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"/><path d="M10 20V8"/><path d="M14 20V8"/><path d="M10 4h4"/></svg>
              <?php echo $v['bags']; ?> suitcases
            </span>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <?php foreach ($amenities as $a): ?>
              <div class="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-ink/40 p-3 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><?php echo $a['icon']; ?></svg>
                <span class="text-[10px] uppercase tracking-widest text-muted-foreground"><?php echo $a['label']; ?></span>
              </div>
            <?php endforeach; ?>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a href="<?php echo esc_url( home_url( '/booking/' ) ); ?>" class="rounded-full btn-gold px-6 py-3 text-sm inline-flex items-center gap-2">
              Book this vehicle
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="rounded-full btn-ghost-gold px-6 py-3 text-sm">Enquire</a>
          </div>
        </div>
      </article>
    <?php endforeach; ?>
  </div>
</section>

<?php get_footer(); ?>
