const messageForm = document.querySelector('form[name="leave_message"]');

if (messageForm) {
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    console.log(userName, userEmail, userMessage);

    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("ul");

    const newMessage = document.createElement("li");

    const messageLink = document.createElement("a");
    messageLink.href = `mailto:${userEmail}`;
    messageLink.textContent = userName;

    const messageText = document.createTextNode(`: ${userMessage}`);

    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function (event) {
      const entry = event.target.parentNode;
      entry.remove();
    });

    newMessage.appendChild(messageLink);
    newMessage.appendChild(messageText);
    newMessage.appendChild(removeButton);

    messageList.appendChild(newMessage);
    messageForm.reset();
  });
}

const footer = document.querySelector("footer");
const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.textContent = `© ${thisYear} Xavier Davis`;

footer.appendChild(copyright);

const skills = ["JavaScript", "HTML", "CSS", "GitHub", "VS Code"];

const skillsSection = document.querySelector("#skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.textContent = skills[i];
  skillsList.appendChild(skill);
}