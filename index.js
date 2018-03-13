const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm} in:name`,
      per_page: 5,
      part: 'snippet',
      key: 'AIzaSyBViTy3ct0L-FHcSB3WAAnbbX3Wwq1PtPA'
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
  };

  $.ajax(settings);
}


function renderResult(thumbnail_url, video_url) {
  return `
    <div>
      <a href="https://www.youtube.com/watch?v=${video_url}"><img src="${thumbnail_url}"/> </a>
    </div>
  `;
}

function displayYoutubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item.snippet.thumbnails.default.url, item.id.videoId));
  
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYoutubeSearchData);
  });
}

$(watchSubmit);
