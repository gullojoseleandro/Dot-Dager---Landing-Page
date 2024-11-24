import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { FaPlay } from 'react-icons/fa'

const videos = [
  {
    id: 'fUeIDRcI0ZM',
    title: 'Intenté contratar un junior y... tenemos que hablar.',
    thumbnail: `https://img.youtube.com/vi/fUeIDRcI0ZM/maxresdefault.jpg`,
  },
  {
    id: 'c2EJRboAYL4',
    title: 'Mirá esto ANTES de aprender a PROGRAMAR.',
    thumbnail: `https://img.youtube.com/vi/c2EJRboAYL4/maxresdefault.jpg`,
  },
  {
    id: 'o_s6Q-teA6U',
    title: 'Hoy es SÁBADO y este video lo sabe.',
    thumbnail: `https://img.youtube.com/vi/o_s6Q-teA6U/maxresdefault.jpg`,
  },
  {
    id: 'B4CqKTxsYv4',
    title: 'Día en la vida de un PROGRAMADOR SENIOR (ARG)',
    thumbnail: `https://img.youtube.com/vi/B4CqKTxsYv4/maxresdefault.jpg`,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

// Usamos forwardRef para pasar correctamente el ref
const PopularVideos = forwardRef(({id, className, initial, animate, transition}, ref) => {
  return (
    <motion.section 
      id={id}
      className={`mb-20 bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700 ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
      ref={ref}  // Aquí usamos ref
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        Videos Más Vistos (o los que menos me avergüenzan)
      </h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="initial"
        animate="animate"
      >
        {videos.map((video) => (
          <motion.a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            variants={fadeInUp}
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                width={480}
                height={360}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaPlay className="text-4xl text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-yellow-400 hover:text-yellow-300 transition-colors duration-300">{video.title}</h3>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  )
})

export default PopularVideos
