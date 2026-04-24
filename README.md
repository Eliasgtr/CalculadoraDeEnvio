# 🚚 Calculadora de Tarifas de Envío Internacional

Aplicación web para calcular el costo de envío internacional según el peso del paquete y el país de destino. Desarrollada con **React** en el frontend y **ASP.NET Core / C#** en el backend, siguiendo una **arquitectura en capas**.


## 📦 Descripción

El módulo permite a los clientes de una plataforma de comercio electrónico:

- Ingresar el **peso del paquete** en kilogramos.
- Seleccionar el **país de destino** del envío.
- Obtener automáticamente el **costo total** del envío en USD.

---

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Presentación (Frontend) | React 18 + Vite |
| API | ASP.NET Core 8 |
| Lógica de Negocio | C# 12 |
| Datos | JSON (appsettings.json) |
| Documentación API | Swagger / OpenAPI |

---

## 🏗️ Arquitectura

El proyecto implementa una **Arquitectura en Capas** con separación estricta de responsabilidades:

```
┌─────────────────────────────────────┐
│   CAPA DE PRESENTACIÓN              │
│   ShippingApp.Presentation (React)  │
│   Componentes UI · HTTP Client      │
└────────────────┬────────────────────┘
                 │ HTTPS / REST (JSON)
┌────────────────▼────────────────────┐
│   CAPA API                          │
│   ShippingApp.API (ASP.NET Core)    │
│   Controllers · Swagger             │
└────────────────┬────────────────────┘
                 │ Llamada interna C#
┌────────────────▼────────────────────┐
│   CAPA DE LÓGICA DE NEGOCIO         │
│   ShippingApp.Business              │
│   Services · Reglas de cálculo      │
└────────────────┬────────────────────┘
                 │ Interfaz / Repositorio
┌────────────────▼────────────────────┐
│   CAPA DE DATOS                     │
│   ShippingApp.Data                  │
│   Repositories · Configuración      │
└─────────────────────────────────────┘
         ↕ Modelos compartidos
┌─────────────────────────────────────┐
│   ShippingApp.Models                │
│   DTOs · Entidades                  │
└─────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
ShippingApp/
├── ShippingApp.sln
│
├── ShippingApp.Presentation/        # Capa Presentación — React
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       ├── api/
│       │   └── shippingApi.js       # Comunicación con la API
│       └── components/
│           ├── ShippingForm.jsx     # Formulario principal
│           ├── CountrySelector.jsx  # Selector de país
│           └── ResultDisplay.jsx    # Visualización del resultado
│
├── ShippingApp.API/                 # Capa API — ASP.NET Core
│   ├── Program.cs
│   ├── appsettings.json
│   └── Controllers/
│       └── ShippingController.cs
│
├── ShippingApp.Business/            # Capa Lógica de Negocio
│   └── Services/
│       ├── IShippingService.cs
│       └── ShippingService.cs
│
├── ShippingApp.Data/                # Capa de Datos
│   └── Repositories/
│       ├── IRateRepository.cs
│       └── RateRepository.cs
│
└── ShippingApp.Models/              # Modelos compartidos
    ├── DTOs/
    │   ├── ShippingRequestDto.cs
    │   └── ShippingResponseDto.cs
    └── Entities/
        └── ShippingRate.cs
```

---

## 💰 Reglas de Negocio

El costo de envío se calcula con la fórmula:

```
Costo (USD) = Peso (kg) × Tarifa del país
```

| País | Código | Tarifa por kg |
|------|--------|--------------|
| India | IN | $5.00 USD |
| Estados Unidos | US | $8.00 USD |
| Reino Unido | UK | $10.00 USD |

**Ejemplo:** Un paquete de 3 kg con destino a Estados Unidos → `3 × $8 = $24.00 USD`

---

## ✅ Requisitos Previos

Asegúrate de tener instalado:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/) y npm
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (para el backend)
- [Visual Studio Code](https://code.visualstudio.com/) (recomendado para el frontend)

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/ShippingApp.git
cd ShippingApp
```

### 2. Ejecutar el Backend

**Opción A — Visual Studio:**
1. Abre `ShippingApp.sln` en Visual Studio 2022.
2. Establece `ShippingApp.API` como proyecto de inicio.
3. Presiona `Ctrl + F5`.

**Opción B — Terminal:**
```bash
cd ShippingApp.API
dotnet run
```

El backend quedará disponible en: `http://localhost:5000`  
Documentación Swagger: `http://localhost:5000/swagger`

### 3. Ejecutar el Frontend

Abre una **segunda terminal**:

```bash
cd ShippingApp.Presentation
npm install
npm run dev
```

El frontend quedará disponible en: `http://localhost:5173`

### 4. Usar la aplicación

Con ambos servidores corriendo, abre el navegador en:

```
http://localhost:5173
```

---

## 🔌 Endpoints de la API

Base URL: `http://localhost:5000/api/shipping`

### GET `/countries`
Retorna la lista de países disponibles con sus tarifas.

**Respuesta:**
```json
[
  { "country": "India",          "countryCode": "IN", "ratePerKg": 5  },
  { "country": "Estados Unidos", "countryCode": "US", "ratePerKg": 8  },
  { "country": "Reino Unido",    "countryCode": "UK", "ratePerKg": 10 }
]
```

### POST `/calculate`
Calcula el costo de envío.

**Body:**
```json
{
  "weight": 3.5,
  "destinationCountry": "US"
}
```

**Respuesta exitosa (200):**
```json
{
  "shippingCost": 28.0,
  "currency": "USD",
  "country": "Estados Unidos",
  "weight": 3.5,
  "ratePerKg": 8
}
```

**Respuesta de error (400):**
```json
{
  "error": "El peso debe ser mayor a 0."
}
```

---

## 📈 Escalabilidad

Para agregar un nuevo país de destino **no se requiere modificar código**. Solo agrega una entrada en `ShippingApp.API/appsettings.json`:

```json
"ShippingRates": [
  { "Country": "India",          "CountryCode": "IN", "RatePerKg": 5  },
  { "Country": "Estados Unidos", "CountryCode": "US", "RatePerKg": 8  },
  { "Country": "Reino Unido",    "CountryCode": "UK", "RatePerKg": 10 },
  { "Country": "Canada",         "CountryCode": "CA", "RatePerKg": 7  }
]
```

El sistema lo detecta automáticamente en el frontend y en el backend. ✅
