/**
 * ==========================================================================
 * L'ARDOISE — APPLICATION JAVASCRIPT (SPA, Vues Persistantes & Modale Plat)
 * ==========================================================================
 */

// Données de secours intégrées (garantit un fonctionnement immédiat en file:// ou sans serveur)
const DEFAULT_MENU_DATA = {
  restaurant: {
    name: "L'Ardoise",
    tagline: "Bistrot & Cuisine Traditionnelle",
    address: "19 Rue de la Cavalerie, 75009 Paris",
    phone: "07 22 36 85 14",
    hours: "Mardi au Dimanche : 12h00 – 14h30 & 19h00 – 23h00\nFermé le lundi",
    concept: "Une cuisine de bistrot élégante et généreuse, élaborée chaque jour à partir de produits frais de saison"
  },
  categories: [
    {
      id: "entrees",
      name: "Entrées",
      items: [
        {
          id: "soupe-oignon",
          name: "Soupe à l'oignon",
          price: "9 €",
          description: "(oignon, croutons, bouillons)",
          fullDescription: "Soupe à l'oignon gratinée selon la tradition, oignons fondants caramélisés, croûtons croustillants et bouillon mijoté.",
          image: "images/soupe_oignon.jpg",
          allergens: "Gluten, lactose, céleri",
          nutrition: {
            calories: "320 kcal",
            proteines: "12 g",
            glucides: "34 g",
            lipides: "14 g"
          }
        },
        {
          id: "oeuf-mayonnaise",
          name: "Oeuf mayonaise",
          price: "10 €",
          description: "(oeuf, mayonnaise)",
          fullDescription: "Œufs fermiers plein air cuits à la perfection, mayonnaise onctueuse battue maison à la moutarde de Dijon.",
          image: "images/oeuf_mayonnaise.jpg",
          allergens: "Œufs, moutarde",
          nutrition: {
            calories: "385 kcal",
            proteines: "14 g",
            glucides: "3 g",
            lipides: "35 g"
          }
        },
        {
          id: "tataki-boeuf",
          name: "Tataki de beouf",
          price: "13 €",
          description: "(boeuf, sesame, sauce shirashi)",
          fullDescription: "Fines tranches de filet de bœuf juste saisies à la flamme, graines de sésame torréfiées et sauce chirashi parfumée.",
          image: "images/tataki_boeuf.jpg",
          allergens: "Sésame, soja",
          nutrition: {
            calories: "395 kcal",
            proteines: "34 g",
            glucides: "7 g",
            lipides: "25 g"
          }
        }
      ]
    },
    {
      id: "plats",
      name: "Plats",
      items: [
        {
          id: "bavette-aloyau",
          name: "Bavette d'aloyau",
          price: "32 €",
          description: "(Bavette d'aloyaux, pommes de terres, légumes)",
          fullDescription: "Bavette d'aloyau poêlée au beurre maître d'hôtel, accompagnée de pommes de terre grenailles rôties et légumes du marché.",
          image: "images/bavette_aloyau.jpg",
          allergens: "Lactose",
          nutrition: {
            calories: "740 kcal",
            proteines: "54 g",
            glucides: "42 g",
            lipides: "38 g"
          }
        },
        {
          id: "cabillaud-grill",
          name: "Cabillaud au grill",
          price: "29 €",
          description: "(orisotto au safran, légumes)",
          fullDescription: "Dos de cabillaud frais nacré au grill, posé sur un risotto crémeux au safran et petits légumes croquants.",
          image: "images/cabillaud_grill.jpg",
          allergens: "Poisson, lactose, céleri",
          nutrition: {
            calories: "590 kcal",
            proteines: "46 g",
            glucides: "50 g",
            lipides: "21 g"
          }
        },
        {
          id: "tagliatelle-saumon",
          name: "Tagliatelle au Saumon",
          price: "24 €",
          description: "(Pates fraiche, creme, ail)",
          fullDescription: "Pâtes fraîches artisanales, généreux morceaux de saumon frais, crème fine d'Isigny liée à l'ail doux et ciboulette.",
          image: "images/tagliatelle_saumon.jpg",
          allergens: "Gluten, poisson, lactose",
          nutrition: {
            calories: "780 kcal",
            proteines: "39 g",
            glucides: "76 g",
            lipides: "36 g"
          }
        }
      ]
    },
    {
      id: "desserts",
      name: "Desserts",
      items: [
        {
          id: "mi-cuit",
          name: "Mi-cuit",
          price: "7 €",
          description: "(mi-cuit au chocolat)",
          fullDescription: "Cœur coulant au chocolat noir intense pur beurre de cacao, servi tiède avec sa touche gourmande.",
          image: "images/mi_cuit.jpg",
          allergens: "Gluten, œufs, lactose",
          nutrition: {
            calories: "520 kcal",
            proteines: "8 g",
            glucides: "56 g",
            lipides: "29 g"
          }
        },
        {
          id: "ile-flottante",
          name: "Île Flottante",
          price: "9 €",
          description: "(île flottante, creme anglaise)",
          fullDescription: "Blancs d'œufs délicatement pochés, crème anglaise maison parfumée à la gousse de vanille bourbon et amandes effilées.",
          image: "images/ile_flottante.jpg",
          allergens: "Œufs, lactose, fruits à coque",
          nutrition: {
            calories: "330 kcal",
            proteines: "9 g",
            glucides: "42 g",
            lipides: "13 g"
          }
        },
        {
          id: "cafe-gourmand",
          name: "Café Gourmand",
          price: "11 €",
          description: "(mignardises assorties)",
          fullDescription: "Un café expresso serré accompagné d'un trio de mignardises sucrées du chef pâtissier.",
          image: "images/cafe_gourmand.jpg",
          allergens: "Gluten, œufs, lactose, fruits à coque",
          nutrition: {
            calories: "410 kcal",
            proteines: "6 g",
            glucides: "48 g",
            lipides: "20 g"
          }
        }
      ]
    }
  ]
};

