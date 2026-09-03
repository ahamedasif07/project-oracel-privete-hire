<?php

/**
 * Oracle Private Hire theme functions.
 */

if (! defined('ABSPATH')) {
    exit; // No direct access.
}

define('ORACLE_THEME_VERSION', '1.0.0');

/**
 * Theme setup.
 */
function oracle_theme_setup()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo');
    add_theme_support('responsive-embeds');

    register_nav_menus([
        'primary' => __('Primary Menu', 'oracle'),
        'footer'  => __('Footer Menu', 'oracle'),
    ]);
}
add_action('after_setup_theme', 'oracle_theme_setup');

/**
 * Enqueue styles and scripts.
 * The design is built with the Tailwind CDN build (loaded in header.php)
 * plus a small custom stylesheet at assets/css/style.css, and a small
 * script at assets/js/main.js for the mobile menu / booking wizard.
 */
function oracle_theme_assets()
{
    // Root style.css - required by WordPress, kept enqueued for good practice.
    wp_enqueue_style('oracle-theme-style', get_stylesheet_uri(), [], ORACLE_THEME_VERSION);

    // Custom design stylesheet.
    wp_enqueue_style(
        'oracle-custom-style',
        get_template_directory_uri() . '/assets/css/style.css',
        ['oracle-theme-style'],
        ORACLE_THEME_VERSION
    );

    // Site interactions (mobile menu, booking wizard, header scroll state).
    wp_enqueue_script(
        'oracle-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        ORACLE_THEME_VERSION,
        true
    );
    // Site interactions navigation.
    wp_enqueue_script(
        'oracle-nav',
        get_template_directory_uri() . '/assets/js/nav.js',
        [],
        ORACLE_THEME_VERSION,
        true
    );
}
add_action('wp_enqueue_scripts', 'oracle_theme_assets');

/**
 * Make sure a static "Home" page routes to the theme's front-page.php
 * design even before the site owner has configured Settings > Reading.
 * This is a soft fallback only; for full control, set a static front
 * page in wp-admin under Settings > Reading.
 */
function oracle_theme_editor_style()
{
    add_editor_style();
}
add_action('admin_init', 'oracle_theme_editor_style');


// contact form post type 

