//confirm logout modal

import React, { useState } from 'react';


function LogoutModal({isOpen, onClose, onConfirm}){
    if(!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Are you sure you want to logout?</h2>
          <div className="flex justify-end space-x-4">
            <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-full transition duration-300">Cancel</button>
            <button onClick={onConfirm} className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full transition duration-300">Logout</button>
          </div>
        </div>
      </div>
    );
}

export default LogoutModal;

