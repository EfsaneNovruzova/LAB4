let userData = {
    name: "ƏFSANƏ <span class='highlight'>NOVRUZOVA</span>",
    title: "STUDENT",
    contact: [
        { icon: "email.png", text: "novruzovafsan88@gmail.com" },
        { icon: "phone.png", text: "0514029353" },
        { icon: "date.png", text: "2007-01-01" }
    ],
    socialMedia: [
        { icon: "instagram.png", text: "_e_.986" },
        { icon: "tik-tok.png", text: "_e_.986" },
        { icon: "github.png", text: "EfsaneNovruzova" }
    ],
    education: [
        { period: "2013 - 2024", school: "Secondary school number 96" },
        { period: "2024 - 2025", school: "AzTU - Information Security" }
    ],
    skills: ["Python Programming", "Cybersecurity", "Creativity", "Chef"],
    languages: ["Azerbaijani", "English", "Turkish"],
    profile: "Dedicated cybersecurity student with a growing portfolio of personal projects in ethical hacking, network security, and malware analysis. Curious by nature and always exploring new ways to improve system defenses and digital safety.",
    workExperience: [
        {
            title: "Cybersecurity Intern – SafeNet Solutions",
            details: ["Assisted with vulnerability assessments, penetration testing, and security documentation for enterprise-level networks."]
        },
        {
            title: "Content Writer – BrightPen Agency",
            details: ["Wrote SEO-optimized articles and blog posts for various industries including tech, health, and finance."]
        }
    ],
    reference: "Ms. Emily Roberts, the HR Director at GlobalWare Inc., supervised me during my time there as a marketing coordinator. She was a key figure in my professional development, providing guidance on everything from team collaboration to communication strategies. Her ability to recognize talent and support employee growth has had a lasting impact on my career. You can contact her at",
    certifications: [
        {
            name: "Oracle Certified Professional (OCP)",
            description: "This certification confirms advanced knowledge and expertise in managing and administering Oracle databases..."
        },
        {
            name: "CompTIA Security+",
            description: "Acquired foundational knowledge of cybersecurity principles including threat management, cryptography, identity access management, and secure network architecture."
        }
    ],
    projects: [
        {
            name: "Inventory Management System",
            description: "Designed an inventory management system for small businesses to track product stock, sales, and orders using C# and SQL."
        },
        {
            name: "Machine Learning Model for Prediction",
            description: "Implemented a machine learning model in Python for predicting future sales based on historical data using scikit-learn and pandas."
        }
    ]
};

if (localStorage.getItem("userData")) {
    userData = JSON.parse(localStorage.getItem("userData"));
}

document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        btn.nextElementSibling.classList.toggle("active");
    });
});

// Utility to create an element with optional HTML content
function createElement(tag, html = "", className = "") {
    const el = document.createElement(tag);
    el.innerHTML = html;
    if (className) el.className = className;
    return el;
}

function initContactForm(e) {
    e.preventDefault();
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dateInput = document.getElementById('date');
    const messageDiv = document.getElementById('form-message');

    messageDiv.textContent = ""; // Reset message

    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const date = dateInput.value;

    let isValid = true;

        // Email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            messageDiv.textContent = "Please enter a valid email address.";
        } else if (!/^\d+$/.test(phone)) {
            isValid = false;
            messageDiv.textContent = "Phone number must contain only digits.";
        } else if (!date) {
            isValid = false;
            messageDiv.textContent = "Please select a valid date.";
        }

        if (isValid) {
            messageDiv.style.color = "green";
            messageDiv.textContent = "Form submitted successfully!";
            userData.contact[0].text = email;
            userData.contact[1].text = phone;
            userData.contact[2].text = date;
            localStorage.setItem("userData", JSON.stringify(userData));
            console.warn('success')
            location.reload();
        } else {
            messageDiv.style.color = "red";
        }
}


function renderCV(data) {
    // Name and title
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("title").textContent = data.title;

    // Contact
    // const contactList = document.getElementById("contact-list");
    // data.contact.forEach(item => {
    //     const div = createElement("div", `<img src="photos/${item.icon}" class="icon" alt="">${item.text}`, "contact-item");
    //     contactList.appendChild(div);
    // });

    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const date = document.getElementById("date");

    email.value = data.contact[0].text;
    phone.value = data.contact[1].text;
    date.value = data.contact[2].text;

    // Social Media
    const socialList = document.getElementById("social-list");
    data.socialMedia.forEach(item => {
        const div = createElement("div", `<img src="photos/${item.icon}" class="icon" alt="">${item.text}`, "social-item");
        socialList.appendChild(div);
    });

    // Education
    const eduList = document.getElementById("education-list");
    data.education.forEach(item => {
        const li = createElement("li", `<strong>${item.period}:</strong> ${item.school}`);
        eduList.appendChild(li);
    });

    // Skills
    const skillList = document.getElementById("skills-list");
    const addskillBtn = document.createElement("button");
    addskillBtn.textContent = "Add Skill";
    addskillBtn.id = "add-skill-btn";
    skillList.appendChild(addskillBtn);
    addskillBtn.addEventListener("click", () => {
        const skillInput = prompt("Enter a skill:");
        if (skillInput) {
            const li = createElement("li", skillInput);
            skillList.appendChild(li);
            data.skills.push(skillInput);
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    });
    data.skills.forEach(skill => {
        const li = createElement("li", skill);
        skillList.appendChild(li);
    });

    // Languages
    const langList = document.getElementById("languages-list");
    const addlangBtn = document.createElement("button");
    addlangBtn.textContent = "Add Language";
    addlangBtn.id = "add-lang-btn";
    langList.appendChild(addlangBtn);
    addlangBtn.addEventListener("click", () => {
        const langInput = prompt("Enter a language:");
        if (langInput) {
            const li = createElement("li", langInput);
            langList.appendChild(li);
            data.languages.push(langInput);
            localStorage.setItem("userData", JSON.stringify(userData));
        }
    });
    data.languages.forEach(lang => {
        const li = createElement("li", lang);
        langList.appendChild(li);
    });

    // Profile
    document.getElementById("profile-text").textContent = data.profile;

    // Work Experience
    const workList = document.getElementById("work-list");
    data.workExperience.forEach(job => {
        const jobDiv = createElement("div");
        const title = createElement("h3", job.title);
        const ul = createElement("ul");
        job.details.forEach(detail => {
            ul.appendChild(createElement("li", detail));
        });
        jobDiv.appendChild(title);
        jobDiv.appendChild(ul);
        workList.appendChild(jobDiv);
    });

    // Certifications
    const certList = document.getElementById("certifications-list");
    data.certifications.forEach(cert => {
        const certDiv = createElement("div");
        const title = createElement("h3", cert.name);
        const desc = createElement("p", cert.description);
        certDiv.appendChild(title);
        certDiv.appendChild(desc);
        certList.appendChild(certDiv);
    });

    // Projects
    const projList = document.getElementById("projects-list");
    data.projects.forEach(project => {
        const projDiv = createElement("div");
        const title = createElement("h3", project.name);
        const desc = createElement("p", project.description);
        projDiv.appendChild(title);
        projDiv.appendChild(desc);
        projList.appendChild(projDiv);
    });

    // Reference
    document.getElementById("reference-text").textContent = data.reference;
}

// Run after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    renderCV(userData);
});
