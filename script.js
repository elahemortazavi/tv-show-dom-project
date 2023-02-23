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
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

// function makeSeasonAndEpisode(episode) {
//   const { season, number } = episode;
//   const paddedSeason = season.toString().padStart(2, "0");
//   const paddedEpisode = number.toString().padStart(2, "0");

//   return `S${paddedSeason}E${paddedEpisode}`;
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   // clear out the rootElement's HTML before we add the new stuff:
//   rootElem.innerHTML = "";
//   const countParagraph = document.createElement("p");
//   countParagraph.innerText = `Showing ${episodeList.length} episodes`;
//   rootElem.appendChild(countParagraph);

//   episodeList.forEach((episode) => {
//     // add the season and episode and name:
//     const paragraph = document.createElement("p");
//     paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
//     rootElem.appendChild(paragraph);
  
//     // add the image
//     const image = document.createElement("img");
//     image.src = episode.image.medium;
//     rootElem.appendChild(image);

//     // add the summary paragraph nb the episode.summary is actually HTML:
//     rootElem.innerHTML += episode.summary;
//   });
// }

// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredEpisodes = getAllEpisodes().filter((episode) => {
//     // localeCompare might be neater here:
//     return (
//       episode.summary.toLowerCase().includes(searchString) ||
//       episode.name.toLowerCase().includes(searchString)
//     );
//   });
//   makePageForEpisodes(filteredEpisodes);
// });

// window.onload = setup;




// const url = "https://api.tvmaze.com/shows/82/episodes";
// let allEpisodes = [];

// //You can edit ALL of the code here
// function setup() {
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       // in here we can do whatever we want with the data
//       allEpisodes = data;
//       makePageForEpisodes(allEpisodes);
//     })
//     .catch((err) => console.error(err));
// }

// function makeSeasonAndEpisode(episode) {
//   const { season, number } = episode;
//   const paddedSeason = season.toString().padStart(2, "0");
//   const paddedEpisode = number.toString().padStart(2, "0");

//   return `S${paddedSeason}E${paddedEpisode}`;
// }

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   const selectElem = document.getElementById("select-input");

//   // clear out the rootElement's HTML before we add the new stuff
//   rootElem.innerHTML = "";
//   const countParagraph = document.createElement("p");
//   countParagraph.innerText = `Showing ${episodeList.length} episodes`;
//   rootElem.appendChild(countParagraph);

//   episodeList.forEach((episode) => {
//     // add the season and episode and name
//     const paragraph = document.createElement("p");
//     paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
//     rootElem.appendChild(paragraph);

//     // add the image
//     const image = document.createElement("img");
//     image.src = episode.image.medium;
//     rootElem.appendChild(image);

//     // add the summary paragraph nb the episode.summary is actually HTML
//     rootElem.innerHTML += episode.summary;

//     // also, one more thing, add it to the select element as an option
//     const option = document.createElement("option");
//     option.textContent = `${makeSeasonAndEpisode(episode)} - ${episode.name}`;
//     option.value = episode.id;
//     selectElem.appendChild(option);
//   });
// }

// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", (e) => {
//   const searchString = e.target.value.toLowerCase();
//   const filteredEpisodes = allEpisodes.filter((episode) => {
//     // localeCompare might be neater here
//     return (
//       episode.summary.toLowerCase().includes(searchString) ||
//       episode.name.toLowerCase().includes(searchString)
//     );
//   });
//   makePageForEpisodes(filteredEpisodes);
// });

// const selectInput = document.getElementById("select-input");
// selectInput.addEventListener("change", (e) => {
//   // we now have shown that e.target.value === the episode id that has been clicked on
//   const idSelectedByUser = Number(e.target.value);
//   const selectedEpisode = allEpisodes.find((ep) => ep.id === idSelectedByUser);
//   if (selectedEpisode) {
//     makePageForEpisodes([selectedEpisode]);
//   }
// });

// window.onload = setup;








const rootElem = document.getElementById("root");
const footerEl = document.createElement("footer");
const paragraphEl = document.createElement("p");
const footerLinkEl = document.createElement("a");

paragraphEl.innerText =
  "Please note that the data has (originally) been pulled in from: ";
footerLinkEl.setAttribute("href", "https://www.tvmaze.com/api#licensing");
footerLinkEl.setAttribute("target", "_blank");
footerEl.classList.add("footer-root");
footerLinkEl.innerText = "TV MAZE";

footerEl.append(paragraphEl);
paragraphEl.appendChild(footerLinkEl);
document.body.appendChild(footerEl);

let allEpisodes;
let allEpisodesCounter;
let allShows = getAllShows();

const setup = () => {
  let renderDefaultTvShow = 167;
  createRequest(renderDefaultTvShow).then((data) => {
    getEpisodeOfTvShows(data);
    createEpisodeSelectOption(data);
    allEpisodes = data;
    allEpisodesCounter = data.length;
    paragraphCounterEl.innerHTML = `Displaying ${allEpisodesCounter} / ${allEpisodesCounter} episodes`;
  });
};

// Make an API request to an end point //
const createRequest = async (showId) => {
  const URL = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) =>
      console.error(
        "There has been a problem with your fetch operation:",
        error
      )
    );
};

// Render each episode to the website //
const renderEpisodeToWebsite = (name, season, number, image, summary) => {
  divCardH1El.innerText = `${name} - S${season
    .toString()
    .padStart(2, "0")}E${number.toString().padStart(2, "0")}`;
  imgCardEl.src = `${image.medium}`;
  divCardBodyEl.innerHTML = `${summary}`;

  rootElem.append(divCardEl);
};

