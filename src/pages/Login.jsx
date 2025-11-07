import React, { useState, useEffect } from 'react';

const Login = () => {
    const [statusMessage, setStatusMessage] = useState({ text: '', type: 'hidden' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        setIsLoading(true);

        if (!form.checkValidity()) {
            setStatusMessage({ 
                text: 'Please check all required fields.', 
                type: 'error' 
            });
            setIsLoading(false);
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log("Login data collected:", data);

        // Simulate API call
        setTimeout(() => {
            setStatusMessage({ 
                text: 'Login successful! Redirecting to dashboard...', 
                type: 'success' 
            });
            setIsLoading(false);
            
            setTimeout(() => {
                form.reset();
                setStatusMessage({ text: '', type: 'hidden' });
            }, 2000);
        }, 1500);
    };

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
                `}
            </style>

            <div id="login-container" className="bg-white min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-2xl p-8 futuristic-card border border-gray-200 shadow-xl">
                    
                    <header className="text-center mb-8">
                        <div className="flex justify-center items-center mb-2 text-blue-600">
                            <i data-lucide="shield" className="w-8 h-8 mr-3"></i>
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-wider">
                                ACCESS PORTAL
                            </h1>
                        </div>
                        <p className="text-gray-600">Secure Login Required</p>
                    </header>

                    <form id="login-form" onSubmit={handleLogin} className="space-y-6">
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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

                            <div>
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

                        <div className="pt-4">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full p-4 text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-[1.01] shadow-lg shadow-blue-600/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <span className="flex items-center justify-center">
                                    {isLoading ? (
                                        <>
                                            <i data-lucide="loader-2" className="w-5 h-5 mr-2 animate-spin"></i>
                                            Authenticating...
                                        </>
                                    ) : (
                                        <>
                                            <i data-lucide="log-in" className="w-5 h-5 mr-2"></i>
                                            Access System
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium transition duration-300">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </form>

                    <div id="status-message" className={statusClasses[statusMessage.type]}>
                        {statusMessage.text}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Login;