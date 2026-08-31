## Intención inicial

Este proyecto simula un archivo/catálogo de armas de un MMORPG estilo
Sword Art Online. Cada arma tiene tipo, rareza y un estado de forja.
El sistema permite "forjar" armas (proceso simulado asíncrono),
filtrarlas por rareza y calcular su poder total.

**Restricciones:**
- No hay backend real; todos los datos viven en memoria (arrays/objetos).
- La "forja" se simula con un retraso artificial (setTimeout dentro de una Promise).

**Criterios de aceptación:**
1. El usuario puede filtrar el catálogo de armas por rareza.
2. La función de forja simula una espera asíncrona y puede fallar si
   faltan materiales.
3. Al migrar a TypeScript, el compilador detecta y corrige al menos
   un error real de tipos (documentado en este README).

   ## Errores detectados por TypeScript

1. **Error:** el arreglo de materiales se pasaba como `string[]`
   pero la función esperaba `Material[]`.
   **Corrección:** se redefinió el arreglo de ejemplo con objetos
   `{ nombre, cantidad }`.
 

   ## Decisiones de tipado
(explica por qué usaste `type` vs `interface` en cada caso, y qué
representa tu unión literal `Rareza`)

## Comandos de instalación y ejecución

npm install
npm run build
npm run start

## Aprendizajes
