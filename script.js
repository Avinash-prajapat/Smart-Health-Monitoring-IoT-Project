function updateStatus() {
      // Dummy values (replace later with Arduino)
      let data = {
        temp: 37,
        heart: 82,
        oxygen: 95,
        humidity: 55,
        fall: false
      };

      let isNormal =
        (data.temp >= 36 && data.temp <= 37.5) &&
        (data.heart >= 60 && data.heart <= 100) &&
        (data.oxygen >= 94) &&
        (data.humidity >= 30 && data.humidity <= 60) &&
        (!data.fall);

      let box = document.getElementById("resultBox");
      box.style.display = "flex";

      if (isNormal) {
        box.className = "animated-result happy";
        box.innerHTML = `<div class="emoji">😊</div>
                         <p>✅ Patient is Normal</p>
                         <span class="hint">All health parameters are stable</span>`;
      } else {
        box.className = "animated-result danger";
        box.innerHTML = `<div class="emoji">⚠️</div>
                         <p>🚨 Patient needs Attention!</p>
                         <span class="hint">One or more parameters are critical</span>`;
      }
    }

function printReport() {
  let name = document.getElementById("patientName").value || "N/A";
  let age = document.getElementById("patientAge").value || "N/A";
  let gender = document.getElementById("patientGender").value || "N/A";
  let mobile = document.getElementById("patientmobile").value || "N/A";

  let temp = document.getElementById("temp").innerText;
  let heart = document.getElementById("heart").innerText;
  let oxygen = document.getElementById("oxygen").innerText;
  let humidity = document.getElementById("humidity").innerText;
  let fall = document.getElementById("fall").innerText;

  // ✅ Overall result from resultBox (agar dikh raha hai toh wahi text)
  let resultText = document.getElementById("resultBox").innerText || "N/A";

  let reportWindow = window.open("", "PrintWindow", "width=800,height=600");
  reportWindow.document.write(`
    <html>
    <head>
      <title>Patient Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          background: #ffffff;
          color: #222;
        }
        h1 {
          text-align: center;
          color: #0056b3;
          margin-bottom: 5px;
        }
        .subtitle {
        font-size: 14px;
        font-style: italic;
        color: #555;
        text-align: center;
        margin-top: 5px;
        }

        .team-credits {
        margin-top: 10px;
        font-size: 14px;
        color: #333;
        text-align: center;
        font-style: italic;
        }


        .info-box {
          border: 1px solid #0056b3;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          background: #f9faff;
        }
        .info-box p {
          margin: 6px 0;
          font-size: 14px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 25px;
        }
        th, td {
          border: 1px solid #aaa;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }
        th {
          background: #0056b3;
          color: white;
        }
        .result-box {
          border: 2px solid #0056b3;
          padding: 15px;
          border-radius: 6px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          background: #e6f0ff;
          color: #003d80;
          margin-bottom: 20px;
        }
        .btn {
          display:block;
          margin:0 auto;
          padding:10px 20px;
          background:#0056b3;
          color:white;
          font-size: 14px;
          border:none;
          border-radius:5px;
          cursor:pointer;
        }
        .btn:hover {
          background:#004494;
        }
      </style>
    </head>
    <body>
    <h1>🧾 Patient Health Report</h1>
    <div class="team-credits"><strong>Developed by:</strong> Anish Kumar, Avinash Kumar, Vipul Thakur</div>

      
      <!-- Patient Info -->
      <div class="info-box">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Mobile No.:</strong> ${mobile}</p>
      </div>
      
      <!-- Parameters Table -->
      <table>
        <tr><th>Parameter</th><th>Value</th></tr>
        <tr><td>🌡️ Body Temperature</td><td>${temp}</td></tr>
        <tr><td>❤️ Heart Rate</td><td>${heart}</td></tr>
        <tr><td>🫁 Oxygen Level (SpO₂)</td><td>${oxygen}</td></tr>
        <tr><td>💧 Room Humidity</td><td>${humidity}</td></tr>
        <tr><td>🧍‍♂️ Fall Detection</td><td>${fall}</td></tr>
      </table>
      
      <!-- ✅ Overall Result -->
      <div class="result-box">
        ${resultText}
      </div>
      
      <!-- Print Button -->
      <button class="btn" onclick="window.print()">⬇️ Download / Print PDF</button>
    </body>
    </html>
  `);
  reportWindow.document.close();
}

    

/*
    =====================================================
    🚀 Arduino/Backend se real-time data ke liye ye use karo
    =====================================================
    async function fetchData() {
        try {
            let response = await fetch("http://localhost:5000/data"); // Flask/Node API
            let data = await response.json();

            // HTML me values update karo
            document.getElementById("temperature").textContent = data.temperature + " °C";
            document.getElementById("oxygen").textContent = data.oxygen + " %";
            document.getElementById("heartrate").textContent = data.heartRate + " bpm";

            // Condition check
            let isNormal =
              (data.temperature >= 36 && data.temperature <= 37.5) &&
              (data.heartRate >= 60 && data.heartRate <= 100) &&
              (data.oxygen >= 94);

            let box = document.getElementById("resultBox");
            box.style.display = "flex";

            if (isNormal) {
              box.className = "animated-result happy";
              box.innerHTML = `<div class="emoji">😊</div>
                               <p>✅ Patient is Normal</p>
                               <span class="hint">All health parameters are stable</span>`;
            } else {
              box.className = "animated-result danger";
              box.innerHTML = `<div class="emoji">⚠️</div>
                               <p>🚨 Patient needs Attention!</p>
                               <span class="hint">One or more parameters are critical</span>`;
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Har 5 sec me Arduino data fetch hoga
    // setInterval(fetchData, 5000);
    */