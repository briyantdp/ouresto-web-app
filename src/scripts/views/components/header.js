class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
        <div class="header__inner">
            <img src="./images/logo/ouresto.jpg" alt="Ouresto Logo" tabindex="0"/>
          <button href="#" id="hamburger-btn">☰</button>
        </div>
        <nav id="drawer">
          <button type="button" class="close-btn">&times;</button>
          <ul>
              <li><a href="/" class="link-ltr">Home</a></li>
              <li><a href="/#/favourite" class="link-ltr">Favourite</a></li>
              <li>
              <a
                  href="https://id.linkedin.com/in/bryant-dawson-priyantoro"
                  class="link-ltr"
                  target="_blank"
                  rel="noopener"
                  rel="noreferrer"
                  >About Us</a
              >
              </li>
          </ul>
        </nav>
    </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
