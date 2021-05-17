class SwitchTabsView {
  _parentElement = document.querySelector('.app-content__switch-buttons');

  addHandlerSwitchTabs(handler) {
    this._parentElement.addEventListener('click', function(event) {
      const clickedButton = event.target.closest('.switch-buttons__button');
      const buttons = Array.from(this.querySelectorAll('.switch-buttons__button'));

      if (clickedButton && !clickedButton.classList.contains('button--active')) {
        buttons.forEach((button) => {
          button.classList.toggle('button--active');
        });

        handler(clickedButton.querySelector('span').textContent.trim());
      }
    });
  }
}

export default new SwitchTabsView();
