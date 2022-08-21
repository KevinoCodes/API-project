const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw {
      message: error.message,
      status: error.status
    }
  }
}

const api = {
  fetchRandomCats: async () => {
    try {
      const catData = await request(`${API_ENDPOINT}/images/search?limit=60`);
      showCatData(randomCatsList, catData);
    } catch (error) {
      console.log(error)
    }
  }
}


const catsList = document.querySelector('.cats-list');
const randomCatsList = document.querySelector('.random-cats-list');

const showCatData = (catsList, cats) => {
  cats.map(cat => {
    const catItem = document.createElement('li');
    const catImage = document.createElement('img');
    const catId = document.createElement('p');

    catImage.setAttribute('src', cat.url);
    catImage.dataset.src = cat.url;
    catImage.dataset.id = cat.id;
    catId.innerText = cat.id;

    catItem.className = 'cat-item';
    catItem.appendChild(catImage);
    catItem.appendChild(catId);
    catsList.appendChild(catItem);
  })
}

const limitNumberForm = document.querySelector('#limit-form');
const inputlimitNumber = document.querySelector('#limit-number');
const getRandomCatsButton = document.querySelector('.get-random-cats');

getRandomCatsButton.addEventListener('click', () => {
  randomCatsList.innerHTML = '';
  api.fetchRandomCats();
  infiniteScroll();
})



