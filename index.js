let today = new Date();
let thisYear = today.getFullYear();
let footer = document.querySelector("footer");
let copyright = document.createElement("p");
copyright.innerHTML = `&copy; ${thisYear} Maria Santos`;
footer.appendChild(copyright);

let skills = ["JavaScript", "HTML", "CSS", "GitHub", "Skills"];
let skillsList = document.querySelector("#skills ul");
for (let i = 0; i < skills.length; i++) {
    let skill = document.createElement("li");
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}

let button = document.querySelector("#myButton");

button.addEventListener("click", function() {
    alert("Button clicked!");
});

let heading = document.querySelector("h1");

// heading.style.cursor = "pointer";

heading.addEventListener("click", function() {
    // if (heading.style.color === "red") {
    //     heading.style.color = "black";
    // } else {
        heading.style.color = "red";
    // }
});