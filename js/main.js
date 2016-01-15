document.addEventListener("DOMContentLoaded", function(event) {

  // hamburger menu

  var menu = document.querySelector(".main-menu");
  menu.classList.add('hidden');

  var hamburgerBtn = document.querySelector("#hamburger");
  hamburgerBtn.addEventListener("click", function(event) {
    this.nextElementSibling.classList.toggle("hidden");
  });
  
  // typing animation

  var heading = document.querySelector("#we-love");
  var arr = ["to write code", "web design", "social marketing"];
  var arrIdx = 0;
  var counter = 0;
  var text = arr[arrIdx];
  var end = text.length;
  var out = "";
  
  function typing () {
    console.log(counter, end);
    if (end > 0) {
      end -= 1;
      heading.textContent = text.slice(0, end);
      setTimeout(typing, 100);
    } else if (counter < text.length) {
      text = arr[arrIdx + 1] || arr[0]; 
      counter += 1;
      heading.textContent = text.slice(0,counter);
      setTimeout(typing, 200);
    } else if (arrIdx < arr.length - 1) {
      arrIdx += 1;
      counter = 0;
      text = arr[arrIdx];
      end = text.length;
      setTimeout(typing, 200);
    } else {
      heading.classList.add("disabled");
    }
  }

  setTimeout(typing, 3000);

  // hide faq answers

  var faqAnswers = document.querySelectorAll(".faq dd");

  function hideAnswers() {
    for (var i = 0; i < faqAnswers.length; i++) {
      faqAnswers[i].classList.add("hidden");
    }
  }

  hideAnswers();

  function removeActive() {
    var faqAnchors = document.querySelectorAll(".faq dt a");
    for (var i = 0; i < faqAnchors.length; i++) {
      faqAnchors[i].classList.remove("active", "icon-cancel-circled");
      faqAnchors[i].classList.add("icon-plus-circled");
    }
  }

  // faq accordion

  var faqQuestions = document.querySelectorAll(".faq dt a");

  function accordion(event) {
    hideAnswers();
    removeActive();
    event.preventDefault();
    this.classList.remove("icon-plus-circled");
    this.classList.add("active");
    this.classList.add("icon-cancel-circled");
    this.parentNode.nextElementSibling.classList.remove("hidden");
  }
  
  for (var i = 0; i < faqQuestions.length; i++) {
      faqQuestions[i].addEventListener("click", accordion, false);
  }

  // filter buttons

  var filterBtns = document.querySelectorAll(".filter-buttons");

  function filterWorks(event) {
    var portfolioElms = document.querySelectorAll(".works-list li");
    var target = event.target;
    if (target.tagName == "BUTTON") {
      if(document.querySelectorAll("button.active")[0]) {
        document.querySelectorAll("button.active")[0].classList.remove("active");
      }
      target.classList.add("active");
      var filter = target.id;
      for (var i = 0; i < portfolioElms.length; i++) {
        portfolioElms[i].classList.remove("hidden");
        var elmData = portfolioElms[i].getAttribute("data-cat");
        if (filter !== elmData && filter !== "all") {
          portfolioElms[i].classList.add("hidden");
        }
      }
    }
  }

  for (i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener("click", filterWorks, false);
  }

  // plan switcher

  document.querySelector("#monthly").checked = true;
  var selectPlan = document.querySelectorAll("input[name=plan");
  
  function planSwitcher () {
    var elems = document.querySelectorAll(".plan-container");
    for (var i = 0; i < elems.length; i++) {
      if (this.value == "yearly") {
        elems[i].classList.add("rotate");
      } else {
        elems[i].classList.remove("rotate");
      }
    }
  }

  for (i = 0; i < selectPlan.length; i++) {
    selectPlan[i].addEventListener("change", planSwitcher, false);
  }
});