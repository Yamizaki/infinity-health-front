import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import { PiShoppingCartLight } from "react-icons/pi";

import type { ProductCardProps } from '../types';

export const ProductCardDashboardSpecial: React.FC<ProductCardProps> = ({ 
    product,
    onAddToCart,
    onToggleFavorite 
}) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
        }).format(price);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product.id);
    };

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
        onToggleFavorite?.(product.id);
    };

    return (
        <div className="max-w-sm mx-auto gap-4">
           

            {/* Main Card */}
            <div 
                onClick={handleCardClick}
                className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer px-15 py-45 flex flex-col"
            >
                {/* Content Overlay */}
                <div className="absolute top-4 left-0 z-10 p-8">
                    {/* Product Name */}
                    <h2 className="text-2xl font-black text-black mb-4 leading-none">
                        {product.nombre}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                        <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-md font-medium text-black">
                            {product.calificacion}
                        </span>
                    </div>

                    {/* Category Tag */}
                    <div className="inline-block">
                        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-300">
                            {product.categoria}
                        </span>
                    </div>
                </div>

                {/* Product Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img src={product.imagenes[0]} alt={product.nombre} className="object-cover w-full h-full" />
                </div>

               {/* Bottom Section - Oval with embedded cart button */}
<div className="absolute bottom-4 left-8 right-8">
    <div className="relative bg-gray/98 backdrop-blur-lg rounded-full px-7 py-2 shadow-lg flex border-1 border-white items-center justify-between">
        {/* Price */}
        <div className="text-md font-black text-black">
            {formatPrice(product.precio)}
        </div>
        
        {/* Add to Cart Button (embedded inside oval) */}
        <button
            onClick={handleAddToCartClick}
            className="w-10 h-10 bg-gradient-to-br from-[var(--color-btn-gradient-bottom)] to-[var(--color-btn-gradient-top)] hover:bg-blue-600 text-white rounded-full shadow-lg transition-all flex items-center justify-center group hover:scale-105"
        >
            <PiShoppingCartLight className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
    </div>
</div>
            </div>
        </div>
    );
};

export default ProductCardDashboardSpecial;