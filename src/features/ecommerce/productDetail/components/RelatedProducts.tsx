import { mockProduct } from "../data/mockProduct";
import ProductCardDashboardSpecial from "./ProductCardDashboardSpecial";
import type { RelatedProductsProps } from "../types";

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
    currentProductId, 
    category,
    products = mockProduct // Usar mockProduct como valor por defecto
}) => {
    // Filtrar productos de la misma categoría, excluyendo el producto actual
    let relatedProducts = products.filter(
        (product) => 
            product.categoria.toLowerCase() === category.toLowerCase() && 
            product.id !== currentProductId
    );

    // Si no hay suficientes productos relacionados, mostrar productos de otras categorías
    if (relatedProducts.length < 4) {
        const additionalProducts = products
            .filter(p => p.id !== currentProductId && !relatedProducts.some(rp => rp.id === p.id))
            .slice(0, 4 - relatedProducts.length);
        relatedProducts = [...relatedProducts, ...additionalProducts];
    }

    // Limitar a 4 productos
    relatedProducts = relatedProducts.slice(0, 4);

    if (relatedProducts.length === 0) return null;

    console.log('Productos relacionados:', relatedProducts); // Para depuración
    
    return (
        <div className="mt-16 w-full">
            {/* Title and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Productos relacionados
                    </h2>
                </div>
                <div>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        {relatedProducts.some(p => p.categoria.toLowerCase() === category.toLowerCase()) 
                            ? 'Descubre más productos de la misma categoría que podrían interesarte.'
                            : 'Productos que podrían interesarte.'}
                    </p>
                </div>
            </div>

            {/* Grid of related products */}
            <div className="w-full overflow-x-auto pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full min-w-max">
                    {relatedProducts.map((product) => (
                        <div key={product.id} className="w-full max-w-xs mx-auto">
                            <ProductCardDashboardSpecial
                                product={product}
                                onAddToCart={() => console.log('Añadir al carrito:', product.id)}
                                onToggleFavorite={() => console.log('Toggle favorito:', product.id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};