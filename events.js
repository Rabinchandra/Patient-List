const table = new Table();

// Render Table list when DOM loads
table.renderTables();

// Add table
// On click add table btn on sidebar
document.querySelector(".add-table").addEventListener("click", () => {
	document.querySelector(
		"#add-table-name"
	).value = new Date().toLocaleDateString("en-GB");
});

// On click add table btn on modal box
document.querySelector("#modal-add-table-btn").addEventListener("click", () => {
	const name = document.querySelector("#add-table-name").value;
	// if similar name not found
	if (table.searchTable(name)) {
		table.addTable(name);
	}
});

// Select option of is-new-patient
document.querySelector("#is-new-patient").addEventListener("change", () => {
	let isNewPatient = document.querySelector("#is-new-patient").value,
		idInputContainer = document.querySelector(".patient-id-input-container"),
		addPatientInputs = document.querySelector(".add-patient-inputs");

	if (isNewPatient === "yes") {
		// Show new patient inputs
		// clearing id input container
		idInputContainer.innerHTML = "";
		showPatientDataInputs();
	} else if (isNewPatient === "no") {
		addPatientInputs.innerHTML = "";
		idInputContainer.innerHTML = `
      <hr>
      <label for="patient-id-input">Enter the Patient Id:</label>
      <input type="text" class="form-control" id="patient-id-input"/>
      <button 
        class="btn btn-success mt-2" 
        id="patient-id-submit" 
        onclick="getPatientData()"
      >
      Submit
      </button>
    `;
	}
});

// Add patient btn on add patient dialog box
document
	.querySelector("#modal-add-patient-btn")
	.addEventListener("click", () => {
		const isNewPatient = document.querySelector("#is-new-patient");
		if (isNewPatient.value === "yes") {
			// Add a new patient
			table.addPatient(null);
		} else if (isNewPatient.value === "no") {
			// Add an old patient
			const id = document.querySelector("#patient-id-input");
			table.addPatient(id.value);
			console.log(id.value);
		}
	});

// on click patient details back -> back to patient list
document
	.querySelector(".patient-details-back")
	.addEventListener("click", () => {
		const container = document.querySelector(".patient-details-container");
		container.style.right = "-120%";
		willDisplayTableTools(true);
	});

// on click print
document.querySelector(".print").addEventListener("click", () => {
	const back = document.querySelector(".patient-details-back");
	const print = document.querySelector(".print");
	const del = document.querySelector(".delete-patient");

	back.style.opacity = "0";
	print.style.opacity = "0";
	del.style.opacity = "0";

	window.print();

	setTimeout(() => {
		back.style.opacity = "1";
		print.style.opacity = "1";
		del.style.opacity = "1";
	});
});

// Delete patient
document.querySelector(".delete-patient").addEventListener("click", () => {
	const tables = JSON.parse(table.getTables()),
		curTable = table.getCurrentTable(),
		detailsContainer = document.querySelector(".patient-details-container");

	if (!willDeletePatient) {
		return;
	}

	if (confirm("Are you sure want to delete this patient?")) {
		curTable.patients.splice(currentPatientIndex, 1);
		// Updating table
		table.updateTable(curTable);
		// Re-redering the modified current table
		table.renderCurrentTable();
		// Displaying off patient details container
		detailsContainer.style.right = "-120%";
		// Display on table tools
		willDisplayTableTools(true);
	}
});

// Delete Table
document.querySelector(".delete-table").addEventListener("click", () => {
	let tables = JSON.parse(table.getTables()),
		name = prompt("Enter the name of the table to be deleted:");
	// Filter tables
	tables = tables.filter((table) => table.name !== name);
	// Saving to localStorage
	localStorage.setItem("tables", JSON.stringify(tables));
	// Rerendering tables
	table.renderTables();
});

// Search patient
document.querySelector(".search-input input").addEventListener("keyup", (e) => {
	const value = e.target.value.toLowerCase(),
		container = document.querySelector(".patient-list-container tbody");
	container.innerHTML = "";
	if (value !== "") {
		table.getCurrentTable().patients.forEach((p) => {
			if (p.name.toLowerCase().indexOf(value) !== -1 || p.id === value) {
				container.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.sex}</td>
            <td>${p.address}</td>
            <td>${p.phone}</td>
            <td>${p.type}</td>
            <td>
              <button 
              class="btn btn-primary" 
              onclick="moreDetails(this)" 
              data-id="${p.id}">
              More Details
              </button>
            </td>
          </tr>
        `;
			}
		});
	} else {
		table.getCurrentTable().patients.map((p) => {
			container.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.sex}</td>
            <td>${p.address}</td>
            <td>${p.phone}</td>
            <td>${p.type}</td>
            <td>
              <button 
              class="btn btn-primary" 
              onclick="moreDetails(this)" 
              data-id="${p.id}">
              More Details
              </button>
            </td>
          </tr>`;
		});
	}
});

