import 'dotenv/config'
import { readdirSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const DND_DIR = 'rol-sistems/dnd'

// Directorio físico donde viven los JSON de datos (../data respecto a /prisma)
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '../data')

/**
 * Recorre recursivamente una carpeta de DATA_DIR y devuelve, por cada JSON
 * jugable, su nombre y la ruta relativa (la misma forma que ruta_json usa el resto del seed).
 * - `claveRaiz` es la clave del objeto JSON de la que se extrae el nombre (p.ej. 'hechizo').
 * - `excluir` son nombres de subcarpetas a ignorar (propiedades, maestrias, etc.).
 */
function leerItemsDeCarpeta(
  subdir: string,
  claveRaiz: string,
  excluir: string[] = [],
): { nombre: string; ruta: string }[] {
  const baseAbs = join(DATA_DIR, DND_DIR, subdir)
  const resultado: { nombre: string; ruta: string }[] = []

  const recorrer = (abs: string) => {
    for (const entrada of readdirSync(abs, { withFileTypes: true })) {
      if (entrada.isDirectory()) {
        if (excluir.includes(entrada.name)) continue
        recorrer(join(abs, entrada.name))
      } else if (entrada.name.endsWith('.json')) {
        const rutaAbs = join(abs, entrada.name)
        const json = JSON.parse(readFileSync(rutaAbs, 'utf-8'))
        const nombre = json?.[claveRaiz]?.nombre
        if (!nombre) continue
        // ruta_json relativa a DATA_DIR, con separadores '/'
        const rutaRel = rutaAbs.slice(DATA_DIR.length + 1).split('\\').join('/')
        resultado.push({ nombre, ruta: rutaRel })
      }
    }
  }

  recorrer(baseAbs)
  return resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

const razas = [
  { id: 1, nombre: 'Humano',  ruta: `${DND_DIR}/razas/humano.json`  },
  { id: 2, nombre: 'Elfo',    ruta: `${DND_DIR}/razas/elfo.json`    },
  { id: 3, nombre: 'Enano',   ruta: `${DND_DIR}/razas/enano.json`   },
  { id: 4, nombre: 'Mediano', ruta: `${DND_DIR}/razas/mediano.json` },
]

const clases = [
  { id: 5, nombre: 'Guerrero', ruta: `${DND_DIR}/clases/guerrero.json` },
  { id: 6, nombre: 'Mago',     ruta: `${DND_DIR}/clases/mago.json`     },
  { id: 7, nombre: 'Pícaro',   ruta: `${DND_DIR}/clases/picaro.json`   },
  { id: 8, nombre: 'Clérigo',  ruta: `${DND_DIR}/clases/clerigo.json`  },
]

const trasfondos = [
  { id: 9,  nombre: 'Acólito',  ruta: `${DND_DIR}/trasfondos/acolito.json`  },
  { id: 10, nombre: 'Criminal', ruta: `${DND_DIR}/trasfondos/criminal.json` },
  { id: 11, nombre: 'Noble',    ruta: `${DND_DIR}/trasfondos/noble.json`    },
  { id: 12, nombre: 'Sabio',    ruta: `${DND_DIR}/trasfondos/sabio.json`    },
]

const estilosCombate = [
  { id: 13, nombre: 'Arquería',           ruta: `${DND_DIR}/dotes/dotes-pelea/arqueria.json`    },
  { id: 14, nombre: 'Defensa',            ruta: `${DND_DIR}/dotes/dotes-pelea/defensa.json`     },
  { id: 15, nombre: 'Duelo',              ruta: `${DND_DIR}/dotes/dotes-pelea/duelo.json`       },
  { id: 16, nombre: 'Combate a dos manos', ruta: `${DND_DIR}/dotes/dotes-pelea/grandes-armas.json` },
  { id: 17, nombre: 'Lucha con dos armas', ruta: `${DND_DIR}/dotes/dotes-pelea/dos-armas.json`  },
  { id: 18, nombre: 'Protección',         ruta: `${DND_DIR}/dotes/dotes-pelea/proteccion.json` },
]

const subclasesGuerrero = [
  { id: 19, nombre: 'Campeón',           ruta: `${DND_DIR}/subclases/guerrero/campeon.json`            },
  { id: 20, nombre: 'Maestro de batalla', ruta: `${DND_DIR}/subclases/guerrero/maestro-de-batalla.json` },
  { id: 21, nombre: 'Caballero Eldritch', ruta: `${DND_DIR}/subclases/guerrero/caballero-eldritch.json` },
  { id: 22, nombre: 'Guerrero Psi',       ruta: `${DND_DIR}/subclases/guerrero/guerrero-psi.json`       },
]

const subclasesMago = [
  { id: 23, nombre: 'Abjurador', ruta: `${DND_DIR}/subclases/mago/abjurador.json` },
  { id: 24, nombre: 'Evocador',  ruta: `${DND_DIR}/subclases/mago/evocador.json`  },
]

const subclasesPicaro = [
  { id: 25, nombre: 'Asesino', ruta: `${DND_DIR}/subclases/picaro/asesino.json` },
  { id: 26, nombre: 'Ladrón',  ruta: `${DND_DIR}/subclases/picaro/ladron.json`  },
]

const subclasesClerigo = [
  { id: 27, nombre: 'Dominio de Vida', ruta: `${DND_DIR}/subclases/clerigo/dominio-vida.json` },
  { id: 28, nombre: 'Dominio de Luz',  ruta: `${DND_DIR}/subclases/clerigo/dominio-luz.json`  },
]

async function main() {
  const dnd = await prisma.sistemaRol.upsert({
    where: { id_sistema_rol: 1 },
    update: {},
    create: { nombre: 'D&D 5e', descripcion: 'Dungeons & Dragons 5ª Edición' },
  })

  for (const r of razas) {
    await prisma.item.upsert({
      where: { id_item: r.id },
      update: { ruta_json: r.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'raza', nombre: r.nombre, ruta_json: r.ruta },
    })
  }

  for (const c of clases) {
    await prisma.item.upsert({
      where: { id_item: c.id },
      update: { ruta_json: c.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'clase', nombre: c.nombre, ruta_json: c.ruta },
    })
  }

  for (const t of trasfondos) {
    await prisma.item.upsert({
      where: { id_item: t.id },
      update: { ruta_json: t.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'trasfondo', nombre: t.nombre, ruta_json: t.ruta },
    })
  }

  for (const e of estilosCombate) {
    await prisma.item.upsert({
      where: { id_item: e.id },
      update: { ruta_json: e.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'estilo_combate', nombre: e.nombre, ruta_json: e.ruta },
    })
  }

  for (const s of subclasesGuerrero) {
    await prisma.item.upsert({
      where: { id_item: s.id },
      update: { ruta_json: s.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'subclase_guerrero', nombre: s.nombre, ruta_json: s.ruta },
    })
  }

  for (const s of subclasesMago) {
    await prisma.item.upsert({
      where: { id_item: s.id },
      update: { ruta_json: s.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'subclase_mago', nombre: s.nombre, ruta_json: s.ruta },
    })
  }

  for (const s of subclasesPicaro) {
    await prisma.item.upsert({
      where: { id_item: s.id },
      update: { ruta_json: s.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'subclase_picaro', nombre: s.nombre, ruta_json: s.ruta },
    })
  }

  for (const s of subclasesClerigo) {
    await prisma.item.upsert({
      where: { id_item: s.id },
      update: { ruta_json: s.ruta },
      create: { id_sistema_rol: dnd.id_sistema_rol, tipo_item: 'subclase_clerigo', nombre: s.nombre, ruta_json: s.ruta },
    })
  }

  // --- Categorías leídas desde carpetas (IDs autogenerados) ---
  // Los grupos anteriores usan IDs fijos (1..28) que NO avanzan la secuencia de
  // autoincrement en Postgres. Antes de insertar con ID autogenerado, resincronizamos
  // la secuencia al máximo id_item existente para evitar colisiones de clave primaria.
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('item', 'id_item'), COALESCE((SELECT MAX(id_item) FROM item), 1))`,
  )

  // Cada entrada: tipo_item destino, subcarpeta, clave raíz del JSON y subcarpetas a excluir.
  const categoriasPorCarpeta = [
    { tipo: 'hechizo',   subdir: 'hechizos',         clave: 'hechizo',  excluir: [] },
    { tipo: 'arma',      subdir: 'objetos/armas',    clave: 'arma',     excluir: ['propiedades', 'maestria'] },
    { tipo: 'armadura',  subdir: 'objetos/armadura', clave: 'armadura', excluir: ['propiedades', 'sin-armadura'] },
  ]

  for (const cat of categoriasPorCarpeta) {
    const items = leerItemsDeCarpeta(cat.subdir, cat.clave, cat.excluir)
    // Idempotente: como el id es autogenerado, se limpian los de este tipo y se reinsertan.
    await prisma.item.deleteMany({ where: { tipo_item: cat.tipo, id_sistema_rol: dnd.id_sistema_rol } })
    await prisma.item.createMany({
      data: items.map((it) => ({
        id_sistema_rol: dnd.id_sistema_rol,
        tipo_item: cat.tipo,
        nombre: it.nombre,
        ruta_json: it.ruta,
      })),
    })
    console.log(`  ${cat.tipo}: ${items.length} items insertados`)
  }

  const plantilla = await prisma.fichaPlantilla.upsert({
    where: { id_plantilla: 1 },
    update: {},
    create: { id_sistema_rol: dnd.id_sistema_rol, nombre_plantilla: 'Ficha DnD 5e', version: 1 },
  })

  const camposPlantilla = [
    { nombre_campo: 'stats',          id_item_tipo: null },
    { nombre_campo: 'combate',        id_item_tipo: null },
    { nombre_campo: 'salvaciones',    id_item_tipo: null },
    { nombre_campo: 'habilidades',    id_item_tipo: null },
    { nombre_campo: 'inspiracion',    id_item_tipo: null },
    { nombre_campo: 'percepcion',     id_item_tipo: null },
    { nombre_campo: 'raza',           id_item_tipo: { tipo: 'raza' }      },
    { nombre_campo: 'clase',          id_item_tipo: { tipo: 'clase' }     },
    { nombre_campo: 'trasfondo',      id_item_tipo: { tipo: 'trasfondo' } },
    { nombre_campo: 'armas',          id_item_tipo: null },
    { nombre_campo: 'equipo',         id_item_tipo: null },
    { nombre_campo: 'conjuros',       id_item_tipo: null },
    { nombre_campo: 'rasgos',         id_item_tipo: null },
    { nombre_campo: 'detalles',       id_item_tipo: null },
    { nombre_campo: 'ability_setup',    id_item_tipo: null },
    { nombre_campo: 'equipo_inicial',   id_item_tipo: null },
    { nombre_campo: 'monedas',          id_item_tipo: null },
    { nombre_campo: 'casillas_usadas',  id_item_tipo: null },
    { nombre_campo: 'habilidades_clase',id_item_tipo: null },
  ]

  for (let i = 0; i < camposPlantilla.length; i++) {
    const c = camposPlantilla[i]
    await prisma.campoPlantilla.upsert({
      where: { id_campo_plantilla: i + 1 },
      update: {},
      create: {
        id_plantilla: plantilla.id_plantilla,
        nombre_campo: c.nombre_campo,
        id_item_tipo: c.id_item_tipo ?? undefined,
      },
    })
  }

  console.log('Seed completado.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())