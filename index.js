const YOUTUBE_SEARCH_URL='https://www.googleapis.com/youtube/v3/search';
//function that gets the data from the api
function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyDdxkmTaM4B3zhWM-1o8W-KtP9D7ByABD4',
    q:`${searchTerm} in:name`
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

$(document).ready(function(){
    hideResultsText();
    console.log('document is ready');
});

function hideResultsText() {
  $('.js-results-text').hide();
}
function showResultsText(){
  $('.js-results-text').show();
}
//function that renders the data
function renderResult(result) {
  return `  <div class="result-container">
            <div class="red-bg">
            <h2>
              <a class="js-result-name" href="${result.snippet.url}" target="_blank">${result.snippet.title}</a><br>
              <img src="${result.snippet.thumbnails.default.url}">
              </div>
              </div>
        `;
}

//function that displays the data
function displayYouTubeData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
  console.log(data.items)
}
//function that handles click events
function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    showResultsText();
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeData);
    $('main').addClass('g-bg');
  });
}

$(watchSubmit);
