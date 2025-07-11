import { useState } from 'react';
import { PiShoppingCartLight } from "react-icons/pi";
import { RiHeart3Line } from "react-icons/ri";
import { HiMiniHeart } from "react-icons/hi2";
import { RxLightningBolt } from 'react-icons/rx';
import type { InfoDetailProps } from '../types';

export const InfoDetail: React.FC<InfoDetailProps> = ({ 
    product,
    onAddToCart = () => {},
    onToggleFavorite = () => {}
}) => {
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite(product.id);
    };

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
    };

    const calculateDiscount = (): number => {
        if (!product.precioAnterior) return 0;
        return Math.round(((product.precioAnterior - product.precio) / product.precioAnterior) * 100);
    };

    const discount = calculateDiscount();
    
    return (
        <div className="p-5 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-bold text-gray-800">{product.nombre}</h1> 
                <div className="flex bg-[var(--color-primary-light)] rounded-full border-2 border-white text-white items-center gap-2 px-4 py-1 shadow-lg">
                    <h4 className="text-[var(--color-primary)] text-sm font-semibold">
                        {product.categoria}
                    </h4>
                    <RxLightningBolt className="h-3 w-3 text-[var(--color-primary)] text-md font-semibold" />
                </div>
            </div>

            {/* PRECIOS + RESEÑAS */}
            <div className="flex items-center gap-3 justify-between pt-8">
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[var(--color-primary)]">
                        S/ {product.precio.toFixed(2)}
                    </span>
                    {product.precioAnterior && (
                        <>
                            <span className="text-lg text-gray-500 line-through">
                                S/ {product.precioAnterior.toFixed(2)}
                            </span>
                            {discount > 0 && (
                                <span className="bg-gray-500 text-white px-2 ml-5 py-1 rounded-full text-sm font-medium">
                                    -{discount}%
                                </span>
                            )}
                        </>
                    )}
                </div>
                
                {/* Rating */}
                <div className="items-center">
                    <div className="flex items-center text-yellow-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < (product.calificacion || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">
                        ({product.resena || 0})
                    </span>
                </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="mt-6">
                <p className="text-gray-600">{product.descripcion}</p>
            </div>

            {/* PESO O MEDIDA POSIBLE
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Peso</h3>
                <p className="text-gray-600">{product.peso}</p>
            </div> */}

            {/* STOCK POSIBLE
            <div className="mt-4">
                <p className="text-green-600 font-medium">
                    {product.stock > 0 
                        ? `En stock (${product.stock} disponibles)` 
                        : 'Agotado'}
                </p>
            </div>*/}

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 mb-10">
                <div className="flex items-center border border-gray-300 bg-gray-50 rounded-full">
                    <button 
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-4 py-2 text-xl "
                    >
                        -
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button 
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="px-4 py-2 text-xl"
                    >
                        +
                    </button>
                </div>
                
                <button 
                    onClick={handleAddToCart}
                    className="bg-gradient-to-b from-[var(--color-btn-gradient-top)] to-[var(--color-btn-gradient-bottom)] text-white py-3 px-6 shadow-lg rounded-full font-semibold transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                >
                    Añadir al carrito
                    <PiShoppingCartLight size={20} />
                </button>
                
                <button 
                    onClick={toggleFavorite}
                    className="p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                    {isFavorite 
                        ? <HiMiniHeart size={24} className="text-red-500" /> 
                        : <RiHeart3Line size={24} className="text-gray-600" />
                    }
                </button>
            </div>

              {/* DELIVERY */}
              <div className="mt-4">
              <h4 className="font-semibold text-gray-900 mb-3">Delivery</h4>
              <div className="border-b border-gray-300 pb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Lorem ipsum proin accumsan nibh lacus vitae lobortis nunc ultricies.
                </p>
                
                <div className="space-y-2 ml-2 px-4">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium text-gray-500 pb-3 border-b">
                    <span>Zona</span>
                    <span>Tiempo</span>
                    <span>Costo Aprox</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
                    <span>Lima Metropolitana</span>
                    <span>4-5 días hábiles</span>
                    <span>$4.50</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm py-2 border-b">
                    <span>Delivery a Provincias</span>
                    <span>4-5 días hábiles</span>
                    <span>$10.00</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
};