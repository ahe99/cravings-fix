import postcssPresetEnv from 'postcss-preset-env'

export default {
  plugins: {
    'postcss-preset-env': postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
      },
    }),
  },
}
