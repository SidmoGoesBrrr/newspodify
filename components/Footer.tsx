import NextImage from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <NextImage src="/nsp_logo.jpg" alt="Product Logo" layout="fill" objectFit="contain" />
          </div>
          <span className="text-sm">&copy; 2024 NewsPodify. All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm">ZeroAndOne Developers</span>
          {/* Company Logo */}
          <div className="relative w-8 h-8">
            <NextImage src="/zo_logo.png" alt="Company Logo" layout="fill" objectFit="contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
