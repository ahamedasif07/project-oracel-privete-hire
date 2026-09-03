<?php
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Oracle Private Hire — Luxury Chauffeur & Airport Transfers UK";
$pageDescription = "Book premium chauffeur & airport transfer service. Fixed prices, licensed drivers, 24/7 UK-wide. Executive travel done right.";
$canonical = "/index.php";
get_header();
?>

<!-- Hero -->
<section class="relative min-h-screen overflow-hidden">
    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/hero.jpg"
        alt="Luxury chauffeur vehicle on a wet city street at night" class="absolute inset-0 h-full w-full object-cover"
        width="1920" height="1200">
    <div class="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-transparent"></div>
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 lg:px-10">
        <div class="animate-fade-up max-w-3xl">
            <!-- top title -->
            <!-- <div class="flex items-center gap-3">
                <span class="h-px w-10 bg-gold"></span>
                <span class="text-xs uppercase tracking-[0.36em] text-gold">Executive Private Hire &middot; Est.
                    2011</span>
            </div> -->
            <h1 class="mt-6 font-display text-5xl leading-[1.02] md:text-7xl lg:text-[5.5rem]">
                A finer way to <span class="text-gradient-gold">arrive.</span>
            </h1>
            <p class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Oracle Private Hire delivers meticulously chauffeured airport
                transfers, executive travel and private hire across the United
                Kingdom &mdash; 24 hours a day, fixed fares, always on time.
            </p>

            <div class="mt-10 flex flex-wrap gap-4">
                <a href="<?php echo esc_url(home_url('/booking/')); ?>"
                    class="inline-flex items-center gap-2 rounded-full btn-gold px-8 py-4">
                    Get Free Quote
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </a>
                <!-- <a href="<?php echo esc_url(home_url('/booking/')); ?>"
                    class="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-8 py-4">Get Free Quote</a> -->
            </div>

            <div class="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
                <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                            d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span class="text-xs text-foreground/80">Licensed Drivers</span>
                </div>
                <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span class="text-xs text-foreground/80">24/7 Service</span>
                </div>
                <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path
                            d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                    </svg>
                    <span class="text-xs text-foreground/80">Airport Specialists</span>
                </div>
                <div class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 7c0-5.333-8-5.333-8 0" />
                        <path d="M10 7v14" />
                        <path d="M6 21h12" />
                        <path d="M6 13h10" />
                    </svg>
                    <span class="text-xs text-foreground/80">Fixed Pricing</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Floating quote card - desktop -->
    <div class="pointer-events-none absolute bottom-10 right-10 hidden animate-float lg:block">
        <div class="glass-card pointer-events-auto rounded-2xl p-6 text-right">
            <p class="text-xs uppercase tracking-[0.28em] text-gold">From</p>
            <p class="mt-1 font-display text-3xl text-gradient-gold">£45</p>
            <p class="text-xs text-muted-foreground">Airport transfers · fixed</p>
        </div>
    </div>
</section>

