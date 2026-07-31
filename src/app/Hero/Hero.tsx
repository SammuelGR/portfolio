import heroBackgroundFallback from './assets/hero-background.jpg';
import heroBackground from './assets/hero-background.webp';

export default function Hero() {
  return (
    <section
      className="bg-cover bg-position-[90%_center] min-h-svh md:bg-center"
      style={{
        backgroundImage: `image-set(url("${heroBackground}") type("image/webp"), url("${heroBackgroundFallback}") type("image/jpeg"))`,
      }}
    />
  );
}
