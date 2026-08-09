<a href="https://github.com/despensa-app/despensa-web/issues/2">
<div align="center">

![Milestone hacktoberfest][github-milestone-shield]

</div>
</a>

---

[![DeepSource][deepsource-issues-badge]][deepsource-project-url]
![Version][github-package-shield]
![Twitch nmarulo][twitch-shield]

# Despensa-app - REST API

---

## Descripción

Despensa-app es una aplicación que te permite gestionar los productos que compras de forma habitual.

Este proyecto es la interfaz grafica que consume los recursos del [proyecto rest-api][github-project-web-url].

<details>
<summary>Características</summary>

- Ver/Crear/Modificar/Eliminar listas
- Listas publicas
- Listas por usuario (privadas)
- Agregar productos a la lista
- Filtrar productos
- Ver información de un producto
- Marcar productos de la lista
- Crear usuario
- Autenticación
- Autorización JWT
- Administración (Pendiente)

</details>

## Despliegue local

- [Requisitos](#requisitos)
- [Empezar a trabajar](#empezar-a-trabajar)
  - [Trabajando en WebStorm](#working-webstorm)

### Requisitos

* [Angular 22](https://angular.dev)
* [Node.js 24](https://nodejs.org) — versión exacta en `.node-version` (24.19.0)
  * [Node para windows](https://github.com/coreybutler/nvm-windows/releases) (Opcional)
* [pnpm](https://pnpm.io) — gestor de paquetes del proyecto

> El proyecto usa **pnpm**. No ejecutes `npm install`: generaría un `package-lock.json`
> desincronizado con `pnpm-lock.yaml`.

### Empezar a trabajar

<a name="working-webstorm"></a>
**Trabajando en WebStorm**

- [Clonar proyecto](#clonar-proyecto)
- [Configurar node.js path](#nodejs-path)
- [Instalar dependencias](#install)
- [Ejecutar](#run)
- [Habilitar EditorConfig](#editor-config)
- [Establecer opciones de guardado](#on-save)

<a name="clonar-proyecto"></a>
Clonar proyecto:

> File > New > Project from Version Control

<a name="nodejs-path"></a>
Establecer la ruta local de node.js:

> File > Settings > Languages & Frameworks > Node.js

<a name="install"></a>
Instalar dependencias:

```bash
pnpm install
```

<a name="run"></a>
Ejecutar aplicación:

- `Run > Run...`
  - `start`

O desde la terminal:

```bash
pnpm start   # servidor de desarrollo en http://localhost:4200
pnpm build   # compilación de producción en dist/despensa-web
pnpm test    # tests con Vitest
```

<a name="editor-config"></a>
Habilitar EditorConfig

- Es necesario tener habilitado el soporte de EditorConfig:

  > Settings > Editor > Code Style
  > - Enable Editor Config Support

<a name="on-save"></a>
Establecer acciones de guardado

- Recomiendo tener activado las acciones de guardado:
  - Reformat code
  - Optimize imports

> Settings > Tools > Actions on save

> Tener habilitado EditorConfig.

## Contribuir

Cualquier contribución que hagas será muy apreciada.

- Antes de empezar a codificar, lea las [directrices de contribución](CONTRIBUTING.md).

## Agradecimientos

Gracias a [JetBrains](https://www.jetbrains.com/?from=SoftN%20CMS) por proporcionar una licencia para WebStorm para
desarrollar este proyecto.

| JetBrains                                                                                             | WebStorm                                                                                                 |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| ![JetBrains logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jetbrains.svg) | ![WebStorm logo](https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.svg) |

## Licencia

[MIT license](LICENSE).

[deepsource-issues-badge]: https://app.deepsource.com/gh/despensa-app/despensa-web.svg/?label=active+issues&show_trend=true&token=KSUlkEjbiP00qjGGMmv1Oe8C

[deepsource-project-url]: https://app.deepsource.com/gh/despensa-app/despensa-web/

[twitch-shield]: https://img.shields.io/twitch/status/andyonthewings?style=flat-square&label=Twitch%20nMarulo&labelColor=A970FF&link=https%3A%2F%2Fwww.twitch.tv%2Fnmarulo

[github-milestone-shield]: https://img.shields.io/github/milestones/progress/despensa-app/despensa-web/1?style=flat-square

[github-project-web-url]: https://github.com/despensa-app/despensa-web

[github-package-shield]: https://img.shields.io/github/package-json/v/despensa-app/despensa-web?style=flat-square
