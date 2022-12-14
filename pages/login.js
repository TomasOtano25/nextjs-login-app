import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/api/auth/login", credentials);

    if (response.status === 200) {
      router.push("/dashboard");
    }
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
