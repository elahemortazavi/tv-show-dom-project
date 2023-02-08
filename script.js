//You can edit ALL of the code here

// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

// window.onload = setup;



//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // clear out the rootElement's HTML before we add the new stuff:
  rootElem.innerHTML = "";
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${episodeList.length} episodes`;
  rootElem.appendChild(countParagraph);

  episodeList.forEach((episode) => {
    // add the season and episode and name:
    const paragraph = document.createElement("p");
    paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
    rootElem.appendChild(paragraph);
  
    // add the image
    const image = document.createElement("img");
    image.src = episode.image.medium;
    rootElem.appendChild(image);

    // add the summary paragraph nb the episode.summary is actually HTML:
    rootElem.innerHTML += episode.summary;
  });
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredEpisodes = getAllEpisodes().filter((episode) => {
    // localeCompare might be neater here:
    return (
      episode.summary.toLowerCase().includes(searchString) ||
      episode.name.toLowerCase().includes(searchString)
    );
  });
  makePageForEpisodes(filteredEpisodes);
});

window.onload = setup;
