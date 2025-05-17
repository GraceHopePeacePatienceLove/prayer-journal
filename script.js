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

window.onload = renderEntries;
Add journal logic with localStorage
