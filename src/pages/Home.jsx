import React from "react";
import Navbar from "../components/Navbar";
import { FaCheckCircle } from "react-icons/fa";
import Lottie from "lottie-react";
import grievanceAnimation from "../assets/grievance.json";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar />

      <section className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 max-w-7xl">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome to the{" "}
              <span className="text-purple-600">
                Grievance Management System
              </span>
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              A platform designed for{" "}
              <span className="font-semibold text-gray-900">
                transparency, efficiency, and quick resolution
              </span>{" "}
              of complaints. Whether you're a student, employee, or citizen, we
              ensure your concerns are{" "}
              <span className="underline decoration-purple-500">
                heard, tracked, and resolved
              </span>{" "}
              properly.
            </p>

            <div className="space-y-4">
              {[
                "Simple & User-Friendly Interface",
                "Real-Time Tracking of Complaints",
                "Secure & Confidential System",
                "Fast & Effective Resolutions",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-500 text-lg" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Lottie
              animationData={grievanceAnimation}
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            About the Project
          </h2>
          <p className="text-lg text-gray-700 text-center mb-12">
            The Grievance Management System is a modern platform built to
            streamline the process of submitting, managing, and resolving
            complaints. Our goal is to enhance transparency, reduce resolution
            time, and ensure user satisfaction.
          </p>

          <div className="space-y-8">
            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                1. How does the system work?
              </h3>
              <p className="text-gray-700">
                Users submit their grievances through a simple interface. Each
                complaint is tracked in real-time and assigned to the concerned
                authority for prompt action and resolution.
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                2. Is my data confidential?
              </h3>
              <p className="text-gray-700">
                Absolutely! We prioritize data security and confidentiality. All
                grievance data is encrypted and accessible only to authorized
                personnel.
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                3. Who can use this system?
              </h3>
              <p className="text-gray-700">
                Anyone! Whether you are a student, employee, or a member of the
                public — you can submit your grievances easily through our
                platform.
              </p>
            </div>

            <div className="bg-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                4. How fast are grievances resolved?
              </h3>
              <p className="text-gray-700">
                We aim for swift resolutions, typically within a few working
                days depending on the complexity of the issue. Users can track
                the status at every stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-500 py-6 mt-auto text-sm">
        © {new Date().getFullYear()} Grievance Management System. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Home;