function register_contact_messages_cpt()
{
    register_post_type('contact_message', [
        'labels' => [
            'name' => 'Contact Messages',
            'singular_name' => 'Message',
            'menu_name' => 'Contact Messages',
            'all_items' => 'All Messages',
            'edit_item' => 'View Message',
            'view_item' => 'View Message',
            'search_items' => 'Search Messages',
            'not_found' => 'No contact messages found',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'menu_position' => 25,
        'capability_type' => 'post',
        'supports' => ['title', 'editor', 'custom-fields'],
        'capabilities' => ['create_posts' => 'do_not_allow'],
        'map_meta_cap' => true,
    ]);
}
add_action('init', 'register_contact_messages_cpt');

function oracle_contact_message_columns($columns)
{
    return [
        'cb' => $columns['cb'],
        'title' => 'Message',
        'contact_phone' => 'Phone',
        'contact_email' => 'Email',
        'contact_subject' => 'Subject',
        'contact_view' => 'View',
        'date' => $columns['date'],
    ];
}
add_filter('manage_contact_message_posts_columns', 'oracle_contact_message_columns');

function oracle_contact_message_column_content($column, $post_id)
{
    if (in_array($column, ['contact_phone', 'contact_email', 'contact_subject'], true)) {
        echo esc_html(get_post_meta($post_id, $column, true));
    }

    if ($column === 'contact_view') {
        $name = get_post_meta($post_id, 'contact_name', true);
        $phone = get_post_meta($post_id, 'contact_phone', true);
        $email = get_post_meta($post_id, 'contact_email', true);
        $subject = get_post_meta($post_id, 'contact_subject', true);
        $message = get_post_meta($post_id, 'contact_message', true);

        if (! $message) {
            $message = get_post_field('post_content', $post_id);
            $messageParts = preg_split('/\RMessage:\R/', $message, 2);
            $message = $messageParts[1] ?? $message;
        }

        printf(
            '<button type="button" class="oracle-view-contact-message" data-name="%s" data-phone="%s" data-email="%s" data-subject="%s" data-message="%s">View</button>',
            esc_attr($name),
            esc_attr($phone),
            esc_attr($email),
            esc_attr($subject),
            esc_attr($message)
        );
    }
}
add_action('manage_contact_message_posts_custom_column', 'oracle_contact_message_column_content', 10, 2);

function oracle_contact_messages_admin_modal()
{
    $screen = get_current_screen();

    if (! $screen || $screen->id !== 'edit-contact_message') {
        return;
    }
?>
<style>
.oracle-view-contact-message {
    align-items: center;
    background: linear-gradient(135deg, #111318, #2a2415);
    border: 1px solid rgba(212, 175, 55, 0.48);
    border-radius: 999px;
    box-shadow: 0 10px 24px rgba(17, 19, 24, 0.16);
    color: #f7dfa0;
    cursor: pointer;
    display: inline-flex;
    font-size: 12px;
    font-weight: 700;
    justify-content: center;
    letter-spacing: 0.04em;
    line-height: 1;
    min-height: 34px;
    padding: 9px 18px;
    text-transform: uppercase;
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}

.oracle-view-contact-message:hover,
.oracle-view-contact-message:focus {
    border-color: #d4af37;
    box-shadow: 0 14px 32px rgba(17, 19, 24, 0.24);
    color: #fff4cf;
    transform: translateY(-1px);
}

.oracle-contact-modal {
    align-items: center;
    background: rgba(8, 10, 14, 0.72);
    backdrop-filter: blur(8px);
    display: none;
    inset: 0;
    justify-content: center;
    padding: 24px;
    position: fixed;
    z-index: 100000;
}

.oracle-contact-modal.is-open {
    display: flex;
}

.oracle-contact-modal__panel {
    background: linear-gradient(180deg, #ffffff 0%, #fbfaf6 100%);
    border: 1px solid rgba(212, 175, 55, 0.26);
    border-radius: 20px;
    box-shadow: 0 34px 90px rgba(0, 0, 0, 0.34);
    max-height: calc(100vh - 48px);
    max-width: 720px;
    overflow: auto;
    padding: 0;
    position: relative;
    width: min(100%, 720px);
}

.oracle-contact-modal__close {
    background: #fff;
    border: 1px solid rgba(17, 19, 24, 0.12);
    border-radius: 999px;
    box-shadow: 0 8px 18px rgba(17, 19, 24, 0.08);
    color: #1d2327;
    cursor: pointer;
    font-weight: 700;
    min-height: 34px;
    padding: 6px 14px;
    position: absolute;
    right: 22px;
    top: 22px;
}

.oracle-contact-modal__header {
    background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.24), transparent 34%), linear-gradient(135deg, #111318, #221d13);
    color: #fff;
    padding: 30px 72px 28px 28px;
}

.oracle-contact-modal__eyebrow {
    color: #d4af37;
    display: block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.16em;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.oracle-contact-modal__title {
    color: #fff;
    font-size: 26px;
    line-height: 1.18;
    margin: 0;
}

.oracle-contact-modal__subtext {
    color: rgba(255, 255, 255, 0.68);
    margin: 8px 0 0;
}

.oracle-contact-modal__grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 24px;
}

.oracle-contact-modal__field {
    background: #fff;
    border: 1px solid rgba(17, 19, 24, 0.08);
    border-radius: 14px;
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
    padding: 16px;
}

.oracle-contact-modal__field--full {
    grid-column: 1 / -1;
}

.oracle-contact-modal__label {
    color: #8a6d1d;
    display: block;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.11em;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.oracle-contact-modal__value {
    color: #171b21;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.55;
    margin: 0;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
}

.oracle-contact-modal__field--full .oracle-contact-modal__value {
    background: #fbfaf6;
    border-left: 3px solid #d4af37;
    border-radius: 10px;
    font-weight: 500;
    min-height: 110px;
    padding: 14px;
}

@media (max-width: 600px) {
    .oracle-contact-modal {
        padding: 12px;
    }

    .oracle-contact-modal__panel {
        border-radius: 16px;
    }

    .oracle-contact-modal__header {
        padding: 26px 24px 22px;
    }

    .oracle-contact-modal__close {
        position: static;
        margin: 16px 0 0 24px;
    }

    .oracle-contact-modal__grid {
        grid-template-columns: 1fr;
        padding: 18px;
    }
}
</style>

<div class="oracle-contact-modal" id="oracle-contact-modal" aria-hidden="true">
    <div class="oracle-contact-modal__panel" role="dialog" aria-modal="true"
        aria-labelledby="oracle-contact-modal-title">
        <button type="button" class="oracle-contact-modal__close" id="oracle-contact-modal-close">Close</button>
        <div class="oracle-contact-modal__header">
            <span class="oracle-contact-modal__eyebrow">Oracle Private Hire</span>
            <h2 class="oracle-contact-modal__title" id="oracle-contact-modal-title">Contact Message</h2>
            <p class="oracle-contact-modal__subtext">Full customer enquiry details from the contact form.</p>
        </div>
        <div class="oracle-contact-modal__grid">
            <div class="oracle-contact-modal__field">
                <span class="oracle-contact-modal__label">Name</span>
                <p class="oracle-contact-modal__value" data-oracle-contact-value="name"></p>
            </div>
            <div class="oracle-contact-modal__field">
                <span class="oracle-contact-modal__label">Phone</span>
                <p class="oracle-contact-modal__value" data-oracle-contact-value="phone"></p>
            </div>
            <div class="oracle-contact-modal__field">
                <span class="oracle-contact-modal__label">Email</span>
                <p class="oracle-contact-modal__value" data-oracle-contact-value="email"></p>
            </div>
            <div class="oracle-contact-modal__field">
                <span class="oracle-contact-modal__label">Subject</span>
                <p class="oracle-contact-modal__value" data-oracle-contact-value="subject"></p>
            </div>
            <div class="oracle-contact-modal__field oracle-contact-modal__field--full">
                <span class="oracle-contact-modal__label">Message</span>
                <p class="oracle-contact-modal__value" data-oracle-contact-value="message"></p>
            </div>
        </div>
    </div>
</div>

<script>
(function() {
    var modal = document.getElementById('oracle-contact-modal');
    var closeButton = document.getElementById('oracle-contact-modal-close');

    function setValue(key, value) {
        var node = modal.querySelector('[data-oracle-contact-value="' + key + '"]');
        if (node) {
            node.textContent = value || '-';
        }
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', function(event) {
        var button = event.target.closest('.oracle-view-contact-message');

        if (!button) {
            return;
        }

        setValue('name', button.dataset.name);
        setValue('phone', button.dataset.phone);
        setValue('email', button.dataset.email);
        setValue('subject', button.dataset.subject);
        setValue('message', button.dataset.message);

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    function refreshContactMessagesTable() {
        if (document.hidden || modal.classList.contains('is-open')) {
            return;
        }

        var refreshUrl = new URL(window.location.href);
        refreshUrl.searchParams.set('oracle_contact_refresh', Date.now().toString());

        fetch(refreshUrl.toString(), {
                credentials: 'same-origin',
                cache: 'no-store'
            })
            .then(function(response) {
                return response.text();
            })
            .then(function(html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                var nextBody = doc.querySelector('.wp-list-table tbody');
                var currentBody = document.querySelector('.wp-list-table tbody');

                if (nextBody && currentBody && nextBody.innerHTML !== currentBody.innerHTML) {
                    currentBody.innerHTML = nextBody.innerHTML;
                }

                ['.tablenav.top .displaying-num', '.tablenav.bottom .displaying-num', '.subsubsub'].forEach(
                    function(selector) {
                        var nextNode = doc.querySelector(selector);
                        var currentNode = document.querySelector(selector);

                        if (nextNode && currentNode && nextNode.innerHTML !== currentNode.innerHTML) {
                            currentNode.innerHTML = nextNode.innerHTML;
                        }
                    });
            })
            .catch(function() {});
    }

    window.setInterval(refreshContactMessagesTable, 4000);
})();
</script>
<?php
}
add_action('admin_footer-edit.php', 'oracle_contact_messages_admin_modal');

function oracle_handle_contact_form_submit()
{
    if (! isset($_POST['oracle_contact_nonce']) || ! wp_verify_nonce($_POST['oracle_contact_nonce'], 'oracle_contact_form')) {
        wp_safe_redirect(add_query_arg('contact_error', 'security', wp_get_referer() ?: home_url('/contact/')));
        exit;
    }

    $name = sanitize_text_field($_POST['name'] ?? '');
    $phone = sanitize_text_field($_POST['phone'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $subject = sanitize_text_field($_POST['subject'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');
    $subject = $subject ?: 'New Inquiry';

    $redirectUrl = remove_query_arg(['contact_sent', 'contact_error'], wp_get_referer() ?: home_url('/contact/'));

    $contactMessageId = wp_insert_post([
        'post_title' => 'Message from: ' . ($name ?: 'Website visitor'),
        'post_content' => $message,
        'post_status' => 'publish',
        'post_type' => 'contact_message',
        'meta_input' => [
            'contact_name' => $name,
            'contact_phone' => $phone,
            'contact_email' => $email,
            'contact_subject' => $subject,
            'contact_message' => $message,
        ],
    ], true);

    if (is_wp_error($contactMessageId)) {
        wp_safe_redirect(add_query_arg('contact_error', 'save', $redirectUrl));
        exit;
    }

    wp_mail(
        get_option('admin_email'),
        '[Contact Form] ' . $subject,
        "Name: $name\nPhone: $phone\nEmail: $email\nMessage: $message"
    );

    wp_safe_redirect(add_query_arg('contact_sent', '1', $redirectUrl));
    exit;
}
add_action('admin_post_oracle_contact_submit', 'oracle_handle_contact_form_submit');
add_action('admin_post_nopriv_oracle_contact_submit', 'oracle_handle_contact_form_submit');