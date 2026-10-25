# El Efecto Bullet — Web Oficial y Manifiesto Interactivo

Landing page moderna, estática y responsive para el *position paper* **"El Efecto Bullet: Deuda Cognitiva y la Ilusión de la Velocidad en la Era de la IA"** (Ariel Fabian · DOI: [10.5281/zenodo.23641059](https://doi.org/10.5281/zenodo.23641059)).

---

## Opción A: Despliegue en GitHub Pages (Recomendado, 100% Gratis)

1. En tu cuenta de GitHub (`arfab`), creá un nuevo repositorio público llamado **`efectobullet`** (o `el-efecto-bullet`).
2. Subí todos los archivos de esta carpeta `site/` a la raíz del repositorio.
   *Si usás Git por consola:*
   ```bash
   cd "C:\Users\arfab\OneDrive\Documentos\Montagne\Deuda Cognitiva\site"
   git init
   git add .
   git commit -m "feat: landing page interactiva El Efecto Bullet"
   git branch -M main
   git remote add origin https://github.com/arfab/efectobullet.git
   git push -u origin main
   ```
3. En GitHub, andá a **Settings** > **Pages** (en el menú lateral izquierdo).
4. En **Branch**, seleccioná `main` y la carpeta `/(root)`, luego hacé clic en **Save**.
5. ¡Listo! En 1 o 2 minutos tu sitio estará en vivo en:
   **`https://arfab.github.io/efectobullet/`**

---

## Opción B: Despliegue en tu Hosting Propio (cPanel / FTP)

1. Abrí tu cliente FTP (FileZilla) o el **Administrador de Archivos** de cPanel.
2. Si creaste un subdominio (ej: `efectobullet.tudominio.com`), ingresá a la carpeta correspondiente. Si es tu dominio principal, andá a `public_html/`.
3. Subí todos los archivos y carpetas de este directorio (`index.html`, `css/`, `js/`, `docs/`, `images/`, `.htaccess`).
4. Verificá que en el panel de hosting esté habilitado el certificado SSL (AutoSSL / Let's Encrypt). El archivo `.htaccess` forzará automáticamente la navegación segura por HTTPS y activará la compresión GZIP.

---

## Estructura de Contenidos Incluidos

- `index.html`: Manifiesto interactivo, grid empírico (CMU, Stanford, Wharton, Anthropic, Faros AI), 5 pilares, terminal del Peaje Cognitivo simulada, calculadora de asimilación, citación BibTeX/APA/IEEE en 1 clic.
- `css/styles.css`: Estilo *Dark Editorial*, variables CSS, responsive total.
- `js/main.js`: Calculadora dinámica (Fagan & 10+10), modal de diapositivas y copiado al portapapeles.
- `docs/El_Efecto_Bullet.pdf`: Monografía completa de 19 páginas descargable.
- `docs/presentacion.html`: Diapositivas interactivas en HTML para presentaciones ejecutivas.
- `docs/El_Efecto_Bullet_version_corta.pdf`: Resumen ejecutivo en 5 minutos.
- `images/`: Ilustraciones artísticas de alta resolución (Caballo de ajedrez, Reloj Fischer, Modelo Centauro).
