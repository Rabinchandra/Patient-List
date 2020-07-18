// Getting all the patients
// with sorted by id (descending order)
let currentPatientIndex = null,
	currentPatient = null,
	willDeletePatient = false;

// Get all the patients
const getAllPatients = function () {
	if (localStorage.getItem("tables") === null) {
		localStorage.setItem("tables", "[]");
	}
	const tables = JSON.parse(localStorage.getItem("tables"));
	const allPatients = [];
	tables.forEach((table) => {
		table.patients.forEach((patient) => {
			allPatients.push(patient);
		});
	});
	return allPatients.sort((a, b) => ~~b.id - ~~a.id);
};

// Function to indicate whether the display table tools will show or not
const willDisplayTableTools = function (willDisplay) {
	const tableTools = document.querySelector("#table-tools");
	if (willDisplay) {
		tableTools.style.display = "flex";
		setTimeout(() => {
			tableTools.style.opacity = "1";
		}, 100);
	} else {
		tableTools.style.opacity = "0";
		setTimeout(() => {
			tableTools.style.display = "none";
		}, 100);
	}
};

// Generate id
const generateId = function () {
	const allPatients = getAllPatients();
	if (allPatients.length === 0) return "0001";
	let newId = ~~allPatients[0].id + 1,
		no_digit = 4,
		result = "";

	for (let i = 0; i < no_digit - String(newId).length; i++) {
		result += "0";
	}
	return result + newId;
};

// show Patient details of currentPatient
const showPatientDetails = function (patient) {
	let container = document.querySelector(".patient-details-container"),
		details = document.querySelector(".patient-details"),
		medication = patient.medication;
	medicationHTML = "";

	if (medication !== undefined) {
		medicationHTML = medication.length === 0 ? "" : medication.reverse()[0];
	}

	container.style.right = "0";

	willDisplayTableTools(false);

	details.innerHTML = `
    <div class="patient-basic-details mt-3">
      <div>
        <table>
          <tr>
            <td>Id</td>
            <td>: ${patient.id}</td>
          </tr>
          <tr>
            <td>Patient's Name</td>
            <td>: ${patient.name}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>: ${patient.address}</td>
          </tr>
          <tr>
            <td>Date :</td>
            <td>: ${patient.date}</td>
          </tr>
        </table>
      </div>

      <div>
        <table>
          <tr>
            <td>Type</td>
            <td>: ${patient.type}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>: ${patient.age}</td>
          </tr>
          <tr>
            <td>Sex</td>
            <td>: ${patient.sex}</td>
          </tr>
          <tr>
            <td>Phone :</td>
            <td>: ${patient.phone}</td>
          </tr>
        </table>
      </div>

      </div>

      <div class="more-patient-info">
        <div>
        <div>
          <span>Call On Date/Next Visit Date :</span>
          ${patient.callOnDate}
        </div>

        <div>
          <span>Alarm Date :</span>
          ${patient.alarmDate}
        </div>

        <div>
        <span>Medication :</span>
        ${medicationHTML}
      </div>

        <div>
          <span>BP :</span>
          ${patient.bp} mraHg
        </div>

        <div>
          <span>Heights :</span>
          ${patient.heights} cms
        </div>

        <div>
          <span>Weights :</span>
          ${patient.weights} Kgs
        </div>

        <div>
          <span>IBW :</span>
          ${patient.ibw} kgs
        </div>

        <div>
          <span>BMI :</span>
          ${patient.bmi} kgs/m<sup>2</sup>
        </div>

        <div>
          <span>Waist Circumstance :</span>
          ${patient.waist_circumstance}
        </div>

        <div>
          <span>Angina/Claudication/TIA :</span>
          ${patient.angina_claudication_tia}
        </div>

        <div>
          <span>Doppler/Carotid :</span>
          ${patient.doppler_carotid}
        </div>

        <div>
          <span>Ankle-Brachial Index :</span>
          ${patient.ankle_brachial_index}
        </div>
        </div>
        <div>
        <div>
          <span>Bruit :</span>
          ${patient.bruit}
        </div>

        <div>
          <span>Impotence :</span>
          ${patient.impotence}
        </div>

        <div>
          <span>Distal Pulses/Reflexes :</span>
          ${patient.distal_pulses_reflexes}
        </div>

        <div>
          <span>Monofilament Scoring (Out of 10) :</span>
          ${patient.monofilament_scoring}
        </div>

        <div>
          <span>Vibration/Pinprick :</span>
          ${patient.vibration_pinprick}
        </div>

        <div>
          <span>Biothesiometer :</span>
          ${patient.biosthesiometer}
        </div>

        <div>
          <span>Durometer :</span>
          ${patient.durometer}
        </div>

        <div>
          <span>Hair loss/Dry Skin :</span>
          ${patient.hair_loss_dry_skin}
        </div>

        <div>
          <span>Fungal Infection :</span>
          ${patient.fungal_infection}
        </div>

        <div>
          <span>Deformities :</span>
          ${patient.deformities}
        </div>
        </div>
        <div>
        <div>
          <span>Nails :</span>
          ${patient.nails}
        </div>

        <div>
          <span>Teeth :</span>
          ${patient.teeth}
        </div>

        <div>
          <span>AC/PC :</span>
          ${patient.ac_pc} mg/dl
        </div>

        <div>
          <span>HBA<sub>1</sub>C :</span>
          ${patient.hba1c} %
        </div>

        <div>
          <span>Urea/Creatinine :</span>
          ${patient.urea_creatinine}
        </div>

        <div>
          <span>Na/K :</span>
          ${patient.na_k}
        </div>

        <div>
          <span>Micro :</span>
          ${patient.microalbumin}
        </div>

        <div>
          <span>T3 T4 TSH :</span>
          ${patient.t3_t4_tsh}
        </div>

        <div>
          <span>Others :</span>
          ${patient.others} mg/dl
        </div>

        <div>
          <span>Calculated eGFR :</span>
          ${patient.calculated_egfr} ml/min
        </div>
        </div>
      </div>
  `;
};

