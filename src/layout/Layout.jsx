import Navbar from '@components/navbar/Navbar'
import '@styles/globals.css'

const RootLayout = ({ children }) => {
  return (
    <html lang="es">
      <Navbar />
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;