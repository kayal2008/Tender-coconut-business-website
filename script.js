const STORAGE_KEY = "narayanan_illaneer_daily_data_v1";

const translations = {
  ta: {
    htmlLang: "ta",
    toggle: "English",
    welcomeTitle: "வணக்கம்!",
    welcomeSubtitle: "நாராயணன் இளநீர் வியாபாரிக்கு வரவேற்கிறோம்",
    dashboardTitle: "Narayanan Illaneer Viyaapari - இன்றைய கணக்கு பலகை",
    soldLabel: "🥥 விற்ற இளநீர் எண்ணிக்கை",
    priceLabel: "💰 ஒரு இளநீர் விலை",
    vehicleLabel: "🚚 வாகன செலவு",
    salaryLabel: "👨‍🌾 ஊழியர் சம்பளம்",
    otherLabel: "🧾 மற்ற செலவுகள்",
    calculate: "🧮 கணக்கிடு",
    speakResult: "🔊 சொல்லு",
    clear: "♻️ அழி",
    summaryTitle: "📊 இன்றைய சுருக்கம்",
    salesTitle: "மொத்த விற்பனை",
    expenseTitle: "மொத்த செலவு",
    resultTitle: "லாபம் / நட்டம்",
    clearDone: "அனைத்தும் அழிக்கப்பட்டது.",
    profitText: "இன்று உங்களுக்கு லாபம் ரூபாய்",
    lossText: "இன்று உங்களுக்கு நஷ்டம் ரூபாய்",
    neutralText: "இன்று உங்களுக்கு சமநிலை ரூபாய்",
    resultSpeak: ({ sentence }) => sentence,
    greetingSpeak: "நாராயணன் இளநீர் வியாபாரிக்கு வரவேற்கிறோம்",
  },
  en: {
    htmlLang: "en",
    toggle: "தமிழ்",
    welcomeTitle: "Welcome!",
    welcomeSubtitle: "Welcome to Narayanan Illaneer Viyaapari",
    dashboardTitle: "Narayanan Illaneer Viyaapari - Daily Dashboard",
    soldLabel: "🥥 Number of coconuts sold",
    priceLabel: "💰 Price per coconut",
    vehicleLabel: "🚚 Vehicle expense",
    salaryLabel: "👨‍🌾 Employee salary",
    otherLabel: "🧾 Other expenses",
    calculate: "🧮 Calculate",
    speakResult: "🔊 Speak Result",
    clear: "♻️ Clear",
    summaryTitle: "📊 Daily Summary",
    salesTitle: "Total Sales",
    expenseTitle: "Total Expense",
    resultTitle: "Profit / Loss",
    clearDone: "All values cleared.",
    profitText: "You have a profit of rupees",
    lossText: "You have a loss of rupees",
    neutralText: "You are at balance rupees",
    resultSpeak: ({ sentence }) => sentence,
    greetingSpeak: "Welcome to Narayanan Illaneer Viyaapari",
  },
};

const state = {
  lang: "ta",
  lastSpokenText: "",
};

const elements = {
  languageToggle: document.getElementById("languageToggle"),
  welcomeTitle: document.getElementById("welcomeTitle"),
  welcomeSubtitle: document.getElementById("welcomeSubtitle"),
  dashboardTitle: document.getElementById("dashboardTitle"),
  soldLabel: document.getElementById("soldLabel"),
  priceLabel: document.getElementById("priceLabel"),
  vehicleLabel: document.getElementById("vehicleLabel"),
  salaryLabel: document.getElementById("salaryLabel"),
  otherLabel: document.getElementById("otherLabel"),
  calculateBtn: document.getElementById("calculateBtn"),
  speakBtn: document.getElementById("speakBtn"),
  clearBtn: document.getElementById("clearBtn"),
  resultSentence: document.getElementById("resultSentence"),
  summaryTitle: document.getElementById("summaryTitle"),
  salesTitle: document.getElementById("salesTitle"),
  expenseTitle: document.getElementById("expenseTitle"),
  resultTitle: document.getElementById("resultTitle"),
  salesValue: document.getElementById("salesValue"),
  expenseValue: document.getElementById("expenseValue"),
  resultValue: document.getElementById("resultValue"),
  soldCount: document.getElementById("soldCount"),
  pricePerCoconut: document.getElementById("pricePerCoconut"),
  vehicleExpense: document.getElementById("vehicleExpense"),
  salaryExpense: document.getElementById("salaryExpense"),
  otherExpense: document.getElementById("otherExpense"),
};

function getNumberValue(element) {
  const value = Number.parseFloat(element.value);
  return Number.isFinite(value) ? value : 0;
}

function formatMoney(value) {
  return Number.isFinite(value) ? value.toFixed(2) : "0.00";
}

function convertBelowHundredTamil(num) {
  const ones = ["", "ஒன்று", "இரண்டு", "மூன்று", "நான்கு", "ஐந்து", "ஆறு", "ஏழு", "எட்டு", "ஒன்பது"];
  const tensMap = {
    10: "பத்து",
    11: "பதினொன்று",
    12: "பன்னிரண்டு",
    13: "பதிமூன்று",
    14: "பதினான்கு",
    15: "பதினைந்து",
    16: "பதினாறு",
    17: "பதினேழு",
    18: "பதினெட்டு",
    19: "பத்தொன்பது",
    20: "இருபது",
    30: "முப்பது",
    40: "நாற்பது",
    50: "ஐம்பது",
    60: "அறுபது",
    70: "எழுபது",
    80: "எண்பது",
    90: "தொண்ணூறு",
  };
  if (num < 10) return ones[num];
  if (num < 20) return tensMap[num];
  const ten = Math.floor(num / 10) * 10;
  const one = num % 10;
  return one === 0 ? tensMap[ten] : `${tensMap[ten]} ${ones[one]}`;
}

