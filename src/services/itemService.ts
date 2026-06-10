import { readFile, writeFile, mkdir, unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '../utils/prisma.js';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../data');

const TIPO_SUBDIR: Record<string, string> = {
  raza: 'rol-sistems/dnd/razas',
  hechizo: 'rol-sistems/dnd/hechizos',
  dote: 'rol-sistems/dnd/dotes',
};

function toFilename(nombre: string): string {
  return nombre.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export const itemService = {
  async getItems(filters?: { tipo_item?: string; id_sistema_rol?: number }) {
    return prisma.item.findMany({
      where: {
        ...(filters?.tipo_item && { tipo_item: filters.tipo_item }),
        ...(filters?.id_sistema_rol && { id_sistema_rol: filters.id_sistema_rol }),
      },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
      orderBy: [{ tipo_item: 'asc' }, { nombre: 'asc' }],
    });
  },

  async getItemById(id: number) {
    const item = await prisma.item.findUnique({
      where: { id_item: id },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
    });
    if (!item || !item.ruta_json) return item;

    const raw = await readFile(join(DATA_DIR, item.ruta_json), 'utf-8');
    return { ...item, datos: JSON.parse(raw) };
  },

  async createItem(
    nombre: string,
    tipo_item: string,
    id_sistema_rol?: number,
    datos?: Record<string, unknown>,
    subcategoria?: string,
  ) {
    let ruta_json: string | undefined;

    if (datos) {
      const baseSubdir = TIPO_SUBDIR[tipo_item];
      if (!baseSubdir) throw new Error(`Tipo no soportado para creación con datos: ${tipo_item}`);

      let subdir = baseSubdir;
      if (tipo_item === 'hechizo') {
        const escuela = (datos.hechizo as Record<string, unknown> | undefined)?.escuela as string | undefined;
        if (escuela) subdir = `${baseSubdir}/${escuela}`;
      } else if (tipo_item === 'dote' && subcategoria) {
        subdir = `${baseSubdir}/${subcategoria}`;
      }

      const filename = `${toFilename(nombre)}.json`;
      const fullDir = join(DATA_DIR, subdir);
      await mkdir(fullDir, { recursive: true });
      await writeFile(join(fullDir, filename), JSON.stringify(datos, null, 2), 'utf-8');
      ruta_json = `${subdir}/${filename}`;
    }

    return prisma.item.create({
      data: { nombre, tipo_item, id_sistema_rol, ruta_json },
    });
  },

  async updateItem(id: number, data: { nombre?: string; tipo_item?: string; id_sistema_rol?: number; ruta_json?: string }) {
    return prisma.item.update({
      where: { id_item: id },
      data,
    });
  },

  async deleteItem(id: number) {
    const item = await prisma.item.findUnique({ where: { id_item: id } });
    await prisma.item.delete({ where: { id_item: id } });
    if (item?.ruta_json) {
      await unlink(join(DATA_DIR, item.ruta_json)).catch(() => undefined);
    }
  },
};
