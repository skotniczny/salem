function $qs(selector) {
  return document.querySelector(selector);
}

function $qsa(selector, scope) {
  return (scope || document).querySelectorAll(selector);
}

function typingAnimation(node, options) {
  options = options || {};
  var delay = options.delay || 1000;
  var duration = options.duration || 2000;
  var typingSpeed = options.typingSpeed || 200;
  var deletingSpeed = options.deletingSpeed || 100;
  var loop = options.loop;
  
  var arr = node.getAttribute("data-phrase").split(" | ");
  var arrIdx = 0;
  var textToDelete = arr[arrIdx];
  var textToType = arr[arrIdx + 1] || arr[0];
  var typingCounter = 0;
  var deletingCounter = textToDelete.length;
  
  function typing() {
    if (deletingCounter > 0) {
      deletingCounter -= 1;
      node.textContent = textToDelete.slice(0, deletingCounter);
      setTimeout(typing, deletingSpeed);
    } else if (typingCounter < textToType.length) {
      typingCounter += 1;
      node.textContent = textToType.slice(0, typingCounter);
      setTimeout(typing, typingSpeed);
    } else if (arrIdx < arr.length - 1) {
      arrIdx += 1;
      textToDelete = arr[arrIdx];
      textToType = arr[arrIdx + 1] || arr[0];
      typingCounter = 0;
      deletingCounter = textToDelete.length;
      setTimeout(typing, duration);
    } else {
      if (loop) {
        arrIdx = -1;
        typing();
      } else {
        node.classList.add("disabled");
      }
    }
  }
  
  setTimeout(typing, delay);
}

function makeAccordion(node) {

  var faqQuestions = $qsa("dt a", node);
  var faqAnswers = $qsa("dd", node);
  
  function hideAnswers() {
    for (var i = 0; i < faqAnswers.length; i++) {
      faqAnswers[i].classList.add("hidden");
    }
  }
  hideAnswers();
  
  function removeActive() {
    for (var i = 0; i < faqQuestions.length; i++) {
      faqQuestions[i].classList.remove("active", "icon-cancel-circled");
      faqQuestions[i].classList.add("icon-plus-circled");
    }
  }    
  
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
}

function filterElements(filterBtnsContainer, elmsToFilterContainer) {

  var elmsToFilter = $qsa("li", elmsToFilterContainer);

  function filter(event) {
    
    var target = event.target;

    if (target.tagName.toLowerCase() === "button") {
      $qsa(".active", filterBtnsContainer)[0].classList.remove("active");
      target.classList.add("active");
      
      var filterBtn = target.id;
      
      for (var i = 0; i < elmsToFilter.length; i++) {
        elmsToFilter[i].classList.remove("hidden");
      
        var elmData = elmsToFilter[i].getAttribute("data-cat");
        
        if (filterBtn !== elmData && filterBtn !== "all") {
          elmsToFilter[i].classList.add("hidden");
        }
      }
    }
  }

  filterBtnsContainer.addEventListener("click", filter, false);
}

document.addEventListener("DOMContentLoaded", function(event) {

  // hamburger menu

  $qs(".main-menu").classList.add('hidden');

  $qs("#hamburger").addEventListener("click", function(event) {
    this.nextElementSibling.classList.toggle("hidden");
  });
  
  
  typingAnimation($qs("#we-love"), {
    duration: 3000
  });


  makeAccordion($qs(".faq"));


  filterElements($qs(".filter-buttons"), $qs(".works-list"));

  // plan switcher

  $qs("#monthly").checked = true;
  var selectPlan = $qsa("input[name=plan]");
  
  function planSwitcher () {
    var elems = $qsa(".plan-container");
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