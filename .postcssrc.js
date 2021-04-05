module.exports = {
  plugins: {
    // 这个vue cli 已经帮我们配置了, 所以不必再配置一遍
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      rootValue: ({ file }) => {
        return file.includes('vant') ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown'
    }
  }
}
