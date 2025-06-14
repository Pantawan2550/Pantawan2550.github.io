# ระบบจัดการคิวแบบเรียลไทม์ (Real-time Queue Management System)

โปรเจกต์นี้เป็นระบบจัดการคิวที่ทำงานแบบเรียลไทม์ โดยใช้ Firebase Realtime Database เป็น backend สำหรับเก็บและซิงค์ข้อมูลระหว่างเครื่อง มี 2 หน้าเว็บหลัก คือ

- `admin.html` สำหรับเพิ่มและลบคิว
- `viewer.html` หรือ `index.html` สำหรับแสดงสถานะคิวแบบเรียลไทม์

---

## คุณสมบัติ

- เพิ่มคิวพร้อมคำนวณเวลารอโดยใช้สูตร M/M/s
- แสดงเวลารอคิวแบบเรียลไทม์ และอัปเดตข้อมูลทันทีทุกอุปกรณ์ที่เชื่อมต่อ
- ลบคิวเมื่อเสร็จสิ้นการให้บริการ
- แสดงจำนวนคิวที่กำลังรอ
- ใช้งานได้ง่ายผ่านเว็บเบราว์เซอร์ทุกแพลตฟอร์ม รวมถึง iPad

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
   - เปิดไฟล์ `admin.html` และ `viewer.html` (หรือ `index.html`)
   - ใส่ค่า `firebaseConfig` ในส่วนของการตั้งค่า Firebase ให้ตรงกับของคุณ

4. **เปิดไฟล์ HTML ในเว็บเบราว์เซอร์**
   - เปิด `admin.html` เพื่อเพิ่มหรือลบคิว
   - เปิด `viewer.html` หรือ `index.html` เพื่อแสดงสถานะคิวแบบเรียลไทม์

---

## โครงสร้างไฟล์ (ตัวอย่าง)
