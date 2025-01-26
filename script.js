const API_KEY = '$2a$10$s6lqvbbHMChtN0nVrkT2DuouoqhKfd7KM7fd4dOTDCjxeGM047wiS';
const BIN_ID = '67961025e41b4d34e47ee14e ';
const BASE_URL = `https://api.jsonbin.io/v3/b/67961025e41b4d34e47ee14e`;

// 提交預約
document.getElementById('bookingForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const department = document.getElementById('department').value;
    const employeeId = document.getElementById('employeeId').value;
    const room = document.getElementById('room').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const booking = { department, employeeId, room, date, time };

    try {
        // 獲取現有預約資料
        const response = await fetch(BASE_URL, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        const bookings = data.record || [];

        // 添加新預約
        bookings.push(booking);

        // 更新資料庫
        await fetch(BASE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(bookings)
        });

        alert('預約成功！');
        document.getElementById('bookingForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('預約失敗，請稍後再試。');
    }
});

// 顯示預約情況
async function displayBookings() {
    try {
        const response = await fetch(BASE_URL, {
            headers: { 'X-Master-Key': API_KEY }
        });
        const data = await response.json();
        const bookings = data.record || [];

        const tableBody = document.getElementById('bookingTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // 清空現有內容

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

// 在 view.html 中加載時顯示預約情況
if (window.location.pathname.includes('view.html')) {
    displayBookings();
}