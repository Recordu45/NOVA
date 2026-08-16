// ==========================================
// NOVA • HOME V2
// Main JavaScript
// ==========================================


// ------------------------------------------
// PAGE NAVIGATION
// ------------------------------------------

function goToPage(page) {
  if (!page) return;

  window.location.href = page;
}


// ------------------------------------------
// ALL DATA-GO BUTTONS
// ------------------------------------------

document.querySelectorAll("[data-go]").forEach((element) => {

  element.addEventListener("click", () => {

    const page = element.getAttribute("data-go");

    if (page) {
      goToPage(page);
    }

  });

});


// ------------------------------------------
// STUDY PATHS
// ------------------------------------------

document.querySelectorAll(".path").forEach((card) => {

  card.addEventListener("click", () => {

    const path = card.getAttribute("data-path");

    if (!path) return;

    const url =
      "classes.html?path=" +
      encodeURIComponent(path);

    goToPage(url);

  });

});


// ------------------------------------------
// SEARCH
// ------------------------------------------

const searchInput = document.getElementById("search");

if (searchInput) {

  searchInput.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") return;

    const query = searchInput.value.trim();

    if (!query) return;

    // Save the student's question
    localStorage.setItem(
      "novaSearch",
      query
    );

    // Send question to AI Tutor
    goToPage(
      "ai-tutor.html?q=" +
      encodeURIComponent(query)
    );

  });

}


// ------------------------------------------
// SUBJECT / EXAM CHIPS
// ------------------------------------------

document
  .querySelectorAll(".chips button")
  .forEach((button) => {

    button.addEventListener("click", () => {

      if (!searchInput) return;

      let text = button.textContent.trim();

      // Remove decorative symbols
      text = text.replace(
        /[^a-zA-Z0-9 ]/g,
        ""
      ).trim();

      searchInput.value = text;

      searchInput.focus();

    });

  });


// ------------------------------------------
// VOICE SEARCH
// ------------------------------------------

const microphone =
  document.getElementById("mic");


if (microphone) {

  microphone.addEventListener(
    "click",
    () => {

      // Browser support check
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


      if (!SpeechRecognition) {

        alert(
          "Voice search is not supported in this browser."
        );

        return;
      }


      const recognition =
        new SpeechRecognition();


      recognition.lang = "en-IN";

      recognition.continuous = false;

      recognition.interimResults = false;


      recognition.onstart = () => {

        microphone.classList.add(
          "listening"
        );

        microphone.textContent = "●";

      };


      recognition.onresult = (event) => {

        const result =
          event.results[0][0].transcript;

        if (searchInput) {

          searchInput.value = result;

          searchInput.focus();

        }

      };


      recognition.onerror = () => {

        microphone.classList.remove(
          "listening"
        );

        microphone.textContent = "●";

      };


      recognition.onend = () => {

        microphone.classList.remove(
          "listening"
        );

        microphone.textContent = "●";

      };


      recognition.start();

    }
  );

}


// ------------------------------------------
// TAP ANIMATION
// ------------------------------------------

const interactiveElements =
  document.querySelectorAll(
    ".feature, .path, .live-card, .bottom button, .primary, .secondary, .chips button"
  );


interactiveElements.forEach((element) => {

  element.addEventListener(
    "pointerdown",
    () => {

      element.classList.add("tap");

    }
  );


  element.addEventListener(
    "pointerup",
    () => {

      setTimeout(() => {

        element.classList.remove("tap");

      }, 180);

    }
  );


  element.addEventListener(
    "pointercancel",
    () => {

      element.classList.remove("tap");

    }
  );

});


// ------------------------------------------
// BOTTOM NAVIGATION
// ------------------------------------------

document
  .querySelectorAll(".bottom button[data-go]")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const page =
        button.getAttribute("data-go");

      if (!page) return;

      goToPage(page);

    });

  });


// ------------------------------------------
// LIVE CLASS CARDS
// ------------------------------------------

document
  .querySelectorAll(".live-card")
  .forEach((card) => {

    card.addEventListener("click", () => {

      // Future live class system
      goToPage("live-classes.html");

    });

  });


// ------------------------------------------
// NOVA WELCOME
// ------------------------------------------

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "ready"
    );

    console.log(
      "%cNOVA",
      "font-size:30px;font-weight:900;color:#8b5cf6;"
    );

    console.log(
      "Universal Learning Platform initialized."
    );

  }
);


// ------------------------------------------
// PREVENT BROKEN PAGE LINKS
// ------------------------------------------

document
  .querySelectorAll("button[data-go]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

        const page =
          button.getAttribute("data-go");

        if (!page) {

          event.preventDefault();

        }

      }
    );

  });


// ------------------------------------------
// RESTORE LAST SEARCH
// ------------------------------------------

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const lastSearch =
      localStorage.getItem(
        "novaSearch"
      );

    // Don't automatically put old search
    // into the search box.
    // It is only stored for future AI Tutor use.

    if (lastSearch) {

      console.log(
        "Last NOVA question:",
        lastSearch
      );

    }

  }
);
