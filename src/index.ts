// --- Tipos y uniones literales ---
type Rareza = "comun" | "poco comun" | "raro" | "épico" | "legendario";
type TipoArma = "Espada" | "Daga" | "Lanza";
type EstadoForja = "sin forjar" | "forjando" | "forjada" | "bendecida" | "corrompida";

interface ArmaBase {
  nombre: string;
  tipo: TipoArma;
  ataqueBase: number;
  dudaribilidad: number;
}

interface Arma extends ArmaBase {
  rareza: Rareza;
  estado: EstadoForja;
}

const armasBase: ArmaBase[] = [
  { nombre: "Espada de Élucidator", tipo: "Espada", ataqueBase: 50, dudaribilidad: 100 },
  { nombre: "Daga del Susurro", tipo: "Daga", ataqueBase: 30, dudaribilidad: 80 },
  { nombre: "Lanza Perforadora", tipo: "Lanza", ataqueBase: 40, dudaribilidad: 90 },
];

// Forjar el arma (asíncronamente, puede fallar dependiendo OJO)
function forjarArma(base: ArmaBase, materiales: string[]): Promise<Arma> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (materiales.length < 2) {
        reject(new Error(`Materiales insuficientes para forjar el arma: ${base.nombre}`));
        return;
      }
      const rarezaPosible: Rareza[] = ["comun", "poco comun", "raro", "épico", "legendario"];
      const rareza = rarezaPosible[Math.floor(Math.random() * rarezaPosible.length)] as Rareza;

      // destructuring + spread
      const armaForjada: Arma = {
        ...base,
        rareza,
        estado: "forjada",
      };
      resolve(armaForjada);
    }, 800);
  });
}

// Sistema de filtrado por rareza
function filtrarPorRareza(armas: Arma[], rareza: Rareza): Arma[] {
  return armas.filter((arma) => arma.rareza === rareza);
}

// Calcular el poder total de un arma
function calcularPoderTotal(arma: Arma): number {
  const bonusPorRareza: Record<Rareza, number> = {
    "comun": 1,
    "poco comun": 1.2,
    "raro": 1.5,
    "épico": 2,
    "legendario": 3,
  };
  return Math.round(arma.ataqueBase * bonusPorRareza[arma.rareza]);
}

// Ejecución de ejemplo
async function main(): Promise<void> {
  console.log("Forjando armas...");
  const forjadas: Arma[] = [];

  for (const base of armasBase) {
    try {
      const arma = await forjarArma(base, ["mineral", "esencia"]);
      forjadas.push(arma);
      console.log(
        `Arma forjada: ${arma.nombre}, Rareza: ${arma.rareza}, Poder Total: ${calcularPoderTotal(arma)}`
      );
    } catch (error) {
      console.error(`Error forjando arma: ${base.nombre}`);
    }
  }

  const armasRaras = filtrarPorRareza(forjadas, "raro");
  console.log("\nArmas raras:", armasRaras.map((a) => a.nombre));
}

main();