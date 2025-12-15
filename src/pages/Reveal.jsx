import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, TrendingUp, AlertCircle, Home, Lightbulb, X } from 'lucide-react';
import { recommendations } from '../data/recommendations';

export default function Reveal() {
    const { hash } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showRecs, setShowRecs] = useState(false);

    useEffect(() => {
        fetch(`/data/${hash}.json`)
            .then(res => {
                if (!res.ok) throw new Error('Match not found');
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Invalid Key or Match Not Found');
                setLoading(false);
            });
    }, [hash]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-christmas-red"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 text-center max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <Link
                        to="/"
                        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <Home className="w-4 h-4" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-y-auto">
            {/* Background Glow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-christmas-green/20 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 max-w-2xl w-full bg-slate-800/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl text-center my-8"
            >
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="inline-block p-4 bg-gradient-to-br from-christmas-red to-red-700 rounded-2xl shadow-lg mb-8"
                >
                    <Gift className="w-16 h-16 text-white" />
                </motion.div>

                <h2 className="text-2xl text-slate-400 font-light mb-4">You are the Secret Santa for</h2>

                <motion.h1
                    initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-12"
                >
                    {data.receiver}
                </motion.h1>

                <div className="grid md:grid-cols-2 gap-6 text-left bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Mission</h3>
                        <p className="text-lg text-slate-200">Gift a Stock</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Deadline</h3>
                        <p className="text-lg text-slate-200">January 2026</p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700/50 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-stock-up">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-medium">Market is Open</span>
                    </div>

                    <button
                        onClick={() => setShowRecs(true)}
                        className="w-full py-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl border border-slate-600 transition-all flex items-center justify-center gap-2 text-slate-300 hover:text-white"
                    >
                        <Lightbulb className="w-4 h-4" />
                        Need Inspiration?
                    </button>
                </div>
            </motion.div>

            {/* Recommendations Modal */}
            <AnimatePresence>
                {showRecs && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                        onClick={() => setShowRecs(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-slate-800 w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-700 shadow-2xl p-6 md:p-8"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Lightbulb className="text-yellow-400" />
                                    Stock Ideas
                                </h2>
                                <button
                                    onClick={() => setShowRecs(false)}
                                    className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {recommendations.map((cat, idx) => (
                                    <div key={idx} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                        <h3 className="text-lg font-bold text-christmas-red mb-1">{cat.category}</h3>
                                        <p className="text-sm text-slate-400 mb-4">{cat.description}</p>
                                        <div className="space-y-3">
                                            {cat.stocks.map((stock, sIdx) => (
                                                <div key={sIdx} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors">
                                                    <div>
                                                        <div className="font-bold text-white">{stock.ticker}</div>
                                                        <div className="text-xs text-slate-400">{stock.name}</div>
                                                    </div>
                                                    <div className="text-xs text-slate-500 text-right max-w-[120px]">
                                                        {stock.reason}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
