import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Swal from "sweetalert2";

const Signup = () => {
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "hidden" });
  const [nidFileName, setNidFileName] = useState(null);
  const [profileFileName, setProfileFileName] = useState(null);
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof lucide !== "undefined") lucide.createIcons();
  }, [nidFileName, profileFileName]);

  const handleFileChange = (e, setFileName) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : null);
  }
  

  const handleRegistration = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get("email");
    const password = formData.get("password"); // Ensure your form includes this field

    // Convert FormData to a plain object
    const dataToSend = Object.fromEntries(formData.entries());

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await signup(email, password);
      const uid = userCredential.user.uid;

      // 2️⃣ Add Firebase UID to the data
      dataToSend.uid = uid;

      // 3️⃣ Send user data to backend
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }

      const backendData = await response.json();
      console.log("Backend response:", backendData);

      // ✅ Show success popup
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You’ll be redirected to the login page shortly.",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error during signup:", error);

      // ❌ Show error popup
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Something went wrong. Please try again.",
      });
    }
  };



  const fileInputClass = "file-input-wrapper relative block border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-6 text-center hover:border-blue-600 transition duration-300 cursor-pointer";

  const renderFileInput = (id, label, defaultIcon, fileName, setFileName) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className={fileInputClass}>
        <i data-lucide={fileName ? 'check-circle' : defaultIcon} className="w-6 h-6 mx-auto text-blue-600 mb-2"></i>
        <span className="text-sm font-medium text-gray-600">
          {fileName
            ? `File Selected: `
            : `Drag & Drop or `}
          <span className="text-blue-600 font-bold">{fileName || 'Browse File'}</span>
        </span>
        <input
          type="file"
          id={id}
          name={id}
          accept="image/*"
          required
          onChange={(e) => handleFileChange(e, setFileName)}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
      </div>
    </div>
  );

  const statusClasses = {
    hidden: 'hidden',
    success: 'mt-6 p-4 rounded-lg text-sm text-center bg-green-100 text-green-700 border border-green-200',
    error: 'mt-6 p-4 rounded-lg text-sm text-center bg-red-100 text-red-700 border border-red-200'
  };

  return (
    <>
      <style>
        {`
                  @keyframes glow-pulse {
                      0%, 100% {
                          box-shadow: 0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.1);
                      }
                      50% {
                          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4), 0 0 30px rgba(59, 130, 246, 0.2);
                      }
                  }

                  .futuristic-card {
                      animation: glow-pulse 6s ease-in-out infinite;
                  }

                  .futuristic-input {
                      background-color: #ffffff;
                      border: 1px solid #d1d5db;
                      color: #374151;
                      transition: all 0.3s ease;
                  }

                  .futuristic-input:focus {
                      outline: none;
                      border-color: #3b82f6;
                      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                  }

                  .file-input-wrapper:hover {
                      background-color: #eff6ff;
                      border-color: #3b82f6;
                  }
                `}
      </style>

      <div
        id="signup-container"
        className="bg-white min-h-screen flex items-center justify-center p-4"
      >
        <div className="w-full max-w-4xl bg-white rounded-2xl p-6 md:p-10 futuristic-card border border-gray-200 shadow-xl">
          <header className="text-center mb-8">
            <div className="flex justify-center items-center mb-2 text-blue-600">
              <i data-lucide="scan-eye" className="w-8 h-8 mr-3"></i>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wider">
                ACCESS PORTAL 7.0
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Secure Biometric Registration Required
            </p>
          </header>

          <form
            id="registration-form"
            onSubmit={handleRegistration}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b border-blue-200 pb-2">
                  Personal Data
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                

                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                    placeholder="+1 (555) 555-5555"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                    placeholder="user@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>

              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4 border-b border-blue-200 pb-2">
                  Identity & Location
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    required
                    className="futuristic-input w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 resize-none"
                    placeholder="Enter your complete address"
                  ></textarea>
                </div>

                {/* {renderFileInput(
                  "nid_photo",
                  "NID Photo (Front/Back)",
                  "file-up",
                  nidFileName,
                  setNidFileName
                )}

                {renderFileInput(
                  "profile_photo",
                  "Profile Photo",
                  "user-plus",
                  profileFileName,
                  setProfileFileName
                )} */}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full p-4 text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300
                                            transform hover:scale-[1.01] shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center">
                  <i data-lucide="rocket" className="w-5 h-5 mr-2"></i>
                  Initiate Registration Sequence
                </span>
              </button>
            </div>
            <div>
              <h1 className="font-bold text-gray-600">
                Already have an account? go to{" "}
                <Link to="/login" className="text-red-400 font-semibold">
                  Login
                </Link>
              </h1>
            </div>
          </form>

          <div
            id="status-message"
            className={statusClasses[statusMessage.type]}
          >
            {statusMessage.text}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;