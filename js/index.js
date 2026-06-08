class App {
  constructor() {
    this.render();
  }
  render() {
    const footer = document.createElement("footer");
    document.body.appendChild(footer);

    const today = new Date();
    const thisYear = today.getFullYear();

    const footerElement = document.querySelector("footer"); //Used because assignment required but not really needed i could of just use inital const footer
    const copyright = document.createElement("p");
    copyright.innerHTML = `\u00A9 ${thisYear} Brian Rebimbas`;

    footerElement.appendChild(copyright);

    const skills = [
      "Powershell",
      "Python",
      "JavaScript",
      "HTML",
      "CSS",
      "GitHub",
    ];
    const skillsSection = document.querySelector("#skills");
    const skillsList = skillsSection.querySelector("ul");

    for (let i = 0; i < skills.length; i++) {
      const skill = document.createElement("li");
      skill.innerText = skills[i];
      skillsList.appendChild(skill);
    }
  }
}

new App();

const messageForm = document.forms.leave_message;

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  console.log("Name:", usersName);
  console.log("Email:", usersEmail);
  console.log("Message:", usersMessage);

  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  const newMessage = document.createElement("li");
  newMessage.innerHTML = `
    <a href="mailto:${usersEmail}">${usersName}</a>
    <span>${usersMessage}</span>
  `;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.addEventListener("click", () => {
    const entry = removeButton.parentNode;
    entry.remove();
    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  messageSection.style.display = "block";
  messageForm.reset();
});
