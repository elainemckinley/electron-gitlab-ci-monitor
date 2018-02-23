import { get } from '../../src/util/fetchUtil'
import requestBase from 'request'

let response

beforeEach(() => {
    response = {
        statusCode: 200,
        body: 'some content'
    }

    requestBase.get = jest.fn((url, options, callbackFn) => {
        callbackFn(null, response)
    })
})

describe('get', () => {
    test('returns a promise with received response', async () => {
        const resolvedResponse = await get('http://example.com/some-endpoint')
        expect(resolvedResponse).toEqual(response)
    })

    test('throws error when error is received', async (done) => {
        requestBase.get = jest.fn((url, options, callbackFn) => {
            callbackFn(null, {statusCode: 500})
        })

        get('http://example.com/some-endpoint')
            .then(() => {
                throw 'get should have thrown an exception'
            })
            .catch(exception => expect(exception).toContain('Error calling http://example.com/some-endpoint'))
            .then(done)
    })
})