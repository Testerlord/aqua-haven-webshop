import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Truck, 
  Shield, 
  Headphones, 
  Heart, 
  Wrench, 
  GraduationCap,
  Clock,
  Award
} from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Giao hàng miễn phí",
    description: "Giao hàng miễn phí trong nội thành cho đơn hàng trên 500k",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Bảo hành 7 ngày",
    description: "Cam kết cá khỏe mạnh, đổi trả trong 7 ngày nếu có vấn đề",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ chuyên viên sẵn sàng tư vấn và hỗ trợ mọi lúc",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    title: "Chăm sóc tận tình",
    description: "Hướng dẫn chi tiết cách chăm sóc và nuôi dưỡng cá cảnh",
    color: "from-rose-500 to-orange-500"
  },
  {
    icon: Wrench,
    title: "Thiết kế hồ cá",
    description: "Tư vấn và thiết kế hồ cá theo yêu cầu, phù hợp không gian",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: GraduationCap,
    title: "Đào tạo kỹ thuật",
    description: "Khóa học nuôi cá cảnh từ cơ bản đến nâng cao",
    color: "from-amber-500 to-yellow-500"
  },
  {
    icon: Clock,
    title: "Giao hàng nhanh",
    description: "Giao hàng trong ngày tại khu vực nội thành",
    color: "from-teal-500 to-cyan-500"
  },
  {
    icon: Award,
    title: "Chất lượng cao",
    description: "Cam kết chất lượng cá cảnh từ các trang trại uy tín",
    color: "from-violet-500 to-purple-500"
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dịch Vụ Chuyên Nghiệp
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cung cấp dịch vụ toàn diện để đảm bảo trải nghiệm tốt nhất cho khách hàng
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="group h-full hover:shadow-2xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Cần tư vấn thêm?
            </h3>
            <p className="text-muted-foreground mb-6">
              Liên hệ với chúng tôi để được tư vấn miễn phí về việc lựa chọn và chăm sóc cá cảnh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:0123456789"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Headphones className="w-5 h-5 mr-2" />
                Gọi ngay: 0123 456 789
              </motion.a>
              <motion.a
                href="mailto:info@cacanhviet.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Email: info@cacanhviet.com
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};