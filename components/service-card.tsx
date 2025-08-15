"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { ServiceIcon } from "@/components/service-icon";
import { urlFor } from "@/lib/sanity";
import { Service } from "@/lib/types";
import { useState } from "react";
import { ServiceOrderModal } from "@/components/service-order-modal";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className={`relative overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col ${
          service.popular ? "ring-2 ring-primary" : ""
        }`}
      >
        {service.popular && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              Популярно
            </Badge>
          </div>
        )}

        <div className="aspect-video relative">
          <Image
            src={
              urlFor(service.mainImage)
                .width(400)
                .height(300)
                .url() || "/placeholder.svg"
            }
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-primary">
              <ServiceIcon icon={service.icon} />
            </div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
          </div>
          <CardDescription className="text-sm">
            {service.description}
          </CardDescription>
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Что входит:</h4>
            <ul className="space-y-1">
              {service.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-muted-foreground">Срок: </span>
              <span className="font-medium">{service.duration}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-primary">
                {service.price}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-auto">
            <Button
              className="flex-1"
              onClick={() => setIsModalOpen(true)}
            >
              Заказать
            </Button>
            <Button variant="outline" size="sm">
              Подробнее
            </Button>
          </div>
        </CardContent>
      </Card>

      <ServiceOrderModal
        service={service}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
