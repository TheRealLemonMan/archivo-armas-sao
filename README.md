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
   faltan materiales. Para que falle cambiar la línea 89 con lo siguiente: const arma = await forjarArma(base, ["mineral"]); que ahi solo va a usar una sola arma
3. Al migrar a TypeScript, el compilador detecta y corrige al menos
   un error real de tipos (documentado en este README).

## Errores detectados por TypeScript

1. **Error:** el arreglo de materiales se pasaba como string[]
   pero la función esperaba Material[].
   **Corrección:** se redefinió el arreglo de ejemplo con objetos
   { nombre, cantidad }.
 

## Decisiones de tipado
   Se usó interface para ArmaBase y Arma porque representan la forma
   principal de una entidad y Arma extiende a ArmaBase (relación de
   herencia, algo natural en interfaces). Se usó type para las uniones
   literales (Rareza, TipoArma, EstadoForja) porque TypeScript no
   permite representar uniones de valores literales con interface.
   La unión Rareza representa los niveles de rareza de un arma
   ("comun" a "legendario"), usados tanto para el sistema de forja
   como para el cálculo de poder y el filtrado. 

## Comandos de instalación y ejecución

   npm install
   npm run build
   npm run start

## Aprendizajes
   Durante el proyecto aprendí que con TypeScript no solo se agregan como "tipos", sino que me obligo a pensar la forma de los datos que iba a usar antes de escribir la lógica y ya despúes copilot me ayude con el resto, un ejemplo es para definir la Rareza como union literal me ayudó a usar: Record<Rareza, number> para asegurar que cada rareza tuviera su "bono" de poder, algo que tal vez en JS me pude haber olvidado.
   También me di cuenta de que muchos de los errores que tuve no venian del compilador sino
   de detalles simples como un SetTimeout con mayúscula (en vez de
   setTimeout) hizo que todo mi sistema fallara durante
   la "forja", y una variable declarada como Forjadas pero usada como
   forjadas rompía el programa por la diferencia entre mayúsculas y
   minúsculas. Esto me enseñó a leer los mensajes de error con más cuidado
   y a probar el código en cada paso, no solo al final.
   Aprendí además la diferencia práctica entre correr el programa con el node
   y compilarlo con npx tsc: los errores de tipos solo aparecen al
   compilar, no al ejecutar, así que tuve que acostumbrarme a correr tsc
   después de cada cambio para confirmar que todo seguía siendo válido.
   Por el lado de Git y GitHub, entendí que un archivo puede existir en mi
   computadora sin estar realmente en el repositorio si nunca hice
   git add sobre él — me pasó con el propio README JAJAJAJA, que aunque lo tenía
   escrito localmente, nunca había sido parte de un commit hasta que lo
   noté revisando el repositorio en la web.

## Errores detectados por TypeScript

   1. **Error:** al probar la función forjarArma pasando un número en vez
   de un texto dentro del arreglo de materiales
   (forjarArma(base, [123, "esencia"])), TypeScript marcó:
   
   src/index.ts:89:44 - error TS2322: Type 'number' is not assignable to type 'string'.
   89 const arma = await forjarArma(base, [123, "esencia"]);  
   
   
   **Corrección:** se confirmó que el parámetro materiales de
   forjarArma está tipado como string[], por lo que solo acepta
   texto. Se corrigió el arreglo de vuelta a
   ["mineral", "esencia"]. Este error demuestra que TypeScript
   detecta en tiempo de compilación un tipo de dato inválido que en
   JavaScript puro habría pasado desapercibido hasta ejecutarse. 