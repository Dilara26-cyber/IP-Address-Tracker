const ip__text = document.querySelector('#ip');
const location__text = document.querySelector('#location');
const timezone__text = document.querySelector('#timezone');
const isp__text = document.querySelector('#isp');
const search__input = document.querySelector('#search');
const btn = document.querySelector('button');
const errMsg = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close__icon = document.querySelector('.close');
let ipAddress = '';
let domain = '';
let pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

search__input.addEventListener('change', (e) => {
  if (e.target.value.match(pattern)) {
    domain = search__input.value;
  }
  domain = search__input.value;
});

let mymap = '';
let marker = '';
let map_icon = L.icon({
  iconUrl: 'images/icon-location.svg',
  iconSize: [40, 50],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
const ip_getter = async () => {
  try {
    const ip_api = `https://geo.ipify.org/api/v1?apiKey=at_pCG2D5RcRmNc2jNKTo9I6k17rpvct&ipAddress=`;
    const response = await fetch(ip_api);
    const data = await response.json();
    const lat = data.location.lat;
    const lng = data.location.lng;
    mymap = L.map('mapid', { zoomControl: false }).setView([lat, lng], 13);
    marker = L.marker([lat, lng], { icon: map_icon }).addTo(mymap);
    ip__text.textContent = data.ip;
    location__text.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezone__text.textContent = `UTC ${data.location.timezone}`;
    isp__text.textContent = data.isp;
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGlsYXJhMjYiLCJhIjoiY2ttaTNrdWk1MGRkZjJwcTRpY29ibXIzNCJ9.xwEFwyG8Pru6CPBwpUBEEQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(mymap);
  } catch (err) {
    errorMessage();
  }
};

const search = async () => {
  try {
    const ip_api = `https://geo.ipify.org/api/v1?apiKey=at_pCG2D5RcRmNc2jNKTo9I6k17rpvct&ipAddress=${ipAddress}&domain=${domain}`;
    const response = await fetch(ip_api);
    const data = await response.json();
    const lat = data.location.lat;
    const lng = data.location.lng;
    mymap.setView([lat, lng], 13);
    marker = L.marker([lat, lng], { icon: map_icon }).addTo(mymap);
    ip__text.textContent = data.ip;
    location__text.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezone__text.textContent = `UTC ${data.location.timezone}`;
    isp__text.textContent = data.isp;
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiZGlsYXJhMjYiLCJhIjoiY2ttaTNrdWk1MGRkZjJwcTRpY29ibXIzNCJ9.xwEFwyG8Pru6CPBwpUBEEQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(mymap);
  } catch (err) {
    errorMessage();
  }
};

ip_getter();

btn.addEventListener('click', () => {
  search();
});

const errorMessage = () => {
  const errMsgPrg = document.createElement('p');

  close__icon.classList.add('fa-times');
  errMsgPrg.textContent =
    'Sorry, there is no match for the IP Address or the domain you are looking.';
  errMsg.classList.add('modal--open');
  errMsg.append(errMsgPrg);
  errMsg.append(errMsgPrg);
  overlay.classList.add('overlay--open');
};

close__icon.addEventListener('click', () => {
  overlay.classList.remove('overlay--open');
  errMsg.classList.remove('modal--open');
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('overlay--open');
  errMsg.classList.remove('modal--open');
});
