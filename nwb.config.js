module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactTimepicki',
      externals: {
        react: 'React'
      }
    }
  }
}
