(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);


const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
  if (document.querySelector('body')) {
    document.querySelector('body').classList.toggle('mobile-nav-active');
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
}

if (mobileNavToggleBtn) {
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
}

function initMobileNavLinks() {
  const navLinks = document.querySelectorAll('#navmenu a');
  if (navLinks.length > 0) {
    navLinks.forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });
  }
}

initMobileNavLinks();
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();









document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats-section');
    let hasAnimated = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);

            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 16);
                } else {
                    counter.innerText = target; 
                }
            };
            updateCount();
        });
    };

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            startCounting();
            hasAnimated = true; 
            statsObserver.unobserve(statsSection); 
        }
    }, { threshold: 0.3 }); 
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});



// ===== Fenét kondisyon konfidansyalite a =====


document.addEventListener("DOMContentLoaded", () => {
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("cookie-accept-btn");
  const closeBtn = document.getElementById("cookie-close-btn");

  if (!cookieBanner) return;

  const alreadyAccepted = localStorage.getItem("ged_cookies_accepted");
  const lastDismissed = localStorage.getItem("ged_cookies_dismissed_time");
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();

  const wasRecentlyDismissed = lastDismissed && (now - lastDismissed < ONE_DAY);

  if (!alreadyAccepted && !wasRecentlyDismissed) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  }

  // Klike "Compris" = akseptasyon konplè, pa parèt ankò janm
  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("ged_cookies_accepted", "true");
    cookieBanner.classList.remove("show");
  });

  // Klike "X" = fèmen sèlman, ap remontre apre 24 èdtan
  closeBtn.addEventListener("click", () => {
    localStorage.setItem("ged_cookies_dismissed_time", now);
    cookieBanner.classList.remove("show");
  });
});



mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbWFzdGVycGlsaXNvdS0xMiIsImEiOiJjbXQyNjV3eGEwbW5sMnlwejY5dGVnaTEyIn0.57IT2a3JaB2UTbOsvADMUw';

const darkStyle = 'mapbox://styles/themasterpilisou-12/cmt6bv4d900g501s4ca7cdnt3';
const satelliteStyle = 'mapbox://styles/mapbox/satellite-streets-v12';

// Kowòdone santral pou La Gonâve
const gonaveCenter = [-72.8800, 18.8350];

const map = new mapboxgl.Map({
  container: 'map',
  style: darkStyle,
  center: [-72.5000, 18.9000],
  zoom: 6.8,
  scrollZoom: false,
  cooperativeGestures: true
});

// Kontwòl Zoom
const nav = new mapboxgl.NavigationControl({
  showCompass: false,
  showZoom: true
});
map.addControl(nav, 'bottom-right');

// Geocoder (Rechèch)
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: 'Rechercher un lieu...',
  language: 'fr',
  marker: false
});
map.addControl(geocoder, 'top-right');

// -------------------------------------------------------------
// 1. PREMYE GWO PWEN PRENSIPAL LA (9.5k) AK AKSYON KLIK / TOUCH
// -------------------------------------------------------------
const mainEl = document.createElement('div');
mainEl.className = 'custom-green-marker main-big-marker';
mainEl.innerText = '9.5k';

// Fonksyon pou fè zoom la lè yo teke 9.5k
function handleMainClick(e) {
  if (e) e.stopPropagation();
  map.flyTo({
    center: [-72.8750, 18.8320],
    zoom: 11,
    essential: true,
    speed: 1.2
  });
}

// Ajoute aksyon pou PC (click) ak Mobil (touchstart)
mainEl.addEventListener('click', handleMainClick);
mainEl.addEventListener('touchstart', handleMainClick);

const mainMarker = new mapboxgl.Marker({ element: mainEl })
  .setLngLat(gonaveCenter)
  .addTo(map);

// -------------------------------------------------------------
// 2. TI PWEN AK ETIKÈT JÔN YO
// -------------------------------------------------------------
const gedLocations = [
  {
    title: "Bureau Central GED",
    coords: [-72.8647, 18.8375], // Toupre Tribinal de Paix (Bas-Asil, Anse-à-Galets)
    count: "GED"
  },
  {
    title: "École des Visionnaires (Nan Café)",
    coords: [-72.9320, 18.8150], // Nan Kafé (anndan mòn lan)
    count: "1.2k"
  },
  {
    title: "Projet Communautaire",
    coords: [-72.9050, 18.8250], // Mòn / Plèn
    count: "2.4k"
  }
];

