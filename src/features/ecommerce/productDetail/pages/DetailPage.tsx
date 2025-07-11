import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InfoDetail } from '../components/InfoDetail';
import { PhotoSlider } from '../components/PhotoSlider';
import { ShareOptions } from '../components/ShareOptions';
import { mockProduct } from '../data/mockProduct';
import { RelatedProducts } from '../components/RelatedProducts';
import type { Product } from '../types';

export default function DetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ID del producto desde la URL:', productId);
    console.log('Lista de productos:', mockProduct);
    
    // Simulando carga de datos
    const fetchProduct = () => {
      try {
        // Encontrar el producto por ID
        const product = mockProduct.find(p => p.id === Number(productId));
        console.log('Producto encontrado:', product);
        setCurrentProduct(product || null);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
        setCurrentProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Producto no encontrado</h2>
          <p className="mt-2 text-gray-500">El producto que estás buscando no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Photo Slider - Columna Izquierda */}
        <div className="lg:sticky lg:top-4 lg:h-fit">
          <PhotoSlider 
            images={currentProduct.imagenes} 
            videos={currentProduct.videos}
            videoThumbnails={currentProduct.videoThumbnails || []}
          />
        </div>
        
        {/* Product Info - Columna Derecha */}
        <div className="space-y-8">
          <InfoDetail product={currentProduct} />
          <ShareOptions productId={currentProduct.id} />
        </div>
      </div>

      {/* Related Products - Sección Completa Abajo */}
      <div className="mt-16 w-full">
        <RelatedProducts 
          currentProductId={currentProduct.id} 
          category={currentProduct.categoria} 
        />
      </div>
    </div>
  );
}