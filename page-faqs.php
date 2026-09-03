<?php
/*
Template Name: FAQs
*/
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "FAQs — Oracle Private Hire";
$pageDescription = "Answers to common questions about booking, payment, cancellation, airport transfers, vehicles and more.";
$canonical = "/faqs.php";
get_header();
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/interior.jpg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Help Centre</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">Frequently asked questions.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Everything you need to know before your journey. Can't find your answer? Our team is available around the clock.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="space-y-12">
    <?php
    $groups = [
      [
        'title' => 'Booking',
        'items' => [
          ['How do I book?', 'Book online via our booking page, by phone, email or WhatsApp — 24 hours a day.'],
          ['Can I pre-book in advance?', 'Yes. We recommend pre-booking, especially for airport transfers and peak times.'],
        ],
      ],
      [
        'title' => 'Payment',
        'items' => [
          ['What payment methods do you accept?', 'We accept all major credit and debit cards, cash and secure online payment. Corporate accounts available.'],
          ['Do you take payment at the time of booking?', 'Card details are collected to secure your booking; charges are taken after the journey unless prepayment is requested.'],
        ],
      ],
      [
        'title' => 'Cancellation',
        'items' => [
          ['What is your cancellation policy?', 'Free cancellation up to 4 hours before pickup. Later cancellations may incur a charge equal to the fare.'],
          ['Do you offer refunds?', 'Yes — full refunds are issued for eligible cancellations within our policy.'],
        ],
      ],
      [
        'title' => 'Airport Transfers',
        'items' => [
          ['What if my flight is delayed?', 'We monitor your flight in real time and adjust pickup automatically — no additional waiting charges.'],
          ['How does meet & greet work?', 'Your driver waits inside the arrivals hall with a name board and assists with luggage to the vehicle.'],
          ['How much airport waiting time is included?', '60 minutes from landing on arrivals, 15 minutes on departures — all complimentary.'],
        ],
      ],
      [
        'title' => 'Vehicles',
        'items' => [
          ['How many passengers can you carry?', 'Our fleet accommodates 1 to 7 passengers depending on the vehicle selected.'],
          ['Do you offer child seats?', 'Yes — please request child or booster seats at the time of booking, free of charge.'],
          ['Are luxury vehicles available?', 'Every Oracle vehicle is luxury-class as standard. Prestige SUVs and executive MPVs available on request.'],
        ],
      ],
      [
        'title' => 'General',
        'items' => [
          ['Which areas do you cover?', 'We operate nationwide across the United Kingdom, 24 hours a day.'],
          ['Are pets allowed?', 'Yes — small pets in carriers are welcome; please advise at time of booking.'],
          ['Do you offer wheelchair accessible vehicles?', 'Yes, on request. Please contact us in advance so we can allocate the right vehicle.'],
          ['What about lost property?', 'Please contact our office immediately. Any recovered items are logged and held at our office.'],
        ],
      ],
    ];
    foreach ($groups as $g): ?>
      <div>
        <div class="flex items-center gap-3">
          <span class="h-px w-8 bg-gold"></span>
          <h2 class="font-display text-2xl md:text-3xl"><?php echo $g['title']; ?></h2>
        </div>
        <div class="mt-6 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/5 bg-card">
          <?php foreach ($g['items'] as $item): [$q, $a] = $item; ?>
            <div>
              <button class="faq-toggle flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]">
                <span class="font-medium text-foreground/95"><?php echo $q; ?></span>
                <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-plus h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon-minus hidden h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
                </span>
              </button>
              <div class="faq-panel hidden animate-fade-up px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                <?php echo $a; ?>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<?php get_footer(); ?>
