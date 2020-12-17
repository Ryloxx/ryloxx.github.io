import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import Background from './bar-background/index.js';
let background = null;
function getClientX(event) {
  if (event.touches[0]) {
    return event.touches[0].clientX;
  } else if (event.changedTouches[0]) {
    return event.changedTouches[0].clientX;
  }
  return 0;
}
Vue.component('card', {
  data: function () {
    return {
      slide: false,
    };
  },
  methods: {
    beforeAppear(el) {
      this.wrapper = el;
      this.image = el.querySelector('.card-picture');
      this.content = el.querySelector('.card-content');
      this.texts = el.querySelectorAll('.card-content div');
      this.mask = el.querySelector('.animation--mask');
      this.slide = el.querySelectorAll('.card-link--wrapper > *');
    },
    appear() {
      gsap
        .timeline()
        .from(this.wrapper, {
          translateY: '-100%',
          ease: 'expo',
          duration: 1.5,
          onStart: () => {
            if (background) {
              background.shift(0, 800, 800);
            }
          },
        })
        .fromTo(
          this.mask,
          {
            clipPath: 'circle(1% at 50% 100vh)',
          },
          {
            clipPath: 'circle(10% at 50% 100vh)',
            ease: 'expo',
            duration: 1.5,
          },
          '-=1.3',
        )
        .to(this.mask, {
          clipPath: 'circle(141% at 50% 100vh)',
          ease: 'expo.in',
          duration: 1,
        })
        .from(this.content, {
          backgroundPosition: '-100%',
          backgroundSize: 0,
          duration: 1,
        })
        .fromTo(
          this.image,
          {
            translateY: '100%',
          },
          {
            top: 10,
            translateY: '0%',
            duration: 1,
            ease: 'expo',
          },
          '-=1',
        )
        .from(this.texts, {
          skewY: '0.5deg',
          translateY: -5,
          translateX: -5,
          autoAlpha: 0,
          stagger: 0.05,
          ease: 'expo.out',
          duration: 0.3,
        })
        .from(this.slide, {
          translateX: -20,
          autoAlpha: 0,
          stagger: 0.1,
          ease: 'back(4)',
        });
    },
    leave() {},
  },
  watch: {
    index: function (val, newVal) {
      if (window.matchMedia('(max-width: 575.98px)').matches) {
        gsap.from(this.texts, {
          translateX: newVal < val ? 20 : -20,
          autoAlpha: 0,
          stagger: 0.05,
        });
      }
    },
  },

  props: ['card', 'index'],
  template: `
  <transition  v-bind:css="false" @before-appear='beforeAppear' @appear='appear' v-on:leave='leave'>
  <div class="animation--wrapper">
  <div class="animation--mask">
  <div class="card" :style="{backgroundColor: card.theme.secondary}">
  <picture class='card-picture' >
  <source :srcset="card.image + '.webp'" />
  <img  :src="card.image + '.png'" :alt="card.title" />
  </picture>
  <div class='card-content' :style="{backgroundColor : card.theme.primary}">
  <div class='card-top' :style='{color : card.theme.textMainHead}'>
  <div class="card-title" >{{card.title}}</div>
  <div class="card-link--wrapper" @mouseenter="slide = true" @mouseleave="slide= false">
  <left-arrow v-bind:slide='slide' v-bind:color='card.theme.tertiary'/>
  <a target='_blank':href="card.link" class="card-link">Visit</a>
  </div>
  </div>
  
  <div class="card-paragraph" :style='{color : card.theme.textBody}'>
  <div class="card-paragraph-title"  :style='{color : card.theme.textSubHead}'>Summary</div>
  <div class="card-paragraph-body">{{card.body}}</div>
  <div class="card-paragraph-title" :style='{color : card.theme.textSubHead}'>Techlist/Source</div>
  <div class="card-paragraph-body">
  <ul class="card-paragraph-body-list">
  <li v-for="item in card.techList">{{item}}</li>
  </ul>
  </div>
  </div>
  </div>
  </div>
  </div>
  </div>
  </transition>`,
});

