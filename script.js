const GITHUB_TOKEN = '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';
const REPO = 'https://github.com/griffonkhlee/booking';
const FILE_PATH = 'bookings.json';


// Ū�����
async function fetchBookings() {
    const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const data = await response.json();
    const content = JSON.parse(atob(data.content)); // �ѽX Base64
    return content;
}

// �g�J���
async function updateBookings(bookings) {
    const url = `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;
    const response = await fetch(url, {
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const data = await response.json();
    const sha = data.sha; // ����ɮ� SHA

    const content = JSON.stringify(bookings);
    const encodedContent = btoa(content); // �s�X�� Base64

    await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `token ${GITHUB_TOKEN}` },
        body: JSON.stringify({
            message: 'Update bookings',
            content: encodedContent,
            sha: sha
        })
    });
}

// �b booking.html ������w��
document.getElementById('bookingForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const department = document.getElementById('department').value;
    const employeeId = document.getElementById('employeeId').value;
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const booking = { department, employeeId, room, date, time };

    try {
        const bookings = await fetchBookings();
        bookings.push(booking);
        await updateBookings(bookings);
        alert('�w�����\�I');
        document.getElementById('bookingForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('�w�����ѡA�еy��A�աC');
    }
});

// �b view.html ����ܹw�����p
async function displayBookings() {
    try {
        const bookings = await fetchBookings();
        const tableBody = document.getElementById('bookingTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // �M�Ų{�����e

        bookings.forEach(booking => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = booking.department;
            row.insertCell(1).textContent = booking.employeeId;
            row.insertCell(2).textContent = booking.room;
            row.insertCell(3).textContent = booking.date;
            row.insertCell(4).textContent = booking.time;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// �b view.html ���[������ܹw�����p
if (window.location.pathname.includes('view.html')) {
    displayBookings();
}