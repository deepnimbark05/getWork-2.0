import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const [images, setImages] = useState({
    home: [],
    ad: [],
    inactive: []
  });
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState({
    id: null,
    path: '',
    type: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch('/api/carousel');
        const data = await response.json();
        setImages({
          home: data.home || [],
          ad: data.ad || [],
          inactive: data.inactive || []
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleEditClick = (id, path, type) => {
    setCurrentImage({ id, path, type });
    setShowModal(true);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (API call to update image)
    const formData = new FormData();
    formData.append('action', 'updateImage');
    formData.append('id', currentImage.id);
    if (selectedFile) {
      formData.append('newImage', selectedFile);
    }

    try {
      const response = await fetch('/api/carousel', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        // Refresh images after update
        const updatedResponse = await fetch('/api/carousel');
        const updatedData = await updatedResponse.json();
        setImages({
          home: updatedData.home || [],
          ad: updatedData.ad || [],
          inactive: updatedData.inactive || []
        });
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleAddImage = async (type) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('type', type);
        formData.append('image', file);

        try {
          const response = await fetch('/api/carousel', {
            method: 'POST',
            body: formData
          });
          if (response.ok) {
            // Refresh images after add
            const updatedResponse = await fetch('/api/carousel');
            const updatedData = await updatedResponse.json();
            setImages({
              home: updatedData.home || [],
              ad: updatedData.ad || [],
              inactive: updatedData.inactive || []
            });
          }
        } catch (error) {
          console.error('Error adding image:', error);
        }
      }
    };
    fileInput.click();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch('/api/carousel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'delete',
            id: id
          })
        });
        if (response.ok) {
          // Refresh images after delete
          const updatedResponse = await fetch('/api/carousel');
          const updatedData = await updatedResponse.json();
          setImages({
            home: updatedData.home || [],
            ad: updatedData.ad || [],
            inactive: updatedData.inactive || []
          });
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleRestore = async (id, type) => {
    try {
      const response = await fetch('/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'restore',
          id: id,
          type: type
        })
      });
      if (response.ok) {
        // Refresh images after restore
        const updatedResponse = await fetch('/api/carousel');
        const updatedData = await updatedResponse.json();
        setImages({
          home: updatedData.home || [],
          ad: updatedData.ad || [],
          inactive: updatedData.inactive || []
        });
      }
    } catch (error) {
      console.error('Error restoring image:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Top Bar */}
      <div className="bg-white flex justify-between items-center p-3 border-b-2 border-black h-12 fixed top-0 w-full left-0 z-50">
        <h2 className="text-orange-600 m-0 text-xl">
          get<span className="text-black">Work</span>
        </h2>
        <h2 className="m-0 text-xl">Admin Panel</h2>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Home
        </Link>
      </div>

      {/* Container Wrapper */}
      <div className="flex pt-12">
        {/* Sidebar */}
        <div className="w-40 h-[calc(100vh-3rem)] bg-gray-900 text-white fixed top-12 left-0 overflow-y-auto pt-5 shadow-lg">
          <Link to="/Dashboard" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Dashboard
          </Link>
          <Link to="/Carousel" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Carousel
          </Link>
          <Link to="/Reviews" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Reviews
          </Link>
          <Link to="/Workers" className="text-white no-underline flex items-center py-3 px-4 mx-2 my-1 rounded transition-colors hover:bg-orange-500 text-sm font-bold">
            Workers
          </Link>
        </div>

        {/* Main Content */}
        <div className="ml-40 w-[calc(100%-10rem)] p-5">
          <h3 className="text-xl font-bold mb-5">Home-Page Images</h3>
          <div className="flex flex-wrap gap-6">
            {images.home.map((image) => (
              <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={image.path} 
                  alt="Home" 
                  className="w-64 h-64 object-cover rounded"
                />
                <div className="flex justify-center gap-2 mt-3">
                  <button 
                    onClick={() => handleEditClick(image.id, image.path, image.type)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {images.home.length < 3 && (
              <div 
                className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onClick={() => handleAddImage('home')}
              >
                <div className="text-center p-4">
                  <div className="text-2xl">+</div>
                  <div>Add Home Image</div>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold mb-5 mt-10">Ads - Images</h3>
          <div className="flex flex-wrap gap-6">
            {images.ad.map((image) => (
              <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={image.path} 
                  alt="Ad" 
                  className="w-64 h-64 object-cover rounded"
                />
                <div className="flex justify-center gap-2 mt-3">
                  <button 
                    onClick={() => handleEditClick(image.id, image.path, image.type)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {images.ad.length < 5 && (
              <div 
                className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                onClick={() => handleAddImage('ad')}
              >
                <div className="text-center p-4">
                  <div className="text-2xl">+</div>
                  <div>Add Ad Image</div>
                </div>
              </div>
            )}
          </div>

          {images.inactive.length > 0 && (
            <>
              <h3 className="text-xl font-bold mb-5 mt-10">Inactive Images</h3>
              <div className="flex flex-wrap gap-6">
                {images.inactive.map((image) => (
                  <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img 
                      src={image.path} 
                      alt="Inactive" 
                      className="w-64 h-64 object-cover rounded"
                    />
                    <div className="flex justify-center mt-3">
                      <button 
                        onClick={() => handleRestore(image.id, image.type)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Image</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Current Image</label>
                <img 
                  src={currentImage.path} 
                  alt="Current" 
                  className="max-h-48 mx-auto mb-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Select New Image</label>
                <input 
                  type="file" 
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('fileInput').click()}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
                >
                  Choose File
                </button>
                {selectedFile && (
                  <span className="ml-2 text-sm">{selectedFile.name}</span>
                )}
              </div>
              {previewUrl && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">New Image Preview</label>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 mx-auto"
                  />
                </div>
              )}
              <div className="border-t pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;