// Create all episodes of tv shows //
const getEpisodeOfTvShows = (episodeList) => {
  rootElem.innerHTML = "";

  episodeList.forEach(({ name, season, number, image, summary }) => {
    divCardEl = document.createElement("div");
    divCardEl.classList.add("card");
    divCardH1El = document.createElement("h1");
    divCardH1El.classList.add("card-header");
    imgCardEl = document.createElement("img");
    imgCardEl.classList.add("card-img-top");
    imgCardEl.setAttribute("alt", `A image from ${name}`);
    divCardBodyEl = document.createElement("div");
    divCardBodyEl.classList.add("card-body");
    buttonRemove = document.createElement("button");
    buttonRemove.classList.add("button-remove");
    buttonRemove.innerText = `Remove`;
    divCardEl.appendChild(divCardH1El);
    divCardEl.appendChild(imgCardEl);
    divCardEl.append(buttonRemove);
    divCardEl.appendChild(divCardBodyEl);

    renderEpisodeToWebsite(name, season, number, image, summary);
  });

  // Remove the watched episode by clicking on button //
  let buttonEl = document.querySelectorAll("button");
  Array.from(buttonEl).forEach((button) => {
    button.addEventListener(
      "click",
      (e) => {
        let removeTarget = e.target.parentNode;
        removeTarget.parentNode.removeChild(removeTarget);
      },
      false
    );
  });
};

// Create search bar component //
const divSearchEl = document.createElement("div");
divSearchEl.classList.add("search-bar-root");
const inputSearchEl = document.createElement("input");
inputSearchEl.classList.add("search-query");
inputSearchEl.setAttribute("type", "text");
inputSearchEl.setAttribute("placeholder", "Search for any episode");
const paragraphCounterEl = document.createElement("p");
divSearchEl.appendChild(inputSearchEl);
divSearchEl.appendChild(paragraphCounterEl);
document.body.prepend(divSearchEl);

// Filter out episodes matching search term within episode title or episode summary
const handleSearchQuery = (e) => {
  const searchQuery = e.target.value.toLowerCase();
  let filteredEpisodes = allEpisodes.filter(({ name, summary }) => {
    return (
      name.toLowerCase().includes(searchQuery) ||
      summary.toLowerCase().includes(searchQuery)
    );
  });
  getEpisodeOfTvShows(filteredEpisodes);

  const filteredEpisodesCounter = filteredEpisodes.length;
  const paragraphContent = ` ${filteredEpisodesCounter} / ${allEpisodesCounter}`;
  paragraphCounterEl.innerHTML = `Displaying ${paragraphContent} episodes`;
};

inputSearchEl.addEventListener("keyup", handleSearchQuery);

// Create select input component for Episodes //
const inputSelectEl = document.createElement("select");
inputSelectEl.classList.add("select-query");
inputSelectEl.setAttribute("id", "option");
inputSelectEl.setAttribute("type", "select");
divSearchEl.prepend(inputSelectEl);

const createEpisodeSelectOption = (allEpisodes) => {
  inputSelectEl.innerHTML = "";
  allEpisodes.forEach((episode) => {
    const optionEl = document.createElement("option");
    optionEl.value = episode.id;
    optionEl.innerText = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${
      episode.name
    }`;
    inputSelectEl.append(optionEl);
  });
};

// Check to see if selected episode id matches with any in the data if so call the render method with the found episode and render it to the webpage
const selectedEpisode = document.getElementById("option");
selectedEpisode.addEventListener("change", () => {
  rootElem.innerHTML = "";
  console.log(selectedEpisode);
  allEpisodes.find((episode) => {
    if (selectedEpisode.value == episode.id) {
      const { name, season, number, image, summary } = episode;
      renderEpisodeToWebsite(name, season, number, image, summary);
      paragraphCounterEl.innerHTML = `Displaying: <b>${name}</b> episode`;
    }
  });
});

// Add a View All button which redirects user to all episodes //
const buttonBackEl = document.createElement("a");
buttonBackEl.classList.add("button-back");
buttonBackEl.innerText = `VIEW ALL`;
divSearchEl.appendChild(buttonBackEl);
buttonBackEl.addEventListener("click", () => {
  setup();
  paragraphCounterEl.innerHTML = `Displaying ${allEpisodesCounter} / ${allEpisodesCounter} episodes`;
});

// Create select input component for Shows//
const inputShowSelectEl = document.createElement("select");
inputShowSelectEl.classList.add("select-query", "select-query-show");
inputShowSelectEl.setAttribute("id", "option-show");
inputShowSelectEl.setAttribute("type", "select");
divSearchEl.prepend(inputShowSelectEl);

const sortShowByName = (a, b) => {
  return a.name > b.name ? 1 : -1;
};

let showSortedAtoZ = allShows.sort(sortShowByName);

showSortedAtoZ.forEach(({ id, name }) => {
  const optionEl = document.createElement("option");
  optionEl.value = id;
  optionEl.innerText = `${name}`;
  inputShowSelectEl.append(optionEl);
});

inputShowSelectEl.addEventListener("change", () => {
  let showId = inputShowSelectEl.value;
  createRequest(showId).then((data) => {
    getEpisodeOfTvShows(data);
    createEpisodeSelectOption(data);
    allEpisodes = data;
    allEpisodesCounter = allEpisodes.length;
    console.log(allEpisodesCounter);
    paragraphCounterEl.innerHTML = `Displaying ${allEpisodesCounter} / ${allEpisodesCounter} episodes`;
  });
});

window.onload = setup;

