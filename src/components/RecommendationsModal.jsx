import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';
import { recommendations } from '../data/recommendations';

export default function RecommendationsModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
                    onClick={onClose}
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
                                onClick={onClose}
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
    );
}
