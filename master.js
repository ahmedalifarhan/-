function searchBloodType() {
  const selectedBloodType = document.getElementById("bloodType").value;

  if (!selectedBloodType) {
    document.getElementById("result-body").innerHTML =
      "<tr><td colspan='4'>❌ Please select a blood type!</td></tr>";
    return;
  }

  fetch("bloodData.json")
    .then((response) => response.json())
    .then((data) => {
      const results = data.filter(
        (person) => person.bloodType === selectedBloodType
      );

      let resultBody = document.getElementById("result-body");
      resultBody.innerHTML = ""; // Clear previous results

      if (results.length > 0) {
        results.forEach((person) => {
          const internationalPhone = person.phone.replace(/^0/, "+20");

          // Create a new row for each person
          const row = document.createElement("tr");
          row.innerHTML = `
          <td class="phone">📞<a href="tel:${person.phone}">${person.phone}</a></td>
          <td class="whatsapp"><a href="https://wa.me/${internationalPhone}" target="_blank"><i class="fab fa-whatsapp"></i></a></td>
          <td class="type">🩸 ${person.bloodType}</td>
          <td class="name">👤 ${person.name}</td>
          `;
          resultBody.appendChild(row); // Add the new row to the table body
        });
      } else {
        resultBody.innerHTML =
          "<tr><td colspan='4'>⚠️ No matching blood types found.</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error fetching the blood type data:", error);
      document.getElementById("result-body").innerHTML =
        "<tr><td colspan='4'>❌ Error loading data!</td></tr>";
    });
}
