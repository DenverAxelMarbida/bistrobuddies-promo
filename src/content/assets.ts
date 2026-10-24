export type ScreenshotId = 
  | 'menu-1' | 'menu-2' | 'menu-3' | 'menu-4' | 'menu-5' 
  | 'menu-6' | 'menu-7' | 'menu-8' | 'menu-9' | 'menu-10' 
  | 'menu-11' | 'menu-12' | 'product-1' | 'product-2' | 'cart-1' 
  | 'cart-2' | 'order-1'
  | 'my-orders' | 'receipt-1' | 'receipt-2'
  | 'loading';

export interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
  safeForPublic: true;
}

export const screenshots: Record<ScreenshotId, Screenshot> = {
  'menu-1': { src: '/screenshots/menu-1-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu header with coffee filters and product grid', safeForPublic: true },
  'menu-2': { src: '/screenshots/menu-2-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing iced coffee options', safeForPublic: true },
  'menu-3': { src: '/screenshots/menu-3-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing various iced coffee drinks', safeForPublic: true },
  'menu-4': { src: '/screenshots/menu-4-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing coffee drinks with prices', safeForPublic: true },
  'menu-5': { src: '/screenshots/menu-5-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing iced drinks', safeForPublic: true },
  'menu-6': { src: '/screenshots/menu-6-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing iced drinks', safeForPublic: true },
  'menu-7': { src: '/screenshots/menu-7-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing hot coffee options', safeForPublic: true },
  'menu-8': { src: '/screenshots/menu-8-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing various hot coffee drinks', safeForPublic: true },
  'menu-9': { src: '/screenshots/menu-9-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing hot coffee drinks', safeForPublic: true },
  'menu-10': { src: '/screenshots/menu-10-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing scrolled coffee options', safeForPublic: true },
  'menu-11': { src: '/screenshots/menu-11-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing scrolled coffee options', safeForPublic: true },
  'menu-12': { src: '/screenshots/menu-12-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies menu showing scrolled coffee options', safeForPublic: true },
  'product-1': { src: '/screenshots/product-1-720.jpg', width: 720, height: 1600, alt: 'Product details for a coffee drink showing size and sugar options', safeForPublic: true },
  'product-2': { src: '/screenshots/product-2-720.jpg', width: 720, height: 1600, alt: 'Product customization showing quantity and final price', safeForPublic: true },
  'cart-1': { src: '/screenshots/cart-1-720.jpg', width: 720, height: 1600, alt: 'Shopping cart showing selected coffee drinks', safeForPublic: true },
  'cart-2': { src: '/screenshots/cart-2-720.jpg', width: 720, height: 1600, alt: 'Shopping cart summary with subtotal and checkout action', safeForPublic: true },
  'order-1': { src: '/screenshots/order-1-720.jpg', width: 720, height: 1600, alt: 'Order tracking screen showing progress stages', safeForPublic: true },
  'my-orders': { src: '/screenshots/my-orders-720.jpg', width: 720, height: 1600, alt: 'My Orders screen showing order history list', safeForPublic: true },
  'receipt-1': { src: '/screenshots/receipt-1-720.jpg', width: 720, height: 1600, alt: 'Order confirmation receipt showing item summary', safeForPublic: true },
  'receipt-2': { src: '/screenshots/receipt-2-720.jpg', width: 720, height: 1600, alt: 'Order confirmation showing payment method and track action', safeForPublic: true },
  'loading': { src: '/screenshots/loading-720.jpg', width: 720, height: 1600, alt: 'BistroBuddies app splash screen with logo', safeForPublic: true },
};

export const film = {
  poster: { src: '/media/brag-poster.jpg', width: 1920, height: 1080 },
  video: '/media/brag.mp4',
  duration: '0:25',
} as const

export const apk = {
  href: '/downloads/BistroBuddies.apk',
  fileName: 'BistroBuddies.apk',
  version: '1.0',
  sizeBytes: 15752797,
  sizeLabel: '15.8 MB',
  minAndroid: '7.0',
  sha256: '12bf82b502500f2eabd9e2942fa60c5624b62e135494a20a4ee8154a446cd5fd',
  packageName: 'com.bistrobuddies.app',
} as const;

export const brand = {
  name: 'BistroBuddies',
  tagline: 'COFFEE SHOP',
  email: 'bistrobuddies@gmail.com',
  location: 'Quezon City, Philippines',
  logo: {
    src: '/brand/BistroBuddiesLogo.png',
    width: 2000,
    height: 2000,
  },
  logoSmall: {
    src: '/brand/BistroBuddiesLogo-256.png',
    width: 256,
    height: 256,
  },
  logoMedium: {
    src: '/brand/BistroBuddiesLogo-512.png',
    width: 512,
    height: 512,
  },
} as const;
