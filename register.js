document
  .getElementById("addBloodTypeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const bloodType = document.getElementById("newBloodType").value;
    const phone = document.getElementById("phone").value;

    if (!name || !bloodType || !phone) {
      document.getElementById("addResult").innerText =
        "❌ Please fill all fields!";
      return;
    }

    const newEntry = {
      name: name,
      bloodType: bloodType,
      phone: phone,
    };

    fetch("addBloodType.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("addResult").innerText = data.message; // تحديث الرسالة بناءً على الاستجابة
        document.getElementById("addBloodTypeForm").reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("addResult").innerText =
          "❌ Error adding blood type!";
      });
  });
