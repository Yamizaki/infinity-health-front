import React from 'react';
import { Link } from 'react-router-dom';
import { mockProduct } from '../../productDetail/data/mockProduct';
import type { Product } from '../../productDetail/types';

const CatalogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockProduct.map((product: Product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <Link to={`/product/${product.id}`} className="block">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100">
                <img 
                  src={product.imagenes[0]} 
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1 line-clamp-2" title={product.nombre}>
                  {product.nombre}
                </h2>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    ${product.precio.toFixed(2)}
                  </span>
                  {product.precioAnterior && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.precioAnterior.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.calificacion) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.resena})
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
