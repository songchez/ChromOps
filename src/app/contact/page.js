"use client";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      window.alert("Please fill out all the fields!");
      return;
    }
    console.log(name, email, message);
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 m-16 w-full md:w-1/2 xl:w-1/4">
      <h1 className="text-3xl font-bold mb-4">Contact us</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="form-control">
          <label>이름</label>
          <input
            className="input text-black rounded-sm"
            type="text"
            value={name}
            onChange={(e) => setName(e?.target?.value ?? "")}
            placeholder="Your name"
          />
        </div>
        <div className="form-control">
          <label>이메일</label>
          <input
            className="input text-black rounded-sm"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value ?? "")}
            placeholder="Your email"
          />
        </div>
        <div className="form-control">
          <label>메시지</label>
          <textarea
            className="textarea text-black rounded-sm"
            value={message}
            onChange={(e) => setMessage(e?.target?.value ?? "")}
            placeholder="Your message"
          />
        </div>
        <button type="submit" className="btn btn-primary rounded-sm m-5">
          메일보내기
        </button>
      </form>
      <p className="mt-4">
        B2B, 도매, 공동구매, 마케팅 문의 ▼{" "}
        <a href="mailto:tama4840@gmail.com">tama4840@gmail.com</a>
      </p>
    </div>
  );
}
