//-----vars---------------------------------------
const header = document.querySelector(".header");
const overlay = document.querySelector("[data-overlay]");
const mobileMenu = document.querySelector(".mobile");
const burgers = document.querySelectorAll(".burger");
const accParrent = [...document.querySelectorAll("[data-accordion-init]")];
const htmlEl = document.documentElement;
const bodyEl = document.body;
const mainSliders = document.querySelectorAll('.main-slider');
const aboutSliders = document.querySelectorAll('.about-slider');
const historySliders = document.querySelectorAll('.history-slider');
const activeMode = 'active-mode';
const activeClass = 'active';
const modals = document.querySelectorAll('[data-popup]');
const modalsButton = document.querySelectorAll('[data-btn-modal]');
const innerButtonModal = document.querySelectorAll('[data-btn-inner]');

//------------------------------------------------

//----customFunction------------------------------
const fadeIn = (el, timeout, display) => {
	el.style.opacity = 0;
	el.style.display = display || 'block';
	el.style.transition = `all ${timeout}ms`;
	setTimeout(() => {
		el.style.opacity = 1;
	}, 10);
};

const fadeOut = (el, timeout) => {
	el.style.opacity = 1;
	el.style.transition = `all ${timeout}ms ease`;
	el.style.opacity = 0;

	setTimeout(() => {
		el.style.display = 'none';
	}, timeout);
};

const toggleCustomClass = (item, customClass = "active") => {
  item.classList.toggle(customClass);
};

const toggleClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.toggle(customClass);
  });
};

const removeClassInArray = (arr, customClass = "active") => {
  arr.forEach((item) => {
    item.classList.remove(customClass);
  });
};

const addCustomClass = (item, customClass = "active") => {
  item.classList.add(customClass);
};

const addClassInArray = (arr, customClass) => {
  arr.forEach((item) => {
    item.classList.add(customClass);
  });
}

const removeCustomClass = (item, customClass = "active") => {
  item.classList.remove(customClass);
};

const disableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const pagePosition = window.scrollY;
  const paddingOffset = `${window.innerWidth - bodyEl.offsetWidth}px`;

  htmlEl.style.scrollBehavior = "none";
  fixBlocks.forEach((el) => {
    el.style.paddingRight = paddingOffset;
  });
  bodyEl.style.paddingRight = paddingOffset;
  bodyEl.classList.add("dis-scroll");
  bodyEl.dataset.position = pagePosition;
  bodyEl.style.top = `-${pagePosition}px`;
};

const enableScroll = () => {
  const fixBlocks = document?.querySelectorAll(".fixed-block");
  const body = document.body;
  const pagePosition = parseInt(bodyEl.dataset.position, 10);
  fixBlocks.forEach((el) => {
    el.style.paddingRight = "0px";
  });
  bodyEl.style.paddingRight = "0px";

  bodyEl.style.top = "auto";
  bodyEl.classList.remove("dis-scroll");
  window.scroll({
    top: pagePosition,
    left: 0,
  });
};

const elementHeight = (el, variableName) => {
  if(el) {
    function initListener(){
      const elementHeight = el.offsetHeight;
      document.querySelector(':root').style.setProperty(`--${variableName}`, `${elementHeight}px`);
    }
    window.addEventListener('DOMContentLoaded', initListener)
    window.addEventListener('resize', initListener)
  }
}
//------------------------------------------------

//----burger------------------------------------
const mobileMenuHandler = function (overlay, mobileMenu, burgers) {
  burgers.forEach((burger) => {
    burger.addEventListener("click", function (e) {
      e.preventDefault();
      toggleCustomClass(header, "active");
      toggleCustomClass(mobileMenu);
      toggleClassInArray(burgers);
      toggleCustomClass(overlay);
      burger.classList.contains("active") ? disableScroll() : enableScroll();
    });
  });
};

const hideMenuHandler = function (overlay, mobileMenu, burgers) {
  removeCustomClass(mobileMenu);
  removeClassInArray(burgers);
  removeCustomClass(header, "active");
  removeCustomClass(overlay);
  enableScroll();
};

if (overlay) {
  mobileMenuHandler(overlay, mobileMenu, burgers);
  overlay.addEventListener("click", function (e) {
    e.target.classList.contains("overlay")
      ? hideMenuHandler(overlay, mobileMenu, burgers)
      : null;
  });
}

