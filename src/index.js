const armasBase =[
    {nombre :"Espada de Élucidator", tipo: "Espada", ataqueBase: 50, dudaribilidad: 100},
    {nombre : "Daga del Susurro", tipo: "Daga", ataqueBase: 30, dudaribilidad: 80},
    {nombre : "Lanza Perforadora", tipo: "Lanza", ataqueBase: 40, dudaribilidad: 90},
];

//Forjar el arma (asíncronicamente, puede fallar dependiendo OJO)

function forjarArma(base, materiales) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (materiales.length < 2) {
                reject(new Error(`Materiales insuficientes para forjar el arma: ${base.nombre}`));
                return;
            }
            const rarezaPosible = ["comun","poco comun", "raro", "épico", "legendario"];
            const rareza = rarezaPosible[Math.floor(Math.random() * rarezaPosible.length)];

            //destruturing + spread
            const armaForjada = {
                ...base,
                rareza,
                estado: "forjada",
            };
            resolve(armaForjada);
        }, 800);
    });
}

//Sistema de filtrado por rareza
function filtrarPorRareza(armas, rareza) {
    return armas.filter(arma => arma.rareza === rareza);
}

//Calcular el poder total de un arma
function calcularPoderTotal(arma) {
    const bonusPorRareza = {
        comun: 1,
        "poco comun": 1.2,
        raro: 1.5,
        épico: 2,
        legendario: 3,
    };
    return Math.round(arma.ataqueBase * bonusPorRareza[arma.rareza] || 1);
}


//Ejecucion de ejemplo 
async function main() {
    console.log("Forjando armas...");
    const forjadas = [];

    for (const base of armasBase) {
        try {
            const arma = await forjarArma(base, ["mineral", "esencia"]);
            forjadas.push(arma);
            console.log(`Arma forjada: ${arma.nombre}, Rareza: ${arma.rareza}, Poder Total: ${calcularPoderTotal(arma)}`);
        } catch (error) {
            console.error(`Error forjando arma: ${base.nombre}`);
        }
    }

    const armasRaras = filtrarPorRareza(forjadas, "raro");
    console.log("\narmas raras:", armasRaras.map((a) => a.nombre));
}

main();