export const remote = {
    dialog: {
        showOpenDialog: jest.fn()
            .mockImplementation((options, callbackFn) => {
                callbackFn(['/some-config.json'])
            })
    }
}