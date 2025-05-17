alert("Script loaded!");
document.getElementById("journalForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const tag = document.getElementById("tag").value;
  const date = new Date().toLocaleDateString();

  const entry = { title, body, tag, date };
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.unshift(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  renderEntries();
  this.reset();
});

function renderEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  const list = document.getElementById("entryList");
  list.innerHTML = "";

  entries.forEach(entry => {
    const item = document.createElement("div");
    item.className = "border p-4 my-4 rounded bg-white shadow";
    item.innerHTML = `<h3 class="font-semibold">${entry.date} – ${entry.title}</h3>
                      <span class="text-sm text-gray-500">[${entry.tag}]</span>
                      <p class="mt-2 text-gray-700">${entry.body.slice(0, 100)}...</p>`;
    list.appendChild(item);
  });
}
function fetchVerseOfTheDay() {
  fetch('https://beta.ourmanna.com/api/v1/get/?format=json')
    .then(response => response.json())
    .then(data => {
      const verse = data.verse.details.text;
      const reference = data.verse.details.reference;

      document.getElementById("verseText").innerText = `"${verse}"`;
      document.getElementById("verseRef").innerText = reference;
    })
    .catch(err => {
      document.getElementById("verseText").innerText = "Unable to load verse. Please try again later.";
    });
}
window.onload = () => {
  renderEntries();
  fetchVerseOfTheDay();
};