// Search Table
document.querySelector(".search-table-input").addEventListener("keyup", (e) => {
	const value = e.target.value.toLowerCase();
	(ul = document.querySelector("ul.tables")),
		(tablesList = JSON.parse(table.getTables()));
	ul.innerHTML = "";
	if (value !== "") {
		tablesList.map((t) => {
			if (t.name.toLowerCase().indexOf(value) !== -1) {
				ul.innerHTML += `<li>${t.name}</li>`;
			}
		});
	} else {
		tablesList.map((t) => {
			ul.innerHTML += `<li>${t.name}</li>`;
		});
	}
	// add events to li
	table.addEventToTableLi();
});

// Save to Database
document.querySelector(".save").addEventListener("click", () => saveDataToDb());

// config

// Developer
document.querySelector(".developer").addEventListener("click", () => {
	const container = document.querySelector(".table-content");
	container.innerHTML = `
  <div class="developer-container">
    <img src="img/developer.jpeg" alt="Sorry, image not found"/>
    <p>
      Hi, I'm Rabin. I'm a Junior Web Developer. <br>
      I built this application using Web Technologies - <strong>HTML, CSS & JS</strong>
    </p>
  </div>
  `;
	sidebarOff();
	willDisplayTableTools(false);
});

// Contact
document.querySelector(".config-medicines").addEventListener("click", () => {
	const container = document.querySelector(".table-content");
	const medicines = medicineNames();
	container.innerHTML = `
    <div class="contact-container w-50 mt-4 container">
      <form class="form-group">
        <input type="text" class="form-control" placeholder="Type medicine name here...">
        <button type="submit" class="btn btn-success w-100 mt-2">Add Medicine</button>
        <button 
          type="button" 
          class="save-medicine-list btn btn-primary mt-3 w-100"
          onclick="saveMedicinesToDb()">
          Save
        </button>
      </form>
      <div class="mt-5 mb-2 h3">Medicine List</div>
      <hr>
      <ul class="list-group">
      </ul>
    </div>
  `;
	loadMedicinesToUI();
	// on submit the contact container form
	document
		.querySelector(".contact-container form")
		.addEventListener("submit", (e) => {
			e.preventDefault();
			const value = document.querySelector(".contact-container form input")
				.value;
			const ul = document.querySelector(".contact-container ul");
			const len = Array.from(ul.querySelectorAll("li")).length + 1;
			ul.innerHTML += `
      <li class="list-group-item text-left bg-dark text-light mt-1">
        <span class="mr-4">${len}.</span> ${value}
        <i 
          class="fas fa-trash float-right" style="cursor:pointer"
          onclick="configDeleteMedicine(this)"></i>
      </li>
    `;
			medicines.push(value);
			// Saving to localStorage
			localStorage.setItem("medicines", JSON.stringify(medicines));
		});

	sidebarOff();
	willDisplayTableTools(false);
});

// Settings
document.querySelector(".settings").addEventListener("click", () => {
	const container = document.querySelector(".table-content");
	container.innerHTML = `
    <button 
      class="btn btn-primary loadDataBtn" 
      title="Load all the datas from the Database"
      onclick="loadDataFromDb()">
      Load Data
    </button>
  `;
	sidebarOff();
	willDisplayTableTools(false);
});

// Search patient config
document
	.querySelector(".search-from-all-patient-input")
	.addEventListener("keyup", (e) => {
		const container = document.querySelector(".searched-patient-container"),
			value = e.target.value.toLowerCase(),
			filtered = getAllPatients().filter(
				(p) => p.name.toLowerCase().indexOf(value) !== -1
			);
		container.innerHTML = "";
		// Iterating each patient in filtered
		filtered.map((p) => {
			container.innerHTML += `
        <li class="list-group-item mt-3">
          <b>ID : </b> ${p.id} <br>
          <b>Name : </b> ${p.name} <br>
          <b>Age : </b> ${p.age} <br>
          <b>Sex : </b> ${p.sex} <br>
          <b>Date : </b> ${p.date} <br>
          <b>Address : </b> ${p.address} <br>
        </li>
      `;
		});
	});
