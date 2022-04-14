class SearchView {
  #parentElement = document.querySelector('.search');

  getValue(){
    
  }

  addHandleEvent(data) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const val = document.querySelector('.search__field').value;
      return val;
    });
  }
}

export default new SearchView();