// ON click more details
// Show More Details
const moreDetails = function (e) {
	const tr = e.parentElement.parentElement,
		tbody = e.parentElement.parentElement.parentElement,
		id = e.getAttribute("data-id");
	// index of tr in tbody
	index = Array.from(tbody.children).indexOf(tr);
	currentPatientIndex = index;
	const patient = table
		.getCurrentTable()
		.patients.filter((patient) => patient.id === id)[0];
	currentPatient = patient;
	// willDeletePatient set to true to enable delete patient;
	willDeletePatient = true;
	showPatientDetails(patient);
};

// Delete Medicine
const deleteMedicines = function (e) {
	const container = document.querySelector(".medicines-list");
	container.removeChild(e.parentElement);
};

// Add Medication
const addMedicines = function () {
	const medicinesInput = document.querySelector(".medicines-input");
	const container = document.querySelector(".medicines-list");
	container.innerHTML += `
    <li class="list-group-item">
      <div class="d-inline">${medicinesInput.value}</div> &dash;
      <button 
        class="btn btn-danger btn-sm float-right delete-medicines-btn"
        onclick="deleteMedicines(this)"
        >
        &mdash;
      </button>
    </li>
  `;
};

// Medicine names array
const medicineNames = function () {
	let medicines = localStorage.getItem("medicines");
	if (!medicines) {
		localStorage.setItem("medicines", "[]");
		return [];
	}
	return JSON.parse(medicines);
};

// onclick medicine name div
const onClickMedicineName = function (e) {
	if (e.getAttribute("data-select") === "false") {
		e.setAttribute("data-select", "true");
		e.className = "medicine-selected";
	} else {
		e.setAttribute("data-select", "false");
		e.className = "";
	}

	const medicinesInput = document.querySelector(".medicines-input");
	const medicineNamesList = Array.from(
		document.querySelectorAll(".medicine-names div")
	);

	// Filtering out selected divs
	const selected = medicineNamesList.filter((m) => {
		return m.getAttribute("data-select") === "true" ? true : false;
	});

	// Inserting the selected divs to medicine names input
	medicinesInput.value = selected.map((m) => m.innerText).join(", ");
};

