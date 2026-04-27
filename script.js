function getStatus(staff) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (staff.authorizationStatus !== "Authorized") {
    return {
      text: "NOT CLEARED - NOT AUTHORIZED",
      css: "expired"
    };
  }

  if (!staff.expiry || staff.expiry === "N/A") {
    return {
      text: "CLEARED TO WORK - TRAINING HAS NO EXPIRY",
      css: "valid"
    };
  }

  const expiryDate = new Date(staff.expiry);
  expiryDate.setHours(0, 0, 0, 0);

  if (isNaN(expiryDate)) {
    return {
      text: "REVIEW REQUIRED - INVALID EXPIRY DATE",
      css: "review"
    };
  }

  if (expiryDate >= today) {
    return {
      text: "CLEARED TO WORK",
      css: "valid"
    };
  }

  return {
    text: "NOT CLEARED - TRAINING EXPIRED",
    css: "expired"
  };
}

function safeValue(value) {
  return value === null || value === undefined || value === "" ? "N.A." : value;
}

function renderOperator(staff) {
  const status = getStatus(staff);
  const expiryDisplay = !staff.expiry || staff.expiry === "N/A" ? "No Expiry / Lifetime unless provider or company policy states otherwise" : staff.expiry;
  const cert = staff.certificateLink
    ? `<a class="cert-link" href="${staff.certificateLink}" target="_blank">View Certificate</a>`
    : `<span class="cert-link">Certificate link: N.A.</span>`;

  return `
    <article class="card ${status.css}">
      <div class="profile">
        <img src="${staff.photo}" alt="${staff.name} photo" onerror="this.src='photos/no-photo.png';" />
        <div>
          <h3>${staff.name}</h3>
          <p>${staff.id}</p>
          <p>${staff.role}</p>
        </div>
      </div>

      <div class="status ${status.css}">${status.text}</div>

      <table class="details">
        <tr><td>Company</td><td>${safeValue(staff.company)}</td></tr>
        <tr><td>Equipment</td><td>${safeValue(staff.equipment)}</td></tr>
        <tr><td>Training</td><td>${safeValue(staff.trainingName)}</td></tr>
        <tr><td>Training Type</td><td>${safeValue(staff.trainingType)}</td></tr>
        <tr><td>Training Date</td><td>${safeValue(staff.trainingDate)}</td></tr>
        <tr><td>Validity Type</td><td>${safeValue(staff.validityType)}</td></tr>
        <tr><td>Expiry</td><td>${expiryDisplay}</td></tr>
        <tr><td>Refresher Required</td><td>${safeValue(staff.refresherRequired)}</td></tr>
        <tr><td>Banksman Required</td><td>${safeValue(staff.banksmanRequired)}</td></tr>
        <tr><td>PTW Required</td><td>${safeValue(staff.ptwRequired)}</td></tr>
        <tr><td>Authorization</td><td>${safeValue(staff.authorizationStatus)}</td></tr>
      </table>

      ${cert}

      <div class="warning">
        <b>Site Control Reminder:</b> Bobcat operation must be carried out on designated route only, with banksman guidance and valid PTW where required.
      </div>

      <p><b>Remarks:</b> ${safeValue(staff.remarks)}</p>
    </article>
  `;
}

function searchOperator() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.innerHTML = `<div class="not-found">Please enter Operator ID or Name.</div>`;
    return;
  }

  const matches = staffData.filter(staff =>
    staff.id.toLowerCase().includes(input) ||
    staff.name.toLowerCase().includes(input)
  );

  if (matches.length === 0) {
    resultDiv.innerHTML = `<div class="not-found">Operator not found.</div>`;
    return;
  }

  resultDiv.innerHTML = matches.map(renderOperator).join("");
}

function showAllOperators() {
  document.getElementById("result").innerHTML = staffData.map(renderOperator).join("");
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    document.getElementById("searchInput").value = id;
    searchOperator();
  } else {
    showAllOperators();
  }
}

document.addEventListener("DOMContentLoaded", loadFromUrl);