// État de l'application
let menuData = DEFAULT_MENU_DATA;
let dishesIndex = {};
let currentCouvertCount = 2;

// Initialisation dès chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
  await loadMenuData();
  preloadDishImages(); // Préchargement immédiat en cache pour zéro latence
  renderMenu();
  setupNavigation();
  setupReservationForm();
  setupDishModal();
});

/**
 * 1. CHARGEMENT DES DONNÉES DU MENU
 */
async function loadMenuData() {
  try {
    const res = await fetch('data/menu.json');
    if (res.ok) {
      const data = await res.json();
      if (data && data.categories && data.categories.length > 0) {
        menuData = data;
      }
    }
  } catch (err) {
    console.info("Utilisation des données intégrées pour L'Ardoise.");
  }

  // Indexation rapide des plats par ID
  dishesIndex = {};
  if (menuData.categories) {
    menuData.categories.forEach(category => {
      category.items.forEach(dish => {
        dishesIndex[dish.id] = dish;
      });
    });
  }
}

/**
 * Préchargement de toutes les images pour affichage instantané sans latence
 */
function preloadDishImages() {
  if (!menuData.categories) return;
  menuData.categories.forEach(category => {
    category.items.forEach(dish => {
      if (dish.image) {
        const img = new Image();
        img.src = dish.image;
      }
    });
  });
}

/**
 * 2. RENDU DU MENU (VUE CARTE)
 */
function renderMenu() {
  const container = document.getElementById('menu-sections-container');
  if (!container || !menuData.categories) return;

  container.innerHTML = '';

  menuData.categories.forEach(category => {
    const card = document.createElement('section');
    card.className = 'menu-category-card';
    card.id = `cat-${category.id}`;

    // En-tête centré coupant la bordure haute
    const cardHeader = document.createElement('div');
    cardHeader.className = 'category-card-header';
    cardHeader.innerHTML = `<h2 class="category-card-title">${category.name}</h2>`;
    card.appendChild(cardHeader);

    // Liste des plats
    const list = document.createElement('div');
    list.className = 'dishes-list';

    category.items.forEach(dish => {
      const dishItem = document.createElement('article');
      dishItem.className = 'dish-row-item';
      dishItem.setAttribute('data-dish-id', dish.id);
      dishItem.setAttribute('role', 'button');
      dishItem.setAttribute('tabindex', '0');
      dishItem.setAttribute('aria-label', `Voir la photo et les ingrédients de ${dish.name}`);

      dishItem.innerHTML = `
        <div class="dish-main-line">
          <div class="dish-title-group">
            <h3 class="dish-name">${dish.name}</h3>
            <span class="dish-click-badge" title="Voir photo et allergènes">i</span>
          </div>
          <div class="dish-leader-dots" aria-hidden="true"></div>
          <span class="dish-price">${dish.price}</span>
        </div>
        <p class="dish-description">${dish.description}</p>
      `;

      dishItem.addEventListener('click', () => {
        openDishModal(dish.id);
      });

      dishItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDishModal(dish.id);
        }
      });

      list.appendChild(dishItem);
    });

    card.appendChild(list);
    container.appendChild(card);
  });
}

/**
 * 3. NAVIGATION PAR ONGLETS PERSISTANTS (CARTE / RÉSERVATION / INFOS)
 * Le bouton cliqué reste plein doré en continu.
 */
