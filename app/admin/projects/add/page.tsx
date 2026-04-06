"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Save,
  Link as LinkIcon,
  Loader2,
  CheckCircle,
  Trash2
} from 'lucide-react';
import MediaUpload from '@/components/MediaUpload';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  originalFile?: File;
}

export default function AddProjectPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'residential' as 'residential' | 'commercial',
    description: '',
    location: '',
    completionYear: new Date().getFullYear(),
    client: '',
    technologies: '',
    materials: '',
    order: 0,
    isActive: true
  });

  const [featuredImage, setFeaturedImage] = useState<UploadedFile | null>(null);
  const [galleryImages, setGalleryImages] = useState<UploadedFile[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>(['']);

  const handleFeaturedImageUpload = useCallback((files: UploadedFile[]) => {
    if (files.length > 0) setFeaturedImage(files[0]);
  }, []);

  const handleGalleryImagesUpload = useCallback((files: UploadedFile[]) => {
    setGalleryImages(prev => [...prev, ...files]);
  }, []);

  const removeFeaturedImage = () => setFeaturedImage(null);
  const removeGalleryImage = (id: string) => setGalleryImages(prev => prev.filter(img => img.id !== id));

  const handleVideoUrlChange = (index: number, value: string) => {
    const newUrls = [...videoUrls];
    newUrls[index] = value;
    setVideoUrls(newUrls);
  };
  const addVideoUrl = () => setVideoUrls([...videoUrls, '']);
  const removeVideoUrl = (index: number) => setVideoUrls(videoUrls.filter((_, i) => i !== index));

  // --- BULLETPROOF FETCH HELPER ---
  // This prevents the "Unexpected token '<'" error by checking the response type first.
  const safeApiCall = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);
    const textResponse = await response.text(); // Read as text first to avoid crashes

    try {
      const data = JSON.parse(textResponse); // Try to parse it to JSON
      if (!response.ok) throw new Error(data.message || "API Error");
      return data;
    } catch (err) {
      // If parsing fails, it means the server returned HTML (like a 404 page)
      console.error(`Server returned HTML instead of JSON for ${url}:`, textResponse.substring(0, 150));
      throw new Error(`Server Error: Could not connect to API at ${url}. Is your backend running?`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Basic validation
      if (!formData.title.trim()) throw new Error('Project title is required');
      if (!formData.description.trim()) throw new Error('Project description is required');
      if (!formData.location.trim()) throw new Error('Project location is required');
      if (!formData.client.trim()) throw new Error('Client name is required');
      if (!featuredImage?.originalFile) throw new Error('Featured image is required');

      // 1. Upload Featured Image
      const featuredFormData = new FormData();
      featuredFormData.append('image', featuredImage.originalFile);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const featuredData = await safeApiCall(`${API_URL}/api/upload`, {
        method: 'POST',
        body: featuredFormData
      });
      const finalFeaturedImageUrl = featuredData.url;

      // 2. Upload Gallery Images
      const galleryUploadPromises = galleryImages.map(async (img) => {
        if (!img.originalFile) return img.url;
        const fd = new FormData();
        fd.append('image', img.originalFile);
        const data = await safeApiCall(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload`, {
          method: 'POST',
          body: fd
        });
        return data.url;
      });
      const finalGalleryUrls = await Promise.all(galleryUploadPromises);

      // 3. Clean up lists
      const finalVideoUrls = videoUrls.filter(url => url.trim() !== '');
      const finalTechnologies = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
      const finalMaterials = formData.materials.split(',').map(m => m.trim()).filter(Boolean);

      // 4. Construct Final Project Data Payload
      const projectData = {
        ...formData,
        featuredImage: finalFeaturedImageUrl,
        images: finalGalleryUrls,
        videos: finalVideoUrls,
        technologies: finalTechnologies,
        materials: finalMaterials
      };

      // 5. Submit to Database
      await safeApiCall(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      // Success Actions
      alert('Project created successfully!');
      setSuccess(true);
      setTimeout(() => router.push('/admin/projects'), 1500);

    } catch (error) {
      console.error('Error creating project:', error);
      alert(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-12 rounded-xl shadow-sm"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Created!</h1>
          <p className="text-gray-500">Redirecting back to your projects...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/projects" className="flex items-center text-gray-500 hover:text-gray-900 mr-4 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Add New Project</h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center px-6 py-2.5 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800 disabled:opacity-70 transition-all shadow-sm"
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> Save Project</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Title *</label>
                <input
                  type="text" required value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., The Glass Pavilion"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                <select
                  required value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'residential' | 'commercial'})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Client Name *</label>
                <input
                  type="text" required value={formData.client}
                  onChange={(e) => setFormData({...formData, client: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Mr. Sharma"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                <input
                  type="text" required value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Jaipur, Rajasthan"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year *</label>
                  <input
                    type="number" required value={formData.completionYear}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setFormData({...formData, completionYear: isNaN(value) ? new Date().getFullYear() : value});
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Order</label>
                  <input
                    type="number" value={formData.order}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setFormData({...formData, order: isNaN(value) ? 0 : value});
                    }}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea
                  required rows={4} value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                  placeholder="Provide a detailed description of the project..."
                />
              </div>
            </div>
          </div>

          {/* Technologies & Materials */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b">Project Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Technologies Used</label>
                <input
                  type="text" value={formData.technologies}
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., AutoCAD, 3ds Max, Revit (Comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Core Materials</label>
                <input
                  type="text" value={formData.materials}
                  onChange={(e) => setFormData({...formData, materials: e.target.value})}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g., Concrete, Glass, Steel (Comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Media Uploads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b">Media Library</h2>

            <div className="space-y-8">
              {/* Featured Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Featured Image * <span className="text-xs text-gray-400 font-normal">(Required)</span></label>
                {featuredImage ? (
                  <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <img src={featuredImage.url} alt="Featured" className="w-full h-full object-cover" />
                    <button
                      type="button" onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-full hover:bg-red-50 shadow-sm transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="max-w-md">
                    <MediaUpload onFilesChange={handleFeaturedImageUpload} acceptedTypes={['image']} maxFiles={1} />
                  </div>
                )}
              </div>

              {/* Gallery Images */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700">Project Gallery</label>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">{galleryImages.length} uploaded</span>
                </div>
                
                {galleryImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                    {galleryImages.map((img) => (
                      <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button" onClick={() => removeGalleryImage(img.id)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform scale-75 group-hover:scale-100 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <MediaUpload onFilesChange={handleGalleryImagesUpload} acceptedTypes={['image']} maxFiles={10} />
              </div>

              {/* Video URLs */}
              <div className="pt-6 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Video URLs <span className="text-xs text-gray-400 font-normal">(YouTube/Vimeo links)</span></label>
                
                <div className="space-y-3 max-w-2xl">
                  {videoUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url" value={url}
                          onChange={(e) => handleVideoUrlChange(index, e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                        />
                      </div>
                      {videoUrls.length > 1 && (
                        <button
                          type="button" onClick={() => removeVideoUrl(index)}
                          className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button" onClick={addVideoUrl}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mt-2"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add another video link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}