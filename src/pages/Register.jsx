import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      await apiClient.post("/api/v1/enroll", {
        username: formData.username,
        phone_number: formData.phoneNumber,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>Hello?</div>
  )
}
