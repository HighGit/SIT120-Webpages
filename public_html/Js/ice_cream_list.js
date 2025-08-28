const icecreamArray = [
  "Vanilla",
  "Chocolate",
  "Cookies 'n Cream",
  "Strawberry",
  "Chocolate Chip",
  "Mint Chocolate Chip",
  "Chocolate Chip Cookie Dough",
  "Butter Pecan",
  "Birthday Cake",
  "Moose Tracks"
];

function buildIcecreamList() {
  const div = document.getElementById("top_icecreams");

  // Clear previous content
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  // Create ordered list
  const ol = document.createElement("ol");

  for (let flavour of icecreamArray) {
    const li = document.createElement("li");
    li.textContent = flavour;
    ol.appendChild(li);
  }

  // Append the list to the div
  div.appendChild(ol);
}
