document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const department = document.getElementById('department').value;
    const employeeId = document.getElementById('employeeId').value;
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const table = document.getElementById('bookingTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = department;
    cell2.innerHTML = employeeId;
    cell3.innerHTML = room;
    cell4.innerHTML = date;
    cell5.innerHTML = time;

    document.getElementById('bookingForm').reset();
});