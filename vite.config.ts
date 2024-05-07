import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const aliasBase = './src';
const aliases = {
  src: aliasBase,
  '@app': `${aliasBase}/app`,
  '@core': `${aliasBase}/app/core`,
  '@views': `${aliasBase}/app/views`,
  '@assets': `${aliasBase}/assets`,
  '@components': `${aliasBase}/components`,
  '@services': `${aliasBase}/services`,
  '@models': `${aliasBase}/models`,
  '@config': `${aliasBase}/config`,
  '@layouts': `${aliasBase}/app/layouts`,
  '@images': `${aliasBase}/assets/images`,
  '@hooks': `${aliasBase}/hooks`,
};

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

// https://vitejs.dev/config/
export default ({mode}) => {
  
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: resolvedAliases,
    },
    root: path.resolve(__dirname, './'),
    server: {
      port: 3000,
    },
  })
}