//----stickyHeader------------------------------
let lastScroll = 0;
const defaultOffset = 40;

function stickyHeaderFunction(breakpoint){
  let containerWidth = document.documentElement.clientWidth;
  if (containerWidth > `${breakpoint}`) {
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('sticky');

    window.addEventListener('scroll', () => {
        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            addCustomClass(header, "sticky")
        }
        else if(scrollPosition() < defaultOffset){
            removeCustomClass(header, "sticky")
        }

        lastScroll = scrollPosition();
    })
  }
}

stickyHeaderFunction(320);
elementHeight(header, "header-height");

//---------------------------------------------------
document.addEventListener('DOMContentLoaded', function (){
  mainSliders.forEach(function(slider){
      const container = slider.querySelector('.swiper-container');
      const nextBtn = slider.querySelector(".next");
      const prevBtn = slider.querySelector(".prev");
   
      const mainSwiper = new Swiper(container, {
          spaceBetween: 0,
          slidesPerView: 2,
          speed: 1800,
          watchOverflow: true,
          observer: true,
          observeParents: true,
          initialSlide: 0,
          loop: true,
          centeredSlides: true,
         
          navigation: {
              nextEl: nextBtn,
              prevEl: prevBtn,
          },
       
          breakpoints: {
            320: {
              slidesPerView: 1.2,
            },
            600: {
              slidesPerView: 1.5,
            },
            1920: {
              slidesPerView: 2.5,
            }
          }
      });
  });

  aboutSliders.forEach(function(slider) {
    const container = slider.querySelector('.swiper-container');
    const nextBtn = slider.querySelector(".next");
    const prevBtn = slider.querySelector(".prev");

    let aboutSwiper = new Swiper(container, {
        spaceBetween: 20,
        slidesPerView: 1.5,
        speed: 1000,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        autoHeight: true,
        allowTouchMove: window.innerWidth <= 1024,

        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },

        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 24,
          },
          576: {
            spaceBetween: 20,
            slidesPerView: 1.5,
          },
        
        }
    });

  
    function updateSwiperOnResize() {
        const width = window.innerWidth;

        if (width > 1024) {
            aboutSwiper.allowTouchMove = false;
        } else {
            aboutSwiper.allowTouchMove = true;
        }

        aboutSwiper.update();
    }

    window.addEventListener('resize', updateSwiperOnResize);

    updateSwiperOnResize();
  });

  historySliders.forEach(function(slider) {
    const container = slider.querySelector('.swiper-container');
    const nextBtn = slider.querySelector(".next");
    const prevBtn = slider.querySelector(".prev");

    const mainSwiper = new Swiper(container, {
        spaceBetween: 30,
        slidesPerView: 1.3,
        speed: 1000,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                centeredSlides: false,
            },
            768: {
                slidesPerView: 1.2,
            },
            1024: {
                slidesPerView: 1,
                centeredSlides: true,
            },
            1240: {
                slidesPerView: 1.15,
            }
        }
    });
});

})
//-----------------------------------------------------
const navLinks = document.querySelectorAll('.main-nav a');

if (navLinks.length > 0) {
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
              if(header.classList.contains('active')){
                  hideMenuHandler(overlay, mobileMenu, burgers);
              }
              
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
               
            }
        });
    });
}

