# Despensa-app - REST API

[![Twitch nmarulo](https://img.shields.io/twitch/status/nmarulo?color=%23A970FF&label=twitch%20nmarulo&style=flat-square)](https://www.twitch.tv/nmarulo)
---

## Descripción

Despensa-app es una aplicación que te permite gestionar los productos que compras de forma habitual.

Este proyecto es la interfaz grafica que consume los recursos del [proyecto rest-api](https://github.com/despensa-app/despensa-rest-api).

## Demostración

No disponible.

## Despliegue local

- [Requisitos](#requisitos)
- [Empezar a trabajar](#empezar-a-trabajar)
  - [Trabajando en WebStorm](#working-webstorm)

### Requisitos

* [Angular 18](https://angular.dev)
* [Node.js 20](https://nodejs.org)
  * [Node para windows](https://github.com/coreybutler/nvm-windows/releases) (Opcional)

### Empezar a trabajar

<a name="working-webstorm"></a>
**Trabajando en WebStorm**

- [Clonar proyecto](#clonar-proyecto)
- [Configurar node.js path](#nodejs-path)
- [Ejecutar](#run)
- [Habilitar EditorConfig](#editor-config)
- [Establecer opciones de guardado](#on-save)

<a name="clonar-proyecto"></a>
Clonar proyecto:

> File > New > Project from Version Control

<a name="nodejs-path"></a>
Establecer la ruta local de node.js:

> File > Settings > Languages & Frameworks > Node.js

<a name="run"></a>
Ejecutar aplicación:

- `Run > Run...`
  - `start`

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
