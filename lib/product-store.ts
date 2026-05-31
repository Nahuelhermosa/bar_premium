export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  categoryId: string;
  image?: string | null;
  isActive: boolean;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Pasta a la Carbonara',
    description: 'Pasta italiana cremosa con bacon y queso parmesano.',
    price: 15.99,
    categoryId: 'comidas',
    image: null,
    isActive: true,
  },
  {
    id: '2',
    name: 'Cerveza Artesanal',
    description: 'Cerveza local premium con notas cítricas.',
    price: 8.99,
    categoryId: 'bebidas',
    image: null,
    isActive: true,
  },
];

export function getProducts(category?: string) {
  return category ? products.filter((product) => product.categoryId === category) : products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id) || null;
}

export function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  image?: string;
}) {
  const newProduct: Product = {
    id: Date.now().toString(),
    ...data,
    image: data.image || null,
    isActive: true,
  };

  products.push(newProduct);
  return newProduct;
}

export function updateProduct(id: string, data: {
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  image?: string;
}) {
  const product = getProductById(id);
  if (!product) return null;

  if (data.name !== undefined) product.name = data.name;
  if (data.description !== undefined) product.description = data.description;
  if (data.price !== undefined) product.price = data.price;
  if (data.categoryId !== undefined) product.categoryId = data.categoryId;
  if (data.image !== undefined) product.image = data.image || null;

  return product;
}

export function deleteProduct(id: string) {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}
