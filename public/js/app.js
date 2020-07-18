const search = document.getElementById("search");

const form = document.getElementById("form");

const msg1 = document.getElementById("msg1");
const msg2 = document.getElementById("msg2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = search.value;
  const url = `http://localhost:3000/weather?address=${val}`;
  msg1.innerText = "Location: ";
  msg2.innerText = "Forecast: ";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      msg1.textContent += data.location;
      msg2.innerText += data.forcast;
    })
    .catch((error) => (msg1.textContent = error));
});
