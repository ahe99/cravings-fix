// module.exports = require('@cravings-fix/configs/tailwind/postcss.config')
import config from '@cravings-fix/configs/tailwind/postcss.config'
import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: {
    'postcss-preset-env': postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
    ...config.plugins,
  },
}
