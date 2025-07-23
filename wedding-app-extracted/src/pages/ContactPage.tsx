import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tim kami siap membantu mewujudkan pernikahan impian Anda. Jangan ragu untuk menghubungi kami!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Alamat Lengkap</h3>
                    <p className="text-gray-600">
                      Jl. Merdeka Raya No. 123<br />
                      Jakarta Pusat, DKI Jakarta 10110<br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Nomor Telepon</h3>
                    <p className="text-gray-600">+62 812-3456-7890</p>
                    <p className="text-gray-600">+62 21-5555-1234</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <p className="text-gray-600">info@weddingdecor.com</p>
                    <p className="text-gray-600">cs@weddingdecor.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Jam Operasional</h3>
                    <div className="text-gray-600">
                      <p>Senin - Jumat: 08:00 - 18:00 WIB</p>
                      <p>Sabtu: 08:00 - 16:00 WIB</p>
                      <p>Minggu: 09:00 - 15:00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Media Sosial</h2>
              
              <div className="space-y-4">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors duration-200"
                >
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">WhatsApp</h3>
                    <p className="text-gray-600">Chat langsung dengan customer service</p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/weddingdecor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-pink-50 hover:border-pink-200 transition-colors duration-200"
                >
                  <div className="bg-pink-100 p-3 rounded-lg">
                    <Instagram className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Instagram</h3>
                    <p className="text-gray-600">Lihat portfolio dan inspirasi terbaru</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Embedded Map */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Lokasi Kami</h2>
                <p className="text-gray-600 mt-2">Kunjungi showroom kami untuk konsultasi langsung</p>
              </div>
              <div className="relative h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194097895493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJl.%20Merdeka%2C%20Gambir%2C%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1647834045301!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi WeddingDecor"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Konsultasi Gratis</h2>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      placeholder="Contoh: 08123456789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Acara (Estimasi)
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kebutuhan / Pertanyaan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Ceritakan tentang kebutuhan dekorasi pernikahan Anda..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;