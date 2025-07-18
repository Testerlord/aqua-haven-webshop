import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

const categoryIcons = {
  'Cá Cảnh Nước Ngọt': '🐟',
  'Cá Cảnh Biển': '🐠',
  'Cá Betta': '🌺',
  'Cá Vàng': '🏵️',
  'Cá Phụ Kiện': '✨'
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Đang tải...</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Danh Mục Cá Cảnh
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Khám phá các loại cá cảnh đa dạng từ nước ngọt đến nước mặn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Background with gradient */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                      {/* Animated background elements */}
                      <div className="absolute inset-0 opacity-10">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bg-primary rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              width: `${Math.random() * 20 + 10}px`,
                              height: `${Math.random() * 20 + 10}px`,
                            }}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        ))}
                      </div>

                      {/* Category icon */}
                      <motion.div 
                        className="text-6xl mb-4 relative z-10"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {categoryIcons[category.name as keyof typeof categoryIcons] || '🐟'}
                      </motion.div>

                      {/* Category name */}
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors relative z-10">
                        {category.name}
                      </h3>

                      {/* Category description */}
                      <p className="text-sm text-muted-foreground line-clamp-3 relative z-10">
                        {category.description}
                      </p>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Count badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {Math.floor(Math.random() * 50) + 10} loại
                      </Badge>
                    </div>

                    {/* Trending badge for some categories */}
                    {index < 2 && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-coral text-white">
                          Hot
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Loại cá cảnh</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Hỗ trợ khách hàng</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Cá khỏe mạnh</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">7 ngày</div>
            <div className="text-muted-foreground">Bảo hành</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};