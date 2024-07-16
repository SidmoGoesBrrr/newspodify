import Image from "next/image"
import Link from "next/link"
import { NAV_LINKS } from "@/data/constants"
const Header = () => {
    return (
        <nav className="flexBetween max-container padding-container relative z-30 py-5">
            <Link href='/'>
                <Image src="/nsp_logo.jpg" alt="logo" width={35} height={29} />

            </Link>
            <ul className="hidden h-full gap-12 lg:flex">
                {NAV_LINKS.map((link) => (
                    <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flex-center cursor-pointer pb-1.5 transition-all hover:font-bold">
                        {link.label}
                    </Link>
                ))}
            </ul>
            <div className="lg:flexCenter hidden">
                


            </div>
            <Image
                src="/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="inline-block cursor-pointer lg:hidden"/>

        </nav>
    )
}

export default Header