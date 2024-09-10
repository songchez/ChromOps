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
    <div className="container mx-auto p-4 m-16 w-1/4">
      <h1 className="text-3xl font-bold mb-4">Contact us</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            className="input text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e?.target?.value ?? "")}
            placeholder="Your name"
          />
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            className="input text-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value ?? "")}
            placeholder="Your email"
          />
        </div>
        <div className="form-control">
          <label>Message</label>
          <textarea
            className="textarea text-black"
            value={message}
            onChange={(e) => setMessage(e?.target?.value ?? "")}
            placeholder="Your message"
          />
        </div>
        <button type="submit" color="primary">
          Submit
        </button>
      </form>
      <p className="mt-4">
        You can also email me directly at{" "}
        <a href="mailto:tama4840@gmail.com">tama4840@gmail.com</a>
      </p>
    </div>
  );
}
