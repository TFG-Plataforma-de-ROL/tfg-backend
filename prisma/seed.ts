import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  // SistemaRol DnD 5e
  const dnd = await prisma.sistemaRol.upsert({
    where: { id_sistema_rol: 1 },
    update: {},
    create: { nombre: 'D&D 5e', descripcion: 'Dungeons & Dragons 5ª Edición' },
  })

  // Razas
  const razas = ['Humano', 'Elfo', 'Enano', 'Mediano']
  for (const nombre of razas) {
    await prisma.item.upsert({
      where: { id_item: razas.indexOf(nombre) + 1 },
      update: {},
      create: {
        id_sistema_rol: dnd.id_sistema_rol,
        tipo_item: 'raza',
        nombre,
        todos_datos: {},
      },
    })
  }

  // Clases
  const clases = ['Guerrero', 'Mago', 'Pícaro', 'Clérigo']
  for (const nombre of clases) {
    await prisma.item.upsert({
      where: { id_item: clases.indexOf(nombre) + 5 },
      update: {},
      create: {
        id_sistema_rol: dnd.id_sistema_rol,
        tipo_item: 'clase',
        nombre,
        todos_datos: {},
      },
    })
  }

  // Trasfondos
  const trasfondos = ['Acólito', 'Criminal', 'Noble', 'Sabio']
  for (const nombre of trasfondos) {
    await prisma.item.upsert({
      where: { id_item: trasfondos.indexOf(nombre) + 9 },
      update: {},
      create: {
        id_sistema_rol: dnd.id_sistema_rol,
        tipo_item: 'trasfondo',
        nombre,
        todos_datos: {},
      },
    })
  }

  // FichaPlantilla
  const plantilla = await prisma.fichaPlantilla.upsert({
    where: { id_plantilla: 1 },
    update: {},
    create: {
      id_sistema_rol: dnd.id_sistema_rol,
      nombre_plantilla: 'Ficha DnD 5e',
      version: 1,
    },
  })

  // CampoPlantilla
  const camposPlantilla = [
    { nombre_campo: 'stats',         id_item_tipo: null },
    { nombre_campo: 'combate',       id_item_tipo: null },
    { nombre_campo: 'salvaciones',   id_item_tipo: null },
    { nombre_campo: 'habilidades',   id_item_tipo: null },
    { nombre_campo: 'inspiracion',   id_item_tipo: null },
    { nombre_campo: 'percepcion',    id_item_tipo: null },
    { nombre_campo: 'raza',          id_item_tipo: { tipo: 'raza' } },
    { nombre_campo: 'clase',         id_item_tipo: { tipo: 'clase' } },
    { nombre_campo: 'trasfondo',     id_item_tipo: { tipo: 'trasfondo' } },
    { nombre_campo: 'armas',         id_item_tipo: null },
    { nombre_campo: 'equipo',        id_item_tipo: null },
    { nombre_campo: 'conjuros',      id_item_tipo: null },
    { nombre_campo: 'rasgos',        id_item_tipo: null },
    { nombre_campo: 'detalles',      id_item_tipo: null },
  ]

  for (let i = 0; i < camposPlantilla.length; i++) {
    const c = camposPlantilla[i]
    await prisma.campoPlantilla.upsert({
      where: { id_campo_plantilla: i + 1 },
      update: {},
      create: {
        id_plantilla: plantilla.id_plantilla,
        nombre_campo: c.nombre_campo,
        id_item_tipo: c.id_item_tipo,
      },
    })
  }

  console.log('Seed completado: D&D 5e creado con', razas.length, 'razas,', clases.length, 'clases,', trasfondos.length, 'trasfondos,', camposPlantilla.length, 'campos de plantilla.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
