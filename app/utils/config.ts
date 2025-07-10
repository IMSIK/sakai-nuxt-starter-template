import appInfo from '../../package.json'

export const config = {
  appId: import.meta.env.VITE_APP_ID, // Nuxt 環境變數使用 VITE_ 開頭
  version: appInfo.version,
  env: process.env.NODE_ENV,
  publicPath: import.meta.env.BASE_URL || '/',
  language: 'zh_tw',
  languageInfos: [
    { value: 'zh_tw', name: '繁體中文' },
    { value: 'zh_cn', name: '简体中文' },
    { value: 'en_us', name: 'English' },
    { value: 'pt_pt', name: 'Português' },
  ],
}
