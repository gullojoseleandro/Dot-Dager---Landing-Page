import { motion } from 'framer-motion'
import Image from '@images/Lumberjack ‐ Hecho con Clipchamp (1).gif'

export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <img
          src={Image}
          alt="Lumberjack Loading"
          className="mx-auto mb-4 w-50 h-40"
        />
        <motion.div
          className="text-yellow-400 text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Cargando...
        </motion.div>
      </div>
    </motion.div>
  )
}

