-- Create user roles enum and table
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id);

-- Admin policies for managing data
CREATE POLICY "Admins can insert categories" 
ON public.categories FOR INSERT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories" 
ON public.categories FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories" 
ON public.categories FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert products" 
ON public.products FOR INSERT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products" 
ON public.products FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products" 
ON public.products FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update order status" 
ON public.orders FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Update products with image URLs
UPDATE public.products 
SET image_url = '/src/assets/betta-halfmoon-blue.jpg'
WHERE name = 'Cá Betta Halfmoon Blue';

UPDATE public.products 
SET image_url = '/src/assets/goldfish-ryukin.jpg'
WHERE name = 'Cá Vàng Ryukin';

UPDATE public.products 
SET image_url = '/src/assets/angelfish-silver.jpg'
WHERE name = 'Cá Thiên Thần Silver';

UPDATE public.products 
SET image_url = '/src/assets/clownfish-nemo.jpg'
WHERE name = 'Cá Nemo Clownfish';

UPDATE public.products 
SET image_url = '/src/assets/betta-crowntail-red.jpg'
WHERE name = 'Cá Betta Crown Tail Red';

UPDATE public.products 
SET image_url = '/src/assets/goldfish-oranda.jpg'
WHERE name = 'Cá Vàng Oranda';

-- Add more sample products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, is_featured, size, origin, care_level, water_temperature) VALUES
  ('Cá Betta Plakat White', 'Cá Betta Plakat trắng với dáng thể thao và khỏe mạnh', 200000, (SELECT id FROM public.categories WHERE name = 'Cá Betta' LIMIT 1), NULL, 25, true, '4-6cm', 'Thái Lan', 'Dễ', '24-28°C'),
  ('Cá Vàng Lionhead', 'Cá vàng Lionhead với đầu to và thân ngắn đặc trưng', 300000, (SELECT id FROM public.categories WHERE name = 'Cá Vàng' LIMIT 1), NULL, 12, false, '10-15cm', 'Trung Quốc', 'Trung bình', '18-24°C'),
  ('Cá Guppy Rainbow', 'Cá Guppy với màu sắc cầu vồng rực rỡ', 50000, (SELECT id FROM public.categories WHERE name = 'Cá Cảnh Nước Ngọt' LIMIT 1), NULL, 50, true, '3-5cm', 'Nam Mỹ', 'Dễ', '22-28°C'),
  ('Cá Hải Tang Blue', 'Cá Hải Tang xanh dương tuyệt đẹp cho hồ cá biển', 800000, (SELECT id FROM public.categories WHERE name = 'Cá Cảnh Biển' LIMIT 1), NULL, 3, true, '8-12cm', 'Thái Bình Dương', 'Khó', '24-26°C'),
  ('Cá Molly Đen', 'Cá Molly đen bóng với tính cách hiền lành', 80000, (SELECT id FROM public.categories WHERE name = 'Cá Phụ Kiện' LIMIT 1), NULL, 30, false, '6-8cm', 'Mexico', 'Dễ', '22-28°C');

-- Insert sample orders for testing
INSERT INTO public.orders (user_id, total_amount, status, shipping_address, phone, notes) VALUES
  ((SELECT id FROM auth.users LIMIT 1), 430000, 'pending', '{"address": "123 Nguyen Van Cu, District 5, Ho Chi Minh City", "city": "Ho Chi Minh City", "district": "District 5", "ward": "Ward 10"}', '0901234567', 'Giao hàng buổi chiều'),
  ((SELECT id FROM auth.users LIMIT 1), 250000, 'processing', '{"address": "456 Le Van Sy, District 3, Ho Chi Minh City", "city": "Ho Chi Minh City", "district": "District 3", "ward": "Ward 5"}', '0987654321', 'Gói cẩn thận');

-- Insert sample order items
INSERT INTO public.order_items (order_id, product_id, quantity, price) VALUES
  ((SELECT id FROM public.orders WHERE total_amount = 430000 LIMIT 1), (SELECT id FROM public.products WHERE name = 'Cá Betta Halfmoon Blue' LIMIT 1), 1, 250000),
  ((SELECT id FROM public.orders WHERE total_amount = 430000 LIMIT 1), (SELECT id FROM public.products WHERE name = 'Cá Vàng Ryukin' LIMIT 1), 1, 180000),
  ((SELECT id FROM public.orders WHERE total_amount = 250000 LIMIT 1), (SELECT id FROM public.products WHERE name = 'Cá Betta Halfmoon Blue' LIMIT 1), 1, 250000);