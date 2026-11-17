import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MarketplaceSections, { SHOP_ITEMS } from "./components/sections/MarketplaceSections";
import type { ShopItem } from "./components/sections/MarketplaceSections";
import Footer from "./components/sections/Footer";
import ShopPage from "./components/sections/ShopPage";
import ShopDetailPage from "./components/sections/ShopDetailPage";
import AuthPage from "./components/sections/AuthPage";
import "./shop.css";

type AppRoute = {
  isShop: boolean;
  itemId: string | null;
  authMode: "login" | "signup" | null;
};

function readRoute(): AppRoute {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("item");
  const auth = params.get("auth");

  return {
    isShop: params.get("shop") === "1" || itemId !== null,
    itemId,
    authMode: auth === "login" || auth === "signup" ? auth : null,
  };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const selectedItem = SHOP_ITEMS.find((item) => item.id === route.itemId);

  useEffect(() => {
    function syncRoute() {
      setRoute(readRoute());
    }

    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  function openItem(item: ShopItem) {
    const url = new URL(window.location.href);
    if (!route.isShop) {
      const shopUrl = new URL(url);
      shopUrl.searchParams.set("shop", "1");
      shopUrl.searchParams.delete("item");
      window.history.pushState({ gamekalcerShop: true }, "", shopUrl.toString());
    }

    url.searchParams.set("shop", "1");
    url.searchParams.set("item", item.id);
    window.history.pushState({ gamekalcerItem: item.id }, "", url.toString());
    setRoute({ isShop: true, itemId: item.id, authMode: null });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToShop() {
    if (window.history.state?.gamekalcerItem) {
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("shop", "1");
    url.searchParams.delete("item");
    window.history.replaceState({ gamekalcerShop: true }, "", url.toString());
    setRoute({ isShop: true, itemId: null, authMode: null });
  }

  function toggleFavorite(itemId: string) {
    setFavoriteIds((current) => current.includes(itemId)
      ? current.filter((id) => id !== itemId)
      : [...current, itemId]);
  }

  function changeAuthMode(mode: "login" | "signup") {
    const url = new URL(window.location.href);
    url.searchParams.set("auth", mode);
    url.searchParams.delete("shop");
    url.searchParams.delete("item");
    window.history.pushState({ gamekalcerAuth: mode }, "", url.toString());
    setRoute({ isShop: false, itemId: null, authMode: mode });
    window.scrollTo({ top: 0 });
  }

  if (route.authMode) {
    return <AuthPage mode={route.authMode} onModeChange={changeAuthMode} />;
  }

  if (selectedItem) {
    return <ShopDetailPage item={selectedItem} onBack={backToShop} />;
  }

  if (route.isShop) {
    return (
      <ShopPage
        onSelect={openItem}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    );
  }

  return (
    <main className="page" id="top">
      <section className="hero-section">
        <Nav />
        <Hero />
      </section>
      <Features />
      <MarketplaceSections onSelect={openItem} />
      <Footer />
    </main>
  );
}
