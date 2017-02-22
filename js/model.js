const model = ( function() {

  // global vars
  const liCount = $('ul').children().length;
  const pageBtnCount = Math.floor(liCount / 10) + 1;
  const $pageHeader = $('.page-header');
  const $pageDiv = $('.page');

  function addSeachAndPagination() {
    setInitListCount();
    addSearchInput();
    addPaginationButtons(pageBtnCount);
  }

  function setInitListCount() {
    $( "li" ).each(function( index ) {
        if ( index >= 10 ) {
          $( this ).hide();
        }
    });
  }

  function addSearchInput() {
    let $searchBox = (`
      <div class="student-search">
        <input placeholder="Search for students...">
        <button>Search</button>
      </div>`);
    $pageHeader.append($searchBox);
  }

  function addPaginationButtons(length) {
    let $paginationDiv = $('<div class="pagination"></div>');
    let $paginationUl = $('<ul></ul>');
    for(let i = 1; i < length; i++){
      $paginationUl.append('<li><a class="active" href="#">'+ i +'</a></li>');
    }
    $paginationDiv.append($paginationUl);
    $pageDiv.append($paginationDiv);
  }

  return {
    startApp: addSeachAndPagination,
  };

})();
