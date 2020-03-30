const dateDisplay = document.querySelector(".header__date");
const latest = document.querySelector(".latest__body");
const topStories = document.querySelector(".top-stories__body");
const main = document.querySelector(".main");
const discharged = document.querySelector(".discharged");
const deaths = document.querySelector(".deaths");
const active = document.querySelector(".active");

const display = () => {
  main.style.display = "grid";
};

setTimeout(display, 2000);

const createHTML = (newsObj, id) => {
  let img,
    src,
    newsDate,
    title,
    summary,
    link,
    topStoriesHtml,
    latestHtml,
    ms,
    stringDate;

  img = newsObj["image"];
  src = newsObj["source"];
  summary = newsObj["summary"];
  link = newsObj["link"];
  stringDate = newsObj["created"];
  title = newsObj["title"];

  ms = new Date(Date.parse(stringDate));

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  newsDate = `${ms.toLocaleDateString(
    "en-US",
    options
  )} || ${ms.toLocaleTimeString("en-US")}`;

  topStoriesHtml = `<div class="news" id="n${id}"><div class="news__image"><img src="${img}"alt=""class="news__image--img"/></div><div class="news__desc"><p class="news__desc--meta">${src} || ${newsDate}</p><h1 class="news__desc--story-title">${title}</h1><p class="summary">${summary}</p><a href="${link}" class="read-more-btn">Learn More &rarr;</a></div></div>`;

  latestHtml = `<p class="news__desc--meta">${src} || ${newsDate}</p><div class="latest__body--image"><img src="${img}"alt="image"class="latest__body--image-img"/></div><h1 class="latest__body--story-title">${title}</h1><p class="summary">${summary}</p><a href="${link}" class="read-more-btn">Learn More &rarr;</a>`;

  return {
    latestHtml,
    topStoriesHtml
  };
};

const updatePage = newsList => {
  let nlist = "";
  for (let index = 0; index < newsList.length; index++) {
    if (index === 0) {
      latest.innerHTML = createHTML(newsList[index], index).latestHtml;
    } else {
      nlist += createHTML(newsList[index], index).topStoriesHtml;
    }
  }

  topStories.innerHTML = nlist;
};

const updateStats = data => {
  discharged.textContent = data["recovered"];
  deaths.textContent = data["deaths"];
  active.textContent = data["confirmed"];
};

const n = new News();
let newsList;
n.getNews()
  .then(results => {
    updatePage(results.news);
  })
  .catch(err => console.log(err));

const cD = new Covid();
cD.getStats()
  .then(results => {
    updateStats(results[0]);
  })
  .catch(err => console.log(err));
