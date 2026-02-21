import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const QuickEmailForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState("");

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
          alert(`Письмо успешно отправлено на ${email} ✅`);
          setEmail("");
          formRef.current?.reset();
        },
        (error) => {
          console.error("EmailJS error:", error);
          alert("Ошибка отправки письма ❌");
        },
      );
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      style={{ display: "flex", gap: "10px" }}
    >
      <input
        type="email"
        name="to_email" // В шаблоне EmailJS переменная должна быть {{to_email}}
        placeholder="Введите email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default QuickEmailForm;
