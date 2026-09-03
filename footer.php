</main>

<footer class="relative mt-24 border-t border-white/5 bg-ink">
  <div class="absolute inset-x-0 top-0 h-px hairline-gold"></div>
  <div class="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
    <div>
      <div class="flex items-center gap-3">
        <div class="relative flex shrink-0 items-center justify-center overflow-hidden bg-ink">
          <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/oracel.png'); ?>"
            alt="Oracle Logo" width="100" height="70" class="object-cover">
        </div>
      </div>
      <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Oracle Private Hire delivers premium chauffeur and airport transfer
        services, where every journey is defined by trust, discretion and
        timeless comfort.
      </p>
      <div class="mt-6 flex gap-3">
        <a href="#" aria-label="Facebook"
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground/70 transition-all hover:border-gold hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        <a href="#" aria-label="Instagram"
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground/70 transition-all hover:border-gold hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
        <a href="#" aria-label="Twitter"
          class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground/70 transition-all hover:border-gold hover:text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 1.5 9.6 2 4c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        </a>
      </div>
    </div>

    <div>
      <h4 class="text-xs uppercase tracking-[0.28em] text-gold">Quick Links</h4>
      <ul class="mt-5 space-y-3 text-sm">
        <li><a href="<?php echo esc_url(home_url('/about/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">About Us</a></li>
        <li><a href="<?php echo esc_url(home_url('/services/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">Our Services</a></li>
        <li><a href="<?php echo esc_url(home_url('/fleet/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">Fleet</a></li>
        <li><a href="<?php echo esc_url(home_url('/airport-transfers/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">Airport Transfers</a></li>
        <li><a href="<?php echo esc_url(home_url('/booking/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">Booking</a></li>
        <li><a href="<?php echo esc_url(home_url('/faqs/')); ?>"
            class="text-muted-foreground transition-colors hover:text-gold">FAQs</a></li>
      </ul>
    </div>

    <div>
      <h4 class="text-xs uppercase tracking-[0.28em] text-gold">Contact</h4>
      <ul class="mt-5 space-y-4 text-sm text-muted-foreground">
        <li class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-gold"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path
              d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
          </svg>
          <a href="tel:+07456714214" class="hover:text-gold">07456714214</a>
        </li>
        <li class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-gold"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <a href="mailto:bookings@oracleprivatehire.co.uk"
            class="hover:text-gold">bookings@oracleprivatehire.co.uk</a>
        </li>
        <li class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-gold"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path
              d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>United Kingdom &mdash; nationwide service</span>
        </li>
        <li class="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-4 w-4 shrink-0 text-gold"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Available 24 / 7, 365 days</span>
        </li>
      </ul>
    </div>

    <div>
      <h4 class="text-xs uppercase tracking-[0.28em] text-gold">Reserve</h4>
      <p class="mt-5 text-sm text-muted-foreground">
        Book your executive transfer online in under two minutes. Fixed
        fares, no surge pricing, ever.
      </p>
      <a href="<?php echo esc_url(home_url('/booking/')); ?>"
        class="mt-5 inline-block rounded-full btn-gold px-6 py-3 text-sm">Book Now</a>
    </div>
  </div>

  <div class="border-t border-white/5">
    <div
      class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row lg:px-10">
      <p>&copy; <span id="year"><?php echo esc_html(date('Y')); ?></span> Oracle Private Hire. All rights
        reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="hover:text-gold">Privacy Policy</a>
        <a href="#" class="hover:text-gold">Terms &amp; Conditions</a>
        <a href="#" class="hover:text-gold">Cookies</a>
      </div>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>

</html>