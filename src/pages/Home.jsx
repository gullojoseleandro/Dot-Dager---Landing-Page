"use client"

import { useState, useEffect, useRef } from 'react'
import Image from '@images/dagger_image.png'
import { FaYoutube, FaTwitter, FaGithub, FaGuitar, FaCat, FaSkull, FaLock } from 'react-icons/fa'
import { GiPickle } from 'react-icons/gi'
import { IoLogoJavascript } from 'react-icons/io'
import { FaBookOpen } from 'react-icons/fa'
import { FaInstagram, FaTiktok, FaDiscord, FaSpotify, FaTwitch } from 'react-icons/fa'
import SubscriberCount from '../components/SubscriberCount'
import Loader from '@components/loader/Loader'
import { motion, AnimatePresence } from 'framer-motion'
import PopularVideos from '../components/PopularVideos'
import { useInView } from 'react-intersection-observer'
import SecretCodeDialog from '@components/SecretCode'

const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.8
        }
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.5
        }
    }
}

const staggerChildren = {
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const glowAnimation = {
    animate: {
        boxShadow: [
            '0 0 5px #FFA500',
            '0 0 20px #FFA500',
            '0 0 5px #FFA500',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
        }
    }
}

export default function Home() {
    const [loading, setLoading] = useState(true)
    const [showGame, setShowGame] = useState(false)
    const [secretCode, setSecretCode] = useState('')
    const [showSecretInput, setShowSecretInput] = useState(false)
    const [showSecretCode, setShowSecretCode] = useState(false)
    const secretInputRef = useRef(null)
    const mainRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 3500)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (secretCode.toLowerCase() === 'dager') {
            setShowGame(true)
            setSecretCode('')
            setShowSecretInput(false)
        }
    }, [secretCode])

    const handleSecretCode = () => {
        setShowSecretCode(true)
        setTimeout(() => {
            setShowSecretCode(false)
        }, 3000)
    }

    const handleSecretButtonClick = () => {
        setShowSecretInput(true)
    }

    const { ref: aboutMeRef, inView: inViewAboutMe } = useInView({ triggerOnce: false, threshold: 0.2 })
    const { ref: obsessionsRef, inView: inViewObsessions } = useInView({ triggerOnce: false, threshold: 0.2 })
    const { ref: connectRef, inView: inViewConnect } = useInView({ triggerOnce: false, threshold: 0.2 })
    const { ref: connectVideosRef, inView: inViewVideos } = useInView({ triggerOnce: false, threshold: 0.2 })

    return (
        <AnimatePresence mode="wait">
            {loading ? (
                <Loader key="loader" />
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen text-gray-100 font-sans relative overflow-hidden"
                    ref={mainRef}
                >
                    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 -z-10" />

                    {showGame && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowGame(false)}
                        >
                            <div className="bg-gray-800 p-4 rounded-lg shadow-xl max-w-md w-full">
                                <iframe
                                    src="https://tbot.xyz/lumber/"
                                    className="w-full aspect-[9/16] rounded-lg"
                                    allow="fullscreen"
                                />
                                <p className="text-sm text-gray-400 mt-2 text-center">Click fuera para cerrar</p>
                            </div>
                        </motion.div>
                    )}

                    <main className="container mx-auto px-4 py-12 relative">
                        <motion.section
                            className="text-center mb-20"
                            initial="hidden"
                            animate="visible"
                            variants={staggerChildren}
                        >
                            <motion.div
                                className="relative inline-block mb-8"
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.img
                                    src={Image}
                                    alt="Dot Dager"
                                    width={280}
                                    height={280}
                                    className="rounded-full mx-auto border-4 border-yellow-500 shadow-lg"
                                    animate={glowAnimation.animate}
                                />
                                <motion.div
                                    className="absolute -bottom-2 -right-2 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 10 }}
                                >
                                    PELIGRO
                                </motion.div>
                            </motion.div>
                            <motion.h1
                                className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 py-2 leading-tight"
                                variants={fadeInUp}
                            >
                                Dot Dager
                            </motion.h1>
                            <motion.p className="text-2xl text-gray-300 mb-6" variants={fadeInUp}>
                                Hola, yo soy Dager pero vos no.
                            </motion.p>
                            <motion.p className="text-1xl text-gray-300" variants={fadeInUp}>
                                Creador de Contenido | Programador | Amante de los Gatos y el Caos
                            </motion.p>
                        </motion.section>

                        <motion.section
                            id="sobre-mi"
                            className="mb-20 max-w-3xl mx-auto bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700 relative"
                            variants={fadeInUp}
                            initial="hidden"
                            animate={inViewAboutMe ? "visible" : "hidden"}
                            exit="exit"
                            ref={aboutMeRef}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Sobre Mí (si te atreves a saber)</h2>
                            <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                                ¡Eh, tú! Soy Mariano, también conocido como Dot Dager. Soy un creador de contenido con una pasión
                                enfermiza por la programación, los gatos, las guitarras, los pepinos y la filosofía.
                                Mi mundo es una mezcla caótica de código y creatividad, donde cada día es una nueva oportunidad
                                para traumatizar... digo, educar a mis seguidores.
                            </p>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                Advertencia: El consumo excesivo de mi contenido puede causar risas incontrolables,
                                crisis existenciales y un deseo repentino de abrazar a tu computadora.
                            </p>
                        </motion.section>

                        <motion.section
                            id="obsesiones"
                            className="mb-20"
                            initial="hidden"
                            animate={inViewObsessions ? "visible" : "hidden"}
                            exit="exit"
                            variants={staggerChildren}
                            ref={obsessionsRef}
                        >
                            <motion.h2
                                className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500"
                                variants={fadeInUp}
                            >
                                Mis Obsesiones
                            </motion.h2>
                            <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-6" variants={staggerChildren}>
                                {[
                                    { icon: IoLogoJavascript, text: "Programación", color: "text-yellow-400" },
                                    { icon: FaCat, text: "Gatos Diabólicos", color: "text-gray-300" },
                                    { icon: FaGuitar, text: "Guitarras", color: "text-red-500" },
                                    { icon: GiPickle, text: "Pepinos", color: "text-green-500" },
                                    { icon: FaBookOpen, text: "Filosofía", color: "text-blue-500" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-700 h-40 relative"
                                        variants={fadeInUp}
                                        whileHover={{
                                            scale: 1.1,
                                            boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <item.icon onClick={() => item.text === "Pepinos" ? handleSecretCode() : null} className={`text-5xl ${item.color} mb-4 ${item.text === "Pepinos" ? "cursor-not-allowed" : ""}`} />
                                        <span className="text-lg text-center" style={{ userSelect: 'none' }}>{item.text}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>

                        <PopularVideos
                            id="videos"
                            className="mb-20 bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700 relative"
                            initial="hidden"
                            animate={inViewVideos ? "visible" : "hidden"}
                            exit="exit"
                            variants={fadeInUp}
                            ref={connectVideosRef}
                        />

                        <motion.section
                            id="mis-redes"
                            className="mb-20 bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700 relative"
                            initial="hidden"
                            animate={inViewConnect ? "visible" : "hidden"}
                            exit="exit"
                            variants={fadeInUp}
                            ref={connectRef}
                            whileHover={{ scale: 1.02 }}
                        >
                            <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">Conéctate conmigo (si te atreves)</h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-3xl mx-auto">
                                {[
                                    { icon: FaYoutube, label: "El Antro de Dager", sublabel: "Canal Principal", color: "text-red-600 hover:text-red-700", url: "https://youtube.com/c/DagerXIV" },
                                    { icon: FaYoutube, label: "Live Clips", sublabel: "Clips de Streams", color: "text-red-600 hover:text-red-700", url: "https://youtube.com/@DagerLive" },
                                    { icon: FaYoutube, label: "Dager Music", sublabel: "Canal de Música", color: "text-red-600 hover:text-red-700", url: "https://youtube.com/c/DagerMusic" },
                                    { icon: FaInstagram, label: "Instagram", sublabel: "@dager.32", color: "text-pink-600 hover:text-pink-700", url: "https://instagram.com/dager.32" },
                                    { icon: FaTiktok, label: "TikTok", sublabel: "@elantrodedager", color: "text-gray-200 hover:text-gray-300", url: "https://tiktok.com/@elantrodedager" },
                                    { icon: FaTwitter, label: "Twitter", sublabel: "@Dager_32", color: "text-blue-400 hover:text-blue-500", url: "https://twitter.com/Dager_32" },
                                    { icon: FaGithub, label: "GitHub", sublabel: "@MarianoVilla", color: "text-gray-300 hover:text-gray-400", url: "https://github.com/MarianoVilla" },
                                    { icon: FaDiscord, label: "Discord", sublabel: "Comunidad", color: "text-indigo-400 hover:text-indigo-500", url: "https://discord.gg/4NFk6TamAB" },
                                    { icon: FaTwitch, label: "Twitch", sublabel: "@dagerxiv", color: "text-purple-500 hover:text-purple-600", url: "https://twitch.tv/dagerxiv" },
                                    { icon: FaSpotify, label: "Spotify", sublabel: "Música Original", color: "text-green-500 hover:text-green-600", url: "https://open.spotify.com/artist/6bkClBMJd4qKxJp0J5vHsz" },
                                ].map((item, index) => (
                                    <motion.a
                                        key={index}
                                        href={item.url}
                                        className={`flex flex-col items-center gap-2 ${item.color} transition-colors`}
                                        aria-label={item.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <item.icon className="text-4xl" />
                                        <span className="text-sm font-medium text-gray-300">{item.label}</span>
                                        <span className="text-xs text-gray-400">{item.sublabel}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section
                            className="mt-20 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <motion.button
                                className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xl font-bold py-4 px-10 rounded-full transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl relative"
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaSkull className="mr-3" />
                                <a href="https://www.youtube.com/@DotDager?sub_confirmation=1">
                                    Suscríbete bajo tu propio riesgo
                                </a>
                            </motion.button>
                        </motion.section>

                        <motion.div
                            className="fixed bottom-4 right-4"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            {showSecretCode ? (
                                <SecretCodeDialog secretCodeState={showSecretCode} />
                            ) : null}

                            {showSecretInput ? (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: 'auto' }}
                                    className="bg-gray-800 rounded-full overflow-hidden flex items-center"
                                >
                                    <input
                                        ref={secretInputRef}
                                        type="text"
                                        value={secretCode}
                                        onChange={(e) => setSecretCode(e.target.value)}
                                        className="bg-transparent text-white px-4 py-2 outline-none"
                                        placeholder="Enter secret code"
                                    />
                                    <button
                                        onClick={() => setShowSecretInput(false)}
                                        className="bg-red-600 text-white px-4 py-2"
                                    >
                                        Cancel
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    onClick={handleSecretButtonClick}
                                    className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaLock />
                                </motion.button>
                            )}
                        </motion.div>
                    </main>

                    <motion.footer
                        className="bg-gray-800 text-center p-10 border-t border-gray-700 relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <p className="text-gray-400 text-lg mb-2">&copy; {new Date().getFullYear()} Dot Dager. Todos los derechos reservados (y algunos izquierdos también).</p>
                        <p className="text-sm text-gray-500">Advertencia: El creador de esta página no se hace responsable de crisis existenciales, risas incontrolables o repentinos deseos de programar a las 3 AM.</p>
                    </motion.footer>

                    <SubscriberCount />
                </motion.div>
            )}
        </AnimatePresence>
    )
}