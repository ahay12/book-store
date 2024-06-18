
import { Helmet } from "react-helmet"
import Footer from "./footer"
import Hero from "./hero"
import Recommended from "./recommended"
import SpecialOffers from "./specialOffers"
import WhyChooseMe from "./whyChooseMe"
import NavBar from "./navBar"
import { CartProvider } from "./cart"

export default function LandingPage() {

    return (
        <>
            <Helmet>
                <title>Home | Book Store</title>
            </Helmet>
            <CartProvider>
                <NavBar />
                <Hero />
                <WhyChooseMe />
                <Recommended />
                <SpecialOffers />
                <Footer />
            </CartProvider>
        </>
    )
}
