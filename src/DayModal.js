import React from 'react';

function DayModal({ isOpen, onClose, children }){
    if (!isOpen) return null;

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensures the modal is above other content
    };

    const modalStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>

    );
}

export default DayModal;