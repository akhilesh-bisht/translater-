let translateButton = document.querySelector(".button");
let speakBtn = document.querySelector(".Speak");
let speakResult = document.querySelector(".Speak-result");
const FromText = document.getElementById("inputText");
let languageOptions = document.querySelectorAll("select");
let transText = document.getElementById("outputText");

if (languageOptions.length < 2) {
  console.error("Not enough language select elements.");
}

languageOptions.forEach((select, index) => {
  for (let countryCode in language) {
    let selected = "";
    if (index === 0 && countryCode === "en-GB") {
      selected = "selected";
    } else if (index === 1 && countryCode === "hi-IN") {
      selected = "selected";
    }
    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    select.insertAdjacentHTML("beforeend", option);
  }
});

speakBtn.addEventListener("click", speak);
speakResult.addEventListener("click", speakR);
function speak() {
  const inputText = FromText.value;
  let speakValue = new SpeechSynthesisUtterance(inputText);
  speechSynthesis.speak(speakValue);
}

function speakR() {
  const inputText2 = transText.value;
  let speakValueResult = new SpeechSynthesisUtterance(inputText2);
  speechSynthesis.speak(speakValueResult);
}

translateButton.addEventListener("click", () => {
  if (languageOptions.length < 2) {
    console.error("Language select elements are missing.");
    return;
  }

  let content = encodeURIComponent(FromText.value); // Encode content for URL
  let fromContent = languageOptions[0].value;
  let toContent = languageOptions[1].value;

  let transLink = `https://api.mymemory.translated.net/get?q=${content}&langpair=${fromContent}|${toContent}`;

  fetch(transLink)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.responseData && data.responseData.translatedText) {
        transText.textContent = data.responseData.translatedText;
      } else {
        transText.textContent = "Translation failed.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      transText.textContent = "Error fetching translation.";
    });
});