const subMarkers = [];

gedLocations.forEach(loc => {
  // Bwat ki kenbe ti won an + ti nòt jòn la ansanm
  const markerWrapper = document.createElement('div');
  markerWrapper.className = 'marker-with-label-wrapper';

  // Ti won an
  const circle = document.createElement('div');
  circle.className = 'custom-green-marker sub-small-marker';
  circle.innerText = loc.count;

  // Ti etikèt jòn an
  const yellowLabel = document.createElement('div');
  yellowLabel.className = 'yellow-note-label';
  yellowLabel.innerText = loc.title;

  markerWrapper.appendChild(circle);
  markerWrapper.appendChild(yellowLabel);

  const subMarker = new mapboxgl.Marker({ element: markerWrapper })
    .setLngLat(loc.coords);

  subMarkers.push(subMarker);
});

// -------------------------------------------------------------
// 3. LOJIK SWITCH ANTRE GWO PWEN 9.5K AK TI PWEN YO
// -------------------------------------------------------------
function updateMarkersVisibility() {
  const currentZoom = map.getZoom();

  if (currentZoom >= 9.8) {
    mainEl.style.display = 'none'; // Disparèt gwo won 9.5k a
    subMarkers.forEach(marker => marker.addTo(map)); // Afiche ti pwen yo ak etikèt jòn yo
  } else {
    mainEl.style.display = 'flex'; // Remontre gwo won 9.5k a
    subMarkers.forEach(marker => marker.remove()); // Kache ti pwen yo
  }
}

// Chanje afichaj la lè zoom nan ap chanje
map.on('zoom', updateMarkersVisibility);

// -------------------------------------------------------------
// BOUTON "Découvrir La Gonâve"
// -------------------------------------------------------------
class DiscoverControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';

    const button = document.createElement('button');
    button.className = 'discover-btn';
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5-1.12 2.5-2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      Découvrir La Gonâve
    `;

    button.onclick = () => {
      map.flyTo({
        center: [-72.8750, 18.8320],
        zoom: 11,
        essential: true,
        speed: 1.2
      });
    };

    this._container.appendChild(button);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

map.addControl(new DiscoverControl(), 'top-left');

// -------------------------------------------------------------
// BOUTON SWITCH LAYER (Style Kat la)
// -------------------------------------------------------------
class LayerSwitchControl {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    
    const button = document.createElement('button');
    button.className = 'style-switch-btn';
    button.title = 'Changer le style de la carte';
    
    button.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M12 16.54L19.37 12.8 21 13.63 12 18 3 13.63 4.63 12.8 12 16.54M12 3L21 7.37 12 11.74 3 7.37 12 3M12 14.1L4.63 10.36 3 11.19 12 15.56 21 11.19 19.37 10.36 12 14.1Z"/>
      </svg>
    `;

    let isSatellite = false;

    button.onclick = () => {
      isSatellite = !isSatellite;
      const newStyle = isSatellite ? satelliteStyle : darkStyle;
      map.setStyle(newStyle);
    };

    this._container.appendChild(button);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

map.addControl(new LayerSwitchControl(), 'bottom-right');

map.on('style.load', updateMarkersVisibility);
map.on('load', () => {
  map.resize();
  updateMarkersVisibility();
});




































document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.glass-container');
  const textBlock = document.querySelector('.hero-text-block');
  const mediaBlock = document.querySelector('.hero-media-block');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Limyè nwa/vèt dous k ap suiv sourit la sou kat la
    container.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(40, 167, 69, 0.15) 0%, var(--surface-color) 80%)`;

    // Parallax
    const moveX = (x - centerX) / 30;
    const moveY = (y - centerY) / 30;

    textBlock.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    mediaBlock.style.transform = `translate3d(${-moveX * 1.1}px, ${-moveY * 1.1}px, 0)`;
    
    textBlock.style.transition = 'transform 0.1s ease-out';
    mediaBlock.style.transition = 'transform 0.1s ease-out';
  });

  container.addEventListener('mouseleave', () => {
    container.style.background = 'var(--surface-color)';
    
    textBlock.style.transform = 'translate3d(0, 0, 0)';
    mediaBlock.style.transform = 'translate3d(0, 0, 0)';
    
    textBlock.style.transition = 'transform 0.5s ease';
    mediaBlock.style.transition = 'transform 0.5s ease';
  });
});