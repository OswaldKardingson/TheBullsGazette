
import React from 'react';

const AdBlockPopup = ({ onDismiss }) => (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">AdBlock Detected</h2>
            <p className="mb-4">Please disable your AdBlocker to continue using The Bull's Gazette.</p>
            <button
                onClick={onDismiss}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
                Dismiss
            </button>
        </div>
    </div>
);

export default AdBlockPopup;
