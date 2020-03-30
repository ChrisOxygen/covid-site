class News {
  async getNews() {
    const response = await fetch(
      "https://scheduler-rammy.herokuapp.com/news/?format=json"
    );
    const rep = await response.json();
    return rep;
  }
}

class Covid {
  async getStats() {
    const response = await fetch(
      "https://covid-19-data.p.rapidapi.com/country?format=undefined&name=Nigeria",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          "x-rapidapi-key": "2be492ee21msh120ca3d33cee8ddp1b693cjsnc758917f9c3c"
        }
      }
    );

    const rep = await response.json();
    return rep;
  }
}

// 1. get list of news objects
//2. create html for all news objects
//3. display them on page
