import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contacts.css"; // تأكد من استيراد ملف الـ CSS

export default function Contacts() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="contact-container">
      <form className="contact-form">
        <h2>🔒 تسجيل الدخول</h2>

        <div className="input-group">
          <label htmlFor="email">📧 البريد الإلكتروني</label>
          <input
            type="text"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="pass">🔑 كلمة المرور </label>
          <input
            type="password"
            id="password"
            placeholder="أدخل كلمة المرور"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit">إرسال</button>

        <div className="form-footer">
          <p>🔙 <Link to="/">العودة إلى الصفحة الرئيسية</Link></p>
        </div>
      </form>
    </div>
  );
}
