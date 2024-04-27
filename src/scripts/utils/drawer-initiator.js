const DrawerInitiator = {
  init({ hamburgerButton, closeButton, drawer }) {
    hamburgerButton.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    closeButton.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.add('collapse');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('collapse');
  },
};

export default DrawerInitiator;