function numberToTamilWords(number) {
  const n = Math.floor(Math.abs(number));
  if (n === 0) return "பூஜ்யம்";
  if (n > 99999999) return String(n);

  const parts = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const hundred = Math.floor((n % 1000) / 100);
  const belowHundred = n % 100;

  if (crore) parts.push(`${convertBelowHundredTamil(crore)} கோடி`);
  if (lakh) parts.push(`${convertBelowHundredTamil(lakh)} லட்சம்`);
  if (thousand) parts.push(`${convertBelowHundredTamil(thousand)} ஆயிரம்`);
  if (hundred) parts.push(`${convertBelowHundredTamil(hundred)} நூறு`);
  if (belowHundred) parts.push(convertBelowHundredTamil(belowHundred));

  return parts.join(" ").trim();
}

function numberToWordsByLang(number) {
  if (state.lang === "ta") {
    return numberToTamilWords(number);
  }
  return String(Math.floor(Math.abs(number)));
}

function updateTexts() {
  const t = translations[state.lang];
  document.documentElement.lang = t.htmlLang;
  elements.languageToggle.textContent = t.toggle;
  elements.welcomeTitle.textContent = t.welcomeTitle;
  elements.welcomeSubtitle.textContent = t.welcomeSubtitle;
  elements.dashboardTitle.textContent = t.dashboardTitle;
  elements.soldLabel.textContent = t.soldLabel;
  elements.priceLabel.textContent = t.priceLabel;
  elements.vehicleLabel.textContent = t.vehicleLabel;
  elements.salaryLabel.textContent = t.salaryLabel;
  elements.otherLabel.textContent = t.otherLabel;
  elements.calculateBtn.textContent = t.calculate;
  elements.speakBtn.textContent = t.speakResult;
  elements.clearBtn.textContent = t.clear;
  elements.summaryTitle.textContent = t.summaryTitle;
  elements.salesTitle.textContent = t.salesTitle;
  elements.expenseTitle.textContent = t.expenseTitle;
  elements.resultTitle.textContent = t.resultTitle;
}

function calculateAndRender(shouldSpeak = false) {
  const sold = getNumberValue(elements.soldCount);
  const price = getNumberValue(elements.pricePerCoconut);
  const vehicle = getNumberValue(elements.vehicleExpense);
  const salary = getNumberValue(elements.salaryExpense);
  const other = getNumberValue(elements.otherExpense);

  const sales = sold * price;
  const expense = vehicle + salary + other;
  const net = sales - expense;

  elements.salesValue.textContent = formatMoney(sales);
  elements.expenseValue.textContent = formatMoney(expense);
  elements.resultValue.textContent = `${net >= 0 ? "+" : "-"}${formatMoney(Math.abs(net))}`;
  elements.resultValue.style.color = net > 0 ? "#1f8b2e" : net < 0 ? "#b23a2b" : "#1e1e1e";

  const words = numberToWordsByLang(net);
  const t = translations[state.lang];
  const resultSentence =
    net > 0 ? `${t.profitText} ${words}` : net < 0 ? `${t.lossText} ${words}` : `${t.neutralText} ${words}`;
  elements.resultSentence.textContent = resultSentence;

  saveData({ sold, price, vehicle, salary, other, sales, expense, net });

  if (shouldSpeak) {
    const speakText = translations[state.lang].resultSpeak({ sentence: resultSentence });
    speak(speakText);
  }
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.lang === "ta" ? "ta-IN" : "en-IN";
  utterance.rate = 0.95;
  state.lastSpokenText = text;
  window.speechSynthesis.speak(utterance);
}

function saveData(data) {
  const payload = {
    ...data,
    lang: state.lang,
    lastSpokenText: state.lastSpokenText,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function restoreData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    state.lang = parsed.lang || "ta";
    state.lastSpokenText = parsed.lastSpokenText || "";
    elements.soldCount.value = parsed.sold ?? "";
    elements.pricePerCoconut.value = parsed.price ?? "";
    elements.vehicleExpense.value = parsed.vehicle ?? "";
    elements.salaryExpense.value = parsed.salary ?? "";
    elements.otherExpense.value = parsed.other ?? "";
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function resetAll() {
  elements.soldCount.value = "";
  elements.pricePerCoconut.value = "";
  elements.vehicleExpense.value = "";
  elements.salaryExpense.value = "";
  elements.otherExpense.value = "";
  elements.salesValue.textContent = "0";
  elements.expenseValue.textContent = "0";
  elements.resultValue.textContent = "0";
  elements.resultValue.style.color = "#1e1e1e";
  elements.resultSentence.textContent = `${translations[state.lang].neutralText} பூஜ்யம்`;
  state.lastSpokenText = "";
  localStorage.removeItem(STORAGE_KEY);
}

function setupEvents() {
  elements.languageToggle.addEventListener("click", () => {
    state.lang = state.lang === "ta" ? "en" : "ta";
    updateTexts();
    calculateAndRender(false);
  });

  elements.calculateBtn.addEventListener("click", () => calculateAndRender(false));

  elements.speakBtn.addEventListener("click", () => calculateAndRender(true));

  elements.clearBtn.addEventListener("click", resetAll);

  const trackedInputs = [
    elements.soldCount,
    elements.pricePerCoconut,
    elements.vehicleExpense,
    elements.salaryExpense,
    elements.otherExpense,
  ];
  trackedInputs.forEach((input) => input.addEventListener("input", () => calculateAndRender(false)));
}

function init() {
  restoreData();
  updateTexts();
  setupEvents();
  calculateAndRender(false);
}

init();
