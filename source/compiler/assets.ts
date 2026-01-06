import { join } from 'path'
import { readdirSync, writeFileSync } from 'fs'

const STATIC_DIR = '../public/'
const OUTPUT_FILE = '../application/assets.ts'

function getFiles(dir: string): string[] {
    const dirents = readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = join(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    });
    return files.flat();
}

const allFiles = getFiles(STATIC_DIR)
    .map(file => file.replace('public', '')) // Ajusta o caminho para a raiz do servidor
    .map(file => file.replace(/\\/g, '/')); // Garante barras padrão web

const content = `// Arquivo gerado automaticamente - não edite manualmente
export const ASSETS_MANIFEST = ${JSON.stringify(allFiles, null, 2)} as const;

export type AssetPath = typeof ASSETS_MANIFEST[number];
`;

writeFileSync(OUTPUT_FILE, content);
console.log(`✅ Manifesto de assets gerado com ${allFiles.length} arquivos.`);