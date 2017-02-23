const model = ( function() {

  // global vars
  const liCount = $('ul').children().length;
  const $pageHeader = $('.page-header');
  const $pageDiv = $('.page');
  const $studentList = $( "li.student-item" );

// PAGEINIT HANDLERS
// =============================================================================

  function addSeachAndPagination() {
    setInitialList();
    addSearchInput();
    addPaginationButtons();
    addSearchFeedback();
  }

  function setInitialList() {
    $studentList.each(function( index ) {
        if ( index >= 10 ) {
          $( this ).hide();
        } else {
          $( this ).show();
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

  function addPaginationButtons() {

    let length = 0;
    let $paginationDiv = $('<div class="pagination"></div>');
    let $paginationUl = $('<ul></ul>');

    if (liCount <= 10 ) {
      return true;
    } else {

      length = Math.floor(liCount / 10);
      for(let i = 1; i <= length + 1; i++){
        $paginationUl.append('<li><a class="active" href="#">'+ i +'</a></li>');
      }
      $paginationDiv.append($paginationUl);
      $pageDiv.append($paginationDiv);

    }
  }

  function addSearchFeedback(){
    $('ul.student-list').append('<p class="no-results">No Result Have Been Found</p>');
    $('p').hide();
  }

// ONPAGE HANDLERS
// =============================================================================

  function changePagination() {
    $('p').hide();
    const pageBtnClicked = $(this).text();
    pageBtnClicked === "1" ? setInitialList() : calculatePageChange(pageBtnClicked);
  }

  function searchListItems(){
    const userInput = $(this).closest('div').find('input').val().split('@')[0];
    const queryStr = formatStrings(userInput);
    if(queryStr.length > 0){
      $('p').hide();
      const searchCount = filterItems(queryStr);
      if(searchCount === 0) {
        $('p').show();
      }
    }
  }

// HELPER FUNCTIONS
// =============================================================================

  function calculatePageChange(page) {
    const pageCount = parseInt(page) * 10;
    $studentList.each(function( index ) {
        if ( index >= ( pageCount - 10 ) && index < pageCount ) {
          $( this ).show();
        } else {
          $( this ).hide();
        }
    });
  }

  function formatStrings(str){
    $('input').val('');
    const regex = /[^a-z0-9]/gi;
    return str.replace(regex,'').toLowerCase();
  }

  function filterItems(query) {
    let count = 0;
    $.map( $studentList, function( li ) {
      if ( formatStrings($(li).find('h3').text()).indexOf( query ) > -1 ) {
        $( li ).show();
        count++;
      } else {
        $( li ).hide();
      }
    });
    return count;
  }

// MODULE OBJECT RETURNED
// =============================================================================

  return {
    startApp: addSeachAndPagination,
    changePage: changePagination,
    searchStudents: searchListItems,
  };

})();
