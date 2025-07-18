import { motion } from "framer-motion";
import { Fish, Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-muted/50 to-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Fish className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  AquaWorld
                </h3>
                <p className="text-xs text-muted-foreground">
                  Thế giới cá cảnh
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Chuyên cung cấp các loại cá cảnh chất lượng cao với dịch vụ chăm sóc tận tình. 
              Mang vẻ đẹp đại dương về ngôi nhà của bạn.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-foreground">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {[
                "Trang chủ",
                "Sản phẩm",
                "Danh mục cá cảnh",
                "Dịch vụ",
                "Hướng dẫn chăm sóc",
                "Liên hệ"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-foreground">Danh mục</h4>
            <ul className="space-y-3">
              {[
                "Cá Betta",
                "Cá vàng",
                "Cá cảnh nước ngọt",
                "Cá cảnh biển",
                "Phụ kiện hồ cá",
                "Thức ăn cá cảnh"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-6 text-foreground">Thông tin liên hệ</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    123 Đường Cá Cảnh, Quận 1,<br />
                    TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">0123 456 789</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">info@cacanhviet.com</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    T2-T7: 8:00 - 20:00<br />
                    CN: 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-medium mb-3 text-foreground">Đăng ký nhận tin</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder="Email của bạn" 
                  className="text-sm"
                />
                <Button size="sm">
                  Đăng ký
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © 2024 AquaWorld. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Chính sách đổi trả
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};