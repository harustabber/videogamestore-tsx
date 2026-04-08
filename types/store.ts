export interface Store {
  id: string;
  name: string;   // Ej: "Kuromi Centro"
  address: string;   // Dirección física
  city: string;
  phone: string | null;
  mapUrl: string | undefined;  // Para insertar el iframe de Google Maps
  isMain: boolean; // Para marcar la sede principal
  openingHours: string | null; // Ej: "Lun-Vie 9am-6pm"
  createdAt: Date; // Fecha de creación
}