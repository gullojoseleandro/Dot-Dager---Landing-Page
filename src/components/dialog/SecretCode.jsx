"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye } from 'react-icons/fa';

const SecretCodeDialog = ({ secretCodeState }) => {
    const [showSecretCode, setShowSecretCode] = useState(secretCodeState);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (showSecretCode) {
            const getRandomPosition = () => {
                const x = Math.random() * (window.innerWidth - 200);
                const y = Math.random() * (window.innerHeight - 100);
                setPosition({ x, y });
            };
            const interval = setInterval(getRandomPosition, 2000);
            return () => clearInterval(interval);
        }
    }, [showSecretCode]);


    return (
        <AnimatePresence>
            {showSecretCode && (
                <>
                    <motion.div
                        className="hidden md:block top-0 left-0 z-50"
                        style={{
                            top: position.y,
                            left: position.x,
                        }}
                        initial="hidden"
                    >
                        <motion.div
                            className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 rounded-lg shadow-xl border border-gray-700 text-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h1 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                                Mirá la consola maestro
                            </h1>
                            <span>👀</span>
                            {showSecretCode &&
                                console.log(
                                    "%c Secret Code: %cDager",
                                    "color: white; background: #3a3a3a; padding: 4px 8px; border-radius: 4px; font-weight: bold;",
                                    "color: #FFA500; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);"
                                )}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full mx-4"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                        >
                            <h1 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                                Secret Code:
                            </h1>
                            <span className="block text-3xl font-extrabold tracking-wider text-center text-white mb-4">
                                Dager
                            </span>
                            <button
                                onClick={() => setShowSecretCode(false)}
                                className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded shadow hover:from-red-700 hover:to-red-800 transition-colors duration-300"
                            >
                                Cerrar
                            </button>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SecretCodeDialog;

