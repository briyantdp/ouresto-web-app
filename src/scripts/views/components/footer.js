class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const yearNow = new Date().getFullYear();
    this.innerHTML = `
      <footer tabindex="0">
          <span class="copyright">Copyright © ${yearNow} - Ouresto </span>
      </footer>
    `;
  }
}

customElements.define('footer-component', FooterComponent);
