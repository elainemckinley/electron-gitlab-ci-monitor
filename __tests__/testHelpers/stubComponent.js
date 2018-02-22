let lifecycleMethods = [
    'render',
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
]

let stubComponent = function (...classes) {
    beforeEach(() => {
        classes.forEach(clazz => {
            lifecycleMethods.forEach(method => {
                if (typeof clazz.prototype[method] !== 'undefined') {
                    clazz.prototype[method] = jest.fn()
                }
            })
        })
    })
}

export default stubComponent