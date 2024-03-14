export default () => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);
  let fillEffect = document.querySelector(`.screen-fill-effect`);

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    const link = menuLinks[i];
    const pageTo = link.getAttribute(`href`);

    link.addEventListener(`click`, function (e) {
      const pageFrom = window.location.hash;

      if (pageTo === `#prizes` && pageFrom === `#story`) {
        e.preventDefault();
        fillEffect.classList.add(`active`);
      }

      setTimeout(() => {
        window.location.href = pageTo;
        fillEffect.classList.remove(`active`);
      }, 500);

      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }
    });
  }
};