// Show Add Patient Inputs
const showPatientDataInputs = function (
	name = "",
	age = "",
	sex = "",
	address = "",
	type = "",
	medication = [],
	phone = "",
	date = new Date().toLocaleDateString("en-GB"),
	callOnDate = "",
	alarmDate = "",
	pulse_rate = "",
	bp = "",
	heights = "",
	weights = "",
	ibw = "",
	bmi = "",
	waist_circumstance = "",
	angina_claudication_tia = "",
	doppler_carotid = "",
	ankle_brachial_index = "",
	bruit = "",
	impotence = "",
	distal_pulses_reflexes = "",
	monofilament_scoring = "",
	vibration_pinprick = "",
	biosthesiometer = "",
	durometer = "",
	hair_loss_dry_skin = "",
	fungal_infection = "",
	deformities = "",
	nails = "",
	teeth = "",
	ac_pc = "",
	hba1c = "",
	urea_creatinine = "",
	na_k = "",
	microalbumin = "",
	t3_t4_tsh = "",
	others = "",
	calculated_egfr = ""
) {
	let inputs = document.querySelector(".add-patient-inputs"),
		sexOptionHtml = "";
	inputs.innerHTML = "";
	// Gender
	if (sex === "Male") {
		sexOptionHtml = `
      <option value="Male" selected>Male</option>
      <option value="Female">Female</option>
    `;
	} else if (sex === "Female") {
		sexOptionHtml = `
      <option value="Male">Male</option>
      <option value="Female" selected>Female</option>
    `;
	} else {
		sexOptionHtml = `
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    `;
	}

	inputs.innerHTML +=
		`
    <hr>
    <label for="name">Name: </label>
    <input type="text" class="form-control" id="name" value="${name}" />

    <label for="age">Age: </label>
    <input type="number" class="form-control" id="age" value="${age}" min="0" max="200"/>

    <label for="sex">Sex: </label>
    <Select class="form-control" id="sex">` +
		sexOptionHtml +
		`</select>

    <label for="address">Address:</label>
    <input type="text" class="form-control" id="address" value="${address}" />

    <label for="type">Type: </label>
    <input type="text" class="form-control" id="type" value="${type}" />

    <label>Medication 
      <button 
        class="btn btn-sm btn-success add-medication" 
        onclick="addMedicines()">
        +
      </button> :
    </label>
    <input 
        type="text" 
        class="form-control mb-3 medicines-input" 
        placeholder="Add medicines..." 
    />
    <hr>
    <div class="medicine-names"></div>
    <div style="clear:both">
    <hr>
    <strong>Medicine List:</strong>
    <ol class="medicines-list list-group mt-2">
    </ol>

    <label for="phone">Phone No: </label>
    <input type="text" class="form-control" id="phone" value="${phone}" />

    <label for="patient_date">Date: </label>
    <input type="text" class="form-control" id="patient_date" value="${date}" />

    <label for="callOnDate">Call On Date: </label>
    <input type="text" class="form-control" id="callOnDate" value="${callOnDate}" />

    <label for="alarmDate">Alarm Date: </label>
    <input type="text" class="form-control" id="alarmDate" value="${alarmDate}" />

    <label for="pulse_rate">Pulse Rate/mt :</label>
    <input type="text" class="form-control" id="pulse_rate" value="${pulse_rate}">

    <label for="bp">BP (mraHG) :</label>
    <input type="text" class="form-control" id="bp" value="${bp}">

    <label for="heights">Heights (cms) :</label>
    <input type="text" class="form-control" id="heights" value="${heights}">

    <label for="weights">Weights (Kgs) :</label>
    <input type="text" class="form-control" id="weights" value="${weights}">

    <label for="ibw">IBW (Kgs) :</label>
    <input type="text" class="form-control" id="ibw" value="${ibw}">

    <label for="bmi">BMI (Kgs/m<sup>2</sup>) :</label>
    <input type="text" class="form-control" id="bmi" value="${bmi}">

    <label for="waist_circumstance">Waist Circumstance :</label>
    <input type="text" class="form-control" id="waist_circumstance" value="${waist_circumstance}">

    <label for="angina_claudication_tia">Angina/Claudication/TIA :</label>
    <input type="text" class="form-control" id="angina_claudication_tia" value="${angina_claudication_tia}">

    <label for="doppler_carotid">Doppler/Carotid :</label>
    <input type="text" class="form-control" id="doppler_carotid" value="${doppler_carotid}">

    <label for="ankle_brachial_index">Ankle-Brachial Index :</label>
    <input type="text" class="form-control" id="ankle_brachial_index" value="${ankle_brachial_index}">

    <label for="bruit">Bruit (Carotid) :</label>
    <input type="text" class="form-control" id="bruit" value="${bruit}">

    <label for="impotence">Impotence :</label>
    <input type="text" class="form-control" id="impotence" value="${impotence}">

    <label for="distal_pulses_reflexes">Distal Pulses/Reflexes :</label>
    <input type="text" class="form-control" id="distal_pulses_reflexes" value="${distal_pulses_reflexes}">

    <label for="monofilament_scoring">Monofilament Scoring (Out of 10) :</label>
    <input type="text" class="form-control" id="monofilament_scoring" value="${monofilament_scoring}">

    <label for="vibration_pinprick">Vibration/Pinprick :</label>
    <input type="text" class="form-control" id="vibration_pinprick" value="${vibration_pinprick}">

    <label for="biosthesiometer">Biosthesiometer :</label>
    <input type="text" class="form-control" id="biosthesiometer" value="${biosthesiometer}">

    <label for="durometer">Durometer :</label>
    <input type="text" class="form-control" id="durometer" value="${durometer}">

    <label for="hair_loss_dry_skin">Hair loss/Dry Skin :</label>
    <input type="text" class="form-control" id="hair_loss_dry_skin" value="${hair_loss_dry_skin}">

    <label for="fungal_infection">Fungal Infection :</label>
    <input type="text" class="form-control" id="fungal_infection" value="${fungal_infection}">

    <label for="deformities">Deformities :</label>
    <input type="text" class="form-control" id="deformities" value="${deformities}">

    <label for="nails">Nails :</label>
    <input type="text" class="form-control" id="nails" value="${nails}">

    <label for="teeth">Teeth :</label>
    <input type="text" class="form-control" id="teeth" value="${teeth}">

    <label for="ac_pc">AC/PC (mg/dl) :</label>
    <input type="text" class="form-control" id="ac_pc" value="${ac_pc}">

    <label for="hba1c">HBA<sub>1</sub>C :</label>
    <input type="text" class="form-control" id="hba1c" value="${hba1c}">

    <label for="urea_creatinine">Urea/Creatinine</label>
    <input type="text" class="form-control" id="urea_creatinine" value="${urea_creatinine}">

    <label for="na_k">Na/K :</label>
    <input type="text" class="form-control" id="na_k" value="${na_k}">

    <label for="microalbumin">
      Microalbumin/(mg/g of Creat) 24 hrs Protein (g/24hrs) Urine spot Protein/Creatinine Ratio :
    </label>
    <input type="text" class="form-control" id="microalbumin" value="${microalbumin}">

    <label for="t3_t4_tsh">T3 T4 TH :</label>
    <input type="text" class="form-control" id="t3_t4_tsh" value="${t3_t4_tsh}">

    <label for="others">Others :</label>
    <input type="text" class="form-control" id="others" value="${others}">

    <label for="calculated_egfr">Calculated eGFR (ml/min) :</label>
    <input type="text" class="form-control" id="calculated_egfr" value="${calculated_egfr}">
  `;

	const medicineListContainer = document.querySelector(".medicines-list"),
		medicineNamesContainer = document.querySelector(".medicine-names");
	// pushing medicine name li in medicines list ol
	medication.forEach((m) => {
		medicineListContainer.innerHTML += `
      <li class="list-group-item">
        <div class="d-inline-block">${m.join(", ")}</div>
        <button 
          class="btn btn-danger btn-sm float-right delete-medicines-btn"
          onclick="deleteMedicines(this)"
          >
          &mdash;
        </button>
        
      </li>
    `;
	});

	// pushing medicine name div
	medicineNames().forEach((m) => {
		medicineNamesContainer.innerHTML += `
        <div onclick="onClickMedicineName(this)" data-select="false">${m}</div>
      `;
	});
};

