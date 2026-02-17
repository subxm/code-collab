import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, LogOut, Users, Code2, Clock, ArrowRight,
    Hash, X, Terminal, Loader2, Globe, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import { toast } from 'sonner';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.05, duration: 0.4 },
    }),
};

const langColors = {
    javascript: '#f7df1e',
    python: '#3776ab',
    java: '#ed8b00',
    cpp: '#00599c',
    go: '#00add8',
    typescript: '#3178c6',
    html: '#e34f26',
};

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);

    const fetchRooms = useCallback(async () => {
        try {
            const { data } = await api.get('/rooms');
            setRooms(data);
        } catch {
            toast.error('Failed to load rooms');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchRooms(); }, [fetchRooms]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-[var(--color-navy-950)]">
            {/* Top Bar */}
            <header className="border-b border-[var(--color-navy-800)] px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-accent-purple)] flex items-center justify-center">
                            <Terminal className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">CodeCollab</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-electric)] to-[var(--color-accent-purple)] flex items-center justify-center text-white text-xs font-bold">
                                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="text-sm text-[var(--color-navy-200)] hidden sm:block">
                                {user?.displayName}
                            </span>
                        </div>
                        <button onClick={handleLogout} className="btn-secondary py-1.5 px-3 text-xs">
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Your Rooms</h1>
                        <p className="text-sm text-[var(--color-navy-400)] mt-1">
                            Create or join a room to start coding
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setShowJoin(true)} className="btn-secondary">
                            <Hash className="w-4 h-4" /> Join Room
                        </button>
                        <button onClick={() => setShowCreate(true)} className="btn-primary">
                            <Plus className="w-4 h-4" /> New Room
                        </button>
                    </div>
                </div>

                {/* Room Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-6 h-6 text-[var(--color-electric)] animate-spin" />
                    </div>
                ) : rooms.length === 0 ? (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                        className="glass-card p-12 text-center"
                    >
                        <Code2 className="w-12 h-12 text-[var(--color-navy-500)] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No rooms yet</h3>
                        <p className="text-sm text-[var(--color-navy-400)] mb-6">
                            Create your first room or join one with a room code
                        </p>
                        <button onClick={() => setShowCreate(true)} className="btn-primary">
                            <Plus className="w-4 h-4" /> Create Room
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {rooms.map((room, i) => (
                            <motion.div
                                key={room.id}
                                initial="hidden"
                                animate="visible"
                                variants={fadeUp}
                                custom={i}
                                className="glass-card p-5 cursor-pointer group"
                                onClick={() => navigate(`/editor/${room.id}`)}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-semibold text-white group-hover:text-[var(--color-electric)] transition-colors">
                                        {room.name}
                                    </h3>
                                    {room.isPublic ? (
                                        <Globe className="w-4 h-4 text-[var(--color-accent-green)]" />
                                    ) : (
                                        <Lock className="w-4 h-4 text-[var(--color-navy-500)]" />
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-[var(--color-navy-400)]">
                                    <span className="flex items-center gap-1">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: langColors[room.defaultLang] || '#666' }}
                                        />
                                        {room.defaultLang}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" /> {room.memberCount || room.members?.length || 0}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(room.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--color-navy-700)]/50">
                                    <code className="text-xs font-mono text-[var(--color-navy-500)] bg-[var(--color-navy-900)] px-2 py-0.5 rounded">
                                        {room.roomCode}
                                    </code>
                                    <ArrowRight className="w-4 h-4 text-[var(--color-navy-600)] group-hover:text-[var(--color-electric)] transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Create Room Modal */}
            <AnimatePresence>
                {showCreate && (
                    <CreateRoomModal
                        onClose={() => setShowCreate(false)}
                        onCreated={() => { setShowCreate(false); fetchRooms(); }}
                    />
                )}
            </AnimatePresence>

            {/* Join Room Modal */}
            <AnimatePresence>
                {showJoin && (
                    <JoinRoomModal
                        onClose={() => setShowJoin(false)}
                        onJoined={() => { setShowJoin(false); fetchRooms(); }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function CreateRoomModal({ onClose, onCreated }) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [isPublic, setIsPublic] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/rooms', { name, language, isPublic });
            toast.success('Room created!');
            onCreated();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass-card p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-white">Create Room</h3>
                    <button onClick={onClose} className="text-[var(--color-navy-500)] hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-[var(--color-navy-300)] mb-1.5 block">Room Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Awesome Project"
                            required
                            className="input"
                            id="create-room-name"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-[var(--color-navy-300)] mb-1.5 block">Default Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="input"
                            id="create-room-language"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="go">Go</option>
                            <option value="typescript">TypeScript</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsPublic(true)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${isPublic
                                    ? 'bg-[var(--color-electric)]/[0.15] text-[var(--color-electric)] border border-[var(--color-electric)]/30'
                                    : 'bg-[var(--color-navy-800)] text-[var(--color-navy-400)] border border-transparent'
                                }`}
                        >
                            <Globe className="w-3.5 h-3.5 inline mr-1.5" /> Public
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsPublic(false)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${!isPublic
                                    ? 'bg-[var(--color-electric)]/[0.15] text-[var(--color-electric)] border border-[var(--color-electric)]/30'
                                    : 'bg-[var(--color-navy-800)] text-[var(--color-navy-400)] border border-transparent'
                                }`}
                        >
                            <Lock className="w-3.5 h-3.5 inline mr-1.5" /> Private
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3"
                        id="create-room-submit"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Room <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

function JoinRoomModal({ onClose, onJoined }) {
    const [roomCode, setRoomCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleJoin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/rooms/join?roomCode=${roomCode}`);
            toast.success('Joined room!');
            onJoined();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to join room');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="glass-card p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-white">Join Room</h3>
                    <button onClick={onClose} className="text-[var(--color-navy-500)] hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleJoin} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-[var(--color-navy-300)] mb-1.5 block">Room Code</label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-navy-500)]" />
                            <input
                                type="text"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                placeholder="K7R-MXQP"
                                required
                                className="input pl-10 font-mono uppercase tracking-wider"
                                id="join-room-code"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full justify-center py-3"
                        id="join-room-submit"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Join Room <ArrowRight className="w-4 h-4" /></>}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}
