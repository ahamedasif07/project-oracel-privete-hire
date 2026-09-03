<?php

/**
 * Theme header.
 *
 * Optional variables that page templates may set BEFORE calling get_header():
 *   global $pageTitle        string
 *   global $pageDescription  string
 */
global $pageTitle, $pageDescription;

if (empty($pageTitle)) {
  $pageTitle = wp_get_document_title();
}
if (empty($pageDescription)) {
  $pageDescription = get_bloginfo('description');
}

$navLinks = [
  home_url('/')                      => 'Home',
  home_url('/about/')                => 'About',
  home_url('/services/')             => 'Services',
  home_url('/fleet/')                => 'Fleet',
  home_url('/airport-transfers/')    => 'Airport',
  home_url('/faqs/')                 => 'FAQs',
  home_url('/contact/')              => 'Contact',
];

$navSlugs = [
  home_url('/')                      => 'front',
  home_url('/about/')                => 'about',
  home_url('/services/')             => 'services',
  home_url('/fleet/')                => 'fleet',
  home_url('/airport-transfers/')    => 'airport-transfers',
  home_url('/faqs/')                 => 'faqs',
  home_url('/contact/')              => 'contact',
];

function oracle_is_current_nav($slug)
{
  if ('front' === $slug) {
    return is_front_page();
  }
  return is_page($slug);
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="<?php echo esc_attr($pageDescription); ?>">
  <meta name="author" content="Oracle Private Hire">
  <meta name="theme-color" content="#0D0D0D">
  <meta property="og:title" content="<?php echo esc_attr($pageTitle); ?>">
  <meta property="og:description" content="<?php echo esc_attr($pageDescription); ?>">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap">

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            background: 'oklch(0.145 0 0)',
            foreground: 'oklch(0.98 0 0)',
            card: 'oklch(0.19 0 0)',
            ink: 'oklch(0.145 0 0)',
            onyx: 'oklch(0.20 0 0)',
            gold: 'oklch(0.78 0.13 85)',
            'gold-soft': 'oklch(0.88 0.09 88)',
            'gold-deep': 'oklch(0.62 0.13 78)',
            'muted-foreground': 'oklch(0.72 0 0)',
          },
          fontFamily: {
            display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            gold: '0 20px 60px -20px oklch(0.78 0.13 85 / 0.35)',
            elegant: '0 30px 80px -30px oklch(0 0 0 / 0.6)',
          },
        },
      },
    };
  </script>
  <?php wp_head(); ?>
</head>

<body <?php body_class('min-h-screen bg-background text-foreground'); ?>>
  <?php wp_body_open(); ?>

  <header id="site-header" class="fixed inset-x-0 top-0 z-50 transition-all duration-500 bg-transparent">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-3">
        <div class="relative flex shrink-0 items-center justify-center overflow-hidden ">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/oracel-bg-remove2-removebg-preview.png'); ?>"
            alt="Oracle Logo" width="100" height="70" class="object-cover">
        </div>
      </a>

      <nav class="hidden items-center gap-8 lg:flex">
        <?php foreach ($navLinks as $href => $label):
          $slug   = $navSlugs[$href];
          $active = oracle_is_current_nav($slug);
        ?>
          <a href="<?php echo esc_url($href); ?>"
            class="group relative text-sm font-medium transition-colors hover:text-gold <?php echo $active ? 'text-gold' : 'text-foreground/80'; ?>">
            <?php echo esc_html($label); ?>
            <span
              class="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        <?php endforeach; ?>
      </nav>

      <div class="flex items-center gap-3">
        <a href="tel:07456714214"
          class="hidden items-center gap-2 text-sm text-foreground/80 hover:text-gold md:inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </svg>
          <span>07456714214</span>
        </a>
        <a href="<?php echo esc_url(home_url('/booking/')); ?>"
          class="hidden rounded-full btn-gold px-5 py-2.5 text-sm md:inline-block">Book Now</a>
        <button id="menu-toggle" aria-label="Toggle menu"
          class="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-foreground lg:hidden">
          <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="hidden h-5 w-5" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div id="mobile-drawer"
      class="closed fixed inset-x-0 top-[72px] bottom-0 z-40 origin-top overflow-y-auto bg-ink/98 backdrop-blur-2xl lg:hidden">
      <div class="flex flex-col gap-2 px-6 py-10">
        <?php foreach ($navLinks as $href => $label):
          $slug   = $navSlugs[$href];
          $active = oracle_is_current_nav($slug);
        ?>
          <a href="<?php echo esc_url($href); ?>"
            class="border-b border-white/5 py-4 font-display text-2xl transition-colors hover:text-gold <?php echo $active ? 'text-gold' : 'text-foreground/90'; ?>">
            <?php echo esc_html($label); ?>
          </a>
        <?php endforeach; ?>
        <a href="<?php echo esc_url(home_url('/booking/')); ?>"
          class="mt-6 block rounded-full btn-gold px-6 py-4 text-center">Book Now</a>
        <a href="tel:+441234567890"
          class="mt-3 flex items-center justify-center gap-2 rounded-full btn-ghost-gold px-6 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </svg>
          07456714214
        </a>
      </div>
    </div>
  </header>

  <main>