<!-- About intro -->
<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 max-w-3xl">
        <div class="flex items-center gap-3">
            <span class="h-px w-8 bg-gold"></span>
            <span class="text-xs uppercase tracking-[0.32em] text-gold">Who We Are</span>
        </div>
        <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Chauffeur service, redefined
            for the discerning traveller.</h2>
        <p class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            For over a decade, Oracle Private Hire has become the trusted name in premium ground transportation —
            combining an immaculate modern fleet, the finest professional drivers and unwavering commitment to
            punctuality.
        </p>
    </div>

    <div class="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div class="relative overflow-hidden rounded-3xl border border-white/5">
            <img src="<?php echo get_template_directory_uri(); ?>/assets/images/about.jpg"
                alt="Chauffeur opening luxury car door at airport" class="h-full w-full object-cover" loading="lazy"
                width="1400" height="1000">
            <div class="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"></div>
        </div>
        <div>
            <!-- our stats of experience -->
            <div class="grid grid-cols-2 gap-8">
                <div>
                    <p class="font-display text-4xl text-gradient-gold">1.5+</p>
                    <p class="mt-2 text-sm text-muted-foreground">Years in service</p>
                </div>
                <div>
                    <p class="font-display text-4xl text-gradient-gold">2.2k+</p>
                    <p class="mt-2 text-sm text-muted-foreground">Journeys completed</p>
                </div>
                <div>
                    <p class="font-display text-4xl text-gradient-gold">4.8★</p>
                    <p class="mt-2 text-sm text-muted-foreground">Average rating</p>
                </div>
                <div>
                    <p class="font-display text-4xl text-gradient-gold">24/7</p>
                    <p class="mt-2 text-sm text-muted-foreground">On the road</p>
                </div>
            </div>
            <p class="mt-10 leading-relaxed text-muted-foreground">
                Every Oracle journey begins the same way: a courteous, uniformed
                driver, a spotless vehicle, complimentary refreshments and an
                obsession with your time. Whether it's a critical business flight
                or a private evening across the city, the standard never wavers.
            </p>
            <a href="<?php echo esc_url(home_url('/about/')); ?>"
                class="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold hover:gap-3 transition-all">
                Discover our story
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- Services -->
<div class="border-y border-white/5 bg-onyx/40">
    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div class="mb-14 mx-auto max-w-2xl text-center">
            <div class="flex items-center justify-center gap-3">
                <span class="h-px w-8 bg-gold"></span>
                <span class="text-xs uppercase tracking-[0.32em] text-gold">Our Services</span>
            </div>
            <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Every journey, elevated.
            </h2>
            <p class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                From executive airport transfers to bespoke wedding transport, we tailor every ride to the standard our
                clients expect.
            </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <?php
            $homeServices = [
                ['icon' => 'plane', 'title' => 'Airport Transfers', 'desc' => 'Meet & greet, flight tracking, fixed prices.'],
                ['icon' => 'briefcase', 'title' => 'Corporate Travel', 'desc' => 'Discreet service for meetings & VIPs.'],
                ['icon' => 'pin', 'title' => 'Long Distance', 'desc' => 'Nationwide travel in total comfort.'],
                ['icon' => 'party', 'title' => 'Event Transport', 'desc' => 'Arrive on time, in style, together.'],
                ['icon' => 'heart', 'title' => 'Wedding Cars', 'desc' => 'Elegant vehicles for your special day.'],
                ['icon' => 'crown', 'title' => 'Executive Transfers', 'desc' => 'For clients who expect the very best.'],
                ['icon' => 'shield', 'title' => 'Private Hire 24/7', 'desc' => 'Always available, always reliable.'],
            ];
            $iconSvg = [
                'plane' => '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
                'car' => '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
                'briefcase' => '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
                'pin' => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
                'party' => '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.9-.2 1.8-.85 2.46L4.32 21.5"/><path d="m22 13-3.5.83a2.9 2.9 0 0 0-2.19 3.13c.1.9-.2 1.8-.86 2.46l-2.7 2.7"/>',
                'heart' => '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
                'crown' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
                'shield' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
            ];
            foreach ($homeServices as $s): ?>
                <div class="glass-card group rounded-2xl p-7">
                    <div
                        class="grid h-12 w-12 place-items-center rounded-xl border border-gold/30 bg-gold/5 text-gold transition-all group-hover:bg-gold group-hover:text-ink">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"><?php echo $iconSvg[$s['icon']]; ?></svg>
                    </div>
                    <h3 class="mt-6 font-display text-xl"><?php echo $s['title']; ?></h3>
                    <p class="mt-2 text-sm leading-relaxed text-muted-foreground"><?php echo $s['desc']; ?></p>
                    <a href="<?php echo esc_url(home_url('/services/')); ?>"
                        class="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold transition-all hover:gap-3">
                        Learn more
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</div>

<!-- Fleet preview -->
<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 max-w-3xl">
        <div class="flex items-center gap-3">
            <span class="h-px w-8 bg-gold"></span>
            <span class="text-xs uppercase tracking-[0.32em] text-gold">The Fleet</span>
        </div>
        <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">A modern fleet, meticulously
            maintained.</h2>
        <p class="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Choose from executive saloons, spacious MPVs and prestige SUVs — every vehicle finished in black, with
            leather interiors and complimentary Wi‑Fi.
        </p>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
        <?php
        $homeFleet = [
            ['name' => 'Executive Saloon', 'image' => 'fleet-executive.jpg', 'seats' => 3, 'bags' => 2, 'tag' => 'Mercedes E-Class'],
            ['name' => 'Luxury MPV', 'image' => 'fleet-mpv.jpg', 'seats' => 7, 'bags' => 7, 'tag' => 'Mercedes V-Class'],
            ['name' => 'Prestige SUV', 'image' => 'fleet-suv.jpg', 'seats' => 4, 'bags' => 4, 'tag' => 'Range Rover'],
        ];
        foreach ($homeFleet as $v): ?>
            <article
                class="group overflow-hidden rounded-3xl border border-white/5 bg-card transition-all hover:border-gold/40 hover:shadow-elegant">
                <div class="relative aspect-[4/3] overflow-hidden bg-ink">
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/<?php echo $v['image']; ?>"
                        alt="<?php echo $v['name']; ?>" loading="lazy" width="1400" height="900"
                        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105">
                    <span
                        class="absolute left-4 top-4 rounded-full border border-gold/40 bg-ink/70 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur"><?php echo $v['tag']; ?></span>
                </div>
                <div class="p-6">
                    <h3 class="font-display text-2xl"><?php echo $v['name']; ?></h3>
                    <div class="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span class="inline-flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <?php echo $v['seats']; ?> passengers
                        </span>
                        <span class="inline-flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gold" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z" />
                                <path d="M10 20V8" />
                                <path d="M14 20V8" />
                                <path d="M10 4h4" />
                            </svg>
                            <?php echo $v['bags']; ?> bags
                        </span>
                    </div>
                    <div class="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span class="inline-flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="2" x2="22" y1="12" y2="12" />
                                <line x1="12" x2="12" y1="2" y2="22" />
                            </svg> AC</span>
                        <span class="inline-flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 13a10 10 0 0 1 14 0" />
                                <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                                <path d="M2 8.82a15 15 0 0 1 20 0" />
                                <line x1="12" x2="12.01" y1="20" y2="20" />
                            </svg> Wi‑Fi</span>
                        <span class="inline-flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg"
                                class="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
                            </svg> Leather</span>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
    <div class="mt-12 text-center">
        <a href="<?php echo esc_url(home_url('/fleet/')); ?>"
            class="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-8 py-3.5">
            View Full Fleet
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </a>
    </div>
