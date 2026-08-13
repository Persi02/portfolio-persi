"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Une erreur est survenue
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Un problème inattendu a empêché le chargement de la page. Veuillez
        réessayer.
      </p>
      <Button variant="outline" onClick={reset}>
        Réessayer
      </Button>
    </main>
  );
}
