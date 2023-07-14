document.addEventListener('DOMContentLoaded', () => {
  const API_URL = 'http://localhost:8080/employees/';
  const employeeForm = document.getElementById('employeeForm');
  const employeeList = document.getElementById('employeeList');

  employeeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const departmentInput = document.getElementById('department');

    const name = nameInput.value;
    const department = departmentInput.value;

    addEmployee(name, department);

    nameInput.value = '';
    departmentInput.value = '';
  });

  function addEmployee(name, department) {
    const employee = { name, department };

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      displayEmployee(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function displayEmployee(employee) {
    const employeeElement = document.createElement('div');
    employeeElement.innerHTML = `
      <strong>Name:</strong> ${employee.name}<br>
      <strong>Department:</strong> ${employee.department}<br>
      <button onclick="deleteEmployee(${employee.id})">Delete</button>
      <hr>
    `;

    employeeList.appendChild(employeeElement);
  }

  function deleteEmployee(id) {
    fetch(API_URL + id, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const employeeElement = document.querySelector(`[onclick="deleteEmployee(${id})"]`).parentElement;
      employeeElement.remove();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function loadEmployees() {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        data.forEach(employee => {
          displayEmployee(employee);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  loadEmployees();
});
