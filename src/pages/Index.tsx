import { Header } from "@/components/Header";
import { FishHero } from "@/components/FishHero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Categories } from "@/components/Categories";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section id="home">
          <FishHero />
        </section>
        <section id="products">
          <FeaturedProducts />
        </section>
        <section id="categories">
          <Categories />
        </section>
        <section id="services">
          <Services />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
