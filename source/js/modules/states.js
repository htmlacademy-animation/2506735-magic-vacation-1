export default () => {
  let body = document.getElementsByTagName(`body`)[0];

  window.addEventListener(`load`, function () {
    body.classList.add(`is-loaded`);
  });
};
