import service from './_base.services';

export type ProductResponse = {
  data: {
    _id: string;
    code: string;
    name: string;
    price: number;
    unit: 'kg' | 'pcs' | 'gram';
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  message: string;
  status: number;
};

export type CreateProductData = {
  code: string;
  name: string;
  price: number;
  unit: string;
  image: string;
};

export type UpdateProductData = {
  code: string;
  name: string;
  price: number;
  unit: string;
  image: string;
};

type UpdateProduct = {
  id: string;
  data: UpdateProductData;
};

export const ProductService = {
  async createProduct(payload: CreateProductData): Promise<ProductResponse> {
    const { data } = await service.post('/product', payload);
    return data;
  },
  async updateProduct(payload: UpdateProduct): Promise<ProductResponse> {
    const { data } = await service.put(`/product/${payload.id}`, payload.data);
    return data;
  },
  async getAllProduct(): Promise<ProductResponse> {
    const { data } = await service.get('/product');
    return data;
  },
  async deleteProduct(id: string): Promise<ProductResponse> {
    const { data } = await service.delete(`/product/${id}`);
    return data;
  },
};