Vue.component('left-arrow', {
  props: ['slide', 'color'],
  data: function () {
    return {
      animation: null,
    };
  },
  watch: {
    slide: function (newval) {
      newval ? this.animation.play() : this.animation.reverse();
    },
  },
  mounted() {
    const nodes = this.$el.querySelectorAll('svg');
    this.animation = gsap
      .timeline({ paused: true })
      .from(nodes, { translateX: -10, duration: 0.1, stagger: -0.1 });
    gsap.fromTo(
      nodes,
      { rotationX: 0 },
      { rotationX: 180, stagger: -0.1, repeat: -1, repeatDelay: 15, delay: 10 },
    );
  },
  template: `
  <span class='triple-arrow-right'>
    <svg v-for="index in 3" v-bind:fill="color"viewBox="0 0 552.611 552.611">
      <path d="M486.413,221.412L122.347,12.916c-52.938-30.318-95.852-5.44-95.852,55.563v415.652c0,61.004,42.914,85.882,95.852,55.563
       l364.066-208.49C539.351,300.887,539.351,251.731,486.413,221.412z" />
    </svg>
  </span>`,
});

Vue.component('fade-in', {
  props: ['timeout'],
  methods: {
    appear: function (el, done) {
      gsap.from(el, {
        autoAlpha: 0,
        translateY: -20,
        duration: this.timeout / 1000,
        onComplete: done,
      });
    },
  },
  template: `<transition v-bind:css='false'  @appear="appear"><slot></slot></transition>`,
});
const app = new Vue({
  el: '#root',
  data: {
    cards: [],
    selectedCard: null,
    selectedCardIndex: null,
    selectedRoute: 'front',
    swipe: null,
    paralax: {
      paralaxIndex: null,
      paralaxElement: [],
    },
    showNav: true,
    navAnimation: null,
  },
  methods: {
    lock(event) {
      this.swipe = getClientX(event);
    },
    end(event) {
      const dx = getClientX(event) - this.swipe;
      if (dx >= 100) {
        this.changeCard(this.selectedCardIndex - 1);
      } else if (dx <= -100) {
        this.changeCard(this.selectedCardIndex + 1);
      }
    },
    changeRoute(name) {
      this.selectedRoute = name;
      this.selectedCard = null;
      this.toggleNav();
    },
    changeCard(index) {
      const card = this.cards[(index + this.cards.length) % this.cards.length];
      this.selectedCard = card;
      this.selectedCardIndex = index;
    },
    resetParalax() {
      this.paralax.paralaxIndex = null;
    },
    handleParalax(index) {
      if (this.paralax.paralaxIndex !== null) {
        background.shift(0, 80 * (index - this.paralax.paralaxIndex), 100);
      }
      this.paralax.paralaxIndex = index;
    },
    toggleNav() {
      if (this.showNav && !window.matchMedia('(max-width: 575.98px').matches)
        return;
      this.showNav = !this.showNav;
    },
  },
  created() {
    fetch('./projectData.json')
      .then((response) => response.json())
      .then((json) => {
        this.cards = json;
        const colors = Array.from(
          new Set(this.cards.map((card) => card.theme.secondary)).values(),
        );
        background = new Background({
          canvas: document.getElementById('background'),
          colors,
          scale: 0.5,
          speed: 0.3,
          sctickCountFactor: 0.8,
          fps: 60,
        });
        background.draw();
      });
  },
  watch: {
    showNav: function (val) {
      if (this.navAnimation) {
        val
          ? this.navAnimation.timeScale(2).play()
          : this.navAnimation.timeScale(1).reverse();
      }
    },
  },
  mounted() {
    const xsDown = window.matchMedia('(max-width: 575.98px');
    xsDown.addListener((query) => (this.showNav = !query.matches));
    const navElement = document.querySelector('#main-nav--wrapper');
    const collapseButtonElement = document.querySelector(
      '#nav-collapse--button',
    );
    this.navAnimation = gsap
      .timeline({ paused: true })
      .from(navElement, {
        translateY: '120%',
        ease: 'power4.in',
        duration: 1,
        onComplete: () => {
          if (background) {
            background.shift(0, -200, 200);
          }
        },
      })
      .to(
        collapseButtonElement,
        {
          translateY: '-100%',
          rotationX: 180,
          ease: 'power4.in',
          duration: 1,
        },
        0,
      );
    if (!xsDown.matches) {
      this.showNav = true;
      this.navAnimation.progress(1, false);
      this.navAnimation.play();
    }
  },
});
