---

## เริ่มต้นใช้งาน

1. **โคลนหรือดาวน์โหลด** โปรเจกต์นี้จาก GitHub ลงเครื่องของคุณ

2. **ตั้งค่า Firebase**
   - สร้างโปรเจกต์ Firebase ที่ [https://console.firebase.google.com](https://console.firebase.google.com)
   - เปิดใช้งาน Realtime Database (ตั้งค่าเป็นแบบ "test mode" เพื่อทดลอง)
   - คัดลอกค่า `firebaseConfig` จากหน้าโปรเจกต์ Firebase ของคุณ เช่น

     ```js
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT_ID.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

3. **แก้ไขไฟล์ HTML**
   - ใส่ `firebaseConfig` ลงในไฟล์ HTML ทั้งใน `admin.html` และ `viewer.html` (ถ้ามี)

4. **เปิดไฟล์ HTML ในเว็บเบราว์เซอร์**
   - เปิด `admin.html` เพื่อเพิ่มหรือลบคิว
   - เปิด `viewer.html` หรือ `index.html` เพื่อแสดงสถานะคิวแบบเรียลไทม์

---

## วิธีใช้งานใน GitHub Pages

1. สร้าง repository ใหม่ใน GitHub (หรือใช้ repo ที่มีอยู่แล้ว)

2. อัปโหลดไฟล์ทั้งหมด (เช่น `admin.html`, `viewer.html`, `index.html`, `README.md`)

3. ไปที่ **Settings > Pages** ใน GitHub repo ของคุณ

4. เลือก branch ที่ต้องการ (เช่น `main` หรือ `master`) และเลือกโฟลเดอร์ root (`/`)

5. กด **Save** เพื่อเปิดใช้งาน GitHub Pages

6. รอสักครู่ จากนั้นเข้า URL ที่ GitHub แจ้ง (เช่น `https://your-username.github.io/your-repo-name/`)

---

## รายละเอียดฟีเจอร์ในโค้ด

- **เพิ่มคิว**: กรอกหมายเลขคิว, ค่า λ (อัตราลูกค้ามาถึงต่อนาที), μ (อัตราบริการต่อนาที), จำนวนพนักงาน (s) แล้วกดปุ่มเพิ่มคิว
- **คำนวณเวลารอ**: ใช้สูตรคิว M/M/s เพื่อประมาณเวลารอของแต่ละคิว
- **แสดงผลคิว**: แสดงหมายเลขคิวและเวลารอที่เหลือแบบนาทีและวินาที
- **ลบคิว**: กดปุ่ม "เสร็จ" เพื่อเอาคิวออกจากระบบและ Firebase
- **ซิงค์ข้อมูลเรียลไทม์**: ทุกการเปลี่ยนแปลงจะถูกอัปเดตทันทีในทุกอุปกรณ์ที่เปิดเว็บนี้ผ่าน Firebase Realtime Database

---

## ตัวอย่างโค้ด Firebase ใน HTML

```html
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.1/firebase-database-compat.js"></script>
<script>
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // ตัวอย่างการเชื่อมต่อกับฐานข้อมูล
  db.ref("queues").on("value", snapshot => {
    const data = snapshot.val();
    // อัพเดต UI ตามข้อมูลที่ได้
  });
</script>