// search patient by id and get its all data
const getPatientData = function (id) {
	// if id is null, then this function is being called by patient-id-submit
	if (!id) {
		id = document.querySelector("#patient-id-input").value;
	}

	const found = getAllPatients().find((patient) => patient.id == id);

	// Show the patient inputs with its predefined data
	showPatientDataInputs(
		found.name,
		found.age,
		found.sex,
		found.address,
		found.type,
		found.medication,
		found.phone,
		found.date,
		found.callOnDate,
		found.alarmDate,
		found.pulse_rate,
		found.bp,
		found.heights,
		found.weights,
		found.ibw,
		found.bmi,
		found.waist_circumstance,
		found.angina_claudication_tia,
		found.doppler_carotid,
		found.ankle_brahial_index,
		found.bruit,
		found.impotence,
		found.distal_pulses_reflexes,
		found.monofilament_scoring,
		found.vibration_pinprick,
		found.biosthesiometer,
		found.durometer,
		found.hair_loss_dry_skin,
		found.fungal_infection,
		found.deformities,
		found.nails,
		found.teeth,
		found.ac_pc,
		found.hba1c,
		found.urea_creatinine,
		found.na_k,
		found.microalbumin,
		found.t3_t4_tsh,
		found.others,
		found.calculated_egfr
	);
};

