import React from 'react';
import { ArrowRight, Star, CheckCircle, Heart, Camera, Music, Crown } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: <Crown className="h-8 w-8 text-rose-500" />,
      title: 'Dekorasi Premium',
      description: 'Koleksi dekorasi pernikahan mewah dan elegan dari vendor terpercaya'
    },
    {
      icon: <Camera className="h-8 w-8 text-rose-500" />,
      title: 'Fotografer Profesional',
      description: 'Tim fotografer berpengalaman untuk mengabadikan momen spesial Anda'
    },
    {
      icon: <Music className="h-8 w-8 text-rose-500" />,
      title: 'Entertainment Lengkap',
      description: 'Musik, MC, dan hiburan lainnya untuk menyempurnakan acara pernikahan'
    }
  ];

  const testimonials = [
    {
      name: 'Sari & Budi',
      rating: 5,
      comment: 'Pelayanan yang luar biasa! Dekorasi pernikahan kami sangat indah dan sesuai impian.',
      image: 'https://images.pexels.com/photos/1024989/pexels-photo-1024989.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Maya & Doni',
      rating: 5,
      comment: 'Tim fotografer sangat profesional dan hasil fotonya amazing. Highly recommended!',
      image: 'https://images.pexels.com/photos/1024988/pexels-photo-1024988.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Rina & Alex',
      rating: 5,
      comment: 'Vendor yang dapat dipercaya dengan kualitas pelayanan terbaik. Terima kasih!',
      image: 'https://images.pexels.com/photos/1024987/pexels-photo-1024987.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Wedding decoration"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Wujudkan <span className="text-rose-500">Pernikahan</span> Impian Anda
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Temukan vendor dan dekorasi pernikahan terbaik untuk hari istimewa Anda
          </p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center mx-auto"
          >
            Cari Dekorasi Impianmu Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan layanan lengkap untuk pernikahan impian Anda dengan kualitas terbaik
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Dipercaya Ribuan Pasangan
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-500 mb-2">500+</div>
              <div className="text-gray-600">Pernikahan Sukses</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-500 mb-2">50+</div>
              <div className="text-gray-600">Vendor Terpercaya</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-500 mb-2">4.8</div>
              <div className="text-gray-600">Rating Kepuasan</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-rose-500 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Testimoni Pelanggan
            </h2>
            <p className="text-xl text-gray-600">
              Apa kata mereka yang telah mempercayakan pernikahan impiannya kepada kami
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Merencanakan Pernikahan Impian?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Mulai jelajahi koleksi dekorasi dan vendor terbaik kami sekarang juga
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-white text-rose-500 font-bold py-4 px-8 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Lihat Katalog
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-rose-500 transition-all duration-300 transform hover:scale-105"
            >
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;