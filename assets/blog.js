const menuToggle = document.querySelector('[data-menu-toggle]');
const sidebar = document.querySelector('[data-sidebar]');
const menuClose = document.querySelector('[data-menu-close]');
const menuBackdrop = document.querySelector('[data-menu-backdrop]');

if (menuToggle && sidebar && menuBackdrop) {
  const mobileMenu = window.matchMedia('(max-width: 700px)');
  let menuOpen = false;

  function focusableMenuItems() {
    return [...sidebar.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
      .filter((element) => !element.disabled && element.tabIndex >= 0 && element.getClientRects().length);
  }

  function setMenuOpen(open, restoreFocus = false) {
    menuOpen = Boolean(open && mobileMenu.matches);
    document.body.classList.toggle('menu-open', menuOpen);
    menuToggle.setAttribute('aria-expanded', String(menuOpen));
    menuBackdrop.hidden = !menuOpen;
    sidebar.inert = mobileMenu.matches && !menuOpen;

    if (menuOpen) {
      (menuClose || focusableMenuItems()[0])?.focus();
    } else if (restoreFocus && mobileMenu.matches) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener('click', () => setMenuOpen(!menuOpen));
  menuClose?.addEventListener('click', () => setMenuOpen(false, true));
  menuBackdrop.addEventListener('click', () => setMenuOpen(false, true));

  document.addEventListener('keydown', (event) => {
    if (!menuOpen) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      setMenuOpen(false, true);
      return;
    }

    if (event.key !== 'Tab') return;
    const items = focusableMenuItems();
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (!first) {
      event.preventDefault();
    } else if (event.shiftKey && (active === first || !sidebar.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !sidebar.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });

  function resetMenu() {
    setMenuOpen(false, sidebar.contains(document.activeElement));
  }

  mobileMenu.addEventListener('change', resetMenu);
  window.addEventListener('resize', resetMenu);
  window.addEventListener('pageshow', resetMenu);
  resetMenu();
}
