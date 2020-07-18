
// TABLE CONSTRUCTOR
const Table = function () {
  this.currentTableIndex = null;
  this.patients = [];

  // Iterating each table list in ui to add event listener of click
  this.addEventToTableLi = function () {
    const table_li = Array.from(document.querySelectorAll(".tables li"));
    table_li.forEach((li) => {
      li.addEventListener("click", (e) => {
        const tables = JSON.parse(table.getTables());
        let current_table = tables.filter(
          (t) => t.name === e.target.innerText
        )[0];
        // Index of current_table in tables
        this.currentTableIndex = tables.indexOf(current_table);
        // Render current table
        this.renderCurrentTable();
      });
    });
  };

  // Get tables
  this.getTables = function () {
    let tables = localStorage.getItem("tables");
    // if tables is empty
    if (tables === null) {
      tables = "[]";
    }
    return tables;
  };

  // Get current table
  this.getCurrentTable = function () {
    const tables = JSON.parse(this.getTables());
    return tables[this.currentTableIndex];
  };

  // Adding table
  this.addTable = function (name) {
    const newTable = {
      name,
      date: new Date().toLocaleDateString('en-GB'),
      patients: [],
    };
    // Fetching the tables from localStorage
    const tables = JSON.parse(this.getTables());
    // Appending the new Table to tables at the top
    tables.unshift(newTable);
    // Updating the tables in localStorage
    localStorage.setItem("tables", JSON.stringify(tables));
    // re-render table list
    this.renderTables();
    this.addEventToTableLi();
  };

  // Search a particular table
  this.searchTable = function (name) {
    const tables = JSON.parse(this.getTables());
    const filtered = tables.filter((table) => table.name === name);
    return filtered.length === 0;
  };

  // Rendering table list function
  this.renderTables = function () {
    const ul = document.querySelector(".tables");
    const tableList = JSON.parse(this.getTables());
    // Clearing ul first
    ul.innerHTML = "";
    // Iterating through tables
    tableList.forEach(function (table) {
      // Appending to ul
      ul.innerHTML += `
        <li>${table.name}</li>
      `;
    });
    this.addEventToTableLi();
  };

  // Rendering current table function
  this.renderCurrentTable = function () {
    const ct = this.getCurrentTable();
    const tableContent = document.querySelector(".table-content");

    tableContent.innerHTML = "";
    tableContent.innerHTML = `
      <div class="d-flex justify-content-between p-4" >
        <div>Table: ${ct.name}</div>
        <div>Date: ${ct.date}</div>
      </div>
      <table class="table patient-list-container text-center table-striped">
        <thead class="bg-secondary text-light">
          <th>Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Type</th>
          <th></th>
        </thead>
        <tbody>
        <tbody>
      </div>
    `;
    ct.patients.forEach((patient) => {
      tableContent.querySelector(".patient-list-container tbody").innerHTML += `
        <tr>
          <td>${patient.id}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.sex}</td>
          <td>${patient.address}</td>
          <td>${patient.phone}</td>
          <td>${patient.type}</td>
          <td>
            <button 
              class="btn btn-primary" 
              onclick="moreDetails(this)" 
              data-id="${patient.id}">
              More Details
            </button>
          </td>
        </tr>
      `;
    });
    // Display table tools
    willDisplayTableTools(true);
  };

  // Add patient to current table
  this.addPatient = function (id) {
    // if id is null, then it is a new patient
    // else old patient

    // check if id is already included in currentTable
    // if yes, then replace it with the new patient
    
    const name = document.querySelector("#name").value,
      age = document.querySelector("#age").value,
      sex = document.querySelector("#sex").value,
      address = document.querySelector("#address").value,
      type = document.querySelector("#type").value,
      medication = Array.from(document.querySelectorAll('.medicines-list li div')),
      phone = document.querySelector("#phone").value,
      date = document.querySelector("#patient_date").value,
      callOnDate = document.querySelector("#callOnDate").value,
      alarmDate = document.querySelector("#alarmDate").value,
      pulse_rate = document.querySelector("#pulse_rate").value,
      bp = document.querySelector("#bp").value,
      heights = document.querySelector("#heights").value,
      weights = document.querySelector("#weights").value,
      ibw = document.querySelector("#ibw").value,
      bmi = document.querySelector("#bmi").value,
      waist_circumstance = document.querySelector("#waist_circumstance").value,
      angina_claudication_tia = document.querySelector("#angina_claudication_tia").value,
      doppler_carotid = document.querySelector("#doppler_carotid").value,
      ankle_brachial_index = document.querySelector("#ankle_brachial_index").value,
      bruit = document.querySelector("#bruit").value,
      impotence = document.querySelector("#impotence").value,
      distal_pulses_reflexes = document.querySelector("#distal_pulses_reflexes").value,
      monofilament_scoring = document.querySelector("#monofilament_scoring").value,
      vibration_pinprick = document.querySelector("#vibration_pinprick").value,
      biosthesiometer = document.querySelector("#biosthesiometer").value,
      durometer = document.querySelector("#durometer").value,
      hair_loss_dry_skin = document.querySelector("#hair_loss_dry_skin").value,
      fungal_infection = document.querySelector("#fungal_infection").value,
      deformities = document.querySelector("#deformities").value,
      nails = document.querySelector("#nails").value,
      teeth = document.querySelector("#teeth").value,
      ac_pc = document.querySelector("#ac_pc").value,
      hba1c = document.querySelector("#hba1c").value,
      urea_creatinine = document.querySelector("#urea_creatinine").value,
      na_k = document.querySelector("#na_k").value,
      microalbumin = document.querySelector("#microalbumin").value,
      t3_t4_tsh = document.querySelector("#t3_t4_tsh").value,
      others = document.querySelector("#others").value,
      calculated_egfr = document.querySelector("#calculated_egfr").value

    const newPatient = {
      id: id === null ? generateId() : id,
      name,
      age,
      sex,
      address,
      type,
      medication: medication.map(m => m.innerText).map(m => m.split(', ')),
      phone,
      date,
      callOnDate,
      alarmDate,
      pulse_rate,
      bp,
      heights,
      weights,
      ibw,
      bmi,
      waist_circumstance,
      angina_claudication_tia,
      doppler_carotid,
      ankle_brachial_index,
      bruit,
      impotence,
      distal_pulses_reflexes,
      monofilament_scoring,
      vibration_pinprick,
      biosthesiometer,
      durometer,
      hair_loss_dry_skin,
      fungal_infection,
      deformities,
      nails,
      teeth,
      ac_pc,
      hba1c,
      urea_creatinine,
      na_k,
      microalbumin,
      t3_t4_tsh,
      others,
      calculated_egfr
    };
    
    const currentTable = this.getCurrentTable();
    //  if it is an old patient
    //  then check if the same patient is contained in the current table
    //  if yes then update it
    //  else add a new one
    if (id !== null) {
      let index = null;
      const filtered = currentTable.patients.filter((p,i) => {
        if(p.id === id) {
          index = i;
          return true;
        }
      });
      if(filtered.length !== 0) {
        let modifiedTable = table.getCurrentTable();
        modifiedTable.patients[index] = newPatient;
        this.updateTable(modifiedTable);
        this.renderCurrentTable();
        return;
      }
    }

    // Pushing the new patient to the current table patient list
    currentTable.patients.push(newPatient);
    // updating tables
    this.updateTable(currentTable);
    // Render updated table
    this.renderCurrentTable();
  };

  // update table
  this.updateTable = function (modifiedTable) {
    const tables = JSON.parse(this.getTables());
    tables[this.currentTableIndex] = modifiedTable;
    // Saving to local Storage
    localStorage.setItem("tables", JSON.stringify(tables));
  };
};


