import React, { useState } from 'react';

const PepinoComponent = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Código secreto del pepino
  const secretCode = '12345';

  const handlePepinoClick = (event) => {
    // Obtener la posición donde se hizo clic
    const { clientX, clientY } = event;

    // Establecer la posición del mensaje
    setPosition({
      top: clientY + 10, // Un poco hacia abajo
      left: clientX + 10, // Un poco hacia la derecha
    });

    // Establecer el mensaje
    setMessage(`El código secreto es: ${secretCode}`);
    setShowMessage(true);

    // Cerrar el mensaje después de 3 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div>
      <button onClick={handlePepinoClick} className="pepino-button">
        ¡Haz clic en el pepino!
      </button>

      {showMessage && (
        <div
          className="secret-message"
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default PepinoComponent;