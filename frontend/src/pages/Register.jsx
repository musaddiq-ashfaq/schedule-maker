import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form values:", { name, email, password });

  if (!name || !email || !password) {
    console.error("All fields are required");
    return;
  }

  try {
    await register(name, email, password);
  } catch (error) {
    console.error("Registration error:", error.message);
  }
};


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Register</h2>
        <input type="text" className="border p-2 w-full mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="border p-2 w-full mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
