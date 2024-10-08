"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from 'primereact/toast';

import { auth, collection, getDocs, query, where } from '../../firebase.config'
import { createUser, getSession, handleServerLogOut } from "../components/serverTrigger/serverTrigger";
import { useMyContext } from "../layout";
import Link from 'next/link';

import HealthConnectLogo from '../image/HealthConnect.png';
import { Walter_Turncoat } from "next/font/google";


export default function Home() {

  const [email, setEmail] = useState("");
  const [walletPassword, setWalletPassword] = useState("")

  const { logIn, fetchSession } = useMyContext()

  const toast = useRef(null)

  const [walletAddress, setWalletAddress] = useState(null);

  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const openMintModal = () => {
    setIsMintModalOpen(true);
  };

  const closeMintModal = () => {
    setIsMintModalOpen(false);
  };

  const openTransferModal = () => {
    setIsTransferModalOpen(true);
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  useEffect(() => {
    getAllWallet()
    const storedWalletAddress = sessionStorage.getItem("walletAddress");
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
    }
  }, []);

  const [patientId, setPatientId] = useState('');
  const [authCode, setAuthCode] = useState('');

  const handleSearch = () => {
    // Implement search functionality here
    console.log(`Searching for Patient ID: ${patientId} with Auth Code: ${authCode}`);
  };

  const getAllWallet = async () => {
    try {
      const q = getDocs(collection(db, 'users'))
        .then((snapshot) => {
          console.log(snapshot.docs)
        })
      console.log(q)
    } catch (error) {

    }
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, walletPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      toast.current.show({ severity: 'success', summary: 'Success', detail: `Wallet: ${walletAddress} Created Successfully` });
      createUser({ walletAddress, name: result.result.user.name })
    } catch (error) {

    }
    finally {
      fetchSession()
      logIn()
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Toast ref={toast} />
      {/* //==========================Health Dashboard========================== */}
      <div className="min-h-screen mt-10 flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500 to-orange-400 flex items-center justify-center h-96 md:h-auto">
          <div>
            <img src={HealthConnectLogo} alt="HealthConnect Logo" className="w-20 h-auto" />
          </div>
          <div className="text-center p-8">
            <h1 className="text-6xl font-bold text-white mb-4">Medata</h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="p-10 w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6">Patient Login</h2>
            <p className="text-gray-500 mb-8">Welcome back! Please login to your account.</p>
            <form onSubmit={handleLogIn}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="useremail@gmail.com"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={walletPassword}
                  onChange={(e) => setWalletPassword(e.target.value)}
                  placeholder="**********"
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-500" />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <a href="#" className="text-sm text-purple-500 hover:text-purple-700">
                  Forgot Password?
                </a>
              </div>
              <button
                onClick={handleLogIn}
                className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-300"
              >
                Login
              </button>
            </form>
            <div style={{ justifyContent: 'space-between' }} className="flex">
              <div className="mt-6 text-center">
                <Link href="/patientSignup" className="text-sm text-purple-500 hover:text-purple-700">
                  SignUp
                </Link>
              </div>
              <div className="mt-6 text-center">

                <Link href="/doctorLogin" className="text-sm text-purple-500 hover:text-purple-700">
                  Doctor Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>


  );
}
