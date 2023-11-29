const countries = {
  "am-ET": "Amharic",
  "ar-SA": "Arabic",
  "be-BY": "Bielarus",
  "bem-ZM": "Bemba",
  "bi-VU": "Bislama",
  "bjs-BB": "Bajan",
  "bn-IN": "Bengali",
  "bo-CN": "Tibetan",
  "br-FR": "Breton",
  "bs-BA": "Bosnian",
  "ca-ES": "Catalan",
  "cop-EG": "Coptic",
  "cs-CZ": "Czech",
  "cy-GB": "Welsh",
  "da-DK": "Danish",
  "dz-BT": "Dzongkha",
  "de-DE": "German",
  "dv-MV": "Maldivian",
  "el-GR": "Greek",
  "en-GB": "English",
  "es-ES": "Spanish",
  "et-EE": "Estonian",
  "eu-ES": "Basque",
  "fa-IR": "فارسی",
  "fi-FI": "Finnish",
  "fn-FNG": "Fanagalo",
  "fo-FO": "Faroese",
  "fr-FR": "French",
  "gl-ES": "Galician",
  "gu-IN": "Gujarati",
  "ha-NE": "Hausa",
  "he-IL": "Hebrew",
  "hi-IN": "Hindi",
  "hr-HR": "Croatian",
  "hu-HU": "Hungarian",
  "id-ID": "Indonesian",
  "is-IS": "Icelandic",
  "it-IT": "Italian",
  "ja-JP": "Japanese",
  "kk-KZ": "Kazakh",
  "km-KM": "Khmer",
  "kn-IN": "Kannada",
  "ko-KR": "Korean",
  "ku-TR": "Kurdish",
  "ky-KG": "Kyrgyz",
  "la-VA": "Latin",
  "lo-LA": "Lao",
  "lv-LV": "Latvian",
  "men-SL": "Mende",
  "mg-MG": "Malagasy",
  "mi-NZ": "Maori",
  "ms-MY": "Malay",
  "mt-MT": "Maltese",
  "my-MM": "Burmese",
  "ne-NP": "Nepali",
  "niu-NU": "Niuean",
  "nl-NL": "Dutch",
  "no-NO": "Norwegian",
  "ny-MW": "Nyanja",
  "ur-PK": "Pakistani",
  "pau-PW": "Palauan",
  "pa-IN": "Panjabi",
  "ps-PK": "Pashto",
  "pis-SB": "Pijin",
  "pl-PL": "Polish",
  "pt-PT": "Portuguese",
  "rn-BI": "Kirundi",
  "ro-RO": "Romanian",
  "ru-RU": "Russian",
  "sg-CF": "Sango",
  "si-LK": "Sinhala",
  "sk-SK": "Slovak",
  "sm-WS": "Samoan",
  "sn-ZW": "Shona",
  "so-SO": "Somali",
  "sq-AL": "Albanian",
  "sr-RS": "Serbian",
  "sv-SE": "Swedish",
  "sw-SZ": "Swahili",
  "ta-LK": "Tamil",
  "te-IN": "Telugu",
  "tet-TL": "Tetum",
  "tg-TJ": "Tajik",
  "th-TH": "Thai",
  "ti-TI": "Tigrinya",
  "tk-TM": "Turkmen",
  "tl-PH": "Tagalog",
  "tn-BW": "Tswana",
  "to-TO": "Tongan",
  "tr-TR": "Turkish",
  "uk-UA": "Ukrainian",
  "uz-UZ": "Uzbek",
  "vi-VN": "Vietnamese",
  "wo-SN": "Wolof",
  "xh-ZA": "Xhosa",
  "yi-YD": "Yiddish",
  "zu-ZA": "Zulu",
};

let fromText = document.querySelector(".from-text");
let toText = document.querySelector(".to-text");
let fromSelect = document.querySelector(".from-select");
let toSelect = document.querySelector(".to-select");
let translateBtn = document.querySelector(".translateBtn");
let changeLangBtn = document.querySelector(".fa-exchange-alt");
let audio = document.querySelector(".audio");
let controls = document.querySelector(".controls");
let countriesArray = Object.entries(countries);
countriesArray.forEach((country) => {
  fromSelect.insertAdjacentHTML(
    "afterbegin",
    `
    <option>${country[1]}</option>
    `
  );
  toSelect.insertAdjacentHTML(
    "afterbegin",
    `
    <option>${country[1]}</option>
    `
  );
});

fromSelect.value = "English";
toSelect.value = "فارسی";

let exchangeVar = null;

changeLangBtn.addEventListener("click", function () {
  exchangeVar = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = exchangeVar;
});

translateBtn.addEventListener("click", function () {
  let fromLang = countriesArray.find(
    (country) => country[1] === fromSelect.value
  );
  let toLang = countriesArray.find((country) => country[1] === toSelect.value);

  fetch(
    `https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${fromLang[0]}|${toLang[0]}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      toText.value = res.responseData.translatedText;
    });
});

let utterance;
controls.addEventListener("click", (e) => {
  // voice
  if (e.target.className === "fas fa-volume-up fromVoice") {
    utterance = new SpeechSynthesisUtterance(fromText.value);
    utterance.lang = fromSelect.value;
    speechSynthesis.speak(utterance);
  } else if (e.target.className === "fas fa-volume-up toVoice") {
    utterance = new SpeechSynthesisUtterance(toText.value);
    utterance.lang = toSelect.value;
    speechSynthesis.speak(utterance);
  }
  // copy
  else if (e.target.className === "fas fa-copy fromCopy") {
    navigator.clipboard.writeText(fromText.value);
  } else if (e.target.className === "fas fa-copy toCopy") {
    navigator.clipboard.writeText(toText.value);
  }
});
