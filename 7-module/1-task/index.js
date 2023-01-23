import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = createElement(`<div class="ribbon"></div>`);
    

    this.render();
    this.arrowVisible();
    this.arrowMove();
    this.menuScroll();
    this.eventList();
  }

  render() {
    this.elem.insertAdjacentHTML('beforeend', `

      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      ${
        this.categories.map(categ => {
          if (!categ.id) {
            return `<a href="#" class="ribbon__item ribbon__item_active" data-id=${categ.id}>${categ.name}</a>`
          }

          return `<a href="#" class="ribbon__item" data-id=${categ.id}>${categ.name}</a>`
        
        }).join('')
      }
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `);
  }

  arrowVisible() {
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;


    
    function arrVisible() {
      if (ribbonInner.scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }
      else if (scrollRight < 1) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      }
      else {
        arrowLeft.classList.add('ribbon__arrow_visible');
        arrowRight.classList.add('ribbon__arrow_visible');
      }
      
    }

    arrVisible();
  }

  arrowMove() {
    this.elem.addEventListener('click', event => {
      const arrowLeft = event.target.closest('.ribbon__arrow_left');
      const arrowRight = event.target.closest('.ribbon__arrow_right');
      const ribbonInner = this.elem.querySelector('.ribbon__inner');

      if (arrowLeft) {
        ribbonInner.scrollBy(-350, 0);
        this.menuScroll();
      }
      else if (arrowRight) {
        ribbonInner.scrollBy(350, 0);
        this.menuScroll();
      }
      
    });
  }

  menuScroll() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    ribbonInner.addEventListener('scroll', () => {
      this.arrowVisible();
    });
  }

  eventList() {
    this.elem.addEventListener('ribbon-select', event => {
      
    });

    

    this.elem.addEventListener('click', event => {
      let target = event.target.closest('.ribbon__item');
      let menuItems = this.elem.querySelectorAll('.ribbon__item');

      function selectElem() {
        menuItems.forEach(element => {
          element.classList.remove('ribbon__item_active');
        });
      }

      if (target) {
        event.preventDefault();

        selectElem();
        target.classList.add('ribbon__item_active');

        let targetID = target.dataset.id;
        let selectMenu = new CustomEvent('ribbon-select', {
          detail: targetID, // уникальный идентификатора категории из её объекта
          bubbles: true
        });

        

        this.elem.dispatchEvent(selectMenu)
      }
    });
  }
  
}