</section>

<!-- Why choose us -->
<div class="border-y border-white/5 bg-onyx/40">
    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div class="mb-14 mx-auto max-w-2xl text-center">
            <div class="flex items-center justify-center gap-3">
                <span class="h-px w-8 bg-gold"></span>
                <span class="text-xs uppercase tracking-[0.32em] text-gold">Why Oracle</span>
            </div>
            <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Reasons discerning clients
                choose us.</h2>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <?php
            $trust = [
                ['icon' => '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>', 'label' => 'Fully Licensed'],
                ['icon' => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', 'label' => 'DBS Checked Drivers'],
                ['icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'label' => '24/7 Availability'],
                ['icon' => '<path d="M18 7c0-5.333-8-5.333-8 0"/><path d="M10 7v14"/><path d="M6 21h12"/><path d="M6 13h10"/>', 'label' => 'Fixed Fares'],
                ['icon' => '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>', 'label' => 'Flight Monitoring'],
                ['icon' => '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>', 'label' => 'Meet & Greet'],
            ];
            foreach ($trust as $t): ?>
                <div class="glass-card flex flex-col items-center rounded-2xl p-6 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gold" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round"><?php echo $t['icon']; ?></svg>
                    <p class="mt-4 text-xs uppercase tracking-widest text-foreground/90"><?php echo $t['label']; ?></p>
                </div>
            <?php endforeach; ?>
        </div>
    </section>
</div>

<!-- Testimonials -->
<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
    <div class="mb-14 mx-auto max-w-2xl text-center">
        <div class="flex items-center justify-center gap-3">
            <span class="h-px w-8 bg-gold"></span>
            <span class="text-xs uppercase tracking-[0.32em] text-gold">Testimonials</span>
        </div>
        <h2 class="mt-5 font-display text-3xl leading-tight text-foreground md:text-5xl">Trusted by executives, families
            and travellers.</h2>
    </div>
    <div class="grid gap-6 md:grid-cols-3">
        <?php
        $testimonials = [
            ['name' => 'James Whitfield', 'role' => 'Heathrow Transfer', 'text' => 'Immaculate car, discreet driver, on time to the minute. Oracle has become our go-to for airport runs.'],
            ['name' => 'Sophia Lang', 'role' => 'Corporate Client', 'text' => "The most professional private hire company we've used across the UK. Consistently exceptional."],
            ['name' => 'Mr. & Mrs. Ahmed', 'role' => 'Wedding Transport', 'text' => 'They made our wedding day effortless. Truly a first-class chauffeur experience.'],
        ];
        foreach ($testimonials as $t): ?>
            <blockquote class="glass-card flex flex-col rounded-3xl p-8">
                <div class="flex gap-1 text-gold">
                    <?php for ($i = 0; $i < 5; $i++): ?>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    <?php endfor; ?>
                </div>
                <p class="mt-5 leading-relaxed text-foreground/90">&ldquo;<?php echo $t['text']; ?>&rdquo;</p>
                <footer class="mt-6 border-t border-white/10 pt-5">
                    <p class="font-display text-lg"><?php echo $t['name']; ?></p>
                    <p class="text-xs uppercase tracking-widest text-muted-foreground"><?php echo $t['role']; ?></p>
                </footer>
            </blockquote>
        <?php endforeach; ?>
    </div>
</section>

<!-- CTA -->
<section class="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
    <div
        class="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-onyx to-ink p-10 md:p-16">
        <div class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl"></div>
        <div class="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
                <h2 class="font-display text-3xl md:text-5xl">Reserve your <span
                        class="text-gradient-gold">chauffeur</span>.</h2>
                <p class="mt-4 max-w-md text-muted-foreground">Instant fixed-price quote in under a minute. Nationwide
                    UK coverage, 24 hours a day.</p>
            </div>
            <div class="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href="tel:07456714214"
                    class="inline-flex items-center justify-center gap-2 rounded-full btn-ghost-gold px-6 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                    Call Us
                </a>
                <a href="mailto:bookings@oracleprivatehire.co.uk"
                    class="inline-flex items-center justify-center gap-2 rounded-full btn-ghost-gold px-6 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email
                </a>
                <a href="<?php echo esc_url(home_url('/booking/')); ?>"
                    class="inline-flex items-center justify-center gap-2 rounded-full btn-gold px-8 py-4">
                    Book Now
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>