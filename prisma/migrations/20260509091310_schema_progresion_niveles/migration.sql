-- CreateTable
CREATE TABLE "sistema_rol" (
    "id_sistema_rol" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,
    "nivel_maximo" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "sistema_rol_pkey" PRIMARY KEY ("id_sistema_rol")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "personajes" (
    "id_personaje" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_sistema_rol" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "personajes_pkey" PRIMARY KEY ("id_personaje")
);

-- CreateTable
CREATE TABLE "mensajes" (
    "id_mensaje" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "cuerpo" VARCHAR(400) NOT NULL,
    "tags" VARCHAR(20),

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id_mensaje")
);

-- CreateTable
CREATE TABLE "foros" (
    "id_foro" SERIAL NOT NULL,
    "id_sistema_rol" INTEGER,
    "id_mensaje" INTEGER,

    CONSTRAINT "foros_pkey" PRIMARY KEY ("id_foro")
);

-- CreateTable
CREATE TABLE "item" (
    "id_item" SERIAL NOT NULL,
    "id_sistema_rol" INTEGER,
    "tipo_item" VARCHAR(50) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "todos_datos" JSONB,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "ficha_plantilla" (
    "id_plantilla" SERIAL NOT NULL,
    "id_sistema_rol" INTEGER,
    "nombre_plantilla" VARCHAR(100) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ficha_plantilla_pkey" PRIMARY KEY ("id_plantilla")
);

-- CreateTable
CREATE TABLE "campo_plantilla" (
    "id_campo_plantilla" SERIAL NOT NULL,
    "id_plantilla" INTEGER NOT NULL,
    "nombre_campo" VARCHAR(100) NOT NULL,
    "nivel_disponible" INTEGER NOT NULL DEFAULT 1,
    "tipo_campo" VARCHAR(20) NOT NULL DEFAULT 'texto',
    "filtro_item" VARCHAR(50),

    CONSTRAINT "campo_plantilla_pkey" PRIMARY KEY ("id_campo_plantilla")
);

-- CreateTable
CREATE TABLE "ficha_personaje" (
    "id_ficha" SERIAL NOT NULL,
    "id_personaje" INTEGER NOT NULL,
    "id_sistema_rol" INTEGER,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "ficha_personaje_pkey" PRIMARY KEY ("id_ficha")
);

-- CreateTable
CREATE TABLE "campo_valor" (
    "id_campo_valor" SERIAL NOT NULL,
    "id_ficha" INTEGER NOT NULL,
    "id_campo_plantilla" INTEGER NOT NULL,
    "id_item_valor" INTEGER,
    "valor_texto" TEXT,
    "valor_numero" INTEGER,

    CONSTRAINT "campo_valor_pkey" PRIMARY KEY ("id_campo_valor")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "personajes" ADD CONSTRAINT "personajes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personajes" ADD CONSTRAINT "personajes_id_sistema_rol_fkey" FOREIGN KEY ("id_sistema_rol") REFERENCES "sistema_rol"("id_sistema_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foros" ADD CONSTRAINT "foros_id_sistema_rol_fkey" FOREIGN KEY ("id_sistema_rol") REFERENCES "sistema_rol"("id_sistema_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foros" ADD CONSTRAINT "foros_id_mensaje_fkey" FOREIGN KEY ("id_mensaje") REFERENCES "mensajes"("id_mensaje") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_id_sistema_rol_fkey" FOREIGN KEY ("id_sistema_rol") REFERENCES "sistema_rol"("id_sistema_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_plantilla" ADD CONSTRAINT "ficha_plantilla_id_sistema_rol_fkey" FOREIGN KEY ("id_sistema_rol") REFERENCES "sistema_rol"("id_sistema_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campo_plantilla" ADD CONSTRAINT "campo_plantilla_id_plantilla_fkey" FOREIGN KEY ("id_plantilla") REFERENCES "ficha_plantilla"("id_plantilla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_personaje" ADD CONSTRAINT "ficha_personaje_id_personaje_fkey" FOREIGN KEY ("id_personaje") REFERENCES "personajes"("id_personaje") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ficha_personaje" ADD CONSTRAINT "ficha_personaje_id_sistema_rol_fkey" FOREIGN KEY ("id_sistema_rol") REFERENCES "sistema_rol"("id_sistema_rol") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campo_valor" ADD CONSTRAINT "campo_valor_id_ficha_fkey" FOREIGN KEY ("id_ficha") REFERENCES "ficha_personaje"("id_ficha") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campo_valor" ADD CONSTRAINT "campo_valor_id_campo_plantilla_fkey" FOREIGN KEY ("id_campo_plantilla") REFERENCES "campo_plantilla"("id_campo_plantilla") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campo_valor" ADD CONSTRAINT "campo_valor_id_item_valor_fkey" FOREIGN KEY ("id_item_valor") REFERENCES "item"("id_item") ON DELETE SET NULL ON UPDATE CASCADE;
