const input = document.getElementById("searchInput");
const voice = document.getElementById("voiceBtn");

// Search
input?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && input.value.trim()) {
    const query = input.value.trim();

    alert("NOVA Search:\n" + query);

    // Future:
    // window.location.href =
    //   "ai-tutor.html?q=" + encodeURIComponent(query);
  }
});

// Voice Search
voice?.addEventListener("click", () => {

  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice search is not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();

  recognition.lang = "en-IN";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    voice.classList.add("listening");
    voice.textContent = "●";
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    if (input) {
      input.value = text;
      input.focus();
    }
  };

  recognition.onerror = () => {
    voice.classList.remove("listening");
    voice.textContent = "◉";
  };

  recognition.onend = () => {
    voice.classList.remove("listening");
    voice.textContent = "◉";
  };

  recognition.start();
});


// Quick Search Chips
document.querySelectorAll(".quick-chips button").forEach((button) => {

  button.addEventListener("click", () => {

    const subject = button.textContent.trim();

    if (input) {
      input.value = subject;
      input.focus();
    }

  });

});


// Feature Cards
document.querySelectorAll(".feature-card").forEach((card) => {

  card.addEventListener("click", () => {

    const title = card.querySelector("b")?.textContent;

    if (!title) return;

    switch (title) {

      case "AI Tutor":
        window.location.href = "ai-tutor.html";
        break;

      case "Live Classes":
        window.location.href = "live-classes.html";
        break;

      case "Doubt Solver":
        window.location.href = "doubt-solver.html";
        break;

      case "Tests":
        window.location.href = "tests.html";
        break;

      default:
        console.log("NOVA:", title);
    }

  });

});


// Learning Paths
document.querySelectorAll(".path-card").forEach((card) => {

  card.addEventListener("click", () => {

    const path = card.querySelector("strong")?.textContent;

    if (!path) return;

    console.log("Selected learning path:", path);

    // Future:
    // window.location.href =
    //   "classes.html?path=" + encodeURIComponent(path);

  });

});


// Continue Learning
document.querySelector(".play-btn")?.addEventListener("click", () => {

  window.location.href = "classes.html";

});


// Bottom Navigation
document.querySelectorAll(".nav-item").forEach((item) => {

  item.addEventListener("click", () => {

    const label = item.querySelector("small")?.textContent;

    if (!label) return;

    document.querySelectorAll(".nav-item").forEach((nav) => {
      nav.classList.remove("active");
    });

    item.classList.add("active");

    switch (label) {

      case "Home":
        window.location.href = "index.html";
        break;

      case "Classes":
        window.location.href = "classes.html";
        break;

      case "AI":
        window.location.href = "ai-tutor.html";
        break;

      case "Tests":
        window.location.href = "tests.html";
        break;

      case "Profile":
        window.location.href = "profile.html";
        break;

    }

  });

});


// Tap Animation
document
  .querySelectorAll(
    ".feature-card, .path-card, .nav-item, .quick-chips button"
  )
  .forEach((element) => {

    element.addEventListener("click", () => {

      element.classList.add("tap");

      setTimeout(() => {
        element.classList.remove("tap");
      }, 250);

    });

  });


// NOVA Welcome Animation
window.addEventListener("load", () => {

  document.body.classList.add("nova-loaded");

  console.log(
    "%cNOVA",
    "font-size:30px;font-weight:bold;color:#8b5cf6;"
  );

  console.log(
    "Universal Learning Platform initialized."
  );

});
