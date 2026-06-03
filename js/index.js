class App {
  constructor() {
    this.render();
  }
  render() {
    const footer = document.createElement("footer");
    document.body.appendChild(footer);

    const today = new Date();
    const thisYear = today.getFullYear();

    document.querySelector("footer");
    const copyright = document.createElement("p");
    copyright.innerHTML = `\u00A9 ${thisYear} Brian Rebimbas`;

    footer.appendChild(copyright);

    const skills = [
      "Powershell",
      "Python",
      "JavaScript",
      "HTML",
      "CSS",
      "GitHub",
    ];
    const skillsSection = document.querySelector("#Skills");
    const skillsList = skillsSection.querySelector("ul");

    for (let i = 0; i < skills.length; i++) {
      const skill = document.createElement("li");
      skill.innerText = skills[i];
      skillsList.appendChild(skill);
    }
  }
}

new App();
