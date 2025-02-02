import React, { useState } from 'react';

const Home = () => {
 
  return (
    <div className="antialiased text-gray-800  w-full min-h-screen flex flex-col">
      
      {/* Main Content */}
      <main id="main-content" className="flex-1 relative">
        {/* About Section */}
        <section id="about" className="bg-neutral-900 text-white py-20">
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose PetCare?</h2>
            <p className="text-lg max-w-2xl mx-auto">We're dedicated to making pet care simple, organized, and effective for every pet parent.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Personalized Schedules</h3>
                <p className="text-neutral-600">Create custom care routines tailored to your pet's specific needs, age, and breed.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Expert Guidance</h3>
                <p className="text-neutral-600">Access professional advice and vetted care guides for all aspects of pet care.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Easy Tracking</h3>
                <p className="text-neutral-600">Monitor your pet's activities, health, and care routines with our simple tracking tools.</p>
            </div>
        </div>
    </div>
</section>

        {/* Services Section */}
        <section id="services" className="bg-neutral-900 text-white py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Pet Care Services</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Comprehensive care solutions for every aspect of your pet's well-being</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-800 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Daily Routine Planning</h3>
                <p className="text-gray-400 mb-4">Customized daily schedules for feeding, exercise, and care activities</p>
              </div>
              <div className="bg-neutral-800 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Health Monitoring</h3>
                <p className="text-gray-400 mb-4">Track your pet's health metrics and maintain medical records</p>
              </div>
              <div className="bg-neutral-800 rounded-2xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold mb-3">Behavior Training</h3>
                <p className="text-gray-400 mb-4">Professional guidance for pet training and behavior improvement</p>
              </div>
            </div>
          </div>
        </section>

        <section id="careGuides" className="bg-neutral-900 text-white py-20">
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pet Care Guides</h2>
            <p className="text-lg max-w-2xl mx-auto">Comprehensive guides to help you provide the best care for your pets</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-rose-600 p-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Dogs Care</h3>
                </div>
                <div className="p-6">
                    <p className="text-neutral-700">Daily Exercise Needs, Grooming Schedule, Nutrition Guide</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-rose-600 p-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Cats Care</h3>
                </div>
                <div className="p-6">
                    <p className="text-neutral-700">Litter Box Maintenance, Indoor Enrichment, Feeding Schedule</p>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-rose-600 p-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Small Pets</h3>
                </div>
                <div className="p-6">
                    <p className="text-neutral-700">Habitat Setup, Diet Requirements, Health Monitoring</p>
                </div>
            </div>
        </div>
    </div>
</section>

{/* Testimonials Section */}
<section id="testimonials" className="bg-neutral-900 text-white py-20">
    <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Pet Parents Say</h2>
            <p className="text-lg max-w-2xl mx-auto">Real stories from happy pet owners using our care routines</p>
        </div>
        <div className="flex flex-wrap justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg mx-4 mb-4">
                <h4 className="text-lg font-semibold text-neutral-900">Sarah Johnson</h4>
                <p className="text-neutral-600">"The schedule builder has been a game-changer for managing my dog's routine!"</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg mx-4 mb-4">
                <h4 className="text-lg font-semibold text-neutral-900">Mike Peterson</h4>
                <p className="text-neutral-600">"The care guides helped me understand my cat's needs better!"</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg mx-4 mb-4">
                <h4 className="text-lg font-semibold text-neutral-900">Lisa Chen</h4>
                <p className="text-neutral-600">"Fantastic resource for small pet owners! The specialized care guides have been invaluable!"</p>
            </div>
        </div>
    </div>
</section>

        {/* Blog Section */}
        <section id="blog" className="bg-neutral-900 py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Pet Care Blog</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Latest tips and insights for better pet care</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-neutral-700 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">Essential Nutrients for Your Pet's Diet</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">Understanding the key nutrients your pet needs for optimal health and wellness.</p>
                  <a href="#" className="text-rose-500 hover:text-rose-400 inline-flex items-center">Read More</a>
                </div>
              </div>
              <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-neutral-700 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">Effective Training Methods for Dogs</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">Learn positive reinforcement techniques for better pet behavior.</p>
                  <a href="#" className="text-rose-500 hover:text-rose-400 inline-flex items-center">Read More</a>
                </div>
              </div>
              <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-neutral-700 h-48 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">Signs of Common Pet Health Issues</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">Early warning signs to watch for and when to consult a veterinarian.</p>
                  <a href="#" className="text-rose-500 hover:text-rose-400 inline-flex items-center">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      
    </div>
  );
};

export default Home;