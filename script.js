const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(serachTerm, callback) {

	const params = {
		part: 'snippet',
		key: 'AIzaSyAf15Pl6aQC4Ae2HwLz8FElbtodn7hD7rA',
		q: serachTerm,
	}

	$.getJSON(YOUTUBE_SEARCH_URL, params)
	.done(callback)
	.fail(function(){console.log('error!')})
	.always(function(){console.log('This always runs!!')});

}

function renderResult(result) {
	let hrefString = `https://www.youtube.com/watch?v=${result.id.videoId}`;
	console.log('renderResult ran!');
	console.log(hrefString);
	return `
		<div class="js-result-items">
		  <div class = 'container-img'><a class="js-result-img" href="${hrefString}"  target="_blank">
		  	<img src = "${result.snippet.thumbnails.medium.url}">
		  </a></div>
		  <div class = 'container-text'>
			  <h2>
			  <a class="js-result-name" href="${hrefString}"  target="_blank">${result.snippet.title}</a>
			  </h2>
			  <p>${result.snippet.description}</p>
		  <div>
		</div>
		`;
}

function displaySearchData(data) {
  console.log(data.items);
  if(data.items.length === 0){

		$('.js-search-results').html(`<h1 style="text-align: center; color:grey">
			Result not found! Try use another keyword!</h1>`)
  }else{
		const results = data.items.map((item, index) => renderResult(item));
		$('.js-search-results').html(results);
  }

}

function watchSubmit() {
  $('.js-search-form').submit(event => {
  	$('.js-search-results').empty();
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);
