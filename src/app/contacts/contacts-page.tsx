"use client";

import {
  AlertCircle,
  Building2,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { ComparisonPanel } from "@/components/layout/comparison-panel";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactsPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    setFormStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleRetry = () => {
    setFormStatus("idle");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-background-secondary">
        <div className="container-custom py-8 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Контакты
            </h1>
            <p className="text-foreground-secondary max-w-xl mx-auto">
              Свяжитесь с нами по любым вопросам — мы рады помочь пользователям
              и партнёрам
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Общие вопросы
                      </h3>
                      <a
                        href="mailto:info@rko-sravni.ru"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        info@rko-sravni.ru
                      </a>
                      <p className="text-xs text-foreground-muted mt-1">
                        Вопросы по работе сервиса
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Building2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Для банков
                      </h3>
                      <a
                        href="mailto:partners@rko-sravni.ru"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        partners@rko-sravni.ru
                      </a>
                      <p className="text-xs text-foreground-muted mt-1">
                        Сотрудничество и партнёрство
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <MessageSquare className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Поддержка
                      </h3>
                      <p className="text-sm text-foreground-secondary">
                        Ответим в течение 24 часов
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        Пн-Пт, 9:00-18:00 МСК
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Форма обратной связи</CardTitle>
              </CardHeader>
              <CardContent>
                {formStatus === "success" ? (
                  <Alert className="border-success bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                      Сообщение отправлено! Мы свяжемся с вами в ближайшее
                      время.
                    </AlertDescription>
                  </Alert>
                ) : formStatus === "error" ? (
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Не удалось отправить сообщение. Попробуйте позже.
                      </AlertDescription>
                    </Alert>
                    <Button onClick={handleRetry}>Повторить</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          id="name"
                          placeholder="Ваше имя"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Выберите тему" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="question">
                            Вопрос по сервису
                          </SelectItem>
                          <SelectItem value="partnership">
                            Предложение о сотрудничестве
                          </SelectItem>
                          <SelectItem value="bug">
                            Сообщить об ошибке
                          </SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        placeholder="Опишите ваш вопрос или предложение..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={formStatus === "loading"}
                    >
                      {formStatus === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        "Отправить сообщение"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
      <ComparisonPanel />
    </div>
  );
}
