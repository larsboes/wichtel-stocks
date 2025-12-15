import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CryptoJS from 'crypto-js';
import { Gift, ArrowRight, Snowflake } from 'lucide-react';

export default function Landing() {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleReveal = (e) => {
        e.preventDefault();
        if (!key.trim()) {
            setError('Please enter your Wichtel Key');
            return;
        }

        try {
            // Hash the key to find the file
            const hash = CryptoJS.SHA256(key.trim()).toString(CryptoJS.enc.Hex);
            navigate(`/reveal/${hash}`);
        } catch (err) {
            setError('Invalid key format');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-700 shadow-2xl"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-christmas-red/20 rounded-full">
                        <Gift className="w-12 h-12 text-christmas-red" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-christmas-red to-christmas-green bg-clip-text text-transparent">
                    Wichtel Stocks
                </h1>
                <p className="text-slate-400 text-center mb-8">
                    Enter your secret key to reveal your match
                </p>

                <form onSubmit={handleReveal} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={key}
                            onChange={(e) => {
                                setKey(e.target.value);
                                setError('');
                            }}
                            placeholder="Paste your key here..."
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-christmas-red focus:border-transparent outline-none transition-all text-center font-mono tracking-wider"
                        />
                        {error && (
                            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-christmas-red to-red-600 rounded-xl font-semibold shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 group"
                    >
                        Reveal Match
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </form>
            </motion.div>

            {/* Decorative Snowflakes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            x: Math.random() * window.innerWidth,
                            y: -20
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: window.innerHeight + 20,
                            x: Math.random() * window.innerWidth
                        }}
                        transition={{
                            duration: 5 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        className="absolute top-0 left-0"
                    >
                        <Snowflake className="text-slate-700/20 w-4 h-4" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
