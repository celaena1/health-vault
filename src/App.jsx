import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { FiShield, FiLogOut } from 'react-icons/fi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';

import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';

function AppContent() {
  const [account, setAccount] = useState("");
  const [role, setRole] = useState(null); // 'patient' or 'doctor'
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const userAccount = accounts[0];
        setAccount(userAccount);

        try {
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
          
          // Check role directly from the smart contract
          let isDoc = false;
          try {
            isDoc = await contract.isDoctor(userAccount);
          } catch (contractErr) {
            console.warn("Smart contract call failed (perhaps contract is not deployed to this network?):", contractErr);
          }
          
          const userRole = isDoc ? 'doctor' : 'patient';
          setRole(userRole);
          setStatus(`Wallet connected successfully! Role: ${isDoc ? 'Doctor' : 'Patient'}`);

          if (userRole === 'doctor') {
            navigate('/doctor');
          } else {
            navigate('/patient');
          }
        } catch (err) {
          console.warn("Could not fetch role, defaulting to patient.", err);
          setRole('patient');
          setStatus("Wallet connected successfully!");
          navigate('/patient');
        }
      } catch (err) {
        console.error(err);
        setStatus("Failed to connect wallet.");
      }
    } else {
      setStatus("Please install MetaMask to use this dApp.");
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setRole(null);
    setStatus("Wallet disconnected.");
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-8 px-4 sm:px-6 lg:px-8 bg-health-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-health-cyan/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-health-purple/20 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-0 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-3 bg-health-cyan/10 rounded-xl">
              <FiShield className="w-8 h-8 text-health-cyan" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-health-cyan to-health-teal">
              Health Vault
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!account ? (
              <button
                onClick={connectWallet}
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-health-cyan to-health-teal hover:shadow-lg hover:shadow-health-cyan/25 text-health-dark hover:-translate-y-0.5"
              >
                Connect Wallet
              </button>
            ) : (
              <>
                <div className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 bg-health-card border border-health-teal/30 text-health-teal">
                  <div className="w-2 h-2 rounded-full bg-health-teal animate-pulse-slow" />
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </div>
                <button
                  onClick={disconnectWallet}
                  className="p-3 bg-health-card border border-white/10 hover:bg-white/10 text-white rounded-xl transition-colors"
                  title="Disconnect"
                >
                  <FiLogOut />
                </button>
              </>
            )}
          </div>
        </header>

        {/* Global Status (useful during connection) */}
        {status && !account && (
          <div className="text-center text-health-cyan mb-4">
            {status}
          </div>
        )}

        {/* Main Content Router */}
        <main className="glass-card p-8 md:p-10 transition-all">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12 text-health-textMuted">
                <FiShield className="w-16 h-16 mx-auto mb-4 text-health-cyan/50" />
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to HealthVault</h2>
                <p>Please connect your MetaMask wallet to access your dashboard.</p>
              </div>
            } />

            <Route path="/patient" element={
              (!account || role !== 'patient') ? <Navigate to="/" replace /> : <PatientDashboard account={account} />
            } />

            <Route path="/doctor" element={
              (!account || role !== 'doctor') ? <Navigate to="/" replace /> : <DoctorDashboard account={account} />
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
