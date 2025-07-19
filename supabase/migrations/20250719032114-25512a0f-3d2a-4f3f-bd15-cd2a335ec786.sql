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
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories" 
ON public.categories FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories" 
ON public.categories FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert products" 
ON public.products FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

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