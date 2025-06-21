/////// Loading

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");

  // Fade-out efektiyle loader'ı gizle
  loader.style.transition = "opacity 0.5s ease";
  loader.style.opacity = 0;

  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 600);
});

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".menu-btn");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  btnNavEl.classList.toggle("active");
});

//Services
document.addEventListener("DOMContentLoaded", function () {
  const optDivs = document.querySelectorAll(".opt"); // Get all the .opt divs

  optDivs.forEach((optDiv) => {
    optDiv.addEventListener("click", function () {
      // Get the paragraph inside the clicked .opt div
      const paragraph = optDiv.querySelector("p");

      // Close all other paragraphs first
      optDivs.forEach((div) => {
        if (div !== optDiv) {
          const otherParagraph = div.querySelector("p");
          otherParagraph.style.opacity = "0";
          otherParagraph.style.transform = "translateY(20px)";
          div.style.backgroundColor = "rgb(26, 24, 20)"; // Reset background color
        }
      });

      // Toggle the clicked paragraph
      if (paragraph.style.opacity === "1") {
        paragraph.style.opacity = "0";
        paragraph.style.transform = "translateY(20px)";
      } else {
        paragraph.style.opacity = "1";
        paragraph.style.transform = "translateY(0)";
      }

      // Optionally, change the background color of the clicked .opt div
      optDiv.style.backgroundColor = "orange";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const optDiv = document.querySelector(".opt");
  const paragraphs = optDiv.querySelectorAll("p");

  optDiv.addEventListener("click", function () {
    paragraphs.forEach((p) => {
      p.style.opacity = 1;
      p.style.transform = "translateY(0)";
    });
    // Optionally change the background color on click
    optDiv.style.backgroundColor = "orange";
  });
});

//
///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll(".main-nav-link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
    btnNavEl.classList.remove("active");
  });
});

consoleText(
  ["What Do we offer?", "Web Development", "Search Engine Optimization."],
  "text",
  ["white", "white", "white"]
);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ["#fff"];
  var visible = true;
  var con = document.getElementById("console");
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id);
  target.setAttribute("style", "color:" + colors[0]);
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 90);
  window.setInterval(function () {
    if (visible === true) {
      con.className = "console-underscore hidden";
      visible = false;
    } else {
      con.className = "console-underscore";

      visible = true;
    }
  }, 400);
}

/// Offers Section

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".options");
  const contents = document.querySelectorAll(".content");

  // Function to handle switching content
  const switchContent = (target) => {
    // Remove active class from all options
    options.forEach((option) => option.classList.remove("active"));
    // Add active class to clicked option
    document.querySelector(`[data-target="${target}"]`).classList.add("active");

    // Hide all content sections
    contents.forEach((content) => content.classList.remove("active"));

    // Show the content matching the target
    const activeContent = document.getElementById(target);
    if (activeContent) {
      activeContent.classList.add("active");
    }
  };

  // Set initial content (HTML is active by default)
  switchContent("html");

  // Event listener for option clicks
  options.forEach((option) => {
    option.addEventListener("click", () => {
      const target = option.getAttribute("data-target");
      switchContent(target);
    });
  });
});

// Get the button element
let scrollUpBtn = document.getElementById("scrollUpBtn");

// When the user scrolls down 200px from the top, show the button
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollUpBtn.style.display = "block";
  } else {
    scrollUpBtn.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
scrollUpBtn.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
