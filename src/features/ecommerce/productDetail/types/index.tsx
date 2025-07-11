// Tipos base
export interface Product {
    id: number;
    nombre: string;
    precio: number;
    precioAnterior?: number;  // Hacerlo opcional con ?
    categoria: string;
    descripcion: string;
    imagenes: string[];
    videos: string[];
    videoThumbnails?: string[];  // Nuevo campo para miniaturas de video
    stock: number;
    resena: string;
    calificacion: number;
    disponible: boolean;
    peso: string;  // Unificado a solo string ya que todos los pesos usan '100g'
}

export interface DeliveryOption {
    id: number;
    zona: string;
    tiempo: string;
    costoAprox: number;  // Corregido a camelCase
}

export interface CartItem {
    id: number;
    productoId: number;
    cantidad: number;
    favorito: boolean;
    sabor?: string;  // Hacer opcional si no siempre se usa
}

// Tipos para props de componentes
export interface ProductCardProps {
    product: Product;
    onAddToCart?: (productId: number) => void;
    onToggleFavorite?: (productId: number) => void;
}

export interface PhotoSliderProps {
    images: string[];
    videos: string[];
    videoThumbnails?: string[];
    currentIndex?: number;
    onIndexChange?: (index: number) => void;
}

export interface RelatedProductsProps {
    currentProductId: number;
    category: string;
    products?: Product[];  // Hacer opcional para mantener compatibilidad
}

export interface InfoDetailProps {
    product: Product;
    onAddToCart?: (product: Product, quantity: number) => void;
    onToggleFavorite?: (productId: number) => void;
}
