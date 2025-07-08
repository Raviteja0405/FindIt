const Login = () => {
  const handleLogin = () => {
    // Redirect to backend which handles Google OAuth2
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/FindItLogo.svg"
            alt="FindIt Logo"
            className="mx-auto h-16 w-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to FindIt
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Sign in to report lost or found items on campus.
        </p>

        {/* Google Sign-In */}
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition duration-200 w-full cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path
              d="M533.5 278.4c0-18.5-1.5-36.3-4.4-53.6H272.1v101.4h147.4c-6.4 34.7-25.1 64.2-53.4 83.9v69h86.2c50.4-46.5 81.2-115.1 81.2-200.7z"
              fill="#4285F4"
            />
            <path
              d="M272.1 544.3c72.6 0 133.6-24 178.2-65.1l-86.2-69c-24 16.1-54.8 25.6-92 25.6-70.6 0-130.4-47.7-151.9-111.5H31.2v69.9c44.9 88.3 136.5 150.1 240.9 150.1z"
              fill="#34A853"
            />
            <path
              d="M120.2 324.3c-10.7-32-10.7-66.4 0-98.4V156H31.2c-39.6 77.2-39.6 168.1 0 245.3l89-77z"
              fill="#FBBC05"
            />
            <path
              d="M272.1 107.2c39.4 0 74.9 13.6 102.8 40.4l77.2-77.2C405.7 24 344.7 0 272.1 0 167.7 0 76.1 61.8 31.2 150.1l89 69.9c21.5-63.8 81.3-112.5 151.9-112.8z"
              fill="#EA4335"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
