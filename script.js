const tables = {};
const MAX_TABLES = 30;
const DEFAULT_DURATION = 15;

function getThaiTime() {
    return new Date().toLocaleTimeString("th-TH", { hour12: false });
}

function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

function addTable() {
    const tableNumber = parseInt(document.getElementById("tableNumber").value);
    const duration = parseInt(document.getElementById("duration").value) || DEFAULT_DURATION;

    if (isNaN(tableNumber)) {
        showNotification("กรุณาระบุหมายเลขโต๊ะให้ถูกต้อง!");
        return;
    }
    if (tables[tableNumber]) {
        showNotification(`โต๊ะ ${tableNumber} มีลูกค้าอยู่แล้ว!`);
        return;
    }
    if (Object.keys(tables).length >= MAX_TABLES) {
        showNotification(`ขออภัย โต๊ะเต็มแล้ว!`);
        return;
    }

    tables[tableNumber] = duration;
    showNotification(`[${getThaiTime()}] ลูกค้าเข้าไปที่โต๊ะ ${tableNumber} และจะออกใน ${duration} วินาที`);
    updateTables();

    const interval = setInterval(() => {
        if (tables[tableNumber] > 0) {
            tables[tableNumber]--;
            updateTables();
        } else {
            clearInterval(interval);
            removeTable(tableNumber);
        }
    }, 1000);
}

function removeTable(tableNumber) {
    if (tables[tableNumber] !== undefined) {
        delete tables[tableNumber];
        showNotification(`[${getThaiTime()}] ลูกค้าโต๊ะ ${tableNumber} ออกไป`);
        updateTables();
    }
}

function updateTables() {
    const tablesContainer = document.getElementById("tables");
    tablesContainer.innerHTML = "";
    Object.keys(tables).forEach(tableNumber => {
        const tableDiv = document.createElement("div");
        tableDiv.classList.add("table");
        tableDiv.innerHTML = `
            <p>โต๊ะ ${tableNumber}</p>
            <p>เหลือเวลา: ${tables[tableNumber]} วินาที</p>
            <button class="remove-btn" onclick="removeTable(${tableNumber})">ออก</button>
        `;
        tablesContainer.appendChild(tableDiv);
    });
}
