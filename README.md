# Restaurante Punto de Encuentro - Menú Interactivo y Sistema de Pedidos

Plataforma web dinámica desarrollada para el restaurante Punto de Encuentro. La aplicación permite a los usuarios visualizar el menú de platos y bebidas tradicionales, filtrar por categorías, agregar productos a un carrito de compras interactivo y enviar el pedido directamente al restaurante a través de WhatsApp.

---

## Funcionalidades Principales

- **Menú Dinámico**: Carga de platos y bebidas generada mediante JavaScript a partir de una estructura de datos estructurada.
- **Filtrado por Categorías**: Clasificación instantánea de items (Platos Diarios, Especialidades, Bebidas, Repostería).
- **Carrito de Compras**:
  - Cálculo en tiempo real del costo subtotal y total en Bolivianos (Bs.).
  - Adición, incremento, decremento y eliminación de productos.
- **Integración con WhatsApp API**: Generación automática de un mensaje con el formato estructurado del pedido (datos del cliente, lista de items con cantidades y total a pagar) dirigido al número del establecimiento.
- **Diseño Adaptativo**: Interfaz web optimizada para dispositivos móviles y de escritorio.

---

## Estructura del Proyecto

```text
restaurante-punto-de-encuentro/
│
├── index.html          # Estructura principal de la interfaz web
├── styles.css          # Hojas de estilo y diseño visual
├── script.js          # Lógica del menú, filtrado, carrito y WhatsApp API
└── img/                # Directorio de recursos de imagen del menú