import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          alert("Сообщение отправлено ✅");
          formRef.current?.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert(error.text);
        },
      );
  };

  return (
    <form className="contact-form" ref={formRef} onSubmit={sendEmail}>
      <h2>Связаться с нами</h2>

      <input type="text" name="user_name" placeholder="Ваше имя" required />

      <input type="email" name="user_email" placeholder="Ваш email" required />

      <textarea name="message" placeholder="Сообщение" rows={5} required />

      <button type="submit">Отправить</button>
    </form>
  );
};

export default ContactForm;
