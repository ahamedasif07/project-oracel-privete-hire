<?php
/* Template Name: Contact */
global $pageTitle, $pageDescription, $canonical;
$pageTitle = "Contact — Oracle Private Hire";
$pageDescription = "Get in touch with Oracle Private Hire.";
$canonical = "/contact.php";
get_header();

$inputCls = "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3.5 text-sm text-black placeholder:text-black focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

$contactSent = isset($_GET['contact_sent']) && $_GET['contact_sent'] === '1';
?>

<section class="relative flex min-h-[62vh] items-end overflow-hidden pt-32 pb-16">
  <img src="<?php echo get_template_directory_uri(); ?>/assets/images/about.jpg" alt=""
    class="absolute inset-0 h-full w-full object-cover opacity-40">
  <div class="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink"></div>
  <div class="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
    <div class="flex items-center gap-3">
      <span class="h-px w-8 bg-gold"></span>
      <span class="text-xs uppercase tracking-[0.32em] text-gold">Contact</span>
    </div>
    <h1 class="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-foreground md:text-6xl">We're here, 24 hours
      a day.</h1>
    <p class="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
      Speak with our reservations team by phone, email or WhatsApp — or send us a message and we'll respond within
      minutes.
    </p>
  </div>
</section>

<section class="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
  <div class="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
    <div class="space-y-4">
      <?php
      $contacts = [
        ['icon' => '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', 'label' => 'Reservations', 'value' => '07456714214', 'href' => 'tel:07456714214'],
        ['icon' => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', 'label' => 'Email', 'value' => 'bookings@oracleprivatehire.co.uk', 'href' => 'mailto:bookings@oracleprivatehire.co.uk'],
        ['icon' => '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>', 'label' => 'WhatsApp', 'value' => 'Message us instantly', 'href' => 'https://wa.me/07456714214'],
        ['icon' => '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', 'label' => 'Emergency Line', 'value' => '07456714214', 'href' => 'tel:07456714214'],
        ['icon' => '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'label' => 'Business Hours', 'value' => '24 / 7 · 365 days a year', 'href' => null],
        ['icon' => '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>', 'label' => 'Service Area', 'value' => 'United Kingdom — nationwide', 'href' => null],
      ];
      foreach ($contacts as $c):
        $inner = '
          <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' . $c['icon'] . '</svg>
          </div>
          <div class="min-w-0">
            <p class="text-xs uppercase tracking-[0.24em] text-muted-foreground">' . $c['label'] . '</p>
            <p class="mt-1 truncate text-sm text-foreground/90">' . $c['value'] . '</p>
          </div>';
        if ($c['href']): ?>
          <a href="<?php echo $c['href']; ?>"
            class="glass-card flex items-center gap-4 rounded-2xl p-5"><?php echo $inner; ?></a>
        <?php else: ?>
          <div class="glass-card flex items-center gap-4 rounded-2xl p-5"><?php echo $inner; ?></div>
      <?php endif;
      endforeach; ?>
    </div>

    <form class="glass-card space-y-5 rounded-3xl p-8 md:p-10" method="post"
      action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <label class="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Name</label>
            <input name="name" class="<?php echo $inputCls; ?>" placeholder="Your name" required>
          </div>
          <div>
            <label class="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
            <input type="tel" name="phone" class="<?php echo $inputCls; ?>" placeholder="Your phone number"
              required>
          </div>
        </div>
        <div>
          <label class="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Email</label>
          <input type="email" name="email" class="<?php echo $inputCls; ?>" placeholder="Your email address"
            required>
        </div>
        <div>
          <label class="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Subject</label>
          <input name="subject" class="<?php echo $inputCls; ?>" placeholder="Subject">
        </div>
        <div>
          <label class="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
          <textarea name="message" rows="6" class="<?php echo $inputCls; ?>" placeholder="Write your message"
            required></textarea>
        </div>
        <?php wp_nonce_field('oracle_contact_form', 'oracle_contact_nonce'); ?>
        <input type="hidden" name="action" value="oracle_contact_submit">
        <div class="flex justify-center">
          <button type="submit"
            class="rounded-full btn-gold px-8 py-4 text-center text-sm">Send
            Message</button>
        </div>
    </form>
  </div>

  <div class="mt-16 overflow-hidden rounded-3xl border border-white/5">
    <iframe title="UK Service Area Map"
      src="https://www.openstreetmap.org/export/embed.html?bbox=-0.489%2C51.28%2C0.236%2C51.686&layer=mapnik&marker=51.5074%2C-0.1278"
      class=" h-[420px] w-full" loading="lazy">
    </iframe>
  </div>
</section>

<?php if ($contactSent): ?>
  <div id="contact-success-popup" class="fixed inset-0 z-50 grid place-items-center bg-ink/80 px-6 backdrop-blur-sm">
    <div class="glass-card max-w-md rounded-3xl p-8 text-center shadow-2xl">
      <div class="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-ink">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      <h2 class="mt-6 font-display text-2xl text-foreground">Message sent.</h2>
      <p class="mt-3 text-sm text-muted-foreground">Thank you. Your message has been saved and our team will reply shortly.</p>
      <button type="button" class="mt-6 rounded-full btn-gold px-8 py-3 text-sm"
        onclick="document.getElementById('contact-success-popup').remove();">Close</button>
    </div>
  </div>
  <script>
    window.setTimeout(function() {
      var popup = document.getElementById('contact-success-popup');
      if (popup) {
        popup.remove();
      }
    }, 3000);
  </script>
<?php endif; ?>

<?php get_footer(); ?>
