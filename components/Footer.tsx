import Image from "next/image";
import { LinkPreview } from "@/components/ui/link-preview";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <Image src="/nsp-removebg-preview.png" alt="Product Logo" width={32} height={32}/>
          </div>
          <span className="text-sm">&copy; 2024 NewsPodify. All rights reserved.</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm">
          <LinkPreview
            url="https://www.zodevelopers.com"
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500">
              ZeroAndOne Developers
          </LinkPreview>
          </span>
          <div className="relative w-8 h-8">
            <Image src="/zo_logo.png" alt="Company Logo" width={32} height={32}/>
          </div>
        </div>
      </div>
    </footer>
  );
}