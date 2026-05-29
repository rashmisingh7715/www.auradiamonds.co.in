import { Product } from '../types';

import ring1 from '../../imports/ring.jpg';
import ring2 from '../../imports/Diamonds_ring2.jpg';
import ring3 from '../../imports/ring3.jpg';
import ring4 from '../../imports/ring4.jpg';
import ring5 from '../../imports/Ring_Diamonds.jpg';
import ring6 from '../../imports/ring_Diamonds4.jpg';

export const products: Product[] = [
  {
    id: 'D001',
    name: 'Brilliant Diamond Solitaire Ring',
    category: 'Diamond',
    price: 125000,
    image: ring1,
    description: 'Exquisite diamond solitaire ring with platinum band',
    inStock: true,
  },
  {
    id: 'D002',
    name: 'Luxury Diamond Cluster Ring',
    category: 'Diamond',
    price: 98000,
    image: ring2,
    description: 'Stunning cluster of diamonds in white gold setting',
    inStock: true,
  },
  {
    id: 'D003',
    name: 'Royal Diamond Engagement Ring',
    category: 'Diamond',
    price: 165000,
    image: ring3,
    description: 'Premium engagement ring with center diamond and accent stones',
    inStock: true,
  },
  {
    id: 'D004',
    name: 'Classic Diamond Eternity Band',
    category: 'Diamond',
    price: 78000,
    image: ring4,
    description: 'Timeless eternity band with brilliant cut diamonds',
    inStock: true,
  },
  {
    id: 'D005',
    name: 'Premium Diamond Wedding Ring',
    category: 'Diamond',
    price: 142000,
    image: ring5,
    description: 'Elegant wedding ring with superior quality diamonds',
    inStock: true,
  },
  {
    id: 'D006',
    name: 'Designer Diamond Anniversary Ring',
    category: 'Diamond',
    price: 115000,
    image: ring6,
    description: 'Contemporary design with exceptional diamond clarity',
    inStock: true,
  },
  {
    id: 'G001',
    name: 'Pure Gold Traditional Ring',
    category: 'Gold',
    price: 45000,
    image: ring1,
    description: '22K gold ring with traditional Indian design',
    inStock: true,
  },
  {
    id: 'G002',
    name: 'Gold Band with Gemstones',
    category: 'Gold',
    price: 52000,
    image: ring2,
    description: 'Elegant gold band adorned with precious gemstones',
    inStock: true,
  },
  {
    id: 'G003',
    name: 'Contemporary Gold Ring',
    category: 'Gold',
    price: 38000,
    image: ring3,
    description: 'Modern design in 18K gold',
    inStock: true,
  },
  {
    id: 'S001',
    name: 'Sterling Silver Classic Ring',
    category: 'Silver',
    price: 8500,
    image: ring4,
    description: 'Pure 925 sterling silver with elegant finish',
    inStock: true,
  },
  {
    id: 'S002',
    name: 'Silver Ring with Cubic Zirconia',
    category: 'Silver',
    price: 12000,
    image: ring5,
    description: 'Beautiful silver ring with sparkling cubic zirconia',
    inStock: true,
  },
  {
    id: 'S003',
    name: 'Designer Silver Band',
    category: 'Silver',
    price: 9500,
    image: ring6,
    description: 'Contemporary design in premium sterling silver',
    inStock: true,
  },
];
