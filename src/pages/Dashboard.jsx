import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="min-h-screen p-8">
            <header className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <TrendingUp className="text-stock-up" />
                    Wichtel Portfolio
                </h1>
                <div className="text-slate-400 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Market Closed
                </div>
            </header>

            <main className="max-w-6xl mx-auto">
                <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Leaderboard Coming Soon</h2>
                    <p className="text-slate-400 max-w-md mx-auto">
                        Once the gifting period ends, track the performance of all gifted stocks here in real-time.
                    </p>
                </div>
            </main>
        </div>
    );
}
