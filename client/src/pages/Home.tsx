import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container py-12">
        <h1 className="text-4xl font-bold mb-8">DNCommerce - Sistema de Gerenciamento</h1>
        <p className="text-lg mb-4">
          Backend para gerenciamento de estoque e pedidos de produtos de beleza.
        </p>
        
        {loading && (
          <div className="flex items-center gap-2">
            <Loader2 className="animate-spin" />
            <span>Carregando...</span>
          </div>
        )}
        
        {!loading && !isAuthenticated && (
          <Button asChild>
            <a href={getLoginUrl()}>Fazer Login</a>
          </Button>
        )}
        
        {isAuthenticated && user && (
          <div>
            <p className="mb-4">Bem-vindo, {user.name}!</p>
            <Button onClick={() => logout()}>Sair</Button>
          </div>
        )}
      </main>
    </div>
  );
}
