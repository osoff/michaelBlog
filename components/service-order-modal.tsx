"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Service } from "@/lib/types";

interface ServiceOrderModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

interface OrderFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface OrderStatus {
  type: "idle" | "loading" | "success" | "error";
  message: string;
}

export function ServiceOrderModal({
  service,
  isOpen,
  onClose,
}: ServiceOrderModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<OrderStatus>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: имя и email",
      });
      return;
    }

    // Email валидация
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Пожалуйста, введите корректный email",
      });
      return;
    }

    setStatus({ type: "loading", message: "Отправляем заявку..." });

    try {
      const response = await fetch("/api/service-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceTitle: service?.title,
          servicePrice: service?.price,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message:
            "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
        });
        // Очищаем форму
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        // Закрываем модалку через 3 секунды
        setTimeout(() => {
          onClose();
          setStatus({ type: "idle", message: "" });
        }, 3000);
      } else {
        setStatus({
          type: "error",
          message:
            result.error || "Ошибка отправки заявки. Попробуйте еще раз.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Ошибка сети. Проверьте подключение к интернету.",
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case "loading":
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "error":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const handleClose = () => {
    if (status.type !== "loading") {
      onClose();
      setStatus({ type: "idle", message: "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    }
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Заказать услугу</DialogTitle>
          <DialogDescription>{service.title}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Имя <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Компания</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Название вашей компании"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Дополнительная информация</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Расскажите подробнее о ваших потребностях..."
              className="min-h-[100px]"
            />
          </div>

          {/* Status Message */}
          {status.type !== "idle" && (
            <div className={`p-3 rounded-md border ${getStatusColor()}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="text-sm font-medium">{status.message}</span>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={status.type === "loading"}>
              {status.type === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправляем...
                </>
              ) : (
                "Отправить заявку"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={status.type === "loading"}>
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