function setupNavigation() {
  const btnCarte = document.getElementById('nav-btn-carte');
  const btnReservation = document.getElementById('nav-btn-reservation');
  const btnInfos = document.getElementById('nav-btn-infos');
  const navButtons = [btnCarte, btnReservation, btnInfos];

  function setActiveTab(targetId) {
    // 1. Mise à jour de l'apparence des 3 boutons
    navButtons.forEach(btn => {
      if (!btn) return;
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active-filled');
        btn.classList.remove('outlined');
      } else {
        btn.classList.remove('active-filled');
        btn.classList.add('outlined');
      }
    });

    // 2. Bascule des vues pleine page
    document.querySelectorAll('.page-view').forEach(view => {
      view.classList.remove('active');
      view.style.display = 'none';
    });

    const targetView = document.getElementById(targetId);
    if (targetView) {
      targetView.style.display = 'block';
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Écouteurs sur les 3 boutons
  navButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      setActiveTab(targetId);
    });
  });

  // Clic sur le logo -> Retour à la carte
  const logoLink = document.getElementById('logo-home-link');
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveTab('view-menu');
    });
  }

  // Bouton "Revenir à la carte" dans l'écran de confirmation
  const btnBackMenu = document.getElementById('btn-back-to-menu');
  if (btnBackMenu) {
    btnBackMenu.addEventListener('click', () => {
      setActiveTab('view-menu');
    });
  }
}

/**
 * 4. FORMULAIRE DE RÉSERVATION (STEPPER COUVERTS, DATE/HEURE & ENVOI)
 */
function setupReservationForm() {
  const form = document.getElementById('reservation-form');
  const stepperMinus = document.getElementById('stepper-minus');
  const stepperPlus = document.getElementById('stepper-plus');
  const stepperCount = document.getElementById('stepper-count');
  const guestsInput = document.getElementById('res-guests');
  const dateInput = document.getElementById('res-date');

  // Gestion du stepper de couverts (- 2 +)
  if (stepperMinus && stepperPlus && stepperCount && guestsInput) {
    stepperMinus.addEventListener('click', () => {
      if (currentCouvertCount > 1) {
        currentCouvertCount--;
        stepperCount.textContent = currentCouvertCount;
        guestsInput.value = currentCouvertCount;
      }
    });

    stepperPlus.addEventListener('click', () => {
      if (currentCouvertCount < 20) {
        currentCouvertCount++;
        stepperCount.textContent = currentCouvertCount;
        guestsInput.value = currentCouvertCount;
      }
    });
  }

  // Initialisation de la date minimale à aujourd'hui
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Soumission du formulaire
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value.trim();
      const phone = document.getElementById('res-phone').value.trim();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;

      if (!name || !phone || !date || !time) {
        alert("Veuillez renseigner tous les champs obligatoires (Nom, Téléphone, Date et Heure).");
        return;
      }

      // Bascule vers l'écran de confirmation
      document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
      });

      const confirmView = document.getElementById('view-reservation-confirm');
      if (confirmView) {
        confirmView.style.display = 'block';
        confirmView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      form.reset();
      currentCouvertCount = 2;
      if (stepperCount) stepperCount.textContent = "2";
      if (guestsInput) guestsInput.value = "2";
    });
  }
}

/**
 * 5. MODALE DÉTAIL D'UN PLAT (ICÔNE i) — DESIGN ÉPURÉ SANS CADRES
 */
function setupDishModal() {
  const modal = document.getElementById('modal-dish-detail');
  const closeBtn = document.getElementById('btn-close-dish-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDishModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeDishModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDishModal();
    }
  });
}

function openDishModal(dishId) {
  const dish = dishesIndex[dishId];
  if (!dish) return;

  const modal = document.getElementById('modal-dish-detail');
  const imgEl = document.getElementById('modal-dish-img');
  const titleEl = document.getElementById('modal-dish-title');
  const priceEl = document.getElementById('modal-dish-price');
  const descEl = document.getElementById('modal-dish-desc');
  const allergensEl = document.getElementById('modal-dish-allergens-clean');
  const calEl = document.getElementById('modal-nutri-cal');
  const protEl = document.getElementById('modal-nutri-prot');
  const glucEl = document.getElementById('modal-nutri-gluc');
  const lipEl = document.getElementById('modal-nutri-lip');

  if (imgEl) {
    imgEl.style.opacity = '0';
    imgEl.onload = () => { imgEl.style.opacity = '1'; };
    imgEl.src = dish.image;
    imgEl.alt = dish.name;
    if (imgEl.complete) {
      imgEl.style.opacity = '1';
    }
  }
  if (titleEl) titleEl.textContent = dish.name;
  if (priceEl) priceEl.textContent = dish.price;
  if (descEl) descEl.textContent = dish.fullDescription || dish.description;

  // Allergènes épurés sans encadrement
  if (allergensEl) {
    allergensEl.textContent = dish.allergens || "Aucun allergène majeur répertorié";
  }

  // Valeurs nutritionnelles sans encadrements
  const nutri = dish.nutrition || {};
  if (calEl) calEl.textContent = nutri.calories || "-";
  if (protEl) protEl.textContent = nutri.proteines || "-";
  if (glucEl) glucEl.textContent = nutri.glucides || "-";
  if (lipEl) lipEl.textContent = nutri.lipides || "-";

  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeDishModal() {
  const modal = document.getElementById('modal-dish-detail');
  const imgEl = document.getElementById('modal-dish-img');
  if (imgEl) {
    imgEl.style.opacity = '0';
  }
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}
