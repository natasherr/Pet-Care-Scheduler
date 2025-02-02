import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white py-20">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
                    <p className="text-xs text-gray-400 md:text-sm">Copyright 2025 &copy; All Rights Reserved</p>
                </div>
                <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
                    <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
                        <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                        <li className="mx-4"><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}