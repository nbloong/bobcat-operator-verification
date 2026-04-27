function getStatus(staff) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (staff.authorizationStatus !== "Authorized") {
    return {
      text: "NOT CLEARED - NOT AUTHORIZED",
      css: "expired",
      expiry: null
    };
  }

  // Company-controlled validity: trainingDate + validityYears
  if (staff.trainingDate && staff.validityYears) {
    const trainingDate = new Date(staff.trainingDate);
    const expiryDate = new Date(trainingDate);

    expiryDate.setFullYear(expiryDate.getFullYear() + staff.validityYears);
    expiryDate.setHours(0, 0, 0, 0);

    if (expiryDate >= today) {
      return {
        text: "CLEARED TO WORK",
        css: "valid",
        expiry: expiryDate
      };
    }

    return {
      text: "NOT CLEARED - REFRESHER REQUIRED",
      css: "expired",
      expiry: expiryDate
    };
  }

  // True no-expiry training
  if (!staff.expiry || staff.expiry === "N/A" || staff.expiry === "N.A.") {
    return {
      text: "CLEARED TO WORK - TRAINING HAS NO EXPIRY",
      css: "valid",
      expiry: null
    };
  }

  const expiryDate = new Date(staff.expiry);
  expiryDate.setHours(0, 0, 0, 0);

  if (isNaN(expiryDate)) {
    return {
      text: "REVIEW REQUIRED - INVALID EXPIRY DATE",
      css: "review",
      expiry: null
    };
  }

  if (expiryDate >= today) {
    return {
      text: "CLEARED TO WORK",
      css: "valid",
      expiry: expiryDate
    };
  }

  return {
    text: "NOT CLEARED - TRAINING EXPIRED",
    css: "expired",
    expiry: expiryDate
  };
}

function safeValue(value) {
  return value === null || value === undefined || value === "" ? "N.A." : value;
}

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function renderOperator(staff) {
  const status = getStatus(staff);

  const validityDisplay = staff.validityYears
    ? `Company Controlled (${staff.validityYears} years)`
    : safeValue(staff.validityType);

  const expiryDisplay = status.expiry
    ? formatDate(status.expiry)
    : "No Expiry / Lifetime unless provider or company policy states otherwise";

  const cert = staff.certificateLink
    ? `<a class="cert-link" href="${staff.certificateLink}" target="_blank">📄 View Certificate</a>`
    : `<span class="cert-link">Certificate: N.A.</span>`;

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

      <div class="status ${status.css}">
        ${status.text}
      </div>

      <table class="details">
        <tr><td>Company</td><td>${safeValue(staff.company)}</td></tr>
        <tr><td>Equipment</td><td>${safeValue(staff.equipment)}</td></tr>
        <tr><td>Training</td><td>${safeValue(staff.trainingName)}</td></tr>
        <tr><td>Training Type</td><td>${safeValue(staff.trainingType)}</td></tr>
        <tr><td>Training Date</td><td>${safeValue(staff.trainingDate)}</td></tr>
        <tr><td>Validity Type</td><td>${validityDisplay}</td></tr>
        <tr><td>Expiry</td><td>${expiryDisplay}</td></tr>
        <tr><td>Refresher Required</td><td>${safeValue(staff.refresherRequired)}</td></tr>
        <tr><td>Banksman Required</td><td>${safeValue(staff.banksmanRequired)}</td></tr>
        <tr><td>PTW Required</td><td>${safeValue(staff.ptwRequired)}</td></tr>
        <tr><td>Authorization</td><td>${safeValue(staff.authorizationStatus)}</td></tr>
      </table>

      ${cert}

      <div class="warning">
        <b>Site Control Reminder:</b>
        Equipment operation must be carried out by authorised operators only,
        on approved route / work area, with banksman guidance where required,
        and valid PTW where applicable.
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
    staff.name.toLowerCase().includes(input) ||
    staff.role.toLowerCase().includes(input) ||
    staff.equipment.toLowerCase().includes(input)
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
