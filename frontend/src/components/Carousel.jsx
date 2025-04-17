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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch images from API
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/carousel');
      const data = await response.json();
      setImages({
        home: data.home || [],
        ad: data.ad || [],
        inactive: data.inactive || []
      });
    } catch (error) {
      setError('Error fetching images. Please try again.');
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id, path, type) => {
    setCurrentImage({ id, path, type });
    setShowModal(true);
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB.');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('action', 'updateImage');
      formData.append('id', currentImage.id);
      formData.append('type', currentImage.type);
      if (selectedFile) {
        formData.append('newImage', selectedFile);
      }

      const response = await fetch('/api/carousel', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      await fetchImages();
      setShowModal(false);
    } catch (error) {
      setError('Error updating image. Please try again.');
      console.error('Error updating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = async (type) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
      }

      try {
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('type', type);
        formData.append('image', file);

        const response = await fetch('/api/carousel', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to add image');
        }

        await fetchImages();
      } catch (error) {
        setError('Error adding image. Please try again.');
        console.error('Error adding image:', error);
      } finally {
        setLoading(false);
      }
    };

    fileInput.click();
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/carousel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'delete',
          id: id,
          type: type
        })
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      await fetchImages();
    } catch (error) {
      setError('Error deleting image. Please try again.');
      console.error('Error deleting image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id, type) => {
    try {
      setLoading(true);
      setError('');

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

      if (!response.ok) {
        throw new Error('Failed to restore image');
      }

      await fetchImages();
    } catch (error) {
      setError('Error restoring image. Please try again.');
      console.error('Error restoring image:', error);
    } finally {
      setLoading(false);
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
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Home Page Images Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-5">Home Page Images</h3>
            <p className="text-gray-600 mb-4">These images will appear in the main carousel on the home page. Maximum 3 images allowed.</p>
            <div className="flex flex-wrap gap-6">
              {images.home.map((image) => (
                <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="relative">
                    <img 
                      src={image.path} 
                      alt="Home" 
                      className="w-64 h-64 object-cover rounded"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                      {image.type}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <button 
                      onClick={() => handleEditClick(image.id, image.path, image.type)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(image.id, image.type)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {images.home.length < 3 && (
                <div 
                  className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-64 h-64"
                  onClick={() => handleAddImage('home')}
                >
                  <div className="text-center">
                    <div className="text-4xl text-gray-400 mb-2">+</div>
                    <div className="text-gray-500">Add Home Image</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Advertisement Images Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-5">Advertisement Images</h3>
            <p className="text-gray-600 mb-4">These images will appear in the Services Product section. Maximum 5 images allowed.</p>
            <div className="flex flex-wrap gap-6">
              {images.ad.map((image) => (
                <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="relative">
                    <img 
                      src={image.path} 
                      alt="Ad" 
                      className="w-64 h-64 object-cover rounded"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                      {image.type}
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <button 
                      onClick={() => handleEditClick(image.id, image.path, image.type)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(image.id, image.type)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {images.ad.length < 5 && (
                <div 
                  className="bg-white p-4 rounded-lg shadow-md border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-64 h-64"
                  onClick={() => handleAddImage('ad')}
                >
                  <div className="text-center">
                    <div className="text-4xl text-gray-400 mb-2">+</div>
                    <div className="text-gray-500">Add Ad Image</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Inactive Images Section */}
          {images.inactive.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-5">Inactive Images</h3>
              <p className="text-gray-600 mb-4">These images have been removed but can be restored.</p>
              <div className="flex flex-wrap gap-6">
                {images.inactive.map((image) => (
                  <div key={image.id} className="bg-white p-4 rounded-lg shadow-md">
                    <div className="relative">
                      <img 
                        src={image.path} 
                        alt="Inactive" 
                        className="w-64 h-64 object-cover rounded opacity-60"
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                        {image.type}
                      </div>
                    </div>
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
            </div>
          )}
        </div>
      </div>

      {/* Edit Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="border-b p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit {currentImage.type.charAt(0).toUpperCase() + currentImage.type.slice(1)} Image</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Current Image</label>
                <img 
                  src={currentImage.path} 
                  alt="Current" 
                  className="max-h-48 mx-auto mb-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select New Image</label>
                <input 
                  type="file" 
                  id="fileInput"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => document.getElementById('fileInput').click()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm transition-colors"
                  >
                    Choose File
                  </button>
                  {selectedFile && (
                    <span className="text-sm text-gray-600">{selectedFile.name}</span>
                  )}
                </div>
              </div>
              {previewUrl && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">New Image Preview</label>
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded"
                  />
                </div>
              )}
              {error && (
                <div className="mb-4 text-red-500 text-sm">
                  {error}
                </div>
              )}
              <div className="border-t pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-center">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;