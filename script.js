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
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calculateQueue() {
    const lambda = parseFloat(document.getElementById("lambda").value);
    const mu = parseFloat(document.getElementById("mu").value);
    const s = parseInt(document.getElementById("servers").value);

    const resultDiv = document.getElementById("queueResult");

    if (isNaN(lambda) || isNaN(mu) || isNaN(s) || lambda <= 0 || mu <= 0 || s < 1) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "กรุณากรอกค่า λ, μ และ s ให้ถูกต้อง!";
        return;
    }

    const rho = lambda / (s * mu);
    if (rho >= 1) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "ระบบไม่เสถียร: λ ≥ sμ";
        return;
    }

    // คำนวณ P0
    let sum1 = 0;
    for (let n = 0; n < s; n++) {
        sum1 += Math.pow(lambda / mu, n) / factorial(n);
    }
    const sum2 = Math.pow(lambda / mu, s) / (factorial(s) * (1 - rho));
    const P0 = 1 / (sum1 + sum2);

    // คำนวณ Lq, Wq, W
    const Lq = (Math.pow(lambda / mu, s) * rho * P0) / (factorial(s) * Math.pow(1 - rho, 2));
    const Wq = Lq / lambda;
    const W = Wq + 1 / mu;

    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <strong>ผลลัพธ์:</strong><br/>
        P₀ (ระบบว่าง): ${P0.toFixed(4)}<br/>
        Lq (ลูกค้าในคิวเฉลี่ย): ${Lq.toFixed(4)} คน<br/>
        Wq (เวลารอเฉลี่ย): ${Wq.toFixed(4)} หน่วยเวลา<br/>
        W (เวลาในระบบรวม): ${W.toFixed(4)} หน่วยเวลา
    `;
}
