import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const DND_DIR = 'rol-sistems/dnd'

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

  const plantilla = await prisma.fichaPlantilla.upsert({
    where: { id_plantilla: 1 },
    update: {},
    create: { id_sistema_rol: dnd.id_sistema_rol, nombre_plantilla: 'Ficha DnD 5e', version: 1 },
  })

  const camposPlantilla = [
    { nombre_campo: 'stats',       id_item_tipo: null },
    { nombre_campo: 'combate',     id_item_tipo: null },
    { nombre_campo: 'salvaciones', id_item_tipo: null },
    { nombre_campo: 'habilidades', id_item_tipo: null },
    { nombre_campo: 'inspiracion', id_item_tipo: null },
    { nombre_campo: 'percepcion',  id_item_tipo: null },
    { nombre_campo: 'raza',        id_item_tipo: { tipo: 'raza' }      },
    { nombre_campo: 'clase',       id_item_tipo: { tipo: 'clase' }     },
    { nombre_campo: 'trasfondo',   id_item_tipo: { tipo: 'trasfondo' } },
    { nombre_campo: 'armas',       id_item_tipo: null },
    { nombre_campo: 'equipo',      id_item_tipo: null },
    { nombre_campo: 'conjuros',    id_item_tipo: null },
    { nombre_campo: 'rasgos',      id_item_tipo: null },
    { nombre_campo: 'detalles',    id_item_tipo: null },
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