//------------timer--------------------
document.addEventListener('DOMContentLoaded', function() {
  const timerElement = document.querySelector('.timer');

  if (timerElement) {
      const endTimeStr = timerElement.getAttribute('data-time');
      const endTime = new Date(endTimeStr).getTime();

      const updateTimer = function() {
          const now = new Date().getTime();
          const difference = endTime - now;

          if (difference <= 0) {
              clearInterval(interval);
              timerElement.querySelectorAll('.timer__value').forEach((item) => {
                  item.textContent = '00';
              });
              return;
          }

          const remainingDays = Math.floor(difference / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const remainingSeconds = Math.floor((difference % (1000 * 60)) / 1000);

          timerElement.querySelector('.timer__days').textContent = remainingDays.toString().padStart(2, '0');
          timerElement.querySelector('.timer__hours').textContent = remainingHours.toString().padStart(2, '0');
          timerElement.querySelector('.timer__minutes').textContent = remainingMinutes.toString().padStart(2, '0');
          timerElement.querySelector('.timer__seconds').textContent = remainingSeconds.toString().padStart(2, '0');
      };

      if (new Date().getTime() >= endTime) {
          timerElement.querySelectorAll('.timer__value').forEach((item) => {
              item.textContent = '00';
          });
      } else {
          updateTimer();
          const interval = setInterval(updateTimer, 1000);
      }
  }
});
//-------------------------tabs----------------

const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  active = "active"
) {
  tabsDataInitArray &&
    tabsDataInitArray.forEach((tabParent) => {
      if (tabParent) {
        const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
        const tabContent = [
          ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
        ];

        tabNav.forEach((nav) => {
          nav.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
            removeClassInArray(tabNav, active);
            removeClassInArray(tabContent, active);
            addCustomClass(
              tabParent.querySelector(`[${tabsNavAttr}="${activeTabAttr}"]`),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsContentAttr}="${activeTabAttr}"]`
              ),
              active
            );

            const joinContent = tabParent.querySelector('.join-content');
            if(joinContent){
              if (!joinContent.classList.contains('active'))  {
                addCustomClass(count, 'active');
                addCustomClass(firstCount, 'mode');
              } else {
                removeCustomClass(count, 'active');
                removeCustomClass(firstCount, 'mode');
              }
            }
          });
        });
      }
    });
};

document.addEventListener('DOMContentLoaded', function() {
  tabsFunction(document.querySelectorAll("[data-tabs-parrent]"), "data-tab", "data-tab-content");
});

//--------------modals----------------------

 function modalClickHandler(attribute, activeClass, overlayClass = activeClass) {
  const curentModal = overlay.querySelector(`[data-popup="${attribute}"]`);
  removeClassInArray(modals, activeClass);
  modals.forEach(function(modal){
    fadeOut(modal, 0);
  })
  addCustomClass(overlay, overlayClass);
  addCustomClass(curentModal, activeClass);
  setTimeout(function () {
    fadeIn(curentModal, 200);
  }, 200);
  disableScroll();

  innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);
}

let innerButton;
const commonFunction = function () {
  removeCustomClass(overlay, activeMode);
  removeCustomClass(overlay, activeClass);
  removeClassInArray(modals, activeClass);

  modals.forEach((modal) => fadeOut(modal, 300))
  enableScroll();
};

function findAttribute(element, attributeName) {
  let target = element;
  while (target && target !== document) {
    if (target.hasAttribute(attributeName)) {
      return target.getAttribute(attributeName);
    }
    target = target.parentNode;
  }
  return null;
}

function buttonClickHandler(e, buttonAttribute, activeClass) {
  e.preventDefault();
  const currentModalId = findAttribute(e.target, buttonAttribute);
  if (!currentModalId) {return}

  const currentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);

  mobileMenu && removeCustomClass(mobileMenu, activeClass);
  burgers && removeClassInArray(burgers, activeClass);

  removeClassInArray(modals, activeClass);
  addCustomClass(overlay, activeClass);
  addCustomClass(overlay, activeMode);
  addCustomClass(currentModal, activeClass);
  fadeIn(currentModal, 200, 'flex');

  disableScroll();
  innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);
}

function overlayClickHandler(e, activeClass) {
  if (e.target === overlay || e.target === innerButton) commonFunction();
}

function modalInit(buttonsArray, buttonAttribute, activeClass) {
  buttonsArray.forEach(function (btn) {
    btn.addEventListener("click", (e) =>
        buttonClickHandler(e, buttonAttribute, activeClass)
    );
  });
}

document.addEventListener('DOMContentLoaded', function() {
  overlay && overlay.addEventListener("click", function (e) {
    overlayClickHandler(e, activeClass);
  });

  modalInit(modalsButton, "data-btn-modal", activeClass);

  innerButtonModal && innerButtonModal.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
      enableScroll();
      e.preventDefault();

      const prevId = findAttribute(this.closest('[data-popup]'), 'data-popup');
      if (!prevId) {return}

      const currentModalId = this.getAttribute("data-btn-inner");
      const currentModal = overlay.querySelector(`[data-popup="${currentModalId}"]`);
      removeClassInArray(modals, activeClass);
      addCustomClass(overlay, activeClass);
      fadeOut(document.querySelector(`[data-popup="${prevId}"]`), 0);
      fadeIn(currentModal, 200);
      addCustomClass(currentModal, activeClass);
      disableScroll();
    
      innerButton = overlay.querySelector(`${"[data-popup]"}.${activeClass} .close`);
    });
  });
});



