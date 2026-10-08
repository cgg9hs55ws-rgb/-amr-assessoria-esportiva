const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');
const nav = document.querySelector('.nav');

const closeMenu = () => {
  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.remove('open');
  document.body.classList.remove('menu-open');

  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-label', 'Abrir menu');

  menuToggle.textContent = '☰';
};

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener('click', () => {

    const open = !mobileMenu.classList.contains('open');

    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);

    menuToggle.setAttribute(
      'aria-expanded',
      String(open)
    );

    mobileMenu.setAttribute(
      'aria-hidden',
      String(!open)
    );

    menuToggle.setAttribute(
      'aria-label',
      open ? 'Fechar menu' : 'Abrir menu'
    );

    menuToggle.textContent = open ? '×' : '☰';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', event => {

    if (!mobileMenu.classList.contains('open')) {
      return;
    }

    if (
      !mobileMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}


const handleNav = () => {

  if (!nav) return;

  nav.classList.toggle(
    'scrolled',
    window.scrollY > 18
  );
};

window.addEventListener(
  'scroll',
  handleNav,
  { passive: true }
);

handleNav();


const revealItems = [
  ...document.querySelectorAll('.reveal')
];

if ('IntersectionObserver' in window) {

  const observer = new IntersectionObserver(
    (entries, obs) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add('visible');

          obs.unobserve(entry.target);
        }
      });

    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealItems.forEach((element, index) => {

    element.style.transitionDelay =
      (Math.min(index % 4, 3) * 60) + 'ms';

    observer.observe(element);
  });

} else {

  revealItems.forEach(element => {
    element.classList.add('visible');
  });
}


const navLinks = [
  ...document.querySelectorAll('.desktop-nav a')
];

const sections = navLinks
  .map(link =>
    document.querySelector(
      link.getAttribute('href')
    )
  )
  .filter(Boolean);


const setActive = () => {

  let current = '';

  sections.forEach(section => {

    if (
      window.scrollY >=
      section.offsetTop - 170
    ) {
      current = '#' + section.id;
    }

  });

  navLinks.forEach(link => {

    link.classList.toggle(
      'active',
      link.getAttribute('href') === current
    );

  });
};

window.addEventListener(
  'scroll',
  setActive,
  { passive: true }
);

setActive();


document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {

    link.addEventListener('click', event => {

      const href =
        link.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target =
        document.querySelector(href);

      if (target) {

        event.preventDefault();

        closeMenu();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    });

  });
