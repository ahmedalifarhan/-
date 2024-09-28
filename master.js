function searchBloodType() {
  const selectedBloodType = document.getElementById("bloodType").value;

  if (!selectedBloodType) {
    document.getElementById("result").innerHTML =
      "❌ Please select a blood type!";
    return;
  }

  fetch("bloodData.json")
    .then((response) => response.json())
    .then((data) => {
      const results = data.filter(
        (person) => person.bloodType === selectedBloodType
      );

      let resultDiv = document.getElementById("result");
      resultDiv.innerHTML = "";

      if (results.length > 0) {
        results.forEach((person) => {
          const internationalPhone = person.phone.replace(/^0/, "+20");

          resultDiv.innerHTML += `
    <div class="result-item">
    <a href="tel:${person.phone}" class="phone">📞 ${person.phone}</a>
    <a href="https://wa.me/${internationalPhone}" target="_blank" class="whatsapp">
    <i class="fab fa-whatsapp"></i>
    </a>
    <span class="name">👤 ${person.name}</span>
    <span class="bloodType">🩸 ${person.bloodType}</span>
    </div>
`;
        });
      } else {
        resultDiv.innerHTML = "⚠️ No matching blood types found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching the blood type data:", error);
      document.getElementById("result").innerHTML = "❌ Error loading data!";
    });
}