// Alert Message
const alertMsg = function (target, msg) {
	const alertBox = document.querySelector(target);
	alertBox.innerHTML = msg;
	setTimeout(() => (alertBox.innerHTML = ""), 2000);
};

// Patients with alarm date equal to today's date
const alarmDatePatients = function () {
	return getAllPatients().filter(
		(p) => p.alarmDate === new Date().toLocaleDateString("en-GB")
	);
};

const onClickAlarmDatePatient = function (e) {
	const id = e.getAttribute("data-id");
	alarmDatePatients().forEach((p) => {
		if (p.id === id) {
			willDeletePatient = false;
			showPatientDetails(p);
			return;
		}
	});
};

const notification = (function () {
	const no = document.querySelector(".notification-btn span");
	const list = document.querySelector(".notification-list");

	no.innerHTML = alarmDatePatients().length;
	// Appending each patient to notification-list container
	alarmDatePatients().map((p) => {
		list.innerHTML += `
      <a class="dropdown-item" data-id="${p.id}" onclick="onClickAlarmDatePatient(this)">
        <strong>ID : </strong> ${p.id}
      </a>
    `;
	});
})();

// Saving Data to database
const saveDataToDb = async function () {
	const tables = JSON.parse(localStorage.getItem("tables"));
	const res = await fetch("http://localhost:3000/tables/1", {
		method: "PUT",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			id: 1,
			content: tables,
		}),
	});

	const resjson = res.json();

	alert("Saved!");
};

const loadDataFromDb = async function () {
	const res = await fetch("http://localhost:3000/tables");
	const data = await res.json();
	localStorage.setItem("tables", JSON.stringify(data[0].content));
	localStorage.setItem("medicines", JSON.stringify(data[1].content));
	alert("Data Loaded Sucessfully!");
	location.reload();
};

// MEDICINES

// config delete medicine
const configDeleteMedicine = function (e) {
	if (!confirm("Do you really want to delete?")) return;
	const ul = document.querySelector(".contact-container ul");
	const medicineList = ul.querySelectorAll("li");
	const index = Array.from(medicineList).indexOf(e.parentElement);
	const modifiedMedicines = medicineNames();
	// Removing the medicine
	modifiedMedicines.splice(index, 1);
	// Saving the localStorage
	localStorage.setItem("medicines", JSON.stringify(modifiedMedicines));
	// Removing from ui
	ul.removeChild(e.parentElement);
};

// load all the medicines from localStorage to UI
const loadMedicinesToUI = function () {
	const medicines = medicineNames();
	medicines.forEach((m, index) => {
		document.querySelector(".contact-container ul").innerHTML += `
      <li class="list-group-item text-left bg-dark text-light mt-1">
        <span class="mr-4">${index + 1}</span>${m}
        <i 
          class="fas fa-trash float-right" style="cursor:pointer" 
          onclick="configDeleteMedicine(this)"></i>
      </li>
    `;
	});
};

// Save medicines list to db
const saveMedicinesToDb = async function () {
	const medicines = medicineNames();
	const res = await fetch("http://localhost:3000/tables/2", {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ id: 2, content: medicines }),
	});
	alert("Saved!");
};
