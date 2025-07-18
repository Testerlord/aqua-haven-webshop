-- Create categories table for fish types
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table for fish
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  images JSONB DEFAULT '[]',
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  size TEXT,
  origin TEXT,
  care_level TEXT,
  water_temperature TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  phone TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT 
USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT 
USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- RLS Policies for orders
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" 
ON public.orders FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for order_items
CREATE POLICY "Users can view their own order items" 
ON public.order_items FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

CREATE POLICY "Users can create their own order items" 
ON public.order_items FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.orders 
  WHERE orders.id = order_items.order_id 
  AND orders.user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for auto-creating user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample categories
INSERT INTO public.categories (name, description) VALUES
  ('Cá Cảnh Nước Ngọt', 'Các loài cá cảnh sống trong môi trường nước ngọt'),
  ('Cá Cảnh Biển', 'Các loài cá cảnh sống trong môi trường nước mặn'),
  ('Cá Betta', 'Cá Xiêm chuyên dụng với màu sắc đẹp'),
  ('Cá Vàng', 'Các loại cá vàng truyền thống và hiện đại'),
  ('Cá Phụ Kiện', 'Cá làm cảnh và trang trí hồ');

-- Insert sample products
INSERT INTO public.products (name, description, price, category_id, stock_quantity, is_featured, size, origin, care_level, water_temperature) VALUES
  ('Cá Betta Halfmoon Blue', 'Cá Betta Halfmoon màu xanh dương tuyệt đẹp với đuôi rộng như nửa mặt trăng', 250000, (SELECT id FROM public.categories WHERE name = 'Cá Betta' LIMIT 1), 15, true, '5-7cm', 'Thái Lan', 'Dễ', '24-28°C'),
  ('Cá Vàng Ryukin', 'Cá vàng Ryukin Nhật Bản với thân hình tròn đặc trưng', 180000, (SELECT id FROM public.categories WHERE name = 'Cá Vàng' LIMIT 1), 8, true, '8-10cm', 'Nhật Bản', 'Trung bình', '18-22°C'),
  ('Cá Thiên Thần Silver', 'Cá thiên thần bạc với vây dài và dáng vẻ quý phái', 320000, (SELECT id FROM public.categories WHERE name = 'Cá Cảnh Nước Ngọt' LIMIT 1), 12, true, '10-12cm', 'Nam Mỹ', 'Trung bình', '24-28°C'),
  ('Cá Nemo Clownfish', 'Cá hề Nemo đáng yêu với màu cam đen trắng', 450000, (SELECT id FROM public.categories WHERE name = 'Cá Cảnh Biển' LIMIT 1), 6, true, '6-8cm', 'Úc', 'Khó', '24-26°C'),
  ('Cá Betta Crown Tail Red', 'Cá Betta Crown Tail màu đỏ rực rỡ với đuôi răng cưa', 280000, (SELECT id FROM public.categories WHERE name = 'Cá Betta' LIMIT 1), 20, false, '5-7cm', 'Thái Lan', 'Dễ', '24-28°C'),
  ('Cá Vàng Oranda', 'Cá vàng Oranda với mũ đầu đặc trưng', 220000, (SELECT id FROM public.categories WHERE name = 'Cá Vàng' LIMIT 1), 10, false, '12-15cm', 'Trung Quốc', 'Dễ', '18-24°C');