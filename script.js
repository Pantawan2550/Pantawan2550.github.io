const queues = {};
const MAX_QUEUES = 30;
const DEFAULT_DURATION = 300; // ค่าเริ่มต้น 5 นาที (300 วินาที)

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

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} นาที ${s} วินาที`;
}

function addQueue() {
    const queueNumber = parseInt(document.getElementById("queueNumber").value);
    const duration = parseInt(document.getElementById("duration").value) || DEFAULT_DURATION;

    if (isNaN(queueNumber)) {
        showNotification("กรุณาระบุหมายเลขคิวให้ถูกต้อง!");
        return;
    }
    if (queues[queueNumber]) {
        showNotification(`คิวที่ ${queueNumber} กำลังให้บริการอยู่แล้ว!`);
        return;
    }
    if (Object.keys(queues).length >= MAX_QUEUES) {
        showNotification(`ขออภัย คิวเต็มแล้ว!`);
        return;
    }

    queues[queueNumber] = duration;
    showNotification(`[${getThaiTime()}] คิวที่ ${queueNumber} เริ่มให้บริการ และจะใช้เวลา ${formatTime(duration)}`);
    updateQueues();

    const interval = setInterval(() => {
        if (queues[queueNumber] > 0) {
            queues[queueNumber]--;
            updateQueues();
        } else {
            clearInterval(interval);
            removeQueue(queueNumber);
        }
    }, 1000);
}

function removeQueue(queueNumber) {
    if (queues[queueNumber] !== undefined) {
        delete queues[queueNumber];
        showNotification(`[${getThaiTime()}] คิวที่ ${queueNumber} เสร็จสิ้น`);
        updateQueues();
    }
}

function updateQueues() {
    const queuesContainer = document.getElementById("queues");
    queuesContainer.innerHTML = "";
    Object.keys(queues).forEach(queueNumber => {
        const queueDiv = document.createElement("div");
        queueDiv.classList.add("queue");
        queueDiv.innerHTML = `
            <p>คิวที่ ${queueNumber}</p>
            <p>เหลือเวลา: ${formatTime(queues[queueNumber])}</p>
            <button class="remove-btn" onclick="removeQueue(${queueNumber})">เสร็จสิ้น</button>
        `;
        queuesContainer.appendChild(queueDiv);
    });
}
