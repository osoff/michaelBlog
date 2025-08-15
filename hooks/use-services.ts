"use client";

import { useState, useEffect } from "react";
import { Service } from "@/lib/types";

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch("/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        
        const servicesData = await response.json();
        setServices(servicesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки услуг");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, isLoading, error };